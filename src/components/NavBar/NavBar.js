import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import React from 'react';
import styles from './NavBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ProfilePic } from '../../components';

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname;
  console.log({ path });
  return (
    <div className={styles.width}>
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
        <a href="/auth">
          <div className={styles.profilePic}>
            <ProfilePic />
          </div>
        </a>
      </Tab.Group>
    </div>
  );
}
