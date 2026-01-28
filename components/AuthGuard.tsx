import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/sign-in');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return null; // Or show a loading spinner
  }

  if (!user) {
    return null; // Will redirect to sign-in
  }

  return <>{children}</>;
}
