import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import AnimalUpload from '../pages/AnimalUpload';
import Dogam from '../pages/Dogam';
import Achievement from '../pages/Achievement';
import { Pressable, StyleSheet } from 'react-native';
import { LoggedInParamList } from '../../AppInner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeedShop from '../pages/FeedShop';

const Stack = createStackNavigator<LoggedInParamList>();

const MainStackNavigator = ({ navigation }) => {
  const toOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="홈"
        component={Home}
        options={{
          headerLeft: () => (
            <Pressable onPress={toOpenDrawer}>
              <FontAwesome5Icon
                name="bars"
                size={20}
                style={styles.openMenuIcon}
              />
            </Pressable>
          ),
          title: '홈',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OneMobileBold',
          },
        }}
      />
      <Stack.Screen
        name="AnimalUpload"
        component={AnimalUpload}
        options={{
          title: '동물 수집하기',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OneMobileBold',
          },
        }}
      />
      <Stack.Screen
        name="Dogam"
        component={Dogam}
        options={{
          title: '나의 도감',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OneMobileBold',
          },
        }}
      />
      <Stack.Screen
        name="Achievement"
        component={Achievement}
        options={{
          title: '업적',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OneMobileBold',
          },
        }}
      />
      <Stack.Screen
        name="FeedShop"
        component={FeedShop}
        options={{
          title: '상점',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OneMobileBold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({
  openMenuIcon: {
    paddingLeft: 20,
  },
});
