import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage/session)
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // In a real app, you'd check secure storage or validate tokens
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Basic validation
      if (!email || !password || !name) {
        return { success: false, error: 'All fields are required' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Check if user already exists (in real app, this would be an API call)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date(),
      };

      // Save user (in real app, this would be an API call)
      existingUsers.push({ ...newUser, password });
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto sign in after successful registration
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Basic validation
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      // Check credentials (in real app, this would be an API call)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Set user (without password)
      const userWithoutPassword: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
      };

      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Sign in failed' };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signUp,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
