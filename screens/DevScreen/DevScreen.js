import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../../constants';

import HomeScreenDev from './HomeScreenDev';
import NotificationDev from './NotificationDev'
import AccountDev from './AccountDev';


const HomeScreenDevName = 'Home';
const NotificationDevName = 'Notification';
const AccountDevName = 'Account'

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreenDevName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === HomeScreenDevName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === NotificationDevName) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name == AccountDevName) {
            iconName = focused ? 'person' : 'person-outline'
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 60 },
        headerShown: false,
      })}
    >
      <Tab.Screen name={HomeScreenDevName} component={HomeScreenDev} />
      <Tab.Screen name={NotificationDevName} component={NotificationDev} />
      <Tab.Screen name={AccountDevName} component={AccountDev}/>
    </Tab.Navigator>
  )
}

export default TabNavigator;
