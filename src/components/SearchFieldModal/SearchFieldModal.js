import React from 'react';
import styles from './SearchFieldModal.module.css';
import { useState } from 'react';

function SearchFieldModal({ submitFunc }) {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submitFunc(searchInput);
        }}
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Add New Goal</button>
      </form>
    </div>
  );
}

export default SearchFieldModal;
