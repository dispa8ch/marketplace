'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  getCurrentUser,
  setCurrentUser,
  type MockUser,
} from '@/lib/storage';

interface AuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize auth state from localStorage
    const token = getAuthToken();
    if (token) {
      const storedUser = getCurrentUser();
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - just create a token and user
    const mockUser: MockUser = {
      id: '1',
      name: 'John Doe',
      email,
    };
    
    const mockToken = `mock_token_${Date.now()}`;
    setAuthToken(mockToken);
    setCurrentUser(mockUser);
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup
    const mockUser: MockUser = {
      id: `user_${Date.now()}`,
      name,
      email,
    };
    
    const mockToken = `mock_token_${Date.now()}`;
    setAuthToken(mockToken);
    setCurrentUser(mockUser);
    setUser(mockUser);
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
