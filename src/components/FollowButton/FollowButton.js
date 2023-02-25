import React, { useState, useEffect } from 'react';
import styles from './FollowButton.module.css';
import PropTypes from 'prop-types';

function FollowButton({ toggleFollow, isFollowing }) {
  const initialText = isFollowing ? 'Following' : 'Follow';
  const [buttonText, setButtonText] = useState(initialText);

  useEffect(() => {
    setButtonText(isFollowing ? 'Following' : 'Follow');
  }, [isFollowing]);

  function mouseOver() {
    setButtonText(isFollowing ? 'Unfollow' : 'Follow');
  }

  function mouseOut() {
    setButtonText(isFollowing ? 'Following' : 'Follow');
  }

  return (
    <button
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      onClick={toggleFollow}
      className={`${styles.button} ${styles.pushable} ${
        buttonText === 'Unfollow'
          ? styles.unfollow
          : buttonText === 'Following'
          ? styles.following
          : null
      }`}
    >
      <span className={styles.edge}></span>
      <span className={styles.front}>{buttonText}</span>
    </button>
  );
}

export default FollowButton;

FollowButton.propTypes = {
  toggleFollow: PropTypes.func,
  isFollowing: PropTypes.bool
};
