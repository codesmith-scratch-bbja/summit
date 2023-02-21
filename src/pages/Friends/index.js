import React from 'react';
import { useState } from 'react';
import {
  Board,
  SideBar,
  Collection,
  PathWidgetDisplay,
  PathWidget
} from '../../components';

//Friends displays Board and Collection of friends goals
export default function Friends() {
  const [friendsBoulders, setFriends] = useState([]);
  //API call

  return (
    <div>
      <h1>Friends</h1>
      <Board>
        <SideBar />
        <Collection>
          <PathWidgetDisplay>
            {friendsBoulders.map((boulder) => (
              <PathWidget key={boulder.id} data={boulder} />
            ))}
          </PathWidgetDisplay>
        </Collection>
      </Board>
    </div>
  );
}
