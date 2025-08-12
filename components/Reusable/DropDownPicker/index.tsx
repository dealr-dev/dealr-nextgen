import CustomTheme from '@/theme';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';

interface DropDownItem {
  label: string;
  value: string;
}

interface DropDownPickerProps {
  placeholder?: string;
  items: DropDownItem[];
  onValueChange: (value: string) => void;
  selectedValue?: string;
}

const DropDownPicker: React.FC<DropDownPickerProps> = ({
  placeholder = 'Select an option...',
  items,
  onValueChange,
  selectedValue,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value: string) => {
    setVisible(false);
    onValueChange(value);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.inputText}>
          {items.find((item) => item.value === selectedValue)?.label || placeholder}
        </Text>
        <AntDesign name="caretdown" size={16} color={CustomTheme.colors.cornflowerBlue} />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: CustomTheme.colors.alto,
    paddingVertical: 12,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContainer: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 5,
  },
  option: {
    padding: 15,
    borderBottomColor: CustomTheme.colors.gallery,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 14,
    color: '#161616',
  },
});

export default DropDownPicker;
