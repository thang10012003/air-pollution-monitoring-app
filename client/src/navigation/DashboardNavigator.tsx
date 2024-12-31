import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard } from '../screens';

const DashboardNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='DashboardScreen'
        component={Dashboard}
      />
    </Stack.Navigator>
  )
}

export default DashboardNavigator