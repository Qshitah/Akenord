import {
  WISHLIST_SUCCESS,
  WISHLIST_FAILED,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/WishlistActions";

const initialState = {
  products: null,
  error: null,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };
    case WISHLIST_FAILED:
      return {
        ...state,
        products: null,
        error: action.payload,
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        products: state.products !== null ?  [...state.products,action.payload] : [action.payload],
        error: null,
      };
    case REMOVE_FROM_WISHLIST:
      const updatedProducts = state.products.filter(
        (product) => product !== action.payload.name
      );
      return {
        ...state,
        products: updatedProducts,
        error: null,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
