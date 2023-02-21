import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { ProfilePic } from '../../components';

const authLink =
  'https://github.com/login/oauth/authorize?client_id=2fd7a075b391b262d9e5&redirect_uri=http://localhost:8080/api/auth';

export default function NavBar() {
  return (
    <Tab.Group as={'div'} className={styles.wrapper}>
      <Link to="/" className={`${styles.selectable} ${styles.logo}`}>
        spires
      </Link>
      <Tab.List as={'div'} className={styles.list}>
        <Tab as={Fragment}>
          {({ selected }) => (
            <Link
              to="/"
              className={selected ? styles.selected : styles.selectable}
            >
              Home
            </Link>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <Link
              to="/discover"
              className={selected ? styles.selected : styles.selectable}
            >
              Discover
            </Link>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <Link
              to="/profile"
              className={selected ? styles.selected : styles.selectable}
            >
              Profile
            </Link>
          )}
        </Tab>
      </Tab.List>
      <a href={authLink}>
        <div className={styles.profilePic}>
          <ProfilePic />
        </div>
      </a>
    </Tab.Group>
  );
}
