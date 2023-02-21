import React from 'react';
import SearchField from '../SearchField/SearchField';
import styles from './SearchFieldModal.module.css';

//only display modal if user is actively searching
function SearchFieldModal(isSearching) {
  if (isSearching) {
    return (
      <div className={styles.wrapper}>
        <h2> Search for a goal or create your own:</h2>
        <SearchField />
      </div>
    );
  } else {
    return null;
  }
}

export default SearchFieldModal;
