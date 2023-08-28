import React, { useState } from "react";
import { Button, Input, VStack, Text } from "native-base";
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
    <VStack space={2} marginTop={12} marginX={16} alignItems="flex-start">
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
  );
};

export default AddExpense;
