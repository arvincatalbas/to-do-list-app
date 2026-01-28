import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useTodoStore } from '../../src/store/useTodoStore';
import TodoItem from '../../components/TodoItem';
import ThemeToggle from '../../components/ThemeToggle';

export default function Home() {
  const [text, setText] = useState('');
  const { getActiveTodos, addTodo, toggleTodo, updateTodo, archiveTodo } = useTodoStore();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const activeTodos = getActiveTodos();

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.container, {
      backgroundColor: colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Tasks</Text>
        <ThemeToggle />
      </View>

      <View style={[styles.inputContainer, {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
      }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={text}
          onChangeText={setText}
          placeholder="Add a new task..."
          placeholderTextColor={colors.textSecondary}
          onSubmitEditing={handleAddTodo}
          multiline={false}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAddTodo}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTodos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onEdit={updateTodo}
            onArchive={archiveTodo}
            onRestore={() => { }} // Not needed for active todos
            onDelete={() => { }} // Not needed for active todos
            isArchived={false}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {activeTodos.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No tasks yet. Add one above!
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
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  addButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 2,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
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
