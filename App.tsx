import * as React from 'react';
import { Provider } from 'react-redux';
import AppInner from './AppInner';
import store from './src/store';

export type LoggedInParamList = {
  Home: undefined;
  Dogam: undefined;
  AnimalUpload: undefined;
  Ranking: undefined;
  Quest: undefined;
  Achievement: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
