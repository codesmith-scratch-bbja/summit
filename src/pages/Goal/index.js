import React from 'react';
import { GoalTitle, GoalDescription } from '../../components';
import styles from './Goal.module.css';

export default function Goal() {
    const goal = {
        title: 'Learn React Hooks',
        description: 'Learn how react hooks work',
        tasks: [
            {title: 'Read the documentation', completed: false},
            {title: 'Practice making hooks', completed: false},
        ]
    }
 
    return (
        <div>
            <GoalTitle title={goal.title}/>
            <GoalDescription description={goal.description}/>
        </div>
    )


}
  

 