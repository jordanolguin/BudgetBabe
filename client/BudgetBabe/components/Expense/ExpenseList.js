import { Text, Box, Heading } from "native-base";
import { View } from "react-native";

const ExpenseList = ({ data }) => {
  return (
    <Box
      style={{
        width: 150,
        height: 150,
        borderRadius: 15,
        borderColor: "#003366",
        borderWidth: 2,
        alignItems: "center",
      }}
    >
      <Heading size="md" style={{ textAlign: "center", color: "#3D6DCC" }}>
        Expenses
      </Heading>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#003366",
          width: "85%",
          alignSelf: "center",
          marginTop: 5,
        }}
      />
      {data.map((expense) => (
        <Text key={expense.id} style={{ textAlign: "left", color: "#3D6DCC" }}>
          {expense.description}: ${expense.amount}
        </Text>
      ))}
    </Box>
  );
};

export default ExpenseList;
