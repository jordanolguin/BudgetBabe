import React, { useEffect, useRef } from "react";
import { Text, Box, Heading, ScrollView, HStack, Spacer } from "native-base";
import { View, Animated } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useMutation } from "@apollo/client";
import { REMOVE_EXPENSE } from "../../apollo/mutations/mutations";

const ExpenseList = ({ data, userId, onExpenseRemoved }) => {
  const [removeExpenseFromUser, { loading, error }] = useMutation(
    REMOVE_EXPENSE,
    {
      onCompleted: () => {
        onExpenseRemoved();
      },
    }
  );
  const reversedData = [...data].reverse();
  const slideAnim = useRef(data.map(() => new Animated.Value(-300))).current;

  // Synchronize the animated values with the data
  if (slideAnim.length !== reversedData.length) {
    slideAnim.length = reversedData.length; // Reset length
    reversedData.forEach((_, index) => {
      if (!slideAnim[index]) slideAnim[index] = new Animated.Value(-300);
    });
  }

  useEffect(() => {
    Animated.stagger(
      50,
      slideAnim.map((anim) =>
        Animated.spring(anim, {
          toValue: 0,
          tension: 25,
          friction: 7,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [reversedData]);

  const handleDelete = async (userId, expenseId) => {
    try {
      await removeExpenseFromUser({
        variables: {
          userId,
          expenseId,
        },
      });
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };
  return (
    <Box
      style={{
        width: 315,
        height: 300,
        borderRadius: 15,
        borderColor: "#003366",
        borderWidth: 2,
        alignItems: "center",
        marginTop: 15,
        backgroundColor: "#E6E6FA",
      }}
    >
      <Heading
        size="md"
        style={{ textAlign: "center", color: "#3D6DCC", marginTop: 14 }}
      >
        Expenses
      </Heading>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#003366",
          width: "85%",
          alignSelf: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ padding: 10 }}
      >
        {reversedData.map((expense, index) => (
          <Animated.View
            key={expense.id}
            style={{
              transform: [{ translateX: slideAnim[index] }],
              padding: 10,
              borderRadius: 10,
              backgroundColor: "white",
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <HStack space={4} alignItems="center">
              <Text style={{ flex: 1, color: "#3D6DCC" }}>
                {expense.description}
              </Text>
              <Spacer />
              <Text style={{ color: "#3D6DCC" }}>${expense.amount}</Text>
              <FontAwesome
                name="trash-o"
                size={24}
                color="red"
                onPress={() => handleDelete(userId, expense.id)}
              />
            </HStack>
          </Animated.View>
        ))}
      </ScrollView>
    </Box>
  );
};

export default ExpenseList;
