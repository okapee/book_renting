import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import userReducer from './slices/authSlice';
import userDataReducer from './slices/userDataSlice';

// sliceのreducerをstoreに登録することで各コンポーネントで情報の共有が可能
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: userReducer,
    userDataSlice: userDataReducer,
  },
});
