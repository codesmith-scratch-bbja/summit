import React from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar } from '../../components';
import PropTypes from 'prop-types';

function PathWidget({ complete, title, data, toggleModal }) {
  if (!complete && !data && !title)
    return (
      <div onClick={toggleModal} className={styles.wrapper}>
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

PathWidget.propTypes = {
  complete: PropTypes.number,
  title: PropTypes.string,
  data: PropTypes.object,
  toggleModal: PropTypes.func
};
