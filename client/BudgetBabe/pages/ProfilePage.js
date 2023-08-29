import React, { useState, useEffect } from "react";
import { Center, Text, Box, HStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { PlannedIncome, IncomeStreams, AddIncome } from "../components/Income";
import { ExpenseList, TotalExpenses, AddExpense } from "../components/Expense";
import { Savings } from "../components/Remaining";
import WelcomeMessage from "../components/Welcome/WelcomeMessage";
import AuthService from "../utils/storage";
import { useQuery } from "@apollo/client";
import { CURRENT_MONTH_SUMMARY } from "../apollo/queries/queries";

const ProfilePage = ({ route }) => {
  const [selectedTab, setSelectedTab] = useState(
    route.params?.selectedTab || null
  );
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await AuthService.getProfile();
      setProfile(userProfile);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (
      route.params?.selectedTab !== undefined &&
      route.params?.selectedTab !== selectedTab
    ) {
      setSelectedTab(route.params?.selectedTab);
    }
  }, [route.params?.selectedTab]);

  const { data, loading, error, refetch } = useQuery(CURRENT_MONTH_SUMMARY, {
    variables: { userId: profile?.data?._id },
    skip: !profile,
  });

  const onIncomeAdded = () => {
    refetch();
  };
  const onExpenseAdded = () => {
    refetch();
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const currentMonthSummary = data?.currentMonthSummary;

  let displayedComponent;
  switch (selectedTab) {
    case 0:
      displayedComponent = (
        <>
          <HStack space={4} marginTop={8} alignItems="flex-start">
            <PlannedIncome data={currentMonthSummary.totalIncome} />
            <AddIncome
              userId={profile?.data?._id}
              onIncomeAdded={onIncomeAdded}
            />
          </HStack>
          <IncomeStreams data={currentMonthSummary.incomeStreams} />
        </>
      );
      break;
    case 1:
      displayedComponent = (
        <>
          <HStack space={4} marginTop={8} alignItems="flex-start">
            <TotalExpenses data={currentMonthSummary.totalExpense} />
            <AddExpense
              userId={profile?.data?._id}
              onExpenseAdded={onExpenseAdded}
            />
          </HStack>
          <ExpenseList data={currentMonthSummary.expenses} />
        </>
      );
      break;
    case 2:
      displayedComponent = (
        <Box marginTop={4}>
          <Savings data={currentMonthSummary.savings} />
        </Box>
      );
      break;
    default:
      displayedComponent = (
        <WelcomeMessage username={profile?.data?.username || "User"} />
      );
  }
  return (
    <LinearGradient
      colors={["#003366", "#006699", "#0099CC"]}
      style={{ flex: 1 }}
    >
      <Center>{displayedComponent}</Center>
    </LinearGradient>
  );
};

export default ProfilePage;
