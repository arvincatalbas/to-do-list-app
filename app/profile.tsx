import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../src/contexts/ThemeContext';
import { useAuth } from '../src/contexts/AuthContext';
import { useTodoStore } from '../src/store/useTodoStore';
import ThemeToggle from '../components/ThemeToggle';

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user, signOut } = useAuth();
  const { getActiveTodos, getCompletedTodos, getArchivedTodos } = useTodoStore();

  const activeTodos = getActiveTodos();
  const completedTodos = getCompletedTodos();
  const archivedTodos = getArchivedTodos();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/sign-in');
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing coming soon!');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return null;
  }

  return (
    <View style={[styles.container, { 
      backgroundColor: colors.background, 
      paddingTop: insets.top, 
      paddingBottom: insets.bottom 
    }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <ThemeToggle />
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user.email}
            </Text>
            <Text style={[styles.memberSince, { color: colors.textSecondary }]}>
              Member since {formatDate(user.createdAt)}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: colors.secondary }]}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>Task Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>
                {activeTodos.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Active Tasks
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.success }]}>
                {completedTodos.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Completed
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.warning }]}>
                {archivedTodos.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Archived
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Settings
            </Text>
            <Text style={[styles.menuItemIcon, { color: colors.textSecondary }]}>
              ⚙️
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Help & Support
            </Text>
            <Text style={[styles.menuItemIcon, { color: colors.textSecondary }]}>
              ❓
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface }]}>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              About
            </Text>
            <Text style={[styles.menuItemIcon, { color: colors.textSecondary }]}>
              ℹ️
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.signOutItem, { backgroundColor: colors.error }]}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
            <Text style={styles.signOutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  menuContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  signOutItem: {
    marginBottom: 0,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  signOutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  signOutIcon: {
    fontSize: 20,
    color: '#fff',
  },
});
