"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useStore } from "zustand";
import { createTodoStore, type TodoStore } from "../stores/todo-store";

export type CounterStoreApi = ReturnType<typeof createTodoStore>;

const TodoStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface TodoStoreProviderProps {
  children: ReactNode;
}

export const TodoStoreProvider = ({ children }: TodoStoreProviderProps) => {
  const store = useMemo(() => createTodoStore(), []);
  return (
    <TodoStoreContext.Provider value={store}>
      {children}
    </TodoStoreContext.Provider>
  );
};

export const useTodoStore = <T,>(selector: (state: TodoStore) => T): T => {
  const store = useContext(TodoStoreContext);

  if (!store) {
    throw new Error(`useTodoStore must be used within TodoStoreProvider`);
  }

  return useStore(store, selector);
};
