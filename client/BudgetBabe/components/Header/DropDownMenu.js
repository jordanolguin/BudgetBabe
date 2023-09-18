import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../apollo/mutations/mutations";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Icon, Text, Overlay } from "react-native-elements";
import { useAuth } from "../../utils/AuthContext";
import AuthService from "../../utils/storage";

export default function DropDownMenu({ navigation }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER);
  const { profile } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = profile?.data?._id;
      const { data } = await deleteUser({
        variables: { userId },
      });
      if (data.deleteUser) {
        navigation.navigate("Budget Babe");
      } else {
        Alert.alert("Error", "Failed to delete account");
      }
    } catch (error) {
      console.error("Failed to delete account", error);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "Logout") {
      AuthService.logout();
      navigation.navigate("Budget Babe");
    } else if (option === "Affirmations") {
      navigation.navigate("Profile", { selectedTab: null });
      toggleDropdown();
    } else if (option === "Delete Account") {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account?",
        [
          {
            text: "Cancel",
            onPress: () => {
              toggleDropdown();
            },
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => {
              handleDeleteAccount();
            },
          },
        ]
      );
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
