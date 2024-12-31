import { View, Text } from 'react-native'
import React from 'react'
import { Map } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MapNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='MapScreen'
        component={Map}
      />
    </Stack.Navigator>
  )
}

export default MapNavigator