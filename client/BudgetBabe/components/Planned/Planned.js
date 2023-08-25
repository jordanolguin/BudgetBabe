import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_MONTH_SUMMARY } from "../../apollo/queries/queries";
import { Text, VStack, Box, Heading } from "native-base";
import AuthService from "../../utils/storage";

const CurrentMonth = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await AuthService.getProfile();
      setProfile(userProfile);
    };

    fetchProfile();
  }, []);

  const { data, loading, error } = useQuery(CURRENT_MONTH_SUMMARY, {
    variables: { userId: profile?.data?._id },
    skip: !profile,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data || !data.currentMonthSummary)
    return <Text>Data not available yet.</Text>;

  const { incomeStreams, expenses, totalIncome, totalExpense, savings } =
    data.currentMonthSummary;

  return (
    <VStack spacing={4}>
      <Heading>Current Month Summary</Heading>

      <Box>
        <Heading size="md">Income Streams</Heading>
        {incomeStreams.map((stream) => (
          <Text key={stream.id}>
            {stream.source}: ${stream.amount}
          </Text>
        ))}
      </Box>

      <Box>
        <Heading size="md">Expenses</Heading>
        {expenses.map((expense) => (
          <Text key={expense.id}>
            {expense.description}: ${expense.amount}
          </Text>
        ))}
      </Box>

      <Box>
        <Heading size="md">Totals</Heading>
        <Text>Total Income: ${totalIncome}</Text>
        <Text>Total Expenses: ${totalExpense}</Text>
        <Text>Savings: ${savings}</Text>
      </Box>
    </VStack>
  );
};

export default CurrentMonth;
