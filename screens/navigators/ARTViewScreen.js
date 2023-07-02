import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../../constants';

import StatusBookART from '../ARTScreen/StatusBookART';
import ProfileART from '../ARTScreen/ProfileART';
import NotificationART from '../ARTScreen/NotificationART';

const StatusBookARTName = 'Status Book';
const NotificationARTName = 'Notification';
const ProfileARTName = 'Profile';
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={StatusBookARTName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === StatusBookARTName) {
            iconName = focused ? 'bookmarks' : 'bookmarks';
          } else if (route.name === NotificationARTName) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === ProfileARTName) {
            iconName = focused ? 'person' : 'person-outline';
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
      <Tab.Screen name={StatusBookARTName} component={StatusBookART} />
      <Tab.Screen name={NotificationARTName} component={NotificationART} />
      <Tab.Screen name={ProfileARTName} component={ProfileART} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
