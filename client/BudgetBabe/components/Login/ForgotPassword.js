import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD_MUTATION } from "../../apollo/mutations/mutations";
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
import { Platform, Alert } from "react-native";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { loading, data, error }] = useMutation(
    FORGOT_PASSWORD_MUTATION
  );

  const handleSendEmail = async () => {
    try {
      const response = await forgotPassword({ variables: { email } });
      if (response.data.forgotPassword.success) {
        Alert.alert(
          "Success!",
          "An email has been sent to your inbox with a link to reset your password."
        );
      } else {
        Alert.alert("Something went wrong while processing your request.");
      }
    } catch (e) {
      Alert.alert(`Error: ${e.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        safeArea
        p="2"
        w="90%"
        maxW="350"
        marginTop={10}
        backgroundColor={"#fff"}
        borderRadius={10}
        style={{ flex: 1, maxHeight: 300 }}
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
