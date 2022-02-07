import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/users/userSlice';
import cartReducer from './reducers/carts/cartSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
