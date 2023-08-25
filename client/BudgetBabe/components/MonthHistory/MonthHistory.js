import { useState, useEffect } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

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
      borderColor: "gray",
      borderRadius: 4,
      padding: 8,
      marginBottom: 8,
      fontWeight: "normal",
    };

    const pastStyle = {
      ...defaultStyle,
      borderColor: "#FF5733",
      fontWeight: "bold",
    };

    const futureStyle = {
      ...defaultStyle,
      borderColor: "#33FF57",
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

    return (
      <Actionsheet.Item key={index} style={borderStyle}>
        <Text>{`${monthData.month} ${monthData.year}`}</Text>
        {isMonthCurrent && (
          <Text style={{ marginTop: 4, fontWeight: "bold", color: "blue" }}>
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

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <Center>
      <Button
        onPress={toggleMenu}
        style={{ backgroundColor: "transparent", borderWidth: 0 }}
      >
        {getCurrentMonthAndYearText()}
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
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
