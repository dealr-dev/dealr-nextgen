import '@/config/amplify-config';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from './context/AuthContext';


function AuthLayout() {
  const { user, onboardingComplete, role } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
  
    if (!user) {
      router.replace('/');
    } else if (user && !onboardingComplete) {
      router.replace(`/${role}/onboarding`);
    } else if (user && onboardingComplete) {
      router.replace('/dashboard'); // 👈 route to role-aware layout
    }
  }, [ready, user, onboardingComplete, role]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/sign-in" />
      <Stack.Screen name="auth/sign-up" />
      <Stack.Screen name="auth/exec-link" />
      <Stack.Screen name="auth/verify-otp" />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!loaded) {
    
    return null;
  }

  return (
    <AuthProvider>
      <AuthLayout />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
