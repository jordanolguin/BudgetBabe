import { useState } from "react";
import {
  Button,
  Input,
  VStack,
  Text,
  Box,
  Heading,
  View,
  HStack,
} from "native-base";
import {
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useMutation } from "@apollo/client";
import { ADD_INCOME_TO_USER } from "../../apollo/mutations/mutations";
import Icon from "react-native-vector-icons/FontAwesome";

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
          + Income
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
              value={source}
              onChangeText={(text) => setSource(text)}
              placeholder="Income Item"
              style={{ backgroundColor: "#fff" }}
            />
            <HStack space={2} alignItems="center">
              <Input
                value={amount}
                onChangeText={(text) => setAmount(text)}
                placeholder="Amount"
                keyboardType="numeric"
                style={{ backgroundColor: "#fff" }}
                w="67%"
              />
              <Button
                onPress={handleSubmit}
                style={{ backgroundColor: "#3D6DCC" }}
              >
                <Icon name="plus" size={12} color="#fff" />
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default AddIncome;
