import React from 'react';
import {
  Board,
  Collection,
  // PathWidgetDisplay,
  PathWidget,
  SideBar
} from '../../components';

//Discover page displays Board and contains:
// a sideBar that allows users to explore possible goals by topic
//sideBar contains links to different typs of collections (ie, travel, fitness, hobbies, etc)
// and two Collections that offer users potential goals

export default function Discover() {
  const [travelBoulders, setTravel] = useState([]);
  const [hobbyBoulders, setHobby] = useState([]);
  //API call

  return (
    <div>
      {/* <Board>
        <SideBar />
        <Collection>
          <h2>Visit...</h2>
          <PathWidgetDisplay>
            {travelBoulders.map((boulder) => (
              <PathWidget key={boulder.id} data={boulder} />
            ))}
          </PathWidgetDisplay>
        </Collection>
        <Collection>
          <h2>Learn how to...</h2>
          <PathWidgetDisplay>
            {hobbyBoulders.map((boulder) => (
              <PathWidget key={boulder.id} data={boulder} />
            ))}
          </PathWidgetDisplay>
        </Collection>
      </Board> */}
    </div>
  );
}
