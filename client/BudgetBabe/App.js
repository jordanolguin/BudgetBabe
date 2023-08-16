import { StatusBar } from "expo-status-bar";
import CustomHeader from "./components/Header/Header";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <>
      <CustomHeader />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
