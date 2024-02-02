import React, { useState, useEffect } from 'react';
import AddTask from './addtask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [editableTaskIndex, setEditableTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    console.log('Stored tasks:', storedTasks);
    console.log('Stored completed tasks:', storedCompletedTasks);
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks or completedTasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const addTask = (task) => {
    setTasks([...tasks, { text: task, completed: false }]);
    setShowAddTask(false);
  };

  const completeTask = (taskIndex) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(taskIndex, 1)[0];
    completedTask.completed = true;
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(updatedTasks);
  };

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const handleEdit = (index) => {
    setEditableTaskIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleSave = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedTask;
    setTasks(updatedTasks);
    setEditableTaskIndex(null);
  };

  const handleCancelEdit = () => {
    setEditableTaskIndex(null);
  };

  return (
    <div>
      <h1>Add Tasks</h1>
      {showAddTask ? (
        <AddTask onAddTask={addTask} onCancel={() => setShowAddTask(false)} />
      ) : (
        <button onClick={() => setShowAddTask(true)}>Add New Task</button>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editableTaskIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  onClick={() => handleEdit(index)}
                >
                  {task.text}
                </span>
                {!task.completed && (
                  <button onClick={() => completeTask(index)}>Complete</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={toggleCompletedTasks}>Completed Tasks</button>
      {showCompletedTasks && (
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index} style={{ textDecoration: 'line-through' }}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
