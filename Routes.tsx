import { useEffect, Dispatch, SetStateAction } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFirebaseAuth } from "./app/context/AuthContext";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import SignUp from "./app/screens/SignUp";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import Journal from "./app/screens/Journal";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
  Journal: {
    dateSelected: string;
    setUpdate: Dispatch<SetStateAction<boolean>>;
  };
};

const Routes = () => {
  const user = useFirebaseAuth();

  useEffect(() => {
    // If the user is not null, hide the splash screen
    if (user !== null) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [user]);

  // Create Navigation Stack
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <RootStack.Navigator
      initialRouteName={user ? "Home" : "WelcomeScreen"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen
        options={{ gestureEnabled: false }}
        name="Home"
        component={Home}
      />
      <RootStack.Screen name="Journal" component={Journal} />
    </RootStack.Navigator>
  );
};

export default Routes;
