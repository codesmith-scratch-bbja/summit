import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ProfilePic } from '../../components';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { fetchSessionQuery } from '../../queries';

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname;
  const { data: session, isLoading, error } = useQuery(fetchSessionQuery());

  return (
    <aside className={styles.wrapper}>
      <Link to="/" className={`${styles.selectable} ${styles.logo}`}>
        spires
      </Link>
      <div className={styles.profile}>
        <a href="/auth">
          <div className={styles.profilePic}>
            <ProfilePic avatarUrl={session.avatarUrl} />
          </div>
        </a>
        <p>{session.name}</p>
      </div>
      <Tab.Group as={'div'} className={styles.group}>
        <Tab.List as={'div'} className={styles.list}>
          <Tab as={Fragment}>
            {({ selected }) => (
              <Link
                to="/"
                className={selected ? styles.selected : styles.selectable}
              >
                {' '}
                <i className="bi bi-house-door"></i>
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
                <i className="bi bi-search"></i>
                Discover
              </Link>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <Link
                to={`/${!isLoading && session.name}`}
                className={selected ? styles.selected : styles.selectable}
              >
                <i className="bi bi-person-circle"></i>
                Profile
              </Link>
            )}
          </Tab>
          <Link
            className={styles.logout}
            to="#"
            onClick={(e) => {
              axios.post('/api/auth/logout');
              window.location.reload();
            }}
          >
            <i className="bi bi-box-arrow-left"></i>
            {session.name ? 'Logout' : 'Login'}
          </Link>
        </Tab.List>
      </Tab.Group>
    </aside>
  );
}
