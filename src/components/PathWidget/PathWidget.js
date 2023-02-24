import React, { useState } from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar, AdoptGoalModal } from '../../components';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

function PathWidget({ complete, title, data, toggleModal, handleFunc }) {
  if (!complete && !data && !title)
    return (
      <div onClick={toggleModal} className={styles.wrapper}>
        <span style={{ margin: '0 auto' }}>+</span>
        <span style={{ margin: '0 auto' }}>Add a new path</span>
      </div>
    );
  console.log({ data });
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (adoptedGoal) => {
      return axios.post('/api/goal/adopt', adoptedGoal);
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('self');
      }
    }
  );

  function adoptGoal() {
    console.log('adopting goal');
    console.log(data);
    const goalId = data.id;
    mutation.mutate({ goalId });
    setIsOpen(false);
  }

  return (
    <>
      <div
        onClick={handleFunc ? () => {} : () => setIsOpen(true)}
        className={styles.wrapper}
      >
        <div className={styles.heading}>
          <h4>{title}</h4>
        </div>
        {handleFunc && (
          <button className={styles.edit} onClick={() => handleFunc(data)}>
            Edit
          </button>
        )}
        {data.image && (
          <div className={styles.avatar}>
            <img src={data.image} />
          </div>
        )}
        {/* <p>{JSON.stringify(data)}</p> */}
        <div className={styles.content}>
          <div className={styles.statWrapper}>
            <div className={styles.stat}>
              <p>
                {data.tasks &&
                  data.tasks.reduce((acc, task) => {
                    if (task.completedUsers.length) {
                      acc += 1;
                    }
                    return acc;
                  }, 0)}
              </p>
              <h6>Completed</h6>
            </div>
            <div className={styles.stat}>
              {data.tasks && <p>{data.tasks.length}</p>}
              <h6>Total</h6>
            </div>
          </div>
          <ul>
            {data.tasks &&
              data.tasks.map((task, index) => (
                <ListItem
                  key={index}
                  id={task.id}
                  title={task.title}
                  completed={task.completedUsers.length}
                />
              ))}
          </ul>
        </div>
        <div className={styles.progressBar}>
          <ProgressBar
            progress={
              data.tasks
                ? data.tasks.reduce((acc, task) => {
                    if (task.completedUsers.length) {
                      acc += 1;
                    }
                    return acc;
                  }, 0) / data.tasks.length
                : 0
            }
          />
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

function ListItem({ title, id, completed }) {
  const [checked, setChecked] = useState(completed);
  function handleClick() {
    if (checked) {
      setChecked(false);
      axios.delete(`/api/goal/${id}`);
    } else {
      setChecked(true);
      axios.patch(`/api/goal/${id}`);
    }

    console.log('Toggling');
  }
  return (
    <li>
      <input onClick={handleClick} type="checkbox" defaultChecked={checked} />
      <p>{title}</p>
    </li>
  );
}

ListItem.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.string
};
