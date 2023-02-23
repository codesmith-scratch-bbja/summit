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
import useStore from '../../store';

export default function Profile() {
  // pass props through Collection to Path Widget
  // state - active goal -- id if its active, null if its not active
  const [activeGoal, setActiveGoal] = useState(null);
  const [searchParams] = useSearchParams();
  const avatarURL = searchParams.get('avatar');
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

  //* Added this to avoid the api fetch call, passing into spires for Collection Componenet
  const fakeData = [
    { title: 'Run a marathon', complete: Math.random(), id: Math.floor(Math.random() * 100)},
    { title: 'Go to Paris', complete: Math.random(), id: Math.floor(Math.random() * 100)},
    { title: 'Visit every AAA baseball stadium', complete: Math.random(), id: Math.floor(Math.random() * 100) },
    { title: 'Get a passport', complete: Math.random(), id: Math.floor(Math.random() * 100) },
    { title: 'Join a bowling league', complete: Math.random(), id: Math.floor(Math.random() * 100) }
  ];

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

     // <Collection spires={fakeData} lastChild={addNew}  /> 
      
      {data ? (
        <Collection spires={data} lastChild={addNew} setActiveGoal={setActiveGoal} />
      ) : (
        <div>no spires</div>
      )}
      {activeGoal && < Goal activeGoal={activeGoal} setActiveGoal={setActiveGoal} />}
      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
  
    </main> 
  );
}
