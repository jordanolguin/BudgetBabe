import React, { useState } from "react";
import { Button, Input, VStack, Text } from "native-base";
import { useMutation } from "@apollo/client";
import { ADD_INCOME_TO_USER } from "../../apollo/mutations/mutations";

const AddIncome = ({ userId, onIncomeAdded }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const [addIncome, { error }] = useMutation(ADD_INCOME_TO_USER, {
    onCompleted: () => {
      onIncomeAdded();
      setSource("");
      setAmount("");
    },
  });

  const handleSubmit = async () => {
    try {
      await addIncome({
        variables: {
          userId: userId,
          source: source,
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
        value={source}
        onChangeText={(text) => setSource(text)}
        placeholder="Source of Income"
      />
      <Input
        value={amount}
        onChangeText={(text) => setAmount(text)}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <Button onPress={handleSubmit}>Add Income</Button>
    </VStack>
  );
};

export default AddIncome;
