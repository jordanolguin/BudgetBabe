import { Header } from "@rneui/themed";
import MonthHistory from "../MonthHistory/MonthHistory";

export default function CustomHeader() {
  return (
    <>
      <Header
        placement="left"
        // statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content" // or directly
        leftComponent={<MonthHistory />}
        containerStyle={{
          backgroundColor: "#3D6DCC",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      />
    </>
  );
}
