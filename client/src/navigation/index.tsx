import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from '../navigation/BottomTabNavigator'



const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default MainNavigation;
  