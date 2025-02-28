import { View, Text } from 'react-native'
import React from 'react'
import { Map, DataPosDetail } from '../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MapScreen: undefined;
  DataPosDetailScreen: {id: string, name: string};
};

const MapNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
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
      <Stack.Screen
        name='DataPosDetailScreen'
        component={DataPosDetail}
      />
    </Stack.Navigator>
  )
}

export default MapNavigator