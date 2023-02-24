import React from 'react';
import { useState, useEffect } from 'react';
import {
  PathWidget,
  Collection,
  SearchFieldModal,
  Goal,
  Board,
  FollowButton,
  ProfilePic
} from '../../components';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, useQueries } from 'react-query';
import axios from 'axios';
import styles from './Profile.module.css';
import useStore from '../../store';

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export default function Profile() {
  const loggedInAs = getCookie('loggedInAs');
  const location = useLocation();
  const username = location.pathname.slice(1);

  const [activeGoal, setActiveGoal] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [following, setFollowing] = useState(false);
  const [ownProfile, setOwnProfile] = useState(false);

  useEffect(() => {
    if (loggedInAs === username) {
      setOwnProfile(true);
    }
  }, [loggedInAs, username]);

  const [publicQuery, privateQuery] = useQueries([
    {
      queryKey: 'public',
      queryFn: async () => {
        const response = await axios(`/api/user/${username}`);
        console.log(response.data);
        return response.data;
      },
      onSuccess: (data, variables, context) => {
        console.log('Publc data received');
        const { followedBy } = data;
        const isFollowing = followedBy.some((user) => user.name === loggedInAs);
        setFollowing(isFollowing);
      }
    },
    {
      queryKey: 'private',
      queryFn: async () => {
        console.log('Fetching private data');
        const response = await axios('/api/goal', {
          params: {
            username: username
          }
        });
        console.log('Private data', response.data);
        if (!response.data) return [];
        return response.data;
      }
    }
  ]);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newGoal) => {
      return axios.post('/api/goal', newGoal);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries();
      }
    }
  );

  const followMutation = useMutation(
    (userIdToFollow) => {
      return axios.post(`/api/user/follow/${userIdToFollow}`, {
        action: following ? 'unfollow' : 'follow'
      });
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('Toggling follow state');
        console.log(data.data);
        const { data: action } = data;
        setFollowing(action === 'follow');
      }
    }
  );

  const { isLoading, error, data } = publicQuery;

  const {
    isLoading: privateLoading,
    error: privateError,
    data: privateData
  } = privateQuery;

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  function toggleModal() {
    console.log('Toggling');
    setIsSearching(!isSearching);
  }

  function postNewGoal(goal) {
    toggleModal();
    mutation.mutate(goal);
  }

  function toggleFollow() {
    followMutation.mutate(data.id);
  }

  const addNew = <PathWidget toggleModal={toggleModal} />;

  return (
    <>
      <aside>
        {activeGoal && (
          <div className={styles.activeGoal}>
            <Goal activeGoal={activeGoal} setActiveGoal={setActiveGoal} />
          </div>
        )}
      </aside>
      <article className={styles.wrapper}>
        <div className={styles.userWrapper}>
          <ProfilePic avatarUrl={data.image} />
          <h1 style={{ color: 'white' }}>{username}</h1>
          {loggedInAs !== username && (
            <FollowButton toggleFollow={toggleFollow} isFollowing={following} />
          )}
        </div>
        <section className={styles.collection}>
          (
          <Collection
            spires={privateData ? privateData : data.activegoals}
            lastChild={ownProfile && addNew}
            handleFunc={(data) => setActiveGoal(data)}
          />
          )
        </section>
        {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
      </article>
    </>
  );
}
