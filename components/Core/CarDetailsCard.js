import Audi from "@/assets/img/audi-a3.jpg";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReusableImage from "../Reusable/Image";

const commonStyle = { height: "100%", width: "100%" };

const CarDetailsCard = ({ vehicle }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatar}>
        <ReusableImage
          style={commonStyle}
          remote={vehicle?.image}
          ImgSrc={vehicle?.image || Audi}
        />
      </View>
      <View style={styles.carInfo}>
        <Text style={styles.titleBold}>{vehicle?.name}</Text>
        <View style={styles.carSetting}>
          <Text style={styles.title}>Demo car setting:</Text>
          <Text style={styles.titleDark}>{vehicle?.description}</Text>
        </View>
        <Text style={styles.titleDark}>
          {`Registration n° `}
          <Text style={styles.titleBold}>12 DD 15</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#EEF4FF",
    flexDirection: "row",
    padding: 15,
    marginTop: 10,
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  carInfo: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  carSetting: {
    paddingBottom: 10,
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6F7889",
  },
  titleDark: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#161616",
  },
  titleBold: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#161616",
  },
});

export default CarDetailsCard;
