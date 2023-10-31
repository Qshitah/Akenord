import {
  USER_SUCCESS,
  USER_FAILED,
  USER_UPDATED,
} from "../actions/UserActions";

const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case USER_FAILED:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    
    case USER_UPDATED:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
