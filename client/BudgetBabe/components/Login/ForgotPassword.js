import React from "react";
import {
  Input,
  KeyboardAvoidingView,
  Text,
  Button,
  VStack,
  Heading,
  Center,
} from "native-base";
import { Platform } from "react-native";

const ForgotPasswordForm = () => {
  return (
    <KeyboardAvoidingView
      style={{ height: Platform.OS === "ios" ? 400 : "auto" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          <Button mb="4">Proceed</Button>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
};

const ForgotPasswordScreen = () => {
  return (
    <Center flex={1} px="3">
      <ForgotPasswordForm />
    </Center>
  );
};

export default ForgotPasswordScreen;
