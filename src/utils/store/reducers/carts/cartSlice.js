import { createSlice } from '@reduxjs/toolkit';

const initState = null;

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    onCartChange(_state, action) {
      return action.payload;
    },
  },
});
export const { onCartChange } = cartSlice.actions;
export default cartSlice.reducer;
