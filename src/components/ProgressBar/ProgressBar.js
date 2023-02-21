import React from 'react';
import styles from './ProgressBar.module.css';

function ProgressBar({ progress }) {
  const progressColor =
    progress <= 0.25 ? 'red' : progress >= 0.75 ? 'green' : 'yellow';

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.full} ${styles[progressColor]}`}></div>
      <div
        className={`${styles.progress} ${styles[progressColor]}`}
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
