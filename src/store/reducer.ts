import { combineReducers } from 'redux';

import userSlice from '../slices/user';
import photoSlice from '../slices/photo';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  photo: photoSlice.reducer,
});

// prevent type error in ts
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
