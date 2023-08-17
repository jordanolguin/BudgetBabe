import { Header } from "@rneui/themed";
import CustomHomeButton from "./CustomHomeBtn";

export default function CustomHeader() {
  return (
    <>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={<CustomHomeButton />}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    </>
  );
}
