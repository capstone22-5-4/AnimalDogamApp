import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
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
  Achievement: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<LoggedInParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true); // 메인 서비스 화면을 보려면 임시로 state를 true로 변경할 것
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="Dogam" component={Dogam} />
          <Drawer.Screen name="Ranking" component={Ranking} />
          <Drawer.Screen name="Quest" component={Quest} />
          <Drawer.Screen name="Achievement" component={Achievement} />
          <Drawer.Screen name="Setting" component={Setting} />
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
