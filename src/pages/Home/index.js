import React from 'react';
import { useState } from 'react';
import { Board, Collection, PathWidgetDisplay, PathWidget, NewPathButton } from '../../components';

//Home displays Board and contains: 
//a Personal Collection and Friend Collection
//Personal collection will contain a newPathButton that will allow users to create new goal 
export default function Home() {
  const [boulders, setBoulders] = useState([]);
  const[friends, setFriends] = useState([]);
  //API call with ...useEffect hook? 
  //? - what is best practice: having  multiple api calls withing one useEffect or seperate like below
  //get stored goals/boulders from DB and setBoulders
  useEffect(() => {
    fetch('/api/goals')
      .then((res) => res.json())
      .then((goals) => {
        setBoulders(goals);
      });
  },[]);

   //get stored friends from DB and setFriends
   useEffect(() => {
    fetch('/api/friends')
      .then((res) => res.json())
      .then((friends) => {
        setFriends(friends);
      });
  });


  return (
    <div>
      <h1>Home</h1>
        <Board>
          <Collection>
          <h2>Set your own goals</h2>
          <NewPathButton/>
          <PathWidgetDisplay>{boulders.map((boulder) => (
            <PathWidget key={boulder.id} data={boulder}/>
          ))}</PathWidgetDisplay>
          </Collection> 
          <Collection>
          <h2>See what your friends are working on</h2>
          <PathWidgetDisplay>{friends.map((friend) => (
            <PathWidget key={friend.id} data={friend}/>
          ))}</PathWidgetDisplay>
          </Collection>
        </Board>
    </div>
  );
}
