import axios from 'axios';
import { useEffect } from 'react';

// Define action types
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const USER_UPDATED = 'USER_UPDATED';


// Action creator for successful login
export const userSuccess = (user) => ({
  type: USER_SUCCESS,
  payload: user,

});

// Action creator for login failure
export const userFailed = (error) => ({
  type: USER_FAILED,
  payload: error,
});

export const userUpdated = (user) => ({
  type: USER_UPDATED,
  payload: user,
});

// Action to initiate the login process
export const users = (userData) => {

  
  return async (dispatch) => {
    try {
      // Make an API request to your backend for authentication
      const response = await axios.post(`http://localhost:8080/api/users/${userData.username}`,userData);


      // Dispatch a success action with user data
      dispatch(userSuccess(response.data));
      
    } catch (error) {

      if (error.response) {
        dispatch(userFailed(error.response.data));
      } else {
        console.log('Network error:', error.message);
        dispatch(userFailed('Network error occurred.'));
      }
    }
  };
};





