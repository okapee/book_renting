import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { Auth, API } from 'aws-amplify';

const initialState = {
  authenticated: undefined,
  username: undefined,
  userId: undefined,
  age: undefined,
  organization: undefined,
};

export const login = createAsyncThunk(
  'login',
  async (req, thunkAPI) => {
    try {
      if (req.username === null) {
        const response = await Auth.currentorganizationUser();
        const username = response?.username;
        const age = response?.age;
        const userId = response?.userId;
        const organization = response?.organization;
        return { username, age, userId, organization };
      } else {
        const username = req?.username;
        const age = req?.age;
        const userId = req?.userId;
        const organization = req?.organization;
        return { username, age, userId, organization };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//TODO: reducersを修正;
export const authSlice = createSlice({
  name: 'mngAuth',
  initialState,
  reducers: {
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.age = action.payload.age;
        state.organization = action.payload.organization;
      });
      builder.addCase(login.rejected, (state, action) => {
        state.error = action.error;
      });
    //   builder.addCase(logout.fulfilled, (state) => {
    //     state.organization = initialState.organization;
    //     state.username = initialState.username;
    //     state.age = initialState.age;
    //   });
    //   builder.addCase(logout.rejected, (state, action) => {
    //     state.error = action.error;
    //   });
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
