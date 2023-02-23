import React from 'react';
import styles from './SearchFieldModal.module.css';
import { useState } from 'react'; 
// import e from 'express';

function SearchFieldModal({ submitFunc }) {
  const [searchInput, setSearchInput] = useState('');
  const [taskList, setTaskList] = useState([]);
  

  function addTask(e) {
    e.preventDefault();
    setTaskList([ 
                ...taskList, 
                <> <label htmlFor={`Task ${taskList.length + 1}`}> Task {taskList.length + 1} </label>
                  <input type="text" name={`Task ${taskList.length + 1}`} /><br/> </> 
                ])
  }

  function removeTask(e) {
    e.preventDefault();
    setTaskList([ 
                ...taskList.slice(0, taskList.length - 1)
                ])
  }
  
  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submitFunc(searchInput);
        }}
      >
        <label htmlFor="goal"> Goal </label>
        <input
          type="text"
          name="goal"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <br/>
        {/* <button onClick={() => setTaskList(taskList.push( <> <label htmlFor={`Task ${++i}`}> Task {i} </label>
        <input type="text" name={`Task ${i}`} /><br/> </> ))}> add task </button> */}
        <button onClick={addTask}> add task </button> 
        <button onClick={removeTask}> remove task</button>
        {taskList}
        <button type="submit">Add New Goal</button>
      </form>
    </div>
  );
}

export default SearchFieldModal;
