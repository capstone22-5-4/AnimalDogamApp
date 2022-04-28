import { createSlice } from '@reduxjs/toolkit';
export interface InitialState {
  lessAnimalList: String[];
  lessAnimalNum: number;
}

const initialState: InitialState = {
  lessAnimalList: [],
  lessAnimalNum: 0,
};

const lessAnimalSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setLessAnimal(state, action) {
      state.lessAnimalList = action.payload;
      state.lessAnimalNum = action.payload.length;
    },
  },
  extraReducers: (builder) => {},
});

export default lessAnimalSlice;
