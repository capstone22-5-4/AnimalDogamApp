import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import Dogam from './src/pages/Dogam';
import Ranking from './src/pages/Ranking';
import Quest from './src/pages/Quest';
import Achievement from './src/pages/Achievement';
import Setting from './src/pages/Setting';
import MainStackNavigator from './src/components/MainStackNavigator';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export type LoggedInParamList = {
  Home: undefined;
  Dogam: undefined;
  AnimalUpload: undefined;
  Ranking: undefined;
  Quest: undefined;
  Acheivement: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="홈"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="나의 도감" component={Dogam} />
          <Drawer.Screen name="랭킹" component={Ranking} />
          <Drawer.Screen name="일일 퀘스트" component={Quest} />
          <Drawer.Screen name="업적" component={Achievement} />
          <Drawer.Screen name="설정" component={Setting} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: '회원가입' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
