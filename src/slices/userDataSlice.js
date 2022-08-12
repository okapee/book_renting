import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  // slice名
  name: 'userDataSlice',
  initialState: {
    userId: undefined,
    age: undefined,
    name: undefined,
    organization: undefined,
    profileImg: undefined,
  },
  // 内部のデータにアクセスするための処理(処理名：setUserInfo)
  reducers: {
    setUserData: (state, action) => {
      //payloadにkey-valueでユーザー情報を入れる
      state.userdata = action.payload;
    },
  },
});

// 外からインポートするためにactionとreducerをエクスポート
export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
