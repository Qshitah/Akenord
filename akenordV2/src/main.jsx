import React from 'react'
import ReactDOM from 'react-dom/client'
import subCategoryReducer from './reducer/subCategoryReducer.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productReducer from './reducer/productReducer.jsx';
import authReducer from './reducer/authReducer.jsx';
import wishlistReducer from './reducer/wishlistReducer.jsx';
import cartReducer from './reducer/cartReducer.jsx';
import userReducer from './reducer/userReducer.jsx';
import App from './App';
import Email from './components/Email/Email';
import orderReducer from './reducer/orderReducer';
import categoryReducer from './reducer/categoryReducer.jsx';

const rootReducer = {
  subCategory: subCategoryReducer,
  category: categoryReducer,
  products: productReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer
};

const store = configureStore(
    {
        reducer : rootReducer
    }
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
