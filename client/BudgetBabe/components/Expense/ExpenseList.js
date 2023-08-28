import { Text, Box, Heading } from "native-base";

const ExpenseList = ({ data }) => {
  return (
    <Box>
      <Heading size="md">Expenses</Heading>
      {data.map((expense) => (
        <Text key={expense.id}>
          {expense.description}: ${expense.amount}
        </Text>
      ))}
    </Box>
  );
};

export default ExpenseList;
