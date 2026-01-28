import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';
import { Todo } from '../src/store/useTodoStore';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  isArchived?: boolean;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onArchive,
  onRestore,
  onDelete,
  isArchived = false
}: TodoItemProps) {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditText(todo.text);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  return (
    <View style={[styles.container, {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
    }]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => !isArchived && onToggle(todo.id)}
        disabled={isArchived}
      >
        <View style={[styles.checkbox, {
          borderColor: colors.border,
          backgroundColor: todo.completed ? colors.primary : 'transparent',
          opacity: isArchived ? 0.5 : 1,
        }]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        {isEditing ? (
          <TextInput
            style={[styles.editInput, {
              color: colors.text,
              borderColor: colors.border,
            }]}
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={handleEdit}
            onBlur={handleEdit}
            multiline={false}
            autoFocus
          />
        ) : (
          <>
            <Text style={[styles.text, {
              color: todo.completed || isArchived ? colors.textSecondary : colors.text,
              textDecorationLine: (todo.completed || isArchived) ? 'line-through' : 'none',
            }]}>
              {todo.text}
            </Text>
            <Text style={[styles.date, { color: colors.textSecondary }]}>
              {todo.createdAt.toLocaleDateString()}
            </Text>
          </>
        )}
      </View>

      <View style={styles.actionButtons}>
        {!isArchived ? (
          <>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.secondary }]}
              onPress={handleEdit}
            >
              <Text style={styles.editButtonText}>
                {isEditing ? '✓' : '✏️'}
              </Text>
            </TouchableOpacity>
            {isEditing && (
              <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: colors.textSecondary }]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>✕</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.archiveButton, { backgroundColor: colors.warning }]}
              onPress={() => onArchive(todo.id)}
            >
              <Text style={styles.archiveButtonText}>📦</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.restoreButton, { backgroundColor: colors.success }]}
              onPress={() => onRestore(todo.id)}
            >
              <Text style={styles.restoreButtonText}>↩️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: colors.error }]}
              onPress={() => onDelete(todo.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  editInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  archiveButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  archiveButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  restoreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  restoreButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
