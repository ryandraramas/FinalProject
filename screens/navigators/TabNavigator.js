import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../../constants';

import HomeScreen from '../UserScreen/HomeScreen';
import NotifikasiScreen from '../UserScreen/NotifikasiScreen'
import HistoryScreen from '../UserScreen/HistoryScreen';
import UserScreen from '../UserScreen/UserScreen';

const homeName = 'Home';
const notifName = 'Notifikasi';
const userName = 'Profile';
const historyName = 'History';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === historyName) {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === notifName) {
            iconName = focused ? 'time' : 'notifications-outline';
          } else if (route.name === userName) {
            iconName = focused ? 'person' : 'person-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 56 },
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={notifName} component={NotifikasiScreen} />
      <Tab.Screen name={historyName} component={HistoryScreen} />
      <Tab.Screen name={userName} component={UserScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
