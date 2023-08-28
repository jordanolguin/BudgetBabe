import { Text, Box, Heading } from "native-base";

const Savings = ({ data }) => {
  return (
    <Box>
      <Heading size="md">Remaining Capital</Heading>
      <Text>${data}</Text>
    </Box>
  );
};

export default Savings;
