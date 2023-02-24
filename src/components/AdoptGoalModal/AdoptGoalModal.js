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
        <Dialog.Title>Adopt Spire</Dialog.Title>
        <Dialog.Description style={{ color: 'gray' }}>
          <p>This will add this spire's scaffolding to your profile!</p>
          <p>Are you sure?</p>
        </Dialog.Description>
        <button className={styles.cancel} onClick={() => setIsOpen(false)}>
          Cancel
        </button>
        <button className={styles.add} onClick={adoptGoal}>
          Add
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
