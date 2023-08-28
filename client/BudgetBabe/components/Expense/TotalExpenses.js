import { Text, Box, Heading } from "native-base";

const TotalExpenses = ({ data }) => {
  return (
    <Box>
      <Heading size="md">Planned Expense Total</Heading>
      <Text>${data}</Text>
    </Box>
  );
};

export default TotalExpenses;
