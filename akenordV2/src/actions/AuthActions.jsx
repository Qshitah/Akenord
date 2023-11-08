import axios from 'axios';

// Define action types
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const SESSION_EMPTY = 'SESSION_EMPTY';
export const SESSION_NOT_EMPTY = 'SESSION_NOT_EMPTY';

// Action creator for successful login
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,

});

// Action creator for login failure
export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,

});

// Action creator for login failure
export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  payload: error,
});


// Action to initiate the login process
export const loginUser = (userData) => {
 
  
  return async (dispatch) => {
    try {

      // Make an API request to your backend for authentication
      const response = await axios.post("https://akenord.onrender.com/api/auth/login", userData);

      // Dispatch a success action with user data
      dispatch(loginUserSuccess(response.data));
      
    } catch (error) {

      if (error.response) {
        dispatch(loginUserFailure(error.response.data));
      } else {
        console.log('Network error:', error.message);
        dispatch(loginUserFailure('Network error occurred.'));
      }
    }
  };
};

export const register = (userData) => {

    return async (dispatch) => {
        try {
    
          // Make an API request to your backend for authentication
          const response = await axios.post("https://akenord.onrender.com/api/auth/register", userData);
    
          // Dispatch a success action with user data
          dispatch(registerSuccess(response.data));
          
        } catch (error) {
    
          if (error.response) {
            dispatch(registerFailed(error.response.data));
          } else {
            console.log('Network error:', error.message);
            dispatch(registerFailed('Network error occurred.'));
          }
        }
      };
};