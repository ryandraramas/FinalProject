import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';


import { COLORS } from '../../constants';

import StatusBookART from '../StatusBookART';
import ProfileART from '../ProfileART';
import NotificationART from '../NotificationART';

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
            // Gunakan 'bell' untuk ikon Notification
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === ProfileARTName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 5, fontSize: 10 },
        style: { padding: 10, height: 70 }
      }}
    >
      <Tab.Screen options={{ headerShown: false }} name={StatusBookARTName} component={StatusBookART} />
      <Tab.Screen options={{ headerShown: false }} name={NotificationARTName} component={NotificationART} />
      <Tab.Screen options={{ headerShown: false }} name={ProfileARTName} component={ProfileART} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
