import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Actionsheet,
  useDisclose,
  Center,
  Button,
  Text,
  View,
  ScrollView,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MONTHLY_RECORD_BY_USER } from "../../apollo/queries/queries";
import AuthService from "../../utils/storage";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MonthHistory() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [profile, setProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const { data, loading, error } = useQuery(MONTHLY_RECORD_BY_USER, {
    variables: {
      userId: profile?.data?._id,
      month: selectedMonth || currentMonth + 1,
      year: selectedYear || currentYear,
    },
    skip: !profile?.data?._id,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await AuthService.getProfile();
      setProfile(userProfile);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const monthlyRecord = data ? data.monthlyRecordByUser : null;

  const generateMonthsForYear = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = monthNames[i];
      return { month, year: currentYear.toString() };
    });
  };

  const pastMonthsData = generateMonthsForYear();

  const getBorderStyle = (isMonthPast, isMonthFuture) => {
    const defaultStyle = {
      borderWidth: 1,
      borderColor: "#3D6DCC",
      borderRadius: 4,
      padding: 8,
      marginBottom: 8,
      fontWeight: "normal",
    };

    const pastStyle = {
      ...defaultStyle,
      borderColor: "#003366",
      fontWeight: "bold",
    };

    const futureStyle = {
      ...defaultStyle,
      borderColor: "#003366",
      borderStyle: "dashed",
    };

    if (isMonthPast) {
      return pastStyle;
    } else if (isMonthFuture) {
      return futureStyle;
    } else {
      return defaultStyle;
    }
  };

  const getCurrentMonthAndYearText = () => {
    const month = monthNames[currentMonth];
    return (
      <Text>
        <Text fontSize={22} fontWeight="bold" color="white">
          {month}
        </Text>{" "}
        <Text fontSize={22} color="white">
          {currentYear}
        </Text>
        <View style={{ marginTop: 3 }}>
          <Icon
            name={isMenuOpen ? "expand-less" : "expand-more"}
            size={24}
            color="white"
          />
        </View>
      </Text>
    );
  };

  const renderMonthItem = (monthData, index) => {
    const monthIndex = monthNames.indexOf(monthData.month);
    const isMonthCurrent = monthIndex === currentMonth;
    const isMonthPast = monthIndex < currentMonth;
    const isMonthFuture = monthIndex > currentMonth;

    const borderStyle = getBorderStyle(isMonthPast, isMonthFuture);

    const handleClick = () => {
      setSelectedMonth(monthIndex + 1); // 1-indexed
      setSelectedYear(currentYear);
      onOpen();
    };

    if (selectedMonth === monthIndex + 1 && monthlyRecord) {
      return (
        <Actionsheet.Item key={index} style={borderStyle}>
          <Text>{`${monthData.month} ${monthData.year}`}</Text>
          <Text>Total Income: {monthlyRecord.totalIncome}</Text>
          <Text>Total Expense: {monthlyRecord.totalExpense}</Text>
          <Text>Savings: {monthlyRecord.savings}</Text>
          <Text>Income Streams:</Text>
          {monthlyRecord.incomeStreams.map((stream) => (
            <Text key={stream.id}>
              {stream.source}: {stream.amount}
            </Text>
          ))}
          <Text>Expenses:</Text>
          {monthlyRecord.expenses.map((expense) => (
            <Text key={expense.id}>
              {expense.description}: {expense.amount}
            </Text>
          ))}
          {isMonthCurrent && (
            <Text
              style={{ marginTop: 4, fontWeight: "bold", color: "#3D6DCC" }}
            >
              Today
            </Text>
          )}
        </Actionsheet.Item>
      );
    }

    return (
      <Actionsheet.Item key={index} style={borderStyle} onPress={handleClick}>
        <Text>{`${monthData.month} ${monthData.year}`}</Text>
        {isMonthCurrent && (
          <Text style={{ marginTop: 4, fontWeight: "bold", color: "#3D6DCC" }}>
            Today
          </Text>
        )}
      </Actionsheet.Item>
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Center>
      <Button
        onPress={toggleMenu}
        style={{ backgroundColor: "transparent", borderWidth: 0 }}
      >
        {getCurrentMonthAndYearText()}
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{ backgroundColor: "#E6E6FA" }}>
          <ScrollView style={{ maxHeight: 300 }}>
            {pastMonthsData.map((monthData, index) =>
              renderMonthItem(monthData, index)
            )}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default MonthHistory;
