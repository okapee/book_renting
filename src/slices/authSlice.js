import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { Auth, API } from 'aws-amplify';

const userSlice = createSlice({
  name:'auth',
  initialState: {
    user: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;