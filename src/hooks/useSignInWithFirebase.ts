import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

export function useSignInWithFirebase(): boolean[] {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const handleUserAuth = (user: User | null): void => {
      setIsSignedIn(!!user);
      setIsLoading(false);
    };

    onAuthStateChanged(getAuth(), handleUserAuth);
  }, []);

  return [isSignedIn, isLoading];
}
