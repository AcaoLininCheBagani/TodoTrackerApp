"use client"
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { createTodoStore, type TodoStore } from "../stores/todo-store";

const TodoStoreContext = createContext<ReturnType<typeof createTodoStore> | undefined>(undefined);

export interface TodoStoreProviderProps { children: ReactNode }

export const TodoStoreProvider = ({ children }: TodoStoreProviderProps) => {
    const storeRef = useRef<ReturnType<typeof createTodoStore> | null>(null);

    if(!storeRef.current){
        storeRef.current = createTodoStore();
    }

    return (
        <TodoStoreContext.Provider value={storeRef.current}>
            {children}
        </TodoStoreContext.Provider>
    )
}

export const useTodoStore = <T,>(selector: (state: TodoStore) => T): T => {
    const store = useContext(TodoStoreContext);

    if(!store){
        throw new Error(`useTodoStore must be used within TodoStoreProvider`)
    }

    return useStore(store, selector);
}
