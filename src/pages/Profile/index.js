import React from 'react';
import { useState } from 'react';
import {
  HorizontalScroll,
  PathWidget,
  Collection,
  SearchFieldModal
} from '../../components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const avatarURL = searchParams.get('avatar');

  if (!localStorage.getItem('avatarURL'))
    localStorage.setItem('avatarURL', avatarURL);

  const [isSearching, setIsSearching] = useState(false);
  const { isLoading, error, data } = useQuery('goalData', async () => {
    const response = await axios('/api/goal');
    return response.data;
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const toggleModal = () => {
    console.log('Toggling');
    setIsSearching(!isSearching);
  };

  function postNewGoal(goal) {
    toggleModal();
    axios.post('/api/goal', { title: goal });
  }

  return (
    <main>
      <Collection>
        <HorizontalScroll>
          {data &&
            data.map((boulder, index) => (
              <AnimatePresence>
                <motion.div
                  initial={{ x: -200 }}
                  animate={{ x: 0 }}
                  key={index}
                >
                  <PathWidget
                    key={boulder.id}
                    title={boulder.title}
                    data={boulder}
                    complete={0.5}
                  />
                </motion.div>
              </AnimatePresence>
            ))}
          <PathWidget toggleModal={toggleModal} />
        </HorizontalScroll>
      </Collection>
      <Collection></Collection>
      {isSearching && <SearchFieldModal submitFunc={postNewGoal} />}
    </main>
  );
}
