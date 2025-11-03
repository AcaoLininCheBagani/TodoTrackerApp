import { CheckCircle, Circle, Trash2, Edit3, X } from 'lucide-react';
import { useTodoStore } from '../providers/todo-store-provider';
import { Todo } from '../entities/todos';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface TodoListElementsProps {
    todo: Todo
}

type iconButtonProps = {
    id: number | undefined,
    toggle: (id: number | undefined) => void,
    children: ReactNode,
}

export default function TodoListElements({ todo }: TodoListElementsProps) {
    const { startEditing, toggleTodo, deleteTodo } = useTodoStore((state) => state)

    const iconButton = ({ id, toggle, children }: iconButtonProps) => (
        <Button
            onClick={() => toggle(id)}
            variant='ghost'
            size='icon-lg'
        >
            {children}
        </Button>
    )
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
                {iconButton({
                    id: todo._id,
                    toggle: toggleTodo,
                    children: todo.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <Circle className="w-5 h-5" />
                    )
                }
                )}
                <span
                    className={`text-lg ${todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                        }`}
                >
                    {todo.title}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ml-2 ${todo.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : todo.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                    {todo.priority}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => startEditing(todo)}
                    variant='ghost'
                    size='icon-lg'
                >
                    <Edit3 className="w-4 h-4" />
                </Button>
                {iconButton({
                    id: todo._id,
                    toggle: deleteTodo,
                    children: (<Trash2 className="w-4 h-4" />),
                })}
            </div>
        </div>
    )
}