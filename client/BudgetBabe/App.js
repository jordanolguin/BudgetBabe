import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import CustomHeader from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import SignUpForm from "./components/Login/SignUp";
import ForgotPasswordForm from "./components/Login/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ header: () => <CustomHeader /> }}
          />
          <Stack.Screen name="SignUp" component={SignUpForm} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordForm} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
