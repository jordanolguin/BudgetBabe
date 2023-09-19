import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LandingHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Budget Babe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#3D6DCC",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingTop: 20,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
});

export default LandingHeader;
