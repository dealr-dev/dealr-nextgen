import AuthService from '@/services/AuthService';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserRole = 'buyer' | 'seller' | 'exec' | null;

interface AuthContextType {
  user: any | null;
  role: UserRole;
  onboardingComplete: boolean;
  signIn: (role: UserRole) => void;
  signOut: () => void;
  updateUser: (userdetails: any) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const signIn = (r: UserRole) => {
    setUser('user-id');
    setRole(r);
    setOnboardingComplete(false); // assume onboarding not done
  };

  const updateUser = (userdetails: any) => {
    setUser(userdetails);
  }

  const signOut = () => {
    setUser(null);
    setRole(null);
    setOnboardingComplete(false);
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };

  useEffect(() => {

    load();
    async function load() {
      try {
        const user = await AuthService.getCurrentUser();
        setUser(user);
      }
      catch(e) {
        console.log('ERR', e.message);
      }
    }

  }, [])

  return (
    <AuthContext.Provider
      value={{ user, role, onboardingComplete, updateUser, signIn, signOut, completeOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}