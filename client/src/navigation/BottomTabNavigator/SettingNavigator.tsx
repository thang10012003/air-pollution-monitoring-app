import { View, Text } from 'react-native'
import React from 'react'
import { Setting,Threshold } from '../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SettingScreen: undefined;
  ThresholdScreen: {id: string};
};
const SettingNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
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
      <Stack.Screen
        name='ThresholdScreen'
        component={Threshold}
      />
    </Stack.Navigator>
  )
}

export default SettingNavigator