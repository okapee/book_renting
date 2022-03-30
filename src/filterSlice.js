import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '全ての本',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    allbook: (state) => {
      state.value = '全ての本';
    },
    sameage: (state) => {
      state.value = '同年代の人が読んでいる本(今後実装予定)';
    },
    mybook: (state) => {
      state.value = '自分の本';
    },
  },
});

export const { allbook, sameage, mybook } = filterSlice.actions;
export default filterSlice.reducer;
