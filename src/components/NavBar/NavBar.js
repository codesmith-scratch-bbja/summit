import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ProfilePic } from '../../components';

function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
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

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname;
  console.log({ path });
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(getCookie('loggedInAs'));
  }, []);

  return (
    <aside className={styles.wrapper}>
      <Link to="/" className={`${styles.selectable} ${styles.logo}`}>
        spires
      </Link>

      <a href="/auth">
        <div className={styles.profilePic}>
          <ProfilePic />
        </div>
      </a>

      <Tab.Group as={'div'} className={styles.group}>
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
                to={`/${username}`}
                className={selected ? styles.selected : styles.selectable}
              >
                Profile
              </Link>
            )}
          </Tab>
          <Link className={styles.logout} to="/logout">
            Logout
          </Link>
        </Tab.List>
      </Tab.Group>
    </aside>
  );
}
