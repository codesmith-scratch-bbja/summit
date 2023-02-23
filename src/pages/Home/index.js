import React from 'react';
import { Link } from 'react-router-dom';
import { Collection, Board } from '../../components';
import styles from './Home.module.css';

export default function Home() {
  const userSpires = [
    { title: 'Run a marathon', complete: Math.random() },
    { title: 'Go to Paris', complete: Math.random() },
    { title: 'Visit every AAA baseball stadium', complete: Math.random() },
    { title: 'Get a passport', complete: Math.random() },
    { title: 'Join a bowling league', complete: Math.random() }
  ];

  return (
    <main>
      <Board>
        <Collection
          styles={styles.collection}
          title={'Your Spires'}
          spires={userSpires}
        /> 
        <Collection
          styles={styles.collection}
          title={'Recent Friend Activity'}
          spires={userSpires}
        />
        <Collection
          styles={styles.collection}
          title={'Trending'}
          spires={userSpires}
        />
      </Board>
    </main> 
  );
}
