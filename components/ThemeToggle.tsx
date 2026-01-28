import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';
import { Text } from './Themed';

export default function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '🌓';
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Light';
    if (theme === 'dark') return 'Dark';
    return 'System';
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }]}
      onPress={handleThemeToggle}
    >
      <Text style={[styles.icon, { color: isDark ? '#FFFFFF' : '#000000' }]}>
        {getThemeIcon()}
      </Text>
      <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>
        {getThemeLabel()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
