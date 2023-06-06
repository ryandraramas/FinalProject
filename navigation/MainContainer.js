import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './mainScreens/HomeScreen';
import PaymentsScreen from './mainScreens/PaymentsScreen';
import UserScreen from './mainScreens/UserScreen';

//Screen names
const homeName = "Home";
const paymentsName = "Payments";
const userName = "User";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === paymentsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === userName) {
              iconName = focused ? 'user' : 'user-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={paymentsName} component={PaymentsScreen} />
        <Tab.Screen name={userName} component={UserScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;