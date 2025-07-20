import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'} }>
      <Text>OTP Verification</Text>
      <Button title="Next" onPress={() => router.push("/buyer/onboarding")} />
    </View>
  );
}