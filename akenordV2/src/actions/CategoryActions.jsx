import axios from "axios";

// Define action types
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_FAILED = "CATEGORY_FAILED";

// Action creator for successful login
export const categorySuccess = (categories) => ({
  type: CATEGORY_SUCCESS,
  payload: categories,
});

// Action creator for login failure
export const categoryFailed = (error) => ({
  type: CATEGORY_FAILED,
  payload: error,
});

// Action to initiate the login process
export const categories = () => {
  

  return async (dispatch) => {
    try {
      // Make an API request to your backend for authentication
      const response = await axios.get(
        "https://akenord.onrender.com/api/categories"
      );

      // Dispatch a success action with user data
      dispatch(categorySuccess(response.data._embedded.categories));
    } catch (error) {
      if (error.response) {
        dispatch(categoryFailed(error.response.data));
      } else {
        dispatch(categoryFailed("Network error occurred."));
      }
    }
  };
};
