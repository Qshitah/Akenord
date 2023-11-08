import axios from 'axios';
import { useEffect } from 'react';

// Define action types
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ADD_TO_ORDER = 'ADD_TO_ORDER';



// Action creator for successful login
export const orderSuccess = (orders) => ({
  type: ORDER_SUCCESS,
  payload: orders,

});

// Action creator for login failure
export const orderFailed = (error) => ({
  type: ORDER_FAILED,
  payload: error,
});

export const addToOrder = (order) => {
  return {
    type: ADD_TO_ORDER,
    payload: order,
  };
};



// Action to initiate the login process
export const orders = (userData) => {
  
  return async (dispatch) => {
    try {
      // Make an API request to your backend for authentication
      const response = await axios.post(`https://akenord.onrender.com/api/orders/${userData.username}`,userData);


      // Dispatch a success action with user data
      dispatch(orderSuccess(response.data));
      
    } catch (error) {

      if (error.response) {
        dispatch(orderFailed(error.response.data));
      } else {
        console.log('Network error:', error.message);
        dispatch(orderFailed('Network error occurred.'));
      }
    }
  };
};





