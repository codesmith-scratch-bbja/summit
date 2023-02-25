import axios from 'axios';
import { Goal } from '../types/types';

export const fetchSessionQuery = () => ({
  queryKey: ['session'],
  queryFn: async () => {
    const response = await axios(`/api/users/self`);
    return response.data;
  },
  refetchOnWindowFocus: false,
  staleTime: 1000,
  placeholderData: {
    name: null,
    avatarUrl: 'https://i.imgur.com/6cQJZ0X.png',
    id: '1'
  }
});

export const fetchSelfQuery = () => ({
  queryKey: ['self'],
  queryFn: async () => {
    const response = await axios('/api/goals');
    return response.data.activeGoals;
  },
  placeholderData: Array(3).fill({ title: 'Loading!!!', tasks: [] }),
  staleTime: 1000 * 60 * 60 * 24
});

export const fetchFriendsQuery = () => ({
  queryKey: ['friends'],
  queryFn: async () => {
    console.log('friends queryFn called');
    const response = await axios('/api/goals/friends');
    const goalArray = [] as Goal[];

    response.data.forEach((user) => {
      user.activegoals.forEach((goal: Goal) => {
        goalArray.push({ ...goal, image: user.image });
      });
    });
    return goalArray;
  },
  staleTime: 1000 * 60 * 20
});

export const fetchTrendingQuery = () => ({
  queryKey: ['trending'],
  queryFn: async () => {
    const response = await axios('/api/goals/trending');
    return response.data;
  },
  staleTime: 1000 * 60 * 20
});

export const fetchProfileQuery = (username: string) => ({
  queryKey: ['profile', username],
  queryFn: async () => {
    const response = await axios(`/api/users/${username}`);
    return response.data;
  },
  refetchOnWindowFocus: false,
  staleTime: 1000 * 10
});
