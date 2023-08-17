import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../apollo/mutations/mutations";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
} from "native-base";

const SignInForm = () => {
  const navigation = useNavigation();
  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { loading, error }] = useMutation(SIGN_IN);

  const handleSignIn = async () => {
    try {
      const { data } = await signIn({ variables: { email, password } });
      const token = data.signIn.token;
      // Store the token securely, e.g., using AsyncStorage
      // Navigate the user to a different screen if successful
    } catch (err) {
      // Handle the error (wrong credentials, network error, etc.)
      console.error("Error signing in:", err.message);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={navigateToForgotPassword}
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={handleSignIn}
            isLoading={loading}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={navigateToSignUp}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignInForm;
