import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  forcedValue?: boolean
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return forcedValue || !saved ? initialValue : JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
