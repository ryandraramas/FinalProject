import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants';

import HomeScreen from '../HomeScreen';
import WalletScreen from '../WalletScreen'
import HistoryScreen from '../HistoryScreen';
import UserScreen from '../UserScreen';

const homeName = 'Home';
const walletName = 'Wallet';
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
          } else if (route.name === walletName) {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === historyName) {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === userName) {
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
      <Tab.Screen options={{ headerShown: false }} name={homeName} component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name={walletName} component={WalletScreen} />
      <Tab.Screen options={{ headerShown: false }} name={historyName} component={HistoryScreen} />
      <Tab.Screen options={{ headerShown: false }} name={userName} component={UserScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
