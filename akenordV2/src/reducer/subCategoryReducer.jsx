import { SUBCATEGORY_SUCCESS,SUBCATEGORY_FAILED} from "../actions/SubCategoryActions";


const initialState = {
  subCategories: [],
  error: null,
};

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBCATEGORY_SUCCESS:
      return {
        ...state,
        subCategories: action.payload,
        error: null,
      };
    case SUBCATEGORY_FAILED:
      return {
        ...state,
        subCategories: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subCategoryReducer;
