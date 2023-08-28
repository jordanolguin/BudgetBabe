import { Center, Text } from "native-base";

const WelcomeMessage = ({ username }) => {
  return (
    <Center>
      <Text fontSize="2xl" fontWeight="bold">
        Welcome, {username}!
      </Text>
    </Center>
  );
};

export default WelcomeMessage;
