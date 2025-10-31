import { createStore } from "zustand";
import { Todo } from "../entities/todos";

export type TodoState = {
    todos: Todo[],
    newTodo: string,
    editingId: number | null,
    editingText: string,
    filter: string,
}

export type TodoActions = {
    addTodo: () => void,
    toggleTodo: (id: number) => void,
    deleteTodo: (id: number) => void,
    startEditing: (todo: Todo) => void,
    saveEdit: () => void,
    cancelEdit: () => void,
    setNewTodo: (newTodo: string) => void
    setFilter: (filter: string) => void
    setEditingText: (edit: string) => void
}

export type TodoStore = TodoState & TodoActions;

export const initTodoStore = (): TodoState => {
    return {
        todos: [
            { id: 1, text: 'Complete project proposal', completed: false, priority: 'high' },
            { id: 2, text: 'Review team submissions', completed: true, priority: 'medium' },
            { id: 3, text: 'Schedule client meeting', completed: false, priority: 'high' },
            { id: 4, text: 'Update documentation', completed: false, priority: 'low' },
        ],
        newTodo: "",
        editingId: null,
        editingText: '',
        filter: 'all',
    }
}

export const createTodoStore = () => {
    return createStore<TodoStore>()((set, get) => ({
        ...initTodoStore(),
        addTodo: async () => {
            const { newTodo, todos } = get();
            if (newTodo.trim()) {
                const todo = {
                    id: Date.now(),
                    text: newTodo.trim(),
                    completed: false,
                    priority: 'medium'
                };
                set({
                    todos: [...todos, todo],
                    newTodo: ''
                })
            }
        },
        toggleTodo: async (id: number) => {
            const { newTodo, todos } = get();
            const result = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
            set({
                todos: result
            })
        },
        deleteTodo: async (id: number) => {
            const { todos } = get()
            const result = todos.filter(todo => todo.id !== id);
            set({
                todos: result
            })
        },
        startEditing: async (todo: Todo) => {
            set({
                editingId: todo.id,
                editingText: todo.text
            })
        },
        saveEdit: async () => {
            const { todos, editingId, editingText } = get();
            const result = todos.map(todo => todo.id === editingId ? {...todo, text: editingText} : todo)
            set({
                todos: result,
                editingId: null,
                editingText: ''
            })
        },
        cancelEdit: async () => {
            set({
                editingId: null,
                editingText: ''
            })
        },
        setNewTodo: async (newTodo: string) => {
            set({
                newTodo: newTodo
            })
        },
        setFilter: async (filter: string) => {
            set({
                filter: filter
            })
        },
        setEditingText: async (edit: string) => {
            set({
                editingText: edit
            })
        }
    }))
}