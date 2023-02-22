import React from 'react';
import styles from './Board.module.css';

function Board({ children }) {
  return <article className={styles.wrapper}>{children}</article>;
}

export default Board;
