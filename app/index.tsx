
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Dealr</Text>
      <Button title="I am a Buyer" onPress={() => router.push('/auth/sign-up?role=buyer')} />
      <Button title="I am a Seller" onPress={() => router.push('/auth/sign-up?role=seller')} />
      <Button title="Already have an account" onPress={() => router.push('/auth/sign-in')} />
      <Button title="I am a Sales Exec" onPress={() => router.push('/auth/exec-link')} />
    </View>
  );
}
