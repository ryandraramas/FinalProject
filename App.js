import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Started from './screens/Started';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DetailsScreen from './screens/DetailsScreen';
import TabNavigator from './screens/navigators/TabNavigator';
import MenuScreen from './screens/MenuScreen';
import LoginART from './screens/ARTScreen/LoginART';
import RegisterART from './screens/ARTScreen/RegisterART';
import CreatePostART from './screens/ARTScreen/CreatePostART';
import ARTViewScreen from './screens/navigators/ARTViewScreen';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};

function App() {
  const [loaded] = useFonts({
    // IBMPlexSansSemiBold: require("./assets/fonts/IBMPlexSans-SemiBold.ttf"),
    // IBMPlexSansMedium: require("./assets/fonts/IBMPlexSans-Medium.ttf"),
    // IBMPlexSansRegular: require("./assets/fonts/IBMPlexSans-Regular.ttf"),
    // IBMPlexSansBold: require("./assets/fonts/IBMPlexSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Started" component={Started} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="LoginART" component={LoginART} />
        <Stack.Screen name="RegisterART" component={RegisterART} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="CreatePostART" component={CreatePostART} />
        <Stack.Screen name="ARTViewScreen" component={ARTViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
