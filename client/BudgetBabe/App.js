import { StatusBar } from "expo-status-bar";
import CustomHeader from "./components/Header/Header";
import { StyleSheet } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import HomeScreen from "./components/HomeScreen/HomeScreen";

export default function App() {
  return (
    <>
      <CustomHeader />
      <NativeBaseProvider>
        <Box>
          <HomeScreen />
        </Box>
      </NativeBaseProvider>
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
