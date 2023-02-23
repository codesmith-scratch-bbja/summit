import React from 'react';
import styles from './AdoptGoalModal.module.css';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';

function AdoptGoalModal({ isOpen, setIsOpen, adoptGoal }) {
  //const [isOpen, setIsOpen] = useState(true);

  //const [count, setCount] = useState(0)

  return (
    //use static as={motion.div} for framer motion
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel className={styles.wrapper}>
        <Dialog.Title>Add Goal</Dialog.Title>
        <Dialog.Description>
          This will add a goal to your profile!
        </Dialog.Description>

        <p>Are you sure you want to add a goal to your profile?</p>

        <button className={styles.buttons} onClick={adoptGoal}>
          Add
        </button>
        <button className={styles.buttons} onClick={() => setIsOpen(false)}>
          Cancel
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}

export default AdoptGoalModal;

AdoptGoalModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  adoptGoal: PropTypes.func
};
