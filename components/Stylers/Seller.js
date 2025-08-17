import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// DropDownWrapper
export const DropDownWrapper = ({ children, style }) => (
  <View style={[styles.dropDownWrapper, style]}>{children}</View>
);

// Error text
export const Error = ({ children, style }) => (
  <Text style={[styles.error, style]}>{children}</Text>
);

// NoError (empty placeholder but keeps layout consistent)
export const NoError = ({ children, style }) => (
  <View style={[styles.noError, style]}>{children}</View>
);

// InputBottomBorder wrapper
export const InputBottomBorder = ({ children, style }) => (
  <View style={[styles.inputBottomBorder, style]}>{children}</View>
);

// InputContainer
export const InputContainer = ({ children, style }) => (
  <View style={[styles.inputContainer, style]}>{children}</View>
);

// Title text
export const Title = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

// ButtonTitle with dynamic props
export const ButtonTitle = ({
  children,
  fontfamily = "Poppins-Bold",
  fontWeight = "500",
  fontsize = 20,
  color = "#000000",
  align = "left",
  style,
}) => (
  <Text
    style={[
      styles.buttonTitle,
      { fontFamily: fontfamily, fontWeight, fontSize: fontsize, color, textAlign: align },
      style,
    ]}
  >
    {children}
  </Text>
);

// Button with dynamic props
export const Button = ({
  children,
  onPress,
  fontfamily = "Poppins-Bold",
  fontsize = 20,
  bgColor = "#5A89EA",
  align = "left",
  style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      { backgroundColor: bgColor, textAlign: align },
      style,
    ]}
  >
    <Text
      style={{
        fontFamily: fontfamily,
        fontSize: fontsize,
        color: "#fff",
        letterSpacing: 0.5,
      }}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

// Error container
export const ErrorContainer = ({ children, style }) => (
  <View style={[styles.errorContainer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  dropDownWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  error: {
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    fontSize: 12,
    color: "#f01",
    textAlign: "center",
  },
  noError: {
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  inputBottomBorder: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    height: 60,
    width: "90%",
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D7DD",
    position: "relative",
  },
  inputContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 12,
    color: "#6F7889",
  },
  buttonTitle: {
    letterSpacing: 0.5,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "90%",
  },
  errorContainer: {
    paddingHorizontal: 10,
    position: "absolute",
    right: 0,
    bottom: -20,
  },
});
