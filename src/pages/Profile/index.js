import React from 'react';
import { useState, useEffect } from 'react';
import {
  HorizontalScroll,
  PathWidget,
  Collection,
  SearchFieldModal,
  Goal
} from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import  styles  from './Profile.module.css'

export default function Profile() {
  // pass props through Collection to Path Widget
  // state - active goal -- id if its active, null if its not active
  const [activeGoal, setActiveGoal] = useState(null);
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

  //* Added this to avoid the api fetch call, passing into spires for Collection Componenet
  const fakeData = [
    { title: 'Run a marathon', complete: Math.random(), id: Math.floor(Math.random() * 100)},
    { title: 'Go to Paris', complete: Math.random(), id: Math.floor(Math.random() * 100)},
    { title: 'Visit every AAA baseball stadium', complete: Math.random(), id: Math.floor(Math.random() * 100) },
    { title: 'Get a passport', complete: Math.random(), id: Math.floor(Math.random() * 100) },
    { title: 'Join a bowling league', complete: Math.random(), id: Math.floor(Math.random() * 100) }
  ];

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
      <Collection spires={fakeData} lastChild={addNew} setActiveGoal={setActiveGoal} /> 
      {activeGoal && < Goal activeGoal={activeGoal} setActiveGoal={setActiveGoal} />}
      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
  
    </main> 
  );
}
