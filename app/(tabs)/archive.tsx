import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useTodoStore } from '../../src/store/useTodoStore';
import TodoItem from '../../components/TodoItem';
import ThemeToggle from '../../components/ThemeToggle';

export default function Archive() {
  const { getArchivedTodos, restoreTodo, deleteTodo } = useTodoStore();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const archivedTodos = getArchivedTodos();

  return (
    <View style={[styles.container, { 
      backgroundColor: colors.background, 
      paddingTop: insets.top, 
      paddingBottom: insets.bottom 
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Archived Tasks</Text>
        <ThemeToggle />
      </View>
      
      {archivedTodos.length > 0 && (
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {archivedTodos.length} archived {archivedTodos.length === 1 ? 'task' : 'tasks'}
          </Text>
        </View>
      )}

      <FlatList
        data={archivedTodos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => {}} // Not needed for archived todos
            onEdit={() => {}} // Not needed for archived todos
            onArchive={() => {}} // Not needed for archived todos
            onRestore={restoreTodo}
            onDelete={deleteTodo}
            isArchived={true}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {archivedTodos.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No archived tasks yet
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Archive tasks from the main or completed screens to see them here
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
