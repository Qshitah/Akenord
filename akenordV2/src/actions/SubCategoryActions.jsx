import axios from "axios";

// Define action types
export const SUBCATEGORY_SUCCESS = "SUBCATEGORY_SUCCESS";
export const SUBCATEGORY_FAILED = "SUBCATEGORY_FAILED";

// Action creator for successful login
export const subCategorySuccess = (subcategories) => ({
  type: SUBCATEGORY_SUCCESS,
  payload: subcategories,
});

// Action creator for login failure
export const subCategoryFailed = (error) => ({
  type: SUBCATEGORY_FAILED,
  payload: error,
});

// Action to initiate the login process
export const subCategories = () => {
  

  return async (dispatch) => {
    try {
      // Make an API request to your backend for authentication
      const response = await axios.get(
        "http://localhost:8080/api/subCategories"
      );

      // Dispatch a success action with user data
      dispatch(subCategorySuccess(response.data._embedded.subCategories));
    } catch (error) {
      if (error.response) {
        dispatch(subCategoryFailed(error.response.data));
      } else {
        dispatch(subCategoryFailed("Network error occurred."));
      }
    }
  };
};
