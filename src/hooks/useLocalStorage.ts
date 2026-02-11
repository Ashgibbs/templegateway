import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value or use initial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      return valueToStore;
    });
  }, []);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Hook for managing admin session
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('cms_admin_auth', false);
  const [adminPassword] = useLocalStorage('cms_admin_password', 'admin123'); // Default password

  const login = useCallback((password: string) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [adminPassword, setIsAuthenticated]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return { isAuthenticated, login, logout };
}
