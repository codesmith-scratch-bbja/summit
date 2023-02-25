import React from 'react';
import { Board, Collection } from '../../components';
import { useQuery } from 'react-query';
import axios from 'axios';

//Discover page displays Board and contains:
// a sideBar that allows users to explore possible goals by topic
//sideBar contains links to different typs of collections (ie, travel, fitness, hobbies, etc)
// and two Collections that offer users potential goals

export default function Discover() {
  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios('/api/goals/trending');
    console.log('DISCOVER DATA', response.data);
    return response.data;
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <Board>
        <Collection spires={data} />
      </Board>
    </div>
  );
}
