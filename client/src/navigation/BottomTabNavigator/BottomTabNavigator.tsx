import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { } from 'react-native';
import Colors from '../../constants/Colors';
import DashboardNavigator from './DashboardNavigator';
import HistoryNavigator from './HistoryNavigator';
import MapNavigator from './MapNavigator';
import { BOTTOM_TAB_ROUTE } from "./route";
import SettingNavigator from './SettingNavigator';
import React from "react";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = () =>{
    return(
        <Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: Colors.light.background,
                    minHeight: 80,
                    paddingTop: 10,
                    justifyContent:'center',
                    alignItems:'center',
                },
                tabBarLabelStyle:{
                    fontSize: 16,
                    fontFamily: 'Inter',

                },
                headerShown: false,
                tabBarActiveTintColor: Colors.light.tabIconSelected,
                tabBarInactiveTintColor: Colors.light.tabIconDefault,
                animation: 'fade',
            }}
        >
            <Screen
                name={BOTTOM_TAB_ROUTE.DASHBOARD}
                component={DashboardNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                        ? <FontAwesome name="home" size={size} color={color}/>
                        : <Feather name="home" size={size} color={color} />
                    ),
                    // tabBarLabelPosition: "below-icon",
                    // tabBarStyle:{
                        // paddingVertical: 10,
                    // }
                }}
            />
            <Screen
                name={BOTTOM_TAB_ROUTE.MAP}
                component={MapNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                        ? <FontAwesome name="map" size={size} color={color} />
                        : <FontAwesome name="map-o" size={size} color={color} />
                    ),
                }}
            />
            <Screen
                name={BOTTOM_TAB_ROUTE.HISTORY}
                component={HistoryNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                        ? <AntDesign name="clockcircle" size={size} color={color} />
                        : <AntDesign name="clockcircleo" size={size} color={color} />
                    ),
                }}
            />
            <Screen
                name={BOTTOM_TAB_ROUTE.SETTING}
                component={SettingNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                        ? <Ionicons name="settings-sharp" size={size} color={color} />
                        : <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />


        </Navigator>

    )
}

export default BottomTabNavigator