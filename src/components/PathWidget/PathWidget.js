import React, { useState } from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar, AdoptGoalModal } from '../../components';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import axios from 'axios';

function PathWidget({ complete, title, data, toggleModal, handleFunc }) {
  if (!complete && !data && !title)
    return (
      <div onClick={toggleModal} className={styles.wrapper}>
        <span style={{ margin: '0 auto' }}>+</span>
        <span style={{ margin: '0 auto' }}>Add a new path</span>
      </div>
    );
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation((adoptedGoal) => {
    return axios.post('/api/goal/adopt', adoptedGoal);
  });

  function adoptGoal() {
    console.log('adopting goal');
    console.log(data);
    const goalId = data.id;
    const userId = 'cleg4r33a00017frkqbg7abhg';
    mutation.mutate({ goalId, userId });
    setIsOpen(false);
  }

  return (
    <>
      <div
        onClick={handleFunc ? () => handleFunc(data) : () => setIsOpen(true)}
        className={styles.wrapper}
      >
        <section className={styles.heading}>
          <h4>{title}</h4>
        </section>
        <div className={styles.content}>
          <h6>Next:</h6>
          {/* <p>{data.tasks[0].title}</p> */}
        </div>
        <div className={styles.progressBar}>
          <ProgressBar progress={complete} />
        </div>
      </div>
      <AdoptGoalModal
        adoptGoal={adoptGoal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default PathWidget;

PathWidget.propTypes = {
  complete: PropTypes.number,
  title: PropTypes.string,
  data: PropTypes.object,
  toggleModal: PropTypes.func,
  handleFunc: PropTypes.func
};
