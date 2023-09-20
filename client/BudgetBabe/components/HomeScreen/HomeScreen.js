import { LinearGradient } from "expo-linear-gradient";
import { Center, Box } from "native-base";
import SignInForm from "../Login/SignIn";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#003366", "#006699", "#0099CC"]}
      style={{ flex: 1 }}
    >
      <Center w="100%" h="100%">
        <Box
          safeArea
          p="2"
          w="90%"
          maxW="350"
          marginTop={4}
          style={{ flex: 1 }}
        >
          <SignInForm />
        </Box>
      </Center>
    </LinearGradient>
  );
};

export default HomeScreen;
