import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
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
            /* Use the `selected` state to conditionally style the selected tab. */
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
            /* Use the `selected` state to conditionally style the selected tab. */
            <Link
              to="/profile"
              className={selected ? styles.selected : styles.selectable}
            >
              Profile
            </Link>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        {/* ... */}
      </Tab.Panels>
    </Tab.Group>
  );
}
