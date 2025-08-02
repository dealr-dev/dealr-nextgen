import React from 'react';
import {
  TextInput, TextInputProps,
  TextStyle,
  View
} from 'react-native';
import { styles } from '../../../styles';

interface ReusableInputTextProps extends TextInputProps {
  style?: TextStyle;
  borderless?: boolean;
  viewPass?: boolean; // Optional: not implemented without custom toggle
  password?: boolean;
  label?: string;
  handleTextChange? : (text: string) => void;
}

const ReusableInputText: React.FC<ReusableInputTextProps> = ({
  style,
  borderless = false,
  viewPass = false, // Reserved for future enhancement
  password = false,
  handleTextChange,
  ...rest
}) => {
  return (
    <View>
      <TextInput
        style={styles(style).appInputText}
        secureTextEntry={password}
        onChangeText={handleTextChange}
        {...rest}
      />
    </View>
  );
};
/*
const styles = StyleSheet.create({
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 12,
  },
  borderless: {
    borderBottomWidth: 0,
  },
  input: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});*/

export default ReusableInputText;
