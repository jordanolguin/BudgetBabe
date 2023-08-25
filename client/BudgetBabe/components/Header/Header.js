import { Header } from "@rneui/themed";
import MonthHistory from "../MonthHistory/MonthHistory";
import CustomHomeButtonGroup from "./CustomHomeBtn";
import { View } from "react-native";

export default function CustomHeader() {
  return (
    <Header
      placement="left"
      barStyle="light-content"
      containerStyle={{
        backgroundColor: "#3D6DCC",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <MonthHistory />
        <CustomHomeButtonGroup />
      </View>
    </Header>
  );
}
