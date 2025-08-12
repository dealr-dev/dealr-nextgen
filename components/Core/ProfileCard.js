import UserAvatar from "@/assets/user_default.png";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReusableImage from "../Reusable/Image";
import Rating from "./Rating";

const commonStyle = { height: "100%", width: "100%" };

const CarDetailsCard = ({ profile }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatar}>
        <ReusableImage
          style={commonStyle}
          remote={profile?.avatar}
          ImgSrc={profile?.avatar || UserAvatar}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.title}>Your host</Text>
        <Text style={styles.titleBold}>{profile?.name}</Text>
      </View>
      <View style={styles.ratingWrapper}>
        <Rating vehicle={{ rating: profile?.rating }} size={12} iconSpacing={5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#EEF4FF",
    padding: 15,
    marginTop: 10,
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
  },
  userInfo: {
    flex: 1,
    paddingLeft: 25,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6F7889",
  },
  titleBold: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 28,
    color: "#161616",
  },
  ratingWrapper: {},
});

export default CarDetailsCard;
