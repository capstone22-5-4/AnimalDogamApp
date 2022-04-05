import 'react-native-gesture-handler';
import React from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export type LoggedInParamList = {
  Home: undefined;
  홈: undefined;
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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email); // 이메일이 존재하면 로그인 한 것으로 가정(temp)
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

export default AppInner;
