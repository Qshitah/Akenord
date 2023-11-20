import {
    CART_SUCCESS,
    CART_FAILED,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL
  } from "../actions/CartActions";
  
  const initialState = {
    products: null,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case CART_SUCCESS:
        return {
          ...state,
          products: action.payload,
          error: null,
        };
      case CART_FAILED:
        return {
          ...state,
          products: null,
          error: action.payload,
        };
      case ADD_TO_CART:
        console.log(action.payload);
        return {
          ...state,
          products: state.products !== null ? [...state.products, action.payload] : [action.payload],
          error: null,
        };
      case REMOVE_FROM_CART:
        const updatedProducts = state.products.filter(
          (product,index) => product.id != action.payload.name
        );
        return {
          ...state,
          products: updatedProducts,
          error: null,
        };
      case REMOVE_ALL:
        return {
          ...state,
          products: [],
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  