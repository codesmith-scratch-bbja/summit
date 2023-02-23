import React, { useState } from 'react';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox';
import styles from './Task.module.css';
import PropTypes from 'prop-types';

//! https://www.freecodecamp.org/news/how-to-use-proptypes-in-react/
// should accept a title, completed
function Task({ title, completed }) {
    // const completed = props.completed;
    // const title = props.title;
    const [editedTitle, setEditedTitle] = useState(title);
    const [editable, setEditable] = useState(false);

    return ( <div> 
        <TaskCheckbox checked={completed}/>
        <input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} style={ editable ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}} />
        <button onClick={() => setEditable(!editable)}> Edit </button>
        
        {/* render title, completed, and checkbox component */}
    </div> );
} 

Task.propTypes = {
    completed : PropTypes.bool,
    title: PropTypes.string
  };

export default Task;