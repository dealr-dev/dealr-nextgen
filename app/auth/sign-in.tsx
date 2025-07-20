import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign In</Text>
      <Button title="Login as Buyer" onPress={() => signIn('buyer')} />
      <Button title="Login as Seller" onPress={() => signIn('seller')} />
      <Button title="Login as Exec" onPress={() => signIn('exec')} />
    </View>
  );
}
