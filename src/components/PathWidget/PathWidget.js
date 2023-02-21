import React from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar } from '../../components';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PathWidget({ complete, title, data }) {
  function handleClick() {
    axios.post('/api/goal', {
      title: 'New goal',
      userId: 23
    });
  }

  if (!complete && !data && !title)
    return (
      <div onClick={handleClick} className={styles.wrapper}>
        <span style={{ margin: '0 auto' }}>+</span>
        <span style={{ margin: '0 auto' }}>Add a new path</span>
      </div>
    );

  return (
    //<Link to="/profile">
    <div className={styles.wrapper}>
      <section className={styles.heading}>
        <h4>{title}</h4>
      </section>
      <div className={styles.content}>
        <h6>Next:</h6>
      </div>
      <div className={styles.progressBar}>
        <ProgressBar progress={complete} />
      </div>
    </div>
    //</Link>
  );
}

export default PathWidget;
