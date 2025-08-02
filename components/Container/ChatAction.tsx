import React, { useCallback, useState } from "react";
import {
    Keyboard, StyleSheet, TextInput,
    TouchableOpacity, View
} from "react-native";
import ReusableIcon from "../Reusable/Icon";

interface ChatActionProps {
  testDriverId: string;
  type: string;
  sendHostMessage: (testDriverId: string, message: string) => void;
  sendBuyerMessage: (testDriverId: string, message: string) => void;
}

const ChatAction: React.FC<ChatActionProps> = ({
  testDriverId,
  type,
  sendHostMessage,
  sendBuyerMessage,
}) => {
  const [sendMessage, setSendMessage] = useState("");

  const onSendMessage = useCallback(() => {
    if (!sendMessage.trim()) return;

    if (["sellercustomer", "seller"].includes(type)) {
      sendHostMessage(testDriverId, sendMessage);
    } else {
      sendBuyerMessage(testDriverId, sendMessage);
    }

    setSendMessage("");
  }, [testDriverId, sendMessage, type, sendHostMessage, sendBuyerMessage]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        value={sendMessage}
        blurOnSubmit={true}
        keyboardType="default"
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
          onSendMessage();
        }}
        onChangeText={setSendMessage}
        multiline
        placeholder="Type something..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
        <ReusableIcon
          iconName="arrow-right"
          iconSize={30}
          iconColor="white"
          materialCommunityIcons
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EEF4FF",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  textArea: {
    fontSize: 14,
    color: "#000",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginRight: 10,
    paddingVertical: 5,
  },
  sendButton: {
    borderRadius: 12,
    backgroundColor: "#5A89EA",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginLeft: 5,
  },
});

export default ChatAction;