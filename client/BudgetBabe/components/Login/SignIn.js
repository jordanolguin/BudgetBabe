import { useState } from "react";
import AuthService from "../../utils/storage";
import { useAuth } from "../../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../apollo/mutations/mutations";
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
  const { fetchProfile } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { loading, error }] = useMutation(LOGIN);

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleSignIn = async () => {
    try {
      const { data } = await signIn({ variables: { email, password } });

      if (data && data.login && data.login.token) {
        const token = data.login.token;
        await AuthService.storeToken(token);
        await fetchProfile();
        navigation.navigate("Profile");
        setEmail("");
        setPassword("");
      } else {
        console.error("Unexpected response structure:", data);
      }
    } catch (err) {
      console.error("Error signing in:", err.message);
    }
  };

  return (
    <Center w="100%">
      <Box
        safeArea
        p="2"
        py="8"
        w="90%"
        maxW="300"
        backgroundColor={"#fff"}
        borderRadius={10}
      >
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
            <FormControl.Label>Email</FormControl.Label>
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
            backgroundColor="#3D6DCC"
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
