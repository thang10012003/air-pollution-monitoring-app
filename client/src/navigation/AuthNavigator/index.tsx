import React from 'react';
import {Login, Intro, Registry} from '../../screens/Auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

type RootStackParamList = {
    LoginScreen: undefined;  // Tên màn hình và tham số
    IntroScreen: undefined;  // Tên màn hình và tham số
    RegistryScreen: undefined;  // Tên màn hình và tham số
  };
  
const AuthNavigator = () => {
    const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

    const screen = {
        LOGIN: 'LoginScreen',
        INTRO: 'IntroScreen',
        REGISTRY: 'RegistryScreen', 
    }
    return (
        <NavigationContainer>
        
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
                // initialRouteName='IntroScreen'
                initialRouteName='LoginScreen'
            >
                <Screen
                    // name={screen.INTRO}
                    name='IntroScreen'
                    component={Intro}
                    options={{}}
                />
                <Screen
                    // name={screen.LOGIN}
                    name='LoginScreen'
                    component={Login}
                    options={{}}
                />
                <Screen
                    name='RegistryScreen'
                    component={Registry}
                    options={{}}
                />
            </Navigator>
        </NavigationContainer>
        
    )
}

export default AuthNavigator