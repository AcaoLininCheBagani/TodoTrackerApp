export interface Todo {
    id: number,
    text: string,
    completed: boolean,
    priority: string
}

export interface TodoProps {
    filter: string,
    filteredTodos: Todo[],
    editingId: number | null,
    editingText: string,
    setEditingText: React.Dispatch<React.SetStateAction<string>>,
    saveEdit: () => void,
    cancelEdit: () => void,
    toggleTodo: (id: number) => void,
    startEditing: (todo: Todo) => void,
    deleteTodo: (id: number) => void
}

// dashboard entities
export type Todos = {
    id: number,
    text: string,
    completed: boolean,
    priority: 'high' | 'medium' | 'low',
    createdAt: string
}

export type Analytics = {
    date: string,
    completed: number,
    total: number,
    completionRate: number
}

export type Completion = {
    name: string,
    completed: number,
    pending: number
}