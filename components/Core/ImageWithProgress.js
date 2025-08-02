import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ReusableIcon from "../Reusable/Icon";
import ReusableImage from "../Reusable/Image";

const commonStyle = { height: "100%", width: "100%" };

const ImageView = ({ src, onRemove }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeWrapper} onPress={onRemove}>
        <ReusableIcon
          iconName="close"
          iconSize={15}
          iconColor="white"
          fontAwesome
        />
      </TouchableOpacity>
      <View style={styles.avatar}>
        <ReusableImage style={commonStyle} remote ImgSrc={src} />
      </View>
      {/* Uncomment if progress bar is needed in future
      <View style={styles.progressWrapper}>
        <View style={[styles.progressView, { width: "100%" }]} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    width: 96,
    height: 96,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  closeWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 20,
    width: 20,
    backgroundColor: "#5a89ea",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  // Uncomment if progress view is re-enabled later
  // progressWrapper: {
  //   position: "absolute",
  //   bottom: 10,
  //   left: 5,
  //   width: 90,
  //   height: 10,
  // },
  // progressView: {
  //   backgroundColor: "#5a89ea",
  //   height: "100%",
  //   borderRadius: 10,
  // },
});

export default ImageView;
