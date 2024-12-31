import { View, Text } from 'react-native'
import React from 'react'
import { History } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HistoryNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='HistoryScreen'
        component={History}
      />
    </Stack.Navigator>
  )
}

export default HistoryNavigator