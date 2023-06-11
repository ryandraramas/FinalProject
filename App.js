import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font'

import Started from './screens/Started'
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import TabNavigator from './screens/navigators/TabNavigator';
import MenuScreen from './screens/MenuScreen';
import WalletScreen from './screens/WalletScreen';
import LoginART from './screens/LoginART';
import RegisterART from './screens/RegisterART';
import ARTViewScreen from './screens/navigators/ARTViewScreen';


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
      background: "transparent"
  }
}

function App() {
  const [loaded] = useFonts({
    IBMPlexSansBold     : require("./assets/fonts/IBMPlexSans-Bold.ttf"),
    IBMPlexSansSemiBold : require("./assets/fonts/IBMPlexSans-SemiBold.ttf"),
    IBMPlexSansMedium   : require("./assets/fonts/IBMPlexSans-Medium.ttf"),
    IBMPlexSansRegular  : require("./assets/fonts/IBMPlexSans-Regular.ttf"),
  })

  if( !loaded ) return null 

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Started" component={Started} />
        <Stack.Screen options={{ headerShown: false }} name="Menu" component={MenuScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Details" component={DetailsScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="LoginART" component={LoginART}/>
        <Stack.Screen options={{ headerShown: false }} name="RegisterART" component={RegisterART}/>
        <Stack.Screen options={{ headerShown: false }} name="TabNavigator" component={TabNavigator}/>
        <Stack.Screen options={{ headerShown: false }} name="ARTViewScreen" component={ARTViewScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;