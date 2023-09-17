import { PieChart } from "react-native-chart-kit";

const MyPieChart = ({ data }) => {
  const isEmptyData =
    !data ||
    (data.totalIncome === 0 && data.totalExpense === 0 && data.savings === 0);

  const chartData = isEmptyData
    ? [
        {
          name: "No Data",
          population: 1,
          color: "#CCCCCC",
          legendFontColor: "#fff",
          legendFontSize: 15,
        },
      ]
    : [
        {
          name: "Income",
          population: data.totalIncome,
          color: "#4CAF50",
          legendFontColor: "#fff",
          legendFontSize: 15,
        },
        {
          name: "Expenses",
          population: data.totalExpense,
          color: "#F44336",
          legendFontColor: "#fff",
          legendFontSize: 15,
        },
        {
          name: "Savings",
          population: data.savings,
          color: "#2196F3",
          legendFontColor: "#fff",
          legendFontSize: 15,
        },
      ];

  return (
    <PieChart
      data={chartData}
      width={300}
      height={200}
      chartConfig={{
        backgroundColor: "transparent",
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      }}
    />
  );
};

export default MyPieChart;
