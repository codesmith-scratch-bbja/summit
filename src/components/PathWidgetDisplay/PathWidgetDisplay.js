import React from 'react';
import styles from './PathWidgetDisplay.module.css';

function PathWidgetDisplay({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default PathWidgetDisplay;
