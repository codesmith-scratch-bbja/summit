import React from 'react';
import { useState } from 'react';
import { PathWidget, Collection, SideBar, NewPathButton} from '../../components';

export default function Profile() {
  const [goals, setGoals] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  //API CALL

  return (
    <div>
      <h1>Profile</h1>
      <SideBar />
      <NewPathButton />
      <Collection>
          {goals.map((boulder) => (
            <PathWidget key={goal.id} data={goal} />
          ))}
      </Collection>
    </div>
  );
}
