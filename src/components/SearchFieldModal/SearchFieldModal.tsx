import React, { useState } from 'react';
import styles from './SearchFieldModal.module.css';
import { useAtom, atom } from 'jotai';

interface SearchFieldModalProps {
  submitFunc: (data: { title: string; tasks: { title: string }[] }) => void;
}

const taskListAtom = atom<Array<string>>([]);

function SearchFieldModal({ submitFunc }: SearchFieldModalProps) {
  const [goalTitle, setGoalTitle] = useState('');
  const [taskTitle, setTaskTitle] = useState('');

  const [taskList, setTaskList] = useAtom(taskListAtom);

  function goalSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('goal submit');
    const taskObjects = taskList.map((task) => ({ title: task }));
    submitFunc({ title: goalTitle, tasks: taskObjects });
  }

  function taskSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTaskList([...taskList, taskTitle]);
    setTaskTitle('');
  }

  return (
    <article className={styles.wrapper}>
      <form id="newGoal" onSubmit={goalSubmit}>
        <input
          type="text"
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
        />
        <button form="newGoal" type="submit">
          Add Goal
        </button>
      </form>
      <form id="newTask" onSubmit={taskSubmit}>
        <input
          form="newTask"
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button form="newTask" type="submit">
          Add Task
        </button>
      </form>
      <TaskList taskList={taskList} />
    </article>
  );
}

export default SearchFieldModal;

function TaskList({ taskList }: { taskList: Array<string> }) {
  return (
    <ul style={{ listStyle: 'none' }}>
      {taskList.map((task, index) => (
        <TaskInput index={index} text={task} />
      ))}
    </ul>
  );
}

function TaskInput({ text, index }: { text: string; index: number }) {
  const [inputActive, setInputActive] = useState(false);

  const [taskList, setTaskList] = useAtom(taskListAtom);

  return (
    <li>
      <input
        disabled={!inputActive}
        type="text"
        value={taskList[index]}
        onChange={(e) => {
          const editedArray = [...taskList];
          editedArray[index] = e.target.value;
          setTaskList(editedArray);
        }}
      />
      <button onClick={() => setInputActive(!inputActive)}>Edit</button>
    </li>
  );
}
