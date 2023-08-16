import { Header } from "@rneui/themed";

export default function CustomHeader() {
  return (
    <>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "BudgetBABE", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    </>
  );
}
