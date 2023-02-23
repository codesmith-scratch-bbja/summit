import React from 'react';
import { GoalTitle, GoalDescription, Task } from '../../components';
import styles from './Goal.module.css';
import PropTypes from 'prop-types';

// eventually replace fake goal data with api using id
export default function Goal({ activeGoal, setActiveGoal }) {
  console.log('ACTIVE', activeGoal);
  return ( 
    <div> 
      <div>
        <button onClick={() => setActiveGoal(null)}> X </button>
        <GoalTitle title={activeGoal.title} />
        <GoalDescription description={activeGoal.description} />
        <div>
          {activeGoal.tasks.map((taskObj) => (
            <Task
              key={taskObj.title}
              title={taskObj.title}
              completed={taskObj.completedUsers.length === 0 ? true : false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Goal.propTypes = {
  activeGoal: PropTypes.object,
  setActiveGoal: PropTypes.func
};
