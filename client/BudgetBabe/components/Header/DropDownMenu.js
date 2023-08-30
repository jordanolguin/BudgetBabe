import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text, Overlay } from "react-native-elements";
import AuthService from "../../utils/storage";

export default function DropDownMenu({ navigation }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === "Logout") {
      AuthService.logout();
      navigation.navigate("Budget Babe");
    }
    toggleDropdown();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Icon name="perm-identity" type="material" color="#fff" />
      </TouchableOpacity>

      <Overlay
        isVisible={isDropdownOpen}
        onBackdropPress={toggleDropdown}
        overlayStyle={[
          styles.overlay,
          isDropdownOpen ? styles.overlayVisible : null,
        ]}
      >
        <View>
          <TouchableOpacity onPress={() => handleOptionSelect("Logout")}>
            <Text
              style={{
                padding: 3,
                fontSize: 18,
                color: "#3D6DCC",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#E6E6FA",
    width: "80%",
    position: "absolute",
    top: 100,
    left: "13%",
    borderRadius: 10,
    zIndex: 1,
  },
  overlayVisible: {
    display: "flex",
  },
});
