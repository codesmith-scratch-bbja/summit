import React from 'react';
import styles from './HorizontalScroll.module.css';

function HorizontalScroll({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default HorizontalScroll;
