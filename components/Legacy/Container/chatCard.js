import React from "react";
import {
  Dimensions, StyleSheet, Text, View
} from "react-native";
import ReceiveVector from "../../../assets/Vector-receive.png";
import SenderVector from "../../../assets/Vector.png";
import ReusableImage from "../Reusable/Image";

const ChatMessage = ({ message, type }) => {
  const { width } = Dimensions.get("window");
  const sender =
    message?.type ===
    (["sellercustomer", "seller"].includes(type) ? "host" : "buyer");

  return (
    <View style={[styles.container, { width }]}>
      <View
        style={[
          styles.messageContainer,
          sender ? styles.senderAlign : styles.receiverAlign,
        ]}
      >
        <View
          style={[
            styles.boxContainer,
            sender ? styles.senderBox : styles.receiverBox,
          ]}
        >
          <View style={styles.messageWrapper}>
            <Text style={[styles.textMessage, sender ? styles.senderText : styles.receiverText]}>
              {message?.message}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.vectorImage,
            sender ? styles.vectorSender : styles.vectorReceiver,
          ]}
        >
          <ReusableImage
            style={{ height: "100%", width: "100%" }}
            ImgSrc={sender ? SenderVector : ReceiveVector}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  messageContainer: {
    width: "100%",
    flexDirection: "row",
  },
  senderAlign: {
    justifyContent: "flex-end",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 0,
  },
  receiverAlign: {
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  },
  boxContainer: {
    zIndex: 100,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  senderBox: {
    backgroundColor: "#5a89ea",
    borderTopRightRadius: 0,
  },
  receiverBox: {
    backgroundColor: "#eef4ff",
    borderTopLeftRadius: 0,
  },
  messageWrapper: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textMessage: {
    fontSize: 14,
  },
  senderText: {
    color: "#ffffff",
  },
  receiverText: {
    color: "#030303",
  },
  vectorImage: {
    position: "absolute",
    width: 15,
    height: 15,
  },
  vectorSender: {
    top: 10,
    right: 10,
  },
  vectorReceiver: {
    top: 15,
    left: 10,
  },
});

export default ChatMessage;