import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import AuthService from "../../utils/storage";
import { useMutation } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ADD_USER } from "../../apollo/mutations/mutations";
import { Alert } from "react-native";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Spinner,
  Text,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignUpForm = () => {
  const { fetchProfile } = useAuth();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await addUser({
        variables: { username, email, password },
      });

      if (data?.addUser?.token) {
        await AuthService.storeToken(data.addUser.token);
        await fetchProfile();
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      Alert.alert(
        "Success!",
        "Your account has been created.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Profile");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={handlePasswordChange}
                InputRightElement={
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    onPress={togglePasswordVisibility}
                    style={{ marginRight: 10 }}
                  />
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                InputRightElement={
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                    onPress={toggleConfirmPasswordVisibility}
                    style={{ marginRight: 10 }}
                  />
                }
              />
            </FormControl>
            {!passwordsMatch && (
              <Text style={{ color: "red" }}>Passwords do not match</Text>
            )}
            <Button
              mt="2"
              backgroundColor="#3D6DCC"
              onPress={handleSignUp}
              _pressed={{ opacity: 0.8 }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner color="#fff" /> : "Sign Up"}
            </Button>
          </VStack>
        </Box>
      </Center>
    </LinearGradient>
  );
};

export default SignUpForm;
