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
import Habitat from './src/pages/Habitat';
import FeedShop from './src/pages/FeedShop';
import MainStackNavigator from './src/components/MainStackNavigator';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';
import CustomDrawer from './src/components/CustomDrawer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
  Habitat: undefined;
  FeedShop: undefined;
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
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            drawerLabelStyle: {
              marginLeft: -20,
              fontFamily: 'OneMobileRegular',
              fontSize: 15,
            },
            drawerActiveBackgroundColor: '#F97500',
            drawerActiveTintColor: 'white',
            drawerInactiveTintColor: '#333',
          }}
        >
          <Drawer.Screen
            name="메인"
            component={MainStackNavigator}
            options={{
              title: '홈',
              headerShown: false,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="home" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="나의 도감"
            component={Dogam}
            options={{
              headerShown: true,
              unmountOnBlur: true,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="book" size={20} color={color} />
              ),
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'OneMobileBold',
              },
            }}
          />
          <Drawer.Screen
            name="랭킹"
            component={Ranking}
            options={{
              headerShown: true,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="medal" size={20} color={color} />
              ),
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'OneMobileBold',
              },
            }}
          />
          <Drawer.Screen
            name="일일 퀘스트"
            component={Quest}
            options={{
              headerShown: true,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="list" size={20} color={color} />
              ),
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'OneMobileBold',
              },
              unmountOnBlur: true,
            }}
          />
          <Drawer.Screen
            name="업적"
            component={Achievement}
            options={{
              headerShown: true,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="crown" size={20} color={color} />
              ),
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'OneMobileBold',
              },
            }}
          />
          <Drawer.Screen
            name="상점"
            component={FeedShop}
            options={{
              headerShown: true,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="store" size={20} color={color} />
              ),
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'OneMobileBold',
              },
              unmountOnBlur: true,
            }}
          />
          <Drawer.Screen
            name="서식지도"
            component={Habitat}
            options={{
              headerShown: true,
              drawerIcon: ({ color }) => (
                <FontAwesome5Icon name="map" size={20} color={color} />
              ),
              unmountOnBlur: true,
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'OneMobileBold',
              },
            }}
          />
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
