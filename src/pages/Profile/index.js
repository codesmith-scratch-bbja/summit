import React from 'react';
import { useState, useEffect } from 'react';
import {
  PathWidget,
  Collection,
  SearchFieldModal,
  Goal,
  FollowButton,
  ProfilePic
} from '../../components';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import styles from './Profile.module.css';
import useStore from '../../stores/store';
import { fetchProfileQuery } from '../../queries';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    console.log('Calling loader!');
    const query = fetchProfileQuery(params.username);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function Profile() {
  const { username } = useParams();
  const [activeGoal, setActiveGoal] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const profile = useQuery(fetchProfileQuery(username));

  const queryClient = useQueryClient();

  const newGoalMutation = useMutation(
    (newGoal) => {
      return axios.post('/api/goals', newGoal);
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('New goal posted');
        queryClient.invalidateQueries();
      }
    }
  );

  const followMutation = useMutation(
    (userIdToFollow) => {
      return axios.post(`/api/users/follow/${userIdToFollow}`, {
        action: profile.data.isFollowing ? 'unfollow' : 'follow'
      });
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('Toggling follow state');
        console.log(data.data);
        const { data: action } = data;
        //setFollowing(action === 'follow');
        queryClient.invalidateQueries(fetchProfileQuery(username));
      }
    }
  );

  function toggleModal() {
    console.log('Toggling');
    setIsSearching(!isSearching);
  }

  function postNewGoal(goal) {
    console.log('Posting new goal', goal);
    toggleModal();
    newGoalMutation.mutate(goal);
  }

  function toggleFollow() {
    followMutation.mutate(profile.data.id);
  }

  const addNew = <PathWidget toggleModal={toggleModal} />;

  if (profile.isLoading) {
    return <div>Loading...</div>;
  }

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
          <ProfilePic avatarUrl={profile.data.image} />
          <h1 style={{ color: 'white' }}>{username}</h1>
          {!profile.data.isOwnProfile && (
            <FollowButton
              toggleFollow={toggleFollow}
              isFollowing={profile.data.isFollowing}
            />
          )}
        </div>
        <section className={styles.collection}>
          (
          <Collection
            spires={profile.data.activeGoals}
            lastChild={profile.data.isOwnProfile && addNew}
            handleFunc={(data) => setActiveGoal(data)}
          />
          )
        </section>
        {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
      </article>
    </>
  );
}
