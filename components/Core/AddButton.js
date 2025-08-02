import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ReusableIcon from "../Reusable/Icon";

const AddButton = ({ onAdd, iconName = "plus" }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onAdd}>
      <ReusableIcon
        iconName={iconName}
        iconSize={24}
        iconColor="cornflowerBlue"
        antDesign
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#5a89ea",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});

export default AddButton;
