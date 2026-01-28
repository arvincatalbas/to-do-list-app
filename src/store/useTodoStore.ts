import { create } from 'zustand';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  archiveTodo: (id: string) => void;
  restoreTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  getActiveTodos: () => Todo[];
  getCompletedTodos: () => Todo[];
  getArchivedTodos: () => Todo[];
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  addTodo: (text: string) =>
    set((state: TodoStore) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          isArchived: false,
        },
      ],
    })),

  toggleTodo: (id: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.map((todo: Todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ),
    })),

  updateTodo: (id: string, text: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.map((todo: Todo) =>
        todo.id === id
          ? { ...todo, text, updatedAt: new Date() }
          : todo
      ),
    })),

  archiveTodo: (id: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.map((todo: Todo) =>
        todo.id === id
          ? { ...todo, isArchived: true, updatedAt: new Date() }
          : todo
      ),
    })),

  restoreTodo: (id: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.map((todo: Todo) =>
        todo.id === id
          ? { ...todo, isArchived: false, updatedAt: new Date() }
          : todo
      ),
    })),

  deleteTodo: (id: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.filter((todo: Todo) => todo.id !== id),
    })),

  clearCompleted: () =>
    set((state: TodoStore) => ({
      todos: state.todos.filter((todo: Todo) => !todo.completed || todo.isArchived),
    })),

  getActiveTodos: () => {
    const { todos } = get();
    return todos.filter(todo => !todo.completed && !todo.isArchived);
  },

  getCompletedTodos: () => {
    const { todos } = get();
    return todos.filter(todo => todo.completed && !todo.isArchived);
  },

  getArchivedTodos: () => {
    const { todos } = get();
    return todos.filter(todo => todo.isArchived);
  },
}));
