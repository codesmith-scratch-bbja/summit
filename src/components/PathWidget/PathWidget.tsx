import React, { useState, FC } from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar, AdoptGoalModal } from '..';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Goal, Task } from '../../types/types';

interface PathWidgetProps extends Goal {
  toggleModal?: () => void;
  handleFunc?: (data: Goal) => void;
}

function PathWidget({
  complete,
  title,
  id,
  tasks,
  image,
  toggleModal,
  handleFunc
}: PathWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!complete && !tasks && !title)
    return (
      <div onClick={toggleModal} className={styles.wrapper}>
        <span style={{ margin: '0 auto' }}>+</span>
        <span style={{ margin: '0 auto' }}>Add a new path</span>
      </div>
    );

  const queryClient = useQueryClient();

  const completedTasks = tasks.reduce((acc, task) => {
    if (task.completed) acc += 1;
    return acc;
  }, 0);

  const adoptGoalMutation = useMutation(
    (adoptedGoal: { goalId: string }) => {
      return axios.post('/api/goals/adopt', adoptedGoal);
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('self');
      }
    }
  );

  function adoptGoal() {
    console.log(`Adopting goal ${id}`);
    adoptGoalMutation.mutate({ goalId: id });
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
          <button
            className={styles.edit}
            onClick={() =>
              handleFunc({
                complete,
                title,
                id,
                tasks
              })
            }
          >
            Edit
          </button>
        )}
        {image && (
          <div className={styles.avatar}>
            <img src={image} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.statWrapper}>
            <div className={styles.stat}>
              <p>{completedTasks}</p>
              <h6>Completed</h6>
            </div>
            <div className={styles.stat}>
              <p>{tasks.length}</p>
              <h6>Total</h6>
            </div>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <ListItem
                key={index}
                id={task.id}
                title={task.title}
                completed={task.completed}
              />
            ))}
          </ul>
        </div>
        <div className={styles.progressBar}>
          <ProgressBar progress={completedTasks / tasks.length} />
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

function ListItem({ title, id, completed }: Task) {
  const [checked, setChecked] = useState(completed);

  function handleClick() {
    if (checked) {
      setChecked(false);
      axios.delete(`/api/goals/${id}`);
    } else {
      setChecked(true);
      axios.patch(`/api/goals/${id}`);
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
