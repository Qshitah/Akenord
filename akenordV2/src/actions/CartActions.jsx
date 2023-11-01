import axios from "axios";
import { useEffect } from "react";

// Define action types
export const CART_SUCCESS = "CART_SUCCESS";
export const CART_FAILED = "CART_FAILED";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ALL = "REMOVE_ALL";

// Action creator for successful login
export const cartSuccess = (carts) => ({
  type: CART_SUCCESS,
  payload: carts,
});

// Action creator for login failure
export const cartFailed = (error) => ({
  type: CART_FAILED,
  payload: error,
});

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productName) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { name: productName },
  };
};

export const removeAll = () => {
  return {
    type: REMOVE_ALL,
  };
};

// Action to initiate the login process
export const carts = (userData) => {
  return async (dispatch) => {
    try {
      // Make an API request to your backend for authentication
      const response = await axios.post(
        `http://localhost:8080/api/carts/${userData.username}/products`,
        userData
      );

      // Initialize an array to store the structured cart items
      const cartItems = [];

      // Iterate through the list of cart items and convert each string into an object
      response.data.forEach((cartItemString) => {
        const [name, quantity, size, color,id] = cartItemString.split(" - ");

        // Create an object for each cart item
        const cartItem = {
          name: name.split(" - ")[0],
          quantity: parseInt(quantity.split(": ")[1]),
          size: size.split(": ")[1],
          color: color.split(": ")[1],
          id: id.split(": ")[1],
        };
        // Push the cart item object into the cartItems array
        cartItems.push(cartItem);
      });

      console.log(cartItems);


      // Dispatch a success action with user data
      dispatch(cartSuccess(cartItems));
    } catch (error) {
      if (error.response) {
        dispatch(cartFailed(error.response.data));
      } else {
        console.log("Network error:", error.message);
        dispatch(cartFailed("Network error occurred."));
      }
    }
  };
};
