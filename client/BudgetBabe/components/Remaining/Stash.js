import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { STASH_AND_RESET_CURRENT_MONTH } from "../../apollo/mutations/mutations";
import {
  Box,
  VStack,
  Button,
  Text,
  Input,
  Select,
  Toast,
  Heading,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const Stash = ({ userId, onMonthAdded }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [createRecord, { data, error }] = useMutation(
    STASH_AND_RESET_CURRENT_MONTH,
    {
      onCompleted: () => {
        onMonthAdded();
        setMonth("");
        setYear("");
        Toast.show({
          title: "Stash successful!",
          status: "success",
          duration: 2000,
        });
      },
      onError: (err) => {
        console.error("Failed to stash data:", err.message);
      },
    }
  );

  const handleStash = () => {
    if (!month || isNaN(month) || month < 1 || month > 12) {
      console.error("Invalid month entered");
      return;
    }

    if (
      !year ||
      isNaN(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      console.error("Invalid year entered");
      return;
    }

    createRecord({
      variables: {
        userId: userId,
        month: parseInt(month),
        year: parseInt(year),
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box
        style={{
          width: 150,
          height: 225,
          borderRadius: 15,
          borderColor: "#003366",
          borderWidth: 2,
          alignItems: "center",
          backgroundColor: "#E6E6FA",
        }}
      >
        <Heading size="sm" marginTop={2}>
          Stash A Month
        </Heading>
        <VStack space={2} alignItems="center" marginY={2}>
          <Text>Month (1-12):</Text>
          <Input
            value={month}
            onChangeText={(text) => setMonth(text)}
            keyboardType="numeric"
            width="80%"
            placeholder="Enter month"
          />

          <Text>Year:</Text>
          <Input
            value={year}
            onChangeText={(text) => setYear(text)}
            keyboardType="numeric"
            width="80%"
            placeholder="Enter year"
          />
        </VStack>

        <Button onPress={handleStash} style={{ backgroundColor: "#3D6DCC" }}>
          Stash
        </Button>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default Stash;
