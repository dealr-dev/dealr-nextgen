import React from 'react';
import {
    StyleSheet, TextInput, TextInputProps,
    TextStyle,
    View
} from 'react-native';

interface ReusableInputTextProps extends TextInputProps {
  style?: TextStyle;
  borderless?: boolean;
  viewPass?: boolean; // Optional: not implemented without custom toggle
  password?: boolean;
  label?: string;
}

const ReusableInputText: React.FC<ReusableInputTextProps> = ({
  style,
  borderless = false,
  viewPass = false, // Reserved for future enhancement
  password = false,
  ...rest
}) => {
  return (
    <View style={[styles.inputWrapper, borderless && styles.borderless]}>
      <TextInput
        style={[styles.input, style]}
        secureTextEntry={password}
        {...rest}
      />
    </View>
  );
};

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
});

export default ReusableInputText;
