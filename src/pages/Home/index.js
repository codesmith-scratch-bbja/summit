import React from 'react';
import { Link } from 'react-router-dom';
import { PathWidget, HorizontalScroll, Collection } from '../../components';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main>
      <h2 className={styles.heading}>Your Spires</h2>
      <Collection styles={styles.collection}>
        <HorizontalScroll>
          <PathWidget title={'Run a marathon'} complete={Math.random()} />
          <PathWidget title={'Go to Paris'} complete={Math.random()} />
          <PathWidget
            title={'Visit every AAA baseball stadium'}
            complete={Math.random()}
          />
          <PathWidget title={'Get a passport'} complete={Math.random()} />
          <PathWidget
            title={'Join a bowling league'}
            complete={Math.random()}
          />
        </HorizontalScroll>
      </Collection>
    </main>
  );

  // return (
  //   <div>
  //     <Board>
  //       <Collection>
  //         <h2>Set your own goals</h2>
  //         <NewPathButton />
  //         <PathWidgetDisplay>
  //           {boulders.map((boulder) => (
  //             <PathWidget key={boulder.id} data={boulder} />
  //           ))}
  //         </PathWidgetDisplay>
  //       </Collection>
  //       <Collection>
  //         <h2>See what your friends are working on</h2>
  //         <PathWidgetDisplay>
  //           {friends.map((friend) => (
  //             <PathWidget key={friend.id} data={friend} />
  //           ))}
  //         </PathWidgetDisplay>
  //       </Collection>
  //     </Board>
  //   </div>
  // );
}
