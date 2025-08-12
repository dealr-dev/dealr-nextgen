import colors from '@/theme/colors';
import spacing from '@/theme/spacing';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface TextFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  style,
  placeholder,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 8,
    fontSize: 14,
    color: colors.text,
    backgroundColor: '#fff',
    width: 201,
    height: 52,
    marginBottom: 2
  },
});

export default TextField;
