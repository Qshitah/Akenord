import axios from 'axios';

// Define action types
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILED = 'PRODUCTS_FAILED';

// Action creator for successful login
export const productSuccess = (products) => ({
  type: PRODUCTS_SUCCESS,
  payload: products,

});

// Action creator for login failure
export const productFailed = (error) => ({
  type: PRODUCTS_FAILED,
  payload: error,
});


// Action to initiate the login process
export const products = () => {
  
  return async (dispatch) => {
    try {

      // Make an API request to your backend for authentication
      const response = await axios.get("http://localhost:8080/api/products?page=0&size=1000");


      // Dispatch a success action with user data
      dispatch(productSuccess(response.data));
      
    } catch (error) {

      if (error.response) {
        dispatch(productFailed(error.response.data));
      } else {
        console.log('Network error:', error.message);
        dispatch(productFailed('Network error occurred.'));
      }
    }
  };
};



