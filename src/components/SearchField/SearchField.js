import React from 'react';
import { useState } from 'react';
import styles from './SearchField.module.css';

function SearchField() {
  const [newGoal, setNewGoal] = useState('');
  return (
    <form className={styles.wrapper}>
      <input
        value={newGoal}
        onChange={(event) => {
          setNewGoal(event.target.value);
        }}
      />
      <button onClick={() => setNewGoal(newGoal)}>Submit</button>
    </form>
  );
}

export default SearchField;
