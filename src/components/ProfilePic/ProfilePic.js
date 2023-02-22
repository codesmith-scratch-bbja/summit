import React from 'react';
import styles from './ProfilePic.module.css';

function ProfilePic() {
  // Get the user's profile pic from local storage
  // If it doesn't exist, render a sign in button
  const avatarURL = localStorage.getItem('avatarURL');

  return <img src={avatarURL} className={styles.wrapper} />;
}

export default ProfilePic;
