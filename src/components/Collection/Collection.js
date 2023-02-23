import React from 'react';
import styles from './Collection.module.css';
import { PathWidget, HorizontalScroll } from '../../components';
import PropTypes from 'prop-types';

function Collection({ spires, title, lastChild }) {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>{title}</h4>
      <HorizontalScroll>
        {spires.map((spire, index) => (
          <PathWidget
            // CHANGE THIS KEY
            key={index}
            title={spire.title}
            complete={spire.complete}
            data={spire}
          />
        ))}
        {lastChild && lastChild}
      </HorizontalScroll>
    </div>
  );
}

export default Collection;

Collection.propTypes = {
  spires: PropTypes.array,
  title: PropTypes.string,
  lastChild: PropTypes.node
};
