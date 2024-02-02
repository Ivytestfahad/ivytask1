// src/AddTask.js
import React, { useState } from 'react';

const AddTask = ({ onAddTask, onCancel }) => {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
    onAddTask(task);
    setTask('');
    // Call onCancel to hide the AddTask component after submitting
    onCancel();
  };

  const handleCancel = () => {
    setTask('');
    // Call onCancel to hide the AddTask component
    onCancel();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChange} />
        <button type="submit">AddTask</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTask;
