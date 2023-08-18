import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import CustomHeader from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import SignUpForm from "./components/Login/SignUp";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import ForgotPasswordForm from "./components/Login/ForgotPassword";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ header: () => <CustomHeader /> }}
            />
            <Stack.Screen name="SignUp" component={SignUpForm} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordForm}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
