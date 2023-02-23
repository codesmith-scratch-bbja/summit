import React from 'react';
import { GoalTitle, GoalDescription, Task } from '../../components';
import styles from './Goal.module.css'; 


// eventually replace fake goal data with api using id
export default function Goal({activeGoal, setActiveGoal}) {
    const goal = {
        createdAt: 'March 7th',
        title: 'Learn React Hooks',
        description: 'Learn how react hooks work',
        id: 14,
        completed: false,       
        tasks: [       
            // only one user .... is completedUsers.length === 0?  Then it is an active task.  If not, a task that needs to be completed
            {title: 'Read documentation', completedUsers: [{name: "burg"}], activeUsers: [], goalID: 14},
            {title: 'Practice making hooks', completedUsers: [], activeUsers: [{name: "burg"}], goalID: 14},
        ]
    } 
  
    return (
        <div className={styles.goalWindow}>
            <div className={styles.inner}>
            <p> { activeGoal } </p>
            <button onClick={() => setActiveGoal(null)}> X </button>
            <GoalTitle title={goal.title}/>
            <GoalDescription description={goal.description}/>
            <div> 
                {goal.tasks.map(taskObj => (
                    <Task 
                    title={taskObj.title}
                    completed={taskObj.completedUsers.length === 0 ? true : false}
                    />
                ))}
            </div>
            </div>
        </div>
    )


} 
  

 