import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'allbook',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    allbook: (state) => {
      state.value = 'allbook';
    },
    sameage: (state) => {
      state.value = 'sameage';
    },
    sameorg: (state) => {
      state.value = 'sameorg';
    },
    mybook: (state) => {
      state.value = 'mybook';
    },
  },
});

export const { allbook, sameage, sameorg, mybook } = filterSlice.actions;
export default filterSlice.reducer;
