import { Header } from "@rneui/themed";
import MonthHistory from "../MonthHistory/MonthHistory";
import CustomHomeButtonGroup from "./CustomHomeBtn";
import { View } from "react-native";
import DropDownMenu from "./DropDownMenu";

export default function CustomHeader({ onTabSelect, initialIndex }) {
  return (
    <Header
      placement="left"
      barStyle="light-content"
      containerStyle={{
        backgroundColor: "#3D6DCC",
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MonthHistory />
          <View style={{ width: 130 }} />
          <DropDownMenu />
        </View>
        <CustomHomeButtonGroup
          onTabSelect={onTabSelect}
          initialIndex={initialIndex}
        />
      </View>
    </Header>
  );
}
