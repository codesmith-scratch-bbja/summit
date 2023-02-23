import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <body className={styles.layout}>
      <NavBar />
      <main className={styles.section}>{children}</main>
    </body>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
