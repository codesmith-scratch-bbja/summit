import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Collection, Board } from '../../components';
import styles from './Home.module.css';
import { useQueries } from 'react-query';
import axios from 'axios';

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
export default function Home() {
  // Get self data, get friend data, get trending data
  const [displayed, setDisplayed] = useState(<div>Loading...</div>);
  const [tab, setTab] = useState('loading');

  const [selfQuery, friendQuery, trendingQuery] = useQueries([
    {
      queryKey: 'self',
      queryFn: async () => {
        const response = await axios('/api/goal');
        if (response.status === 200) setTab('self');
        console.log(response.data);
        return response.data;
      }
    },
    {
      queryKey: 'friends',
      queryFn: async () => {
        console.log('friends queryFn called');
        const response = await axios('/api/goal/friends');
        console.log('friendsResponse', response.data);
        const goalArray = [];

        response.data.forEach((user) => {
          user.activegoals.forEach((goal) => {
            goalArray.push({ ...goal, image: user.image });
          });
        });
        console.log({ goalArray });
        return goalArray;
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

  const userComponent = (
    <Collection
      styles={styles.collection}
      title={'Your Spires'}
      spires={userSpires}
    />
  );

  const trendsComponent = (
    <Collection
      styles={styles.collection}
      title={'Trending Spires'}
      spires={trendingSpires}
    />
  );
  const friendsComponent = (
    <Collection
      styles={styles.collection}
      title={'Friends Spires'}
      spires={friendSpires}
    />
  );

  useEffect(() => {
    console.log(tab);
    switch (tab) {
      case 'self':
        setDisplayed(userComponent);
        break;
      case 'trending':
        setDisplayed(trendsComponent);
        break;
      case 'friends':
        setDisplayed(friendsComponent);
        break;
      default:
        setDisplayed(<div>Loading...</div>);
    }
  }, [tab]);

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
            type="button"
            onClick={() => setTab('self')}
          >
            Your Spires
          </button>
          <button
            className={`${styles.button} ${
              tab === 'friends' ? styles.selected : ''
            }`}
            type="button"
            onClick={() => setTab('friends')}
          >
            Friends Spires
          </button>
          <button
            className={`${styles.button} ${
              tab === 'trending' ? styles.selected : ''
            }`}
            type="button"
            onClick={() => setTab('trending')}
          >
            Trending Spires
          </button>
        </nav>
        {displayed}
      </div>
    </section>
  );
}
