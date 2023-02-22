import React from 'react';
import { useState, useEffect } from 'react';
import {
  HorizontalScroll,
  PathWidget,
  Collection,
  SearchFieldModal
} from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const avatarURL = searchParams.get('avatar');
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newGoal) => {
      return axios.post('/api/goal', newGoal);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries();
      }
    }
  );
  useEffect(() => {
    if (!localStorage.getItem('avatarURL'))
      localStorage.setItem('avatarURL', avatarURL);
  }, []);

  const [isSearching, setIsSearching] = useState(false);
  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios('/api/goal');
    console.log(response.data);
    return response.data;
  });

  if (isLoading || data.length === 0) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const toggleModal = () => {
    console.log('Toggling');
    setIsSearching(!isSearching);
  };

  function postNewGoal(goal) {
    toggleModal();
    mutation.mutate({ title: goal });
  }
  const addNew = <PathWidget toggleModal={toggleModal} />;
  return (
    <main>
      <Collection spires={data} lastChild={addNew} />

      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
    </main>
  );
}
