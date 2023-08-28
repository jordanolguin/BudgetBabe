import React, { useState } from "react";
import { Button, Input, VStack } from "native-base";
import { useMutation } from "@apollo/client";
import { ADD_INCOME_TO_USER } from "../../apollo/mutations/mutations";

const AddIncome = ({ userId, onIncomeAdded }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const [addIncome] = useMutation(ADD_INCOME_TO_USER, {
    onCompleted: () => {
      onIncomeAdded();
      setSource("");
      setAmount("");
    },
  });

  const handleSubmit = () => {
    addIncome({
      variables: {
        userId: userId,
        source: source,
        amount: parseFloat(amount),
      },
    });
  };

  return (
    <VStack>
      <Input
        value={source}
        onChange={setSource}
        placeholder="Source of Income"
      />
      <Input
        value={amount}
        onChange={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <Button onPress={handleSubmit}>Add Income</Button>
    </VStack>
  );
};

export default AddIncome;
