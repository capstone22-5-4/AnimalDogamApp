import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import AnimalUpload from '../pages/AnimalUpload';
import Dogam from '../pages/Dogam';
import Achievement from '../pages/Achievement';
import { Pressable, Text } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

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
              <Text>Menu</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="AnimalUpload" component={AnimalUpload} />
      <Stack.Screen name="Dogam" component={Dogam} />
      <Stack.Screen name="Achievement" component={Achievement} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
