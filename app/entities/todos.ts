export interface Todo {
    _id?: number | undefined,
    title: string | undefined,
    completed?: boolean | undefined,
    priority?: string | undefined,
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

// add todo entities
export interface AddTodoProps {
    newTodo : string,
    setNewTodo : React.Dispatch<React.SetStateAction<string>>
    addTodo : () => void
}

// filter butto
export interface Filter {
    filter: string,
    setFilter : (filterType: string ) => void
}

// header props

export interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// stats card

export interface StatsCardProps {
    stats: {
    total: number,
    completed: number,
    active: number
}
}

// profile

export type Settings = {
    notifications: boolean,
    darkMode: boolean,
    emailNotifications: boolean,
    autoSave: boolean
}