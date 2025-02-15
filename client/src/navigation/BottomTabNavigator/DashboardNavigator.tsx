import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard, DataDetail } from '../../screens';

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
      <Stack.Screen
        name='DataDetailScreen'
        component={DataDetail}
      />
    </Stack.Navigator>
  )
}

export default DashboardNavigator