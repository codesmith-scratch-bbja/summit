import React from 'react';
import { useState, useEffect } from 'react';
import { PathWidget, Collection, SearchFieldModal } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import useStore from '../../store';

export default function Profile() {
  const session = useStore((state) => state.session);

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

  const [isSearching, setIsSearching] = useState(false);
  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios('/api/goal');
    if (!response.data) return [];
    return response.data;
  });

  if (isLoading) return 'Loading...';

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
      {data ? (
        <Collection spires={data} lastChild={addNew} />
      ) : (
        <div>no spires</div>
      )}

      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
    </main>
  );
}
