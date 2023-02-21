import React from 'react';
import { useState } from 'react';
import { HorizontalScroll, PathWidget, Collection } from '../../components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Profile() {
  const [searchParams] = useSearchParams();
  //const token = searchParams.get('access_token');
  const access_token = document.cookie.split('=')[1];

  if (!access_token) {
    return <div style={{ color: 'white' }}>Not logged in</div>;
  }

  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios(
      '/api/goal?access_token=' + access_token + '&user_id=23'
    );
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
