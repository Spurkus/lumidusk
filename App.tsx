import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import SignUp from "./app/screens/SignUp";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  SignUp: undefined;
};

export default function App() {
  // Loading fonts
  const [fontsLoaded, fontError] = useFonts({
    "ClashGrotesk-Bold": require("./app/assets/fonts/ClashGrotesk-Bold.otf"),
    "ClashGrotesk-Extralight": require("./app/assets/fonts/ClashGrotesk-Extralight.otf"),
    "ClashGrotesk-Light": require("./app/assets/fonts/ClashGrotesk-Light.otf"),
    "ClashGrotesk-Medium": require("./app/assets/fonts/ClashGrotesk-Medium.otf"),
    "ClashGrotesk-Regular": require("./app/assets/fonts/ClashGrotesk-Regular.otf"),
    "ClashGrotesk-Semibold": require("./app/assets/fonts/ClashGrotesk-Semibold.otf"),
    "Satoshi-Black": require("./app/assets/fonts/Satoshi-Black.otf"),
    "Satoshi-BlackItalic": require("./app/assets/fonts/Satoshi-BlackItalic.otf"),
    "Satoshi-Bold": require("./app/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-BoldItalic": require("./app/assets/fonts/Satoshi-BoldItalic.otf"),
    "Satoshi-Italic": require("./app/assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-Light": require("./app/assets/fonts/Satoshi-Light.otf"),
    "Satoshi-LightItalic": require("./app/assets/fonts/Satoshi-LightItalic.otf"),
    "Satoshi-Medium": require("./app/assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-MediumItalic": require("./app/assets/fonts/Satoshi-MediumItalic.otf"),
    "Satoshi-Regular": require("./app/assets/fonts/Satoshi-Regular.otf"),
  });

  useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Create Navigation Stack
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RootStack.Screen name="SignUp" component={SignUp} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
