
import { ADD_TASK } from './type';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './type';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});