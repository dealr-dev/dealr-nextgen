import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Seller Onboarding</Text>
      <Button title="Next" onPress={() => router.push("/seller/listings")} />
    </View>
  );
}