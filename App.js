import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Started from './screens/Started';
import RegisterScreen from './screens/UserScreen/RegisterScreen';
import LoginScreen from './screens/UserScreen/LoginScreen';
import PaymentsScreen from './screens/UserScreen/PaymentsScreen';
import DetailsScreen from './screens/UserScreen/DetailsScreen';
import TabNavigator from './screens/navigators/TabNavigator';
import MenuScreen from './screens/MenuScreen';
import LoginART from './screens/ARTScreen/LoginART';
import RegisterART from './screens/ARTScreen/RegisterART';
import CreatePostART from './screens/ARTScreen/CreatePostART';
import ARTViewScreen from './screens/navigators/ARTViewScreen';
import DevScreen from './screens/DevScreen/DevScreen';
import LoginDev from './screens/DevScreen/LoginDev';
import TopUpScreen from './screens/UserScreen/TopUpScreen';
import BCATopUp from './screens/UserScreen/BCATopUp';
import HistoryScreen from './screens/UserScreen/HistoryScreen';
import DetailOrderScreen from './screens/UserScreen/DetailOrderScreen';
import InfoOrderMitra from './screens/ARTScreen/InfoOrderMitra'
import PaymentsConfirm from './screens/UserScreen/PaymentsConfirm';
import EditProfileScreen from './screens/ARTScreen/EditProfileScreen';
import ValidationScreen from './screens/DevScreen/ValidationScreen'


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};


function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Started" component={Started} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Payments" component ={PaymentsScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="LoginART" component={LoginART} />
        <Stack.Screen name="RegisterART" component={RegisterART} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="CreatePostART" component={CreatePostART} />
        <Stack.Screen name="ARTViewScreen" component={ARTViewScreen} />
        <Stack.Screen name="DevScreen" component={DevScreen}/>
        <Stack.Screen name="LoginDev" component={LoginDev}/>
        <Stack.Screen name="BCATopUp" component={BCATopUp}/>
        <Stack.Screen name="TopUp" component={TopUpScreen}/>
        <Stack.Screen name="History" component={HistoryScreen}/>
        <Stack.Screen name="DetailOrder" component={DetailOrderScreen}/>
        <Stack.Screen name="Info" component={InfoOrderMitra}/>
        <Stack.Screen name="PaymentsConfirm" component={PaymentsConfirm}/>
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}/>
        <Stack.Screen name="Validation" component={ValidationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
