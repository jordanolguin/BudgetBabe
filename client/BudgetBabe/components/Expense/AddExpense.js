import React, { useState } from "react";
import { Button, Input, VStack, Text, Box, Heading, View } from "native-base";
import {
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE_TO_USER } from "../../apollo/mutations/mutations";

const AddExpense = ({ userId, onExpenseAdded }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [addExpense, { error }] = useMutation(ADD_EXPENSE_TO_USER, {
    onCompleted: () => {
      onExpenseAdded();
      setDescription("");
      setAmount("");
    },
  });

  const handleSubmit = async () => {
    try {
      await addExpense({
        variables: {
          userId: userId,
          description: description,
          amount: parseFloat(amount),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box
        style={{
          width: 150,
          height: 150,
          borderRadius: 15,
          borderColor: "#003366",
          borderWidth: 2,
          alignItems: "center",
          backgroundColor: "#E6E6FA",
          overflow: "hidden",
        }}
      >
        <Heading size="md" style={{ textAlign: "center", color: "#3D6DCC" }}>
          Add Expense
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
        <ScrollView style={{ width: "100%" }}>
          <VStack space={2} marginTop={5} marginX={2} alignItems="center">
            {error && <Text>Error: {error.message}</Text>}
            <Input
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Description of Expense"
            />
            <Input
              value={amount}
              onChangeText={(text) => setAmount(text)}
              placeholder="Amount"
              keyboardType="numeric"
            />
            <Button onPress={handleSubmit}>Add Expense</Button>
          </VStack>
        </ScrollView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default AddExpense;
