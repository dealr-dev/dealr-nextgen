import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReusableIcon from "../Reusable/Icon";

const AddressLocationCard = ({ address, date, onHandlePress, time }) => {
  const displayDate = date && time ? moment(date).calendar().split("at")[0] + time : "...";
  const displayAddress = address || "...";

  return (
    <View style={styles.cardContainer}>
      <View style={styles.addressInfo}>
        <Text style={styles.titleBold}>{displayDate}</Text>
        <Text style={styles.title}>{displayAddress}</Text>
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={onHandlePress}>
        <ReusableIcon
          iconName="location"
          iconSize={38}
          iconColor="cornflowerBlue"
          evilicons
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
    marginBottom: 25,
  },
  addressInfo: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#161616",
  },
  titleBold: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#161616",
  },
  locationButton: {
    borderRadius: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#5a89ea",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});

export default AddressLocationCard;
