import React from 'react';
import styles from './ProfilePic.module.css';
import PropTypes from 'prop-types';

function ProfilePic({ avatarUrl }) {
  return <img src={avatarUrl} className={styles.wrapper} />;
}

export default ProfilePic;

ProfilePic.propTypes = {
  avatarUrl: PropTypes.string.isRequired
};
