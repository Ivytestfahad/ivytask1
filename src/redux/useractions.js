
import axios from 'axios';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './actions';

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios.get('http://localhost:3000/')
      .then((response) => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};
