import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authSlice.reducer,
  },
});
