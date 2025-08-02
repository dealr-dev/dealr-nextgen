import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AddButton from "./addButton";

const Notes = ({ note, notetime, onInputChange }) => {
  const [textValue, setTextValue] = useState(note);
  const [inputShow, setShow] = useState(true);

  const onNotesChange = (text) => {
    setTextValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.time}>{moment(notetime).format("HH:mm")}</Text>
        <TextInput
          style={[styles.textArea, inputShow && styles.textAreaHidden]}
          onEndEditing={(e) => {
            setShow(!inputShow);
            onInputChange(e.nativeEvent.text);
          }}
          onChangeText={onNotesChange}
          editable={!inputShow}
          multiline
          value={textValue}
        />
      </View>
      <AddButton
        iconName={!inputShow ? "save" : "plus"}
        onAdd={() => setShow(!inputShow)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  cardContainer: {
    flex: 0.9,
    backgroundColor: "#ffffff",
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 25,
    marginRight: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    padding: 10,
    borderRadius: 2,
    fontSize: 14,
    color: "#000",
  },
  textAreaHidden: {
    borderColor: "#FFFF",
  },
  time: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6F7889",
    paddingLeft: 10,
  },
});

export default Notes;
