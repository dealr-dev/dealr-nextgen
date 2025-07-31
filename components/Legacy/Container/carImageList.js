import React from "react";
import { StyleSheet, View } from "react-native";
import AddButton from "../Core/AddButton";
import ImageView from "../Core/ImageWithProgress";

const ImageList = ({ handleOnPress, images = [], onRemoveImage }) => {
  return (
    <View style={styles.container}>
      {images?.map((item, index) => (
        <ImageView
          key={index + 1}
          src={item}
          onRemove={() => onRemoveImage(index, images)}
        />
      ))}
      <View style={styles.addButtonContainer}>
        <AddButton onAdd={handleOnPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  addButtonContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 96,
    height: 96,
  },
});

export default ImageList;