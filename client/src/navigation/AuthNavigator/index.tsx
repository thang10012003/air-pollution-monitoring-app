import React from 'react';
import {Login, Intro, Registry} from '../../screens/Auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const AuthNavigator = () => {

    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
            // initialRouteName='IntroScreen'
            initialRouteName='RegistryScreen'
        >
            <Screen
                name="IntroScreen"
                component={Intro}
                options={{}}
            />
            <Screen
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
    )
}

export default AuthNavigator