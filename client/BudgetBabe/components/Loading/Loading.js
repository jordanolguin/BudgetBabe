import { Heading, HStack, Spinner } from "native-base";

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="md">
        Loading . . .
      </Heading>
    </HStack>
  );
};

export default Loading;
