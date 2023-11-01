import { CATEGORY_SUCCESS,CATEGORY_FAILED} from "../actions/CategoryActions";


const initialState = {
  categories: [],
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    case CATEGORY_FAILED:
      return {
        ...state,
        categories: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
