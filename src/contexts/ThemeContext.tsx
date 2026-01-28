import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  success: string;
  warning: string;
  error: string;
  tabBar: string;
  tabBarActive: string;
}

const lightColors: ThemeColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#E5E5EA',
  shadow: 'rgba(0, 0, 0, 0.1)',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  tabBar: '#FFFFFF',
  tabBarActive: '#007AFF',
};

const darkColors: ThemeColors = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  shadow: 'rgba(0, 0, 0, 0.3)',
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  tabBar: '#1C1C1E',
  tabBarActive: '#0A84FF',
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('system');
  const deviceColorScheme = useNativeColorScheme();

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      return deviceColorScheme === 'dark' ? 'light' : 'dark';
    });
  };

  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return deviceColorScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();
  const colors = effectiveTheme === 'dark' ? darkColors : lightColors;
  const isDark = effectiveTheme === 'dark';

  return (
    <ThemeContext.Provider value={{
      theme,
      colors,
      isDark,
      setTheme,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
