import { createStore } from "zustand";
import { Todo, User } from "../entities/todos";
import { addTodo, deletTodo, GetAllTodos, updateTodo } from "../lib/api/todo";
export type TodoState = {
  todos: Todo[];
  editingId: number | null;
  editingText: string;
  filter: string;
  loading: boolean;
  user: User | null;
};

export type TodoActions = {
  addTodo: (td: string | undefined) => void;
  toggleTodo: (id: number | undefined) => void;
  deleteTodo: (id: number | undefined) => void;
  startEditing: (todo: Todo) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setFilter: (filter: string) => void;
  setEditingText: (edit: string) => void;
  loadTodos: () => Promise<void>;
  loadUser: () => Promise<void>;
};

export type TodoStore = TodoState & TodoActions;

export const initTodoStore = (): TodoState => {
  return {
    todos: [],
    editingId: null,
    editingText: "",
    filter: "all",
    loading: false,
    user: null,
  };
};

export const createTodoStore = () => {
  return createStore<TodoStore>()((set, get) => ({
    ...initTodoStore(),
    addTodo: async (td) => {
      set({ loading: true });
      const { todos } = get();
      const user = localStorage.getItem("user");

      if (td && user) {
        const userId = JSON.parse(user);
        const todo = {
          title: td?.trim(),
          id: userId.id,
        };
        const res = await addTodo(todo);
        set({
          todos: [res, ...todos],
        });
        set({ loading: false });
      } else {
        set({ loading: false });
      }
    },
    toggleTodo: async (id: number | undefined) => {
      const { todos } = get();
      const result = todos.find((todo) => todo._id === id);
      const newTodos = {
        _id: result?._id,
        title: result?.title,
        completed: result?.completed ? false : true,
        priority: result?.priority,
      };
      const res = await updateTodo(newTodos);
      const newArr = todos.map((td) =>
        td._id === res._id ? { ...td, ...res } : td,
      );
      set({
        todos: newArr,
      });
    },
    deleteTodo: async (id: number | undefined) => {
      const { todos } = get();
      if (id) {
        const result = await deletTodo(id);
        const newTodos = todos.filter((td) => td._id !== result.id);
        set({ todos: newTodos });
      }
    },
    startEditing: async (todo: Todo) => {
      set({
        editingId: todo._id,
        editingText: todo.title,
      });
    },
    saveEdit: async () => {
      const { todos, editingId, editingText } = get();
      const result = todos.find((todo) => todo._id === editingId);

      const newTodos = {
        _id: result?._id,
        title: editingText,
        completed: result?.completed,
        priority: result?.priority,
      };
      const res = await updateTodo(newTodos);
      const newArr = todos.map((td) =>
        td._id === res._id ? { ...td, ...res } : td,
      );
      set({
        todos: newArr,
        editingId: null,
        editingText: "",
      });
    },
    cancelEdit: async () => {
      set({
        editingId: null,
        editingText: "",
      });
    },
    setFilter: async (filter: string) => {
      set({
        filter: filter,
      });
    },
    setEditingText: async (edit: string) => {
      set({
        editingText: edit,
      });
    },
    loadTodos: async () => {
      const user = localStorage.getItem("user");
      try {
        if (user) {
          console.log(user);
          const userId = JSON.parse(user);
          const allTodos = await GetAllTodos(userId.id);
          if (allTodos) {
            set({ todos: allTodos });
          }
        }
      } catch (err) {
        console.error("Failed to fetch API", err);
      }
    },
    loadUser: async () => {
      const usrLocal = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null;
      try {
        if (usrLocal) {
          const userLL = JSON.parse(usrLocal);
          set({ user: userLL });
        }
      } catch (error) {
        console.log("Error getting user form localStorage", error);
        set({ user: null });
      }
    },
  }));
};
