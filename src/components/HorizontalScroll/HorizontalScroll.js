import React from 'react';
import styles from './HorizontalScroll.module.css';
import PropTypes from 'prop-types';

function HorizontalScroll({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default HorizontalScroll;

HorizontalScroll.propTypes = {
  children: PropTypes.node.isRequired
};
