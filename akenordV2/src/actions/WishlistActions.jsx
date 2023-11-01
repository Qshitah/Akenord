import axios from 'axios';
import { useEffect } from 'react';

// Define action types
export const WISHLIST_SUCCESS = 'WISHLIST_SUCCESS';
export const WISHLIST_FAILED = 'WISHLIST_FAILED';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';


// Action creator for successful login
export const wishlistSucess = (wishlists) => ({
  type: WISHLIST_SUCCESS,
  payload: wishlists,

});

// Action creator for login failure
export const wishlistFailed = (error) => ({
  type: WISHLIST_FAILED,
  payload: error,
});

export const addToWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: product,
  };
};

export const removeFromWishlist = (productName) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: { name : productName },
  };
};


// Action to initiate the login process
export const wishlists = (userData) => {

  
  return async (dispatch) => {
    try {
      // Make an API request to your backend for authentication
      const response = await axios.post(`http://localhost:8080/api/wishlists/${userData.username}/products`,userData);


      // Dispatch a success action with user data
      dispatch(wishlistSucess(response.data));
      
    } catch (error) {

      if (error.response) {
        dispatch(wishlistFailed(error.response.data));
      } else {
        console.log('Network error:', error.message);
        dispatch(wishlistFailed('Network error occurred.'));
      }
    }
  };
};





