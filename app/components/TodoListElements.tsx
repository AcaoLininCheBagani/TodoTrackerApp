import { CheckCircle, Circle, Trash2, Edit3, X} from 'lucide-react';
import { useTodoStore } from '../providers/todo-store-provider';
import { Todo } from '../entities/todos';

interface TodoListElementsProps {
    todo: Todo
}

export default function TodoListElements({todo} : TodoListElementsProps ) {
    const {startEditing, toggleTodo, deleteTodo} = useTodoStore((state) => state)
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                >
                    {todo.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <Circle className="w-5 h-5" />
                    )}
                </button>
                <span
                    className={`text-lg ${todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                        }`}
                >
                    {todo.text}
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
                <button
                    onClick={() => startEditing(todo)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                    <Edit3 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}