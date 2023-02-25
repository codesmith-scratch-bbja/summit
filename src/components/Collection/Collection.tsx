import React, { useEffect, useState } from 'react';
import styles from './Collection.module.css';
import { PathWidget, HorizontalScroll } from '..';

import { Goal } from '../../types/types';

interface CollectionProps {
  spires: Goal[];
  lastChild?: React.ReactNode;
  setActiveGoal?: (goal: Goal) => void;
  handleFunc?: (goal: Goal) => void;
}

function Collection({
  spires,
  lastChild,
  setActiveGoal,
  handleFunc
}: CollectionProps) {
  return (
    <div className={styles.wrapper}>
      <HorizontalScroll>
        {spires.map((spire, index) => (
          <PathWidget
            key={index}
            id={spire.id}
            title={spire.title}
            tasks={spire.tasks || []}
            image={spire.image}
            complete={spire.complete}
            // setActiveGoal={setActiveGoal ? setActiveGoal : () => {}}
            // handleFunc={handleFunc}
          />
        ))}
        {lastChild}
      </HorizontalScroll>
    </div>
  );
}

export default Collection;
