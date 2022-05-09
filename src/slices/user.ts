import { createSlice } from '@reduxjs/toolkit';

// 전역 상태(global state)
const initialState = {
  nickname: '',
  email: '',
  score: 0,
  credit: 0,
  //accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.score = action.payload.score;
      state.credit = action.payload.credit;
      //state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
