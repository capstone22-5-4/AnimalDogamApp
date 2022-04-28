import { createSlice } from '@reduxjs/toolkit';

export interface Photo {
  no: string;
  animalName: string;
  photo: string;
}

interface InitialState {
  photos: Photo[];
}

const initialState: InitialState = {
  photos: [],
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    loadPhotos(state, action) {
      state.photos = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default photoSlice;
