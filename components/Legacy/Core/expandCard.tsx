import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReusableIcon from "../Reusable/Icon";
import FeatureList from "./list";

const ExpandCard = ({ vehicle, handleOnPress }) => {
  const [expand, setExpand] = useState(false);

  const carHas: string[] = [];

  return (
    <TouchableOpacity
      style={styles.expandContainer}
      activeOpacity={1}
      onPress={() => setExpand(!expand)}
    >
      <View style={styles.expandHeading}>
        <View style={styles.infoText}>
          <Text style={styles.text}>
            This matches{" "}
            <Text style={styles.textBold}>
              {vehicle?.matches?.description}{" "}
            </Text>
            features
          </Text>
        </View>
        <View style={styles.expandArrowIcon}>
          <ReusableIcon
            iconName="angle-down"
            fontAwesome={true}
            iconSize={20}
            iconColor="cornflowerBlue"
          />
        </View>
      </View>

      {expand && (
        <View style={styles.expandBody}>
          <FeatureList
            show={false}
            leftContent="This car"
            leftContentBold="has:"
            rightContent={carHas}
            circleColor="#5A89EA"
          />
          <FeatureList
            show={vehicle?.matches?.available.length > 0}
            leftContent="Not on this car, but"
            leftContentBold="available on this model:"
            rightContent={vehicle?.matches?.available}
            circleColor="#0FAF01"
          />
          <FeatureList
            show={vehicle?.matches?.unavailable.length > 0}
            leftContent="Not"
            leftContentBold="available on this model:"
            rightContent={vehicle?.matches?.unavailable}
            circleColor="#FF0000"
          />
        </View>
      )}

      {expand && (
        <View style={styles.expandFooter}>
          <TouchableOpacity
            style={[styles.button, styles.transparentButton]}
            onPress={() => handleOnPress("more")}
          >
            <Text style={[styles.buttonText, { color: "#5A89EA" }]}>Learn More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.filledButton]}
            onPress={() => handleOnPress("book")}
          >
            <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Book a test drive</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expandContainer: {
    padding: 10,
    backgroundColor: "#EEF4FF",
    borderTopWidth: 1,
    borderTopColor: "#84AAF7",
    borderBottomWidth: 1,
    borderBottomColor: "#84AAF7",
    borderLeftWidth: 1,
    borderLeftColor: "#84AAF7",
    borderRightWidth: 1,
    borderRightColor: "#84AAF7",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  expandHeading: {
    flexDirection: "row",
  },
  infoText: {
    flex: 1,
    flexDirection: "row",
  },
  expandArrowIcon: {
    alignItems: "flex-end",
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#6F7889",
  },
  textBold: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: "#5A89EA",
  },
  expandBody: {
    paddingRight: 15,
  },
  expandFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 15,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5A89EA",
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginLeft: 10,
  },
  transparentButton: {
    backgroundColor: "transparent",
  },
  filledButton: {
    backgroundColor: "#5A89EA",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
});

export default ExpandCard;