import React from 'react';
import styles from './ProfilePic.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';

function ProfilePic() {
  const {
    isLoading,
    error,
    data: avatarUrl
  } = useQuery('user', async () => {
    const response = await axios('/api/user/avatar');
    return response.data.image;
  });

  return <img src={avatarUrl} className={styles.wrapper} />;
}

export default ProfilePic;
