import React from "react";
import {
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import ReusableIcon from "../Reusable/Icon";

const BottomActionSheet = ({ openAppSettings }) => {
  return (
    <View style={styles.actionSheet}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <ReusableIcon
            iconName="wifi-off"
            iconSize={30}
            iconColor="white"
            materialCommunityIcons
          />
        </View>
        <View style={styles.contentTitle}>
          <Text style={[styles.titleText, styles.titleLarge]}>
            No internet connection found
          </Text>
          <Text style={[styles.titleText, styles.titleSmall]}>
            Check your connection
          </Text>
        </View>
        <TouchableOpacity style={styles.retryButton} onPress={openAppSettings}>
          <Text style={styles.retryButtonText}>Retry Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    height: "40%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 3,
  },
  iconWrapper: {
    height: "14%",
    width: "10%",
    backgroundColor: "#5a89ea",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "BebasNeue-Regular",
    color: "#000000",
    textAlign: "center",
  },
  titleLarge: {
    fontSize: 24,
  },
  titleSmall: {
    fontSize: 20,
  },
  retryButton: {
    width: "45%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5a89ea",
    backgroundColor: "#5A89EA",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default BottomActionSheet;
