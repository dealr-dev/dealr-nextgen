import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Rating from "../Core/Rating";

const RatingList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        <View style={styles.ratingWrapper}>
          <Text style={styles.title}>Test drive</Text>
          <Rating vehicle={{ rating: 4 }} hideValue={true} size={18} iconSpacing={5} />
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={styles.title}>Enjoyment</Text>
          <Rating vehicle={{ rating: 3.5 }} hideValue={true} size={18} iconSpacing={5} />
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={styles.title}>Handling</Text>
          <Rating vehicle={{ rating: 3 }} hideValue={true} size={18} iconSpacing={5} />
        </View>
      </View>
      <View style={styles.rightWrapper}>
        <View style={styles.ratingWrapper}>
          <Text style={styles.title}>Condition</Text>
          <Rating vehicle={{ rating: 4.7 }} hideValue={true} size={18} iconSpacing={5} />
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={styles.title}>Host</Text>
          <Rating vehicle={{ rating: 4.7 }} hideValue={true} size={18} iconSpacing={5} />
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={styles.title}>Value for money</Text>
          <Rating vehicle={{ rating: 4.7 }} hideValue={true} size={18} iconSpacing={5} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  rightWrapper: {
    flex: 1,
    marginLeft: 60,
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#161616",
    paddingBottom: 10,
  },
  ratingWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default RatingList;
