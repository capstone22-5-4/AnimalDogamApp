import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import AnimalUpload from '../pages/AnimalUpload';
import Dogam from '../pages/Dogam';
import Achievement from '../pages/Achievement';
import { Alert, Pressable, Text } from 'react-native';

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
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
