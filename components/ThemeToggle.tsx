import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

  const getThemeDescription = () => {
    if (theme === 'light') return 'Always light mode';
    if (theme === 'dark') return 'Always dark mode';
    return 'Follow system';
  };

  return (
    <TouchableOpacity
      style={[styles.container, {
        backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
        borderColor: isDark ? '#48484A' : '#D1D1D6'
      }]}
      onPress={handleThemeToggle}
    >
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          {getThemeIcon()}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          {getThemeLabel()}
        </Text>
        <Text style={[styles.description, { color: isDark ? '#8E8E93' : '#8E8E93' }]}>
          {getThemeDescription()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 140,
  },
  iconContainer: {
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 11,
    marginTop: 1,
  },
});
