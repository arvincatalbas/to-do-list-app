import { create } from 'zustand';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
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

  deleteTodo: (id: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.filter((todo: Todo) => todo.id !== id),
    })),

  updateTodo: (id: string, text: string) =>
    set((state: TodoStore) => ({
      todos: state.todos.map((todo: Todo) =>
        todo.id === id
          ? { ...todo, text, updatedAt: new Date() }
          : todo
      ),
    })),

  clearCompleted: () =>
    set((state: TodoStore) => ({
      todos: state.todos.filter((todo: Todo) => !todo.completed),
    })),
}));
