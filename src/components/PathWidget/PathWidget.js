import React, { useState } from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar } from '../../components';
import PropTypes from 'prop-types';
//toggleModal is for 8-14
function PathWidget({ complete, title, data, toggleModal, setActiveGoal }) {

  if (!complete && !data && !title)
    return (
      <div onClick={toggleModal} className={styles.wrapper}>
        <span style={{ margin: '0 auto' }}>+</span>
        <span style={{ margin: '0 auto' }}>Add a new path</span>
      </div>
    );  
  
  // add showTaskBar function for each onClick 
  return (

    <div className={styles.wrapper} onClick={() => setActiveGoal(data.id)}>
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
  );
} 

export default PathWidget;

PathWidget.propTypes = {
  complete: PropTypes.number,
  title: PropTypes.string,
  data: PropTypes.object,
  toggleModal: PropTypes.func,
  setActiveGoal: PropTypes.func
};
