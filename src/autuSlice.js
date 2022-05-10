import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: undefined,
  username: undefined,
  age: undefined,
  organization: undefined,
};

//TODO: reducersを修正;
export const authSlice = createSlice({
  name: 'mngAuth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;