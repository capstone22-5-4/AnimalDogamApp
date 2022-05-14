import { createSlice } from '@reduxjs/toolkit';

export interface Photo {
  no: string;
  animalName: string;
  photo: string;
}

interface InitialState {
  photos: Photo[];
  otherPhotos: Photo[];
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
    loadOtherPhotos(state, action) {
      state.otherPhotos = action.payload.slice(1, undefined);
    },
  },
  extraReducers: (builder) => {},
});

export default photoSlice;
