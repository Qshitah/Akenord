import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/AuthActions";

const initialState = {
  user: null,
  error: null,
  session: null,
  register: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: action.payload,
        error: null,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        register: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
