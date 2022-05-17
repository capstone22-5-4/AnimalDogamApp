import { combineReducers } from 'redux';

import userSlice from '../slices/user';
import photoSlice from '../slices/photo';
import lessAnimalSlice from '../slices/lessAnimal';
import foodSlice from '../slices/food';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  photo: photoSlice.reducer,
  lessAnimal: lessAnimalSlice.reducer,
  food: foodSlice.reducer,
});

// prevent type error in ts
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
