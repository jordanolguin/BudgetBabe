import React, { useState, useEffect } from "react";
import { Center, Text, Box, HStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { PlannedIncome, IncomeStreams, AddIncome } from "../components/Income";
import { ExpenseList, TotalExpenses, AddExpense } from "../components/Expense";
import { MyPieChart, Savings, Stash } from "../components/Remaining";
import WelcomeMessage from "../components/Welcome/WelcomeMessage";
import AuthService from "../utils/storage";
import { useAuth } from "../utils/AuthContext";
import { useQuery } from "@apollo/client";
import { CURRENT_MONTH_SUMMARY } from "../apollo/queries/queries";
import Loading from "../components/Loading/Loading";

const ProfilePage = ({ route }) => {
  const [selectedTab, setSelectedTab] = useState(
    route.params?.selectedTab || null
  );
  const { profile, fetchProfile } = useAuth();

  useEffect(() => {
    if (
      route.params?.selectedTab !== undefined &&
      route.params?.selectedTab !== selectedTab
    ) {
      setSelectedTab(route.params?.selectedTab);
    }
    if (profile) {
      refetch();
    }
  }, [route.params?.selectedTab, profile]);

  const { data, loading, error, refetch } = useQuery(CURRENT_MONTH_SUMMARY, {
    variables: { userId: profile?.data?._id },
    skip: !profile,
  });

  const onRefresh = () => {
    refetch();
  };

  if (loading) return <Loading />;
  if (error) return <Text>Error: {error.message}</Text>;

  const currentMonthSummary = data?.currentMonthSummary;

  let displayedComponent;
  switch (selectedTab) {
    case 0:
      displayedComponent = (
        <>
          <HStack space={4} marginTop={8} alignItems="flex-start">
            <PlannedIncome data={currentMonthSummary.totalIncome} />
            <AddIncome userId={profile?.data?._id} onIncomeAdded={onRefresh} />
          </HStack>
          <IncomeStreams
            data={currentMonthSummary.incomeStreams}
            userId={profile?.data?._id}
            onIncomeRemoved={onRefresh}
          />
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
              onExpenseAdded={onRefresh}
            />
          </HStack>
          <ExpenseList
            data={currentMonthSummary.expenses}
            userId={profile?.data?._id}
            onExpenseRemoved={onRefresh}
          />
        </>
      );
      break;
    case 2:
      displayedComponent = (
        <>
          <HStack space={4} marginTop={8} alignItems="flex-start">
            <Savings data={currentMonthSummary.savings} />
            {/* <Stash userId={profile?.data?._id} onMonthAdded={onRefresh} /> */}
          </HStack>
          <MyPieChart data={currentMonthSummary} />
        </>
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
