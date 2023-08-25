import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function DropDownMenu({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Icon name="menu" type="material" color="#fff" />
      </View>
    </TouchableOpacity>
  );
}
