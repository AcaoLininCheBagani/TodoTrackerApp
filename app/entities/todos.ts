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