import React from 'react';
import styles from './Collection.module.css';
import { PathWidget, HorizontalScroll } from '../../components';

function Collection({ spires, title }) {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>{title}</h4>
      <HorizontalScroll>
        {spires.map((spire, index) => (
          <PathWidget
            key={spire.id}
            title={spire.title}
            complete={spire.complete}
          />
        ))}
      </HorizontalScroll>
    </div>
  );
}

export default Collection;
