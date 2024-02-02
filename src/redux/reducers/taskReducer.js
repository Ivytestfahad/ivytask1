import { ADD_TASK } from '../type';

// Load initial state from localStorage or use default state
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTask = action.payload;
      const updatedTasks = [...state.tasks, newTask];
      
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;
