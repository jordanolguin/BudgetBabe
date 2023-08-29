import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text, Overlay } from "react-native-elements";

export default function DropDownMenu({ onSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
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
            <Text style={{ padding: 10 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#fff",
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
