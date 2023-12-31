import React, { Component } from "react";
import { Text } from "react-native";
import { ButtonGroup } from "react-native-elements";

class CustomHomeButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.initialIndex || null,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    if (this.props.onTabSelect) {
      this.props.onTabSelect(selectedIndex);
    }
  }

  render() {
    const component1 = () => <Text style={{ color: "white" }}>Income</Text>;
    const component2 = () => <Text style={{ color: "white" }}>Expense</Text>;
    const component3 = () => <Text style={{ color: "white" }}>Remaining</Text>;

    const buttons = [
      { element: component1 },
      { element: component2 },
      { element: component3 },
    ];

    const { selectedIndex } = this.state;

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          width: 350,
          height: 30,
          alignSelf: "center",
          backgroundColor: "#003366",
          borderColor: "#003366",
          borderRadius: 8,
        }}
        buttonStyle={{ backgroundColor: "#003366", borderRadius: 4 }}
        selectedButtonStyle={{ backgroundColor: "#3D6DCC" }}
        textStyle={{ color: "white" }}
        innerBorderStyle={{ width: 0 }}
      />
    );
  }
}

export default CustomHomeButtonGroup;
