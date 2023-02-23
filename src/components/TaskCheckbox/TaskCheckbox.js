import React from 'react';
import styles from './TaskCheckbox.module.css';

// Should accept a boolean
// maybe need to add name & value attributes later
function TaskCheckbox(props) {
    return <input type='checkbox' id={styles.checkbox} />
}

export default TaskCheckbox;