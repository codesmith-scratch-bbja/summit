import React, { useState, useEffect } from 'react';
import { Collection, Board } from '../../components';
import styles from './Home.module.css';
import { useQueries, useQuery } from 'react-query';
import {
  fetchSelfQuery,
  fetchFriendsQuery,
  fetchTrendingQuery
} from '../../queries';

export default function Home() {
  const [tab, setTab] = useState('self');
  const self = useQuery(fetchSelfQuery());
  const friends = useQuery(fetchFriendsQuery());
  const trending = useQuery(fetchTrendingQuery());

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.first} ${styles.component}`}></div>
      <div className={`${styles.second} ${styles.component}`}></div>
      <div className={`${styles.third} ${styles.component}`}>
        <nav className={styles.buttonWrapper}>
          <button
            className={`${styles.button} ${
              tab === 'self' ? styles.selected : ''
            }`}
            onClick={() => setTab('self')}
          >
            Your Spires
          </button>
          <button
            className={`${styles.button} ${
              tab === 'friends' ? styles.selected : ''
            }`}
            onClick={() => setTab('friends')}
          >
            Friends Spires
          </button>
          <button
            className={`${styles.button} ${
              tab === 'trending' ? styles.selected : ''
            }`}
            onClick={() => setTab('trending')}
          >
            Trending Spires
          </button>
        </nav>
        {tab === 'self' && <Collection spires={self.data} />}
        {tab === 'friends' && <Collection spires={friends.data} />}
        {tab === 'trending' && <Collection spires={trending.data} />}
      </div>
    </section>
  );
}
