import React from 'react';
import styles from './ProfilePic.module.css';

function ProfilePic() {
  // Get the user's profile pic from local storage
  // If it doesn't exist, render a sign in button
  const profilePic = localStorage.getItem('profilePic');

  return (
    <img
      src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
      className={styles.wrapper}
    />
  );
}

export default ProfilePic;
