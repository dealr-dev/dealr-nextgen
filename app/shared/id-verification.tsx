import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function IDVerification() {
  const [idNumber, setIdNumber] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter your 13-digit SA ID Number</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
        keyboardType="number-pad"
        maxLength={13}
        placeholder="SA ID Number"
        value={idNumber}
        onChangeText={setIdNumber}
      />
      <Button title="Submit" onPress={() => alert(`Submitted: ${idNumber}`)} />
    </View>
  );
}
