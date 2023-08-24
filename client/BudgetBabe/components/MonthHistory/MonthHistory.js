import {
  Actionsheet,
  useDisclose,
  Center,
  Button,
  Box,
  Text,
  ScrollView,
} from "native-base";

function MonthHistory() {
  const { isOpen, onOpen, onClose } = useDisclose();

  // Function to get the current month and year
  const getCurrentMonthAndYear = () => {
    const today = new Date();
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
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return (
      <Text>
        <Text fontSize={22} fontWeight="bold" color="white">
          {month}
        </Text>{" "}
        <Text fontSize={22} color="white">
          {year}
        </Text>
      </Text>
    );
  };

  const generateMonthsForYear = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
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
    const months = [];

    //Generate months for the entire year
    for (let i = 0; i < 12; i++) {
      months.push({ month: monthNames[i], year: currentYear.toString() });
    }

    return months;
  };

  const pastMonthsData = generateMonthsForYear();

  const isMonthInPast = (month, year) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

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
    const monthIndex = monthNames.indexOf(month);
    if (
      year < currentYear ||
      (year === currentYear && monthIndex <= currentMonth)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Center>
      <Button onPress={onOpen} style={{ backgroundColor: "transparent" }}>
        {getCurrentMonthAndYear()}
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Previous Months
            </Text>
          </Box>
          <ScrollView style={{ maxHeight: 300 }}>
            {pastMonthsData.map((monthData, index) => (
              <Actionsheet.Item
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: isMonthInPast(monthData.month, monthData.year)
                    ? "solid"
                    : "dashed",
                  borderRadius: 4,
                  padding: 8,
                  marginBottom: 8,
                }}
              >
                {`${monthData.month} ${monthData.year}`}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default MonthHistory;
