import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";
import { Toast, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ADD_USER } from "../../apollo/mutations/mutations";

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from "native-base";

const SignUpForm = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const toast = useToast();

  const [addUser] = useMutation(ADD_USER);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
      navigation.navigate("Budget Babe");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      toast.show({
        title: "Success",
        description: "You have successfully signed up!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#003366", "#006699", "#0099CC"]}
      style={{ flex: 1 }}
    >
      <Center w="100%">
        <Box
          safeArea
          p="2"
          w="90%"
          maxW="300"
          py="8"
          marginTop={10}
          backgroundColor={"#fff"}
          borderRadius={10}
        >
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input value={username} onChangeText={setUsername} />
            </FormControl>
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
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </FormControl>
            <Button mt="2" backgroundColor="#3D6DCC" onPress={handleSignUp}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </LinearGradient>
  );
};

export default SignUpForm;
