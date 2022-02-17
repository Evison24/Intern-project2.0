import { createSlice } from '@reduxjs/toolkit';

const initState = null;
const productsSlice = createSlice({
  name: 'products',
  initialState: initState,
  reducers: {
    onProductsFetch(_state, action) {
      return action.payload;
    },
  },
});
export const { onProductsFetch } = productsSlice.actions;
export default productsSlice.reducer;
