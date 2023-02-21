import React from 'react';
import styles from './Collection.module.css';

function Collection({ children, styles }) {
  return <div className={styles}>{children}</div>;
}

export default Collection;
