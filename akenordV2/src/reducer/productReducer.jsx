import { PRODUCTS_SUCCESS,PRODUCTS_FAILED} from "../actions/ProductActions";


const initialState = {
  products: null,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };
    case PRODUCTS_FAILED:
      return {
        ...state,
        products: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
