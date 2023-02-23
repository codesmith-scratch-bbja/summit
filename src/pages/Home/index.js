import React from 'react';
import { Link } from 'react-router-dom';
import { Collection, Board } from '../../components';
import styles from './Home.module.css';
import { useQueries } from 'react-query';
import axios from 'axios';

export default function Home() {
  // Get self data, get friend data, get trending data
  const [selfQuery, friendQuery, trendingQuery] = useQueries([
    {
      queryKey: 'self',
      queryFn: async () => {
        const response = await axios('/api/goal/');
        return response.data;
      }
    },
    {
      queryKey: 'friends',
      queryFn: async () => {
        const response = await axios('/api/goal/friends');
        return response.data;
      }
    },
    {
      queryKey: 'trending',
      queryFn: async () => {
        const response = await axios('/api/goal/trending');
        return response.data;
      }
    }
  ]);

  const { isLoading, error, data: userSpires } = selfQuery;
  const {
    isLoading: friendLoading,
    error: friendError,
    data: friendSpires
  } = friendQuery;
  const {
    isLoading: trendingLoading,
    error: trendingError,
    data: trendingSpires
  } = trendingQuery;

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.first} ${styles.component}`}></div>
      <div className={`${styles.second} ${styles.component}`}></div>
      <div className={`${styles.third} ${styles.component}`}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Collection
            styles={styles.collection}
            title={'Your Spires'}
            spires={userSpires}
          />
        )}
      </div>

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Collection
          styles={styles.collection}
          title={'Your Spires'}
          spires={userSpires}
        />
      )}
      {friendLoading ? (
        <div>Loading...</div>
      ) : (
        <Collection
          styles={styles.collection}
          title={'Recent Friend Activity'}
          spires={friendSpires}
        />
      )}
      {trendingLoading ? (
        <div>Loading...</div>
      ) : (
        <Collection
          styles={styles.collection}
          title={'Trending'}
          spires={trendingSpires}
        />
      )} */}
    </section>
  );
}
