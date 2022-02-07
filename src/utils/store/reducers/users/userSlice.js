import { createSlice } from '@reduxjs/toolkit';
import TokenManager from '../../../helpers/TokenManager';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onUserLogin(_state, action) {
      return action.payload;
    },
    onUserLogout(_state) {
      TokenManager.clearToken();
      return null;
    },
  },
});
export const { onUserLogin, onUserLogout } = userSlice.actions;
export default userSlice.reducer;
