import React, { useState } from "react";
import { useMutation } from "@apollo/client";
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
import { SEND_PASSWORD_RESET_EMAIL } from "../../apollo/mutations/mutations";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, { loading, error }] = useMutation(
    SEND_PASSWORD_RESET_EMAIL
  );

  const handleSendEmail = async () => {
    try {
      const { data } = await sendPasswordResetEmail({ variables: { email } });
      if (data && data.sendPasswordResetEmail) {
        alert("Password reset email sent. Check your inbox.");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              Don’t worry, Babe! Enter the email address associated with your
              account and we’ll send a link to reset your password.
            </Text>
            <Input
              placeholder="Email Address"
              mt="4"
              mb="4"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              backgroundColor="#3D6DCC"
              mb="4"
              onPress={handleSendEmail}
              isLoading={loading}
            >
              {loading ? "Sending..." : "Proceed"}
            </Button>
            {error && (
              <Text color="red.500">
                Error: Failed to send password reset email.
              </Text>
            )}
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
