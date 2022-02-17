import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/users/userSlice';
import cartReducer from './reducers/carts/cartSlice';
import productReducer from './reducers/products/productsSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
  },
});
