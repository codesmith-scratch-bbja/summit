import React from 'react';
import { useState } from 'react';
import { HorizontalScroll, PathWidget, Collection } from '../../components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Profile() {
  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios('/api/goal?user_id=23');
    return response.data;
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
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
          <PathWidget />
        </HorizontalScroll>
      </Collection>
      <Collection></Collection>
    </div>
  );
}
