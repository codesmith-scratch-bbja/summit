import React from 'react';
import { useState } from 'react';
import {
  PathWidget,
  Collection,
  SearchFieldModal,
  Goal,
  Board
} from '../../components';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import styles from './Profile.module.css';
import useStore from '../../store';

export default function Profile() {
  const location = useLocation();
  const username = location.pathname.slice(1);
  const [activeGoal, setActiveGoal] = useState(null);

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
    // add data to body
    const response = await axios('/api/goal', {
      params: {
        username: username
      }
    });
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
      <aside>
        <h1 style={{ color: 'white' }}>{username}</h1>
        {activeGoal && (
          <div className={styles.activeGoal}>
            <Goal activeGoal={activeGoal} setActiveGoal={setActiveGoal} />
          </div>
        )}
      </aside>
      <Board>
        {data ? (
          <Collection
            spires={data}
            lastChild={addNew}
            handleFunc={(data) => setActiveGoal(data)}
          />
        ) : (
          <div>no spires</div>
        )}
      </Board>
      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
    </main>
  );
}
