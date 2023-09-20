import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import CustomHeader from "./components/Header/Header";
import LandingHeader from "./components/Header/LandingHeader";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import SignUpForm from "./components/Login/SignUp";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordForm from "./components/Login/ForgotPassword";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { AuthProvider } from "./utils/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Budget Babe"
                component={HomeScreen}
                options={{
                  header: () => <LandingHeader />,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpForm}
                options={{
                  headerTitle: "Sign Up",
                  headerStyle: {
                    backgroundColor: "#3D6DCC",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                  },
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordForm}
                options={{
                  headerTitle: "Forgot Password",
                  headerStyle: {
                    backgroundColor: "#3D6DCC",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                  },
                }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                  header: (props) => {
                    const initialIndex = null;
                    const onTabSelect = (selectedIndex) => {
                      props.navigation.setParams({
                        selectedTab: selectedIndex,
                      });
                    };

                    return (
                      <CustomHeader
                        {...props}
                        initialIndex={initialIndex}
                        onTabSelect={onTabSelect}
                        navigation={props.navigation}
                      />
                    );
                  },
                }}
              />
            </Stack.Navigator>

            <StatusBar style="auto" />
          </NavigationContainer>
        </NativeBaseProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
