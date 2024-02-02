import { createStore } from 'redux';
import rootReducer from './reducers';

// Load state from localStorage
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

console.log('Persisted State:', persistedState);

// Create store with persisted state
const store = createStore(rootReducer, persistedState);

// Save state to localStorage whenever it changes
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
