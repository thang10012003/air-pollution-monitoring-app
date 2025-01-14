import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Auth/Login';
import Intro from "./screens/Auth/Intro"
import Navigator from './navigation'
import { useEffect, useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import AuthNavigator from './navigation/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './redux/store';




export default function App() {
  
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowSplash(false);
    },1500);
    return () => clearTimeout(timeOut);
  }, []);


  return (
    <Provider store={store}>
      {isShowSplash ? <SplashScreen/> : (
        <AuthNavigator/>
      )
      }
    </Provider>
      // <Navigator/>  
  //   <NavigationContainer>
  //   <AuthNavigator/>

  // </NavigationContainer>
    // <Navigator/>
    // <LoginScreen/>
    // <Intro></Intro>
    // <View>
    // {/* </View> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
