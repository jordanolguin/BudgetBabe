import { Text, Box, Heading } from "native-base";

const PlannedIncome = ({ data }) => {
  return (
    <Box>
      <Heading size="md">Planned Income Total</Heading>
      <Text>${data}</Text>
    </Box>
  );
};

export default PlannedIncome;
