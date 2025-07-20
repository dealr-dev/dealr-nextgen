import { createContext, ReactNode, useContext, useState } from 'react';

type UserRole = 'buyer' | 'seller' | 'exec' | null;

interface AuthContextType {
  user: string | null;
  role: UserRole;
  onboardingComplete: boolean;
  signIn: (role: UserRole) => void;
  signOut: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const signIn = (r: UserRole) => {
    setUser('user-id');
    setRole(r);
    setOnboardingComplete(false); // assume onboarding not done
  };

  const signOut = () => {
    setUser(null);
    setRole(null);
    setOnboardingComplete(false);
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, onboardingComplete, signIn, signOut, completeOnboarding }}
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