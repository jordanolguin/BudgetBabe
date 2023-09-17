import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text, Overlay } from "react-native-elements";
import AuthService from "../../utils/storage";
import DeleteAccount from "../DeleteAccount/DeleteAccount";

export default function DropDownMenu({ navigation }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDeleteAccount = () => {
    setIsDeleteAccountOpen(!isDeleteAccountOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === "Logout") {
      AuthService.logout();
      navigation.navigate("Budget Babe");
    } else if (option === "Affirmations") {
      navigation.navigate("Profile", { selectedTab: null });
      toggleDropdown();
    } else if (option === "Delete Account") {
      toggleDeleteAccount();
      toggleDropdown();
    }
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
          <TouchableOpacity onPress={() => handleOptionSelect("Affirmations")}>
            <Text
              style={{
                padding: 3,
                fontSize: 18,
                color: "#3D6DCC",
              }}
            >
              Affirmations
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#003366",
              width: "106%",
              alignSelf: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          />
          <TouchableOpacity
            onPress={() => handleOptionSelect("Delete Account")}
          >
            <Text
              style={{
                padding: 3,
                fontSize: 18,
                color: "#3D6DCC",
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#003366",
              width: "106%",
              alignSelf: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          />
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
        <DeleteAccount
          isOpen={isDeleteAccountOpen}
          onClose={toggleDeleteAccount}
        />
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
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 10,
    zIndex: 1,
  },
  overlayVisible: {
    display: "flex",
  },
});
