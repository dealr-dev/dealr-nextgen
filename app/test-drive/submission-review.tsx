import Logo from "@/assets/img/DealrLogo.png";
import SubmissionIcon from "@/assets/review-submition.png";
import ReuseableImage from "@/components/Reusable/Image";
import ReusableInnerWrapper from "@/components/Reusable/Wrapper/Inner";
import customTheme from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Platform, SafeAreaView,
    StatusBar, StyleSheet, Text,
    TouchableOpacity, View
} from "react-native";

export default function SubmissionReview() {

    const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ReusableInnerWrapper style={styles.headerWrapper}>
          <LinearGradient
            colors={[
              customTheme.colors.cornflowerBlue,
              customTheme.colors.malibu,
              customTheme.colors.cornflowerBlue,
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientCircle}
          />
          <ReuseableImage
            ImgSrc={Logo}
            style={styles.logo}
          />
        </ReusableInnerWrapper>

        <Text style={styles.heading}>Your submission is under review</Text>

        <View style={styles.iconContainer}>
          <ReuseableImage
            ImgSrc={SubmissionIcon}
            style={{ width: 45, height: 45 }}
          />
        </View>

        <Text style={styles.subHeading}>We will notify you when it will be ready.</Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Listing")}
          >
            <Text style={styles.buttonText}>OK, I got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerWrapper: {
    width: "100%",
    height: 161,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gradientCircle: {
    width: 200,
    height: 261,
    borderRadius: 115,
    transform: [{ scaleX: 2 }],
    position: "absolute",
    top: -154,
    left: 74,
    zIndex: 0,
  },
  logo: {
    width: 80,
    height: 80,
    position: "absolute",
    left: "40%",
    top: 57,
    zIndex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  iconContainer: {
    marginTop: 30,
    backgroundColor: "#EEF4FF",
    padding: 10,
    borderRadius: 100,
  },
  subHeading: {
    fontSize: 16,
    marginTop: 30,
  },
  actionContainer: {
    marginTop: 30,
    width: "90%",
  },
  button: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#5A89EA",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
