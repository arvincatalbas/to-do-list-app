import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../src/contexts/AuthContext';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useTodoStore } from '../../src/store/useTodoStore';

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user, signOut, updateProfile } = useAuth();
  const { getActiveTodos, getCompletedTodos, getArchivedTodos } = useTodoStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

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

  const handleEditName = () => {
    if (isEditingName) {
      if (editedName.trim() && editedName !== user?.name) {
        updateProfile({ name: editedName.trim() });
      }
      setIsEditingName(false);
    } else {
      setIsEditingName(true);
      setEditedName(user?.name || '');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName(user?.name || '');
  };

  const handlePickImage = async () => {
    Alert.alert('Photo Upload', 'Photo upload feature requires expo-image-picker package. Please install it with: npm install expo-image-picker');
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage}>
            {user.photoUri ? (
              <Image source={{ uri: user.photoUri }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={[styles.cameraOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.userInfo}>
            {isEditingName ? (
              <View style={styles.nameEditContainer}>
                <TextInput
                  style={[styles.nameInput, {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }]}
                  value={editedName}
                  onChangeText={setEditedName}
                  autoFocus
                  onSubmitEditing={handleEditName}
                  onBlur={handleCancelEdit}
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: colors.success }]}
                    onPress={handleEditName}
                  >
                    <Text style={styles.saveButtonText}>✓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: colors.error }]}
                    onPress={handleCancelEdit}
                  >
                    <Text style={styles.cancelButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <Text style={[styles.userName, { color: colors.text }]}>
                  {user.name}
                </Text>
                <TouchableOpacity
                  style={[styles.editNameButton, { backgroundColor: colors.secondary }]}
                  onPress={handleEditName}
                >
                  <Text style={styles.editNameButtonText}>✏️</Text>
                </TouchableOpacity>
              </>
            )}
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user.email}
            </Text>
            <Text style={[styles.memberSince, { color: colors.textSecondary }]}>
              Member since {formatDate(user.createdAt)}
            </Text>
          </View>
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
          <TouchableOpacity
            style={[styles.menuItem, styles.themeMenuItem, { backgroundColor: colors.surface }]}
            onPress={() => { }}
          >
            <View style={styles.themeContent}>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Theme
              </Text>
              <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>
                Choose your preferred theme
              </Text>
            </View>
            <View style={styles.themeToggleContainer}>
              <ThemeToggle />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.surface }]}
            onPress={() => router.push('/settings')}
          >
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
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 12,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
  },
  nameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  editButtons: {
    flexDirection: 'row',
  },
  saveButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editNameButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  editNameButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
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
  themeMenuItem: {
    marginBottom: 8,
  },
  themeContent: {
    flex: 1,
  },
  themeDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  themeToggleContainer: {
    marginLeft: 12,
    alignItems: 'flex-end',
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
