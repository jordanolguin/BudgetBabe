import React from "react";
import { Center, Box, Text } from "native-base";

const ProfileScreen = () => {
  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" w="90%" maxW="350">
        <Text>Successful login! Welcome to your profile.</Text>
      </Box>
    </Center>
  );
};

export default ProfileScreen;
