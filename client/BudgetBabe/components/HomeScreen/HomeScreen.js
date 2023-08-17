import React from "react";
import { Center, Box } from "native-base";
import SignInForm from "../Login/SignIn";

const HomeScreen = () => {
  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" w="90%" maxW="350">
        <SignInForm />
      </Box>
    </Center>
  );
};

export default HomeScreen;
