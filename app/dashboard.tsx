import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

export default function Dashboard() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.replace(`/${role}`);
    }
  }, [role]);

  return null; // You can show a loading spinner here
}
