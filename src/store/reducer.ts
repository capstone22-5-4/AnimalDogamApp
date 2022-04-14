import { combineReducers } from 'redux';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// prevent type error in ts
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
