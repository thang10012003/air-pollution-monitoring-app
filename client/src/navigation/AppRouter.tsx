import { View, Text } from 'react-native'
import React from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const AppRouter = () => {
    const {getItem} = useAsyncStorage('accessToken');
  return (
    <View>
      <Text>AppRouter</Text>
    </View>
  )
}

export default AppRouter