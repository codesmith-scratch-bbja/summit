import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.css';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.section}>{children}</main>
    </div>
  );
}
