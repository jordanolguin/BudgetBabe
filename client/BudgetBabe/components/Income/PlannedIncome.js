import { Text, Box, Heading } from "native-base";
import { View } from "react-native";

const PlannedIncome = ({ data }) => {
  return (
    <Box
      style={{
        width: 150,
        height: 150,
        borderRadius: 15,
        borderColor: "#003366",
        borderWidth: 2,
        alignItems: "center",
        backgroundColor: "#E6E6FA",
      }}
    >
      <Heading size="md" style={{ textAlign: "center", color: "#3D6DCC" }}>
        Planned Income Total
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
      <Text style={{ textAlign: "left", color: "#3D6DCC" }}>${data}</Text>
    </Box>
  );
};

export default PlannedIncome;
