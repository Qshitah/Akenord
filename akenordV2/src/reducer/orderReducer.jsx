import {
    ORDER_SUCCESS,
    ADD_TO_ORDER,
    ORDER_FAILED
  } from "../actions/OrderActions";
  
  const initialState = {
    orders: null,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_SUCCESS:
        return {
          ...state,
          orders: action.payload,
          error: null,
        };
      case ORDER_FAILED:
        return {
          ...state,
          orders: null,
          error: action.payload,
        };
      case ADD_TO_ORDER:
        return {
          ...state,
          orders: state.orders !== null ?  [...state.orders,action.payload] : [action.payload],
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  