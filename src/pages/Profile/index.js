import React from 'react';
import { useState } from 'react';
import {
  HorizontalScroll,
  PathWidget,
  Collection,
  SearchFieldModal
} from '../../components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Profile() {
  const [isSearching, setIsSearching] = useState(false);
  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios('/api/goal');
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
    axios.post('/api/goal', { title: goal });
  }

  return (
    <main>
      <Collection>
        <HorizontalScroll>
          {data.map((boulder) => (
            <PathWidget
              key={boulder.id}
              title={boulder.title}
              data={boulder}
              complete={0.5}
            />
          ))}
          <PathWidget toggleModal={toggleModal} />
        </HorizontalScroll>
      </Collection>
      <Collection></Collection>
      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
    </main>
  );
}
