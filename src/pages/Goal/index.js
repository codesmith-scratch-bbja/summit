import React from 'react';
import { useState } from 'react';
import { HorizontalScroll, PathWidget, Collection } from '../../components';

export default function Profile() {
  const [boulders, setBoulders] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  //API CALL

  return (
    <div>
      <h1>Goal</h1>
      <Collection>
        <HorizontalScroll>
          {boulders.map((boulder) => (
            <PathWidget key={boulder.id} data={boulder} />
          ))}
        </HorizontalScroll>
      </Collection>
      <Collection></Collection>
    </div>
  );
}