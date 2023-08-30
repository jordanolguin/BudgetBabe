import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Input,
  KeyboardAvoidingView,
  Text,
  Button,
  VStack,
  Heading,
  Center,
  Box,
} from "native-base";
import { Platform } from "react-native";

const ForgotPasswordForm = () => {
  return (
    <KeyboardAvoidingView
      style={{ height: Platform.OS === "ios" ? 300 : "auto" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        safeArea
        p="2"
        w="90%"
        maxW="350"
        marginTop={10}
        backgroundColor={"white"}
        borderRadius={10}
        style={{ flex: 1 }}
      >
        <Center>
          <VStack
            style={{
              flex: 1,
              justifyContent: "flex-start",
              width: "100%",
              maxWidth: 300,
            }}
          >
            <Heading mb="3">Forgot Password</Heading>
            <Text color="muted.400">
              Not to worry! Enter the email address associated with your account
              and we’ll send a link to reset your password.
            </Text>
            <Input placeholder="Email Address" mt="4" mb="4" />
            <Button backgroundColor="#3D6DCC" mb="4">
              Proceed
            </Button>
          </VStack>
        </Center>
      </Box>
    </KeyboardAvoidingView>
  );
};

const ForgotPasswordScreen = () => {
  return (
    <LinearGradient
      colors={["#003366", "#006699", "#0099CC"]}
      style={{ flex: 1 }}
    >
      <Center flex={1} px="3" justifyContent="flex-start">
        <ForgotPasswordForm />
      </Center>
    </LinearGradient>
  );
};

export default ForgotPasswordScreen;
