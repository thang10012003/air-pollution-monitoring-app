import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainNavigation from '.';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../screens/SplashScreen';

const AppRouter = () => {
  const {getItem} = useAsyncStorage('auth');
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    checkLogin()
    const timeOut = setTimeout(() => {
      setIsShowSplash(false);
    },1500);
    return () => clearTimeout(timeOut);
  }, []);

  const checkLogin = async() =>{
    const res = await getItem();
    res && dispatch(
      addAuth(JSON.parse(res)),
    );  
  }

  return (
    <>{isShowSplash ? <SplashScreen/> : (
      <>{auth.accessToken?<MainNavigation/>:<AuthNavigator/>}</> 
    )
    }</> 
  )
}

export default AppRouter