import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard, DataDetail } from '../../screens';

export type SensorData = {
  CO: string;
  airQuality: string;
  humidity: string;
  id: string;
  longitude: string;
  latitude: string;
  rain: string;
  temperature: string;
  dust: string;
  evalute: string,
  time: string,
};
interface Location{
  district: string, 
  city: string,
}
export type RootStackParamList = {
  DashboardScreen: undefined;
  DataDetailScreen: { sensorData: SensorData, location: Location };
};

const DashboardNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
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