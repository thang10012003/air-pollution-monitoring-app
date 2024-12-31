import { View, Text } from 'react-native'
import React from 'react'
import { Setting } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SettingNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='SettingScreen'
        component={Setting}
      />
    </Stack.Navigator>
  )
}

export default SettingNavigator