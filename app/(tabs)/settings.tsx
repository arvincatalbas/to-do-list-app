import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TodoItem from '../../components/TodoItem';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useTodoStore } from '../../src/store/useTodoStore';

export default function Settings() {
  const { getCompletedTodos, toggleTodo, updateTodo, archiveTodo, clearCompleted } = useTodoStore();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const completedTodos = getCompletedTodos();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Completed Tasks</Text>
      </View>

      {completedTodos.length > 0 && (
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: colors.error }]}
          onPress={clearCompleted}
        >
          <Text style={styles.clearButtonText}>Clear All Completed</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={completedTodos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onEdit={updateTodo}
            onArchive={archiveTodo}
            onRestore={() => { }}
            onDelete={() => { }}
            isArchived={false}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {completedTodos.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No completed tasks yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  clearButton: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
