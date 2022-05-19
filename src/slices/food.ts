import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  과일: 0,
  대나무: 0,
  물고기: 0,
  사료: 0,
  소고기: 0,
  지렁이: 0,
  풀: 0,
};
const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFood(state, action) {
      state.과일 = action.payload.과일;
      state.대나무 = action.payload.대나무;
      state.물고기 = action.payload.물고기;
      state.사료 = action.payload.사료;
      state.소고기 = action.payload.소고기;
      state.지렁이 = action.payload.지렁이;
      state.풀 = action.payload.풀;
    },
  },
  extraReducers: (builder) => {},
});

export default foodSlice;
