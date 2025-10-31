import { X } from 'lucide-react';
import { useTodoStore } from '../providers/todo-store-provider';

export default function TodoListEdit() {

    const { editingText, setEditingText, saveEdit, cancelEdit } = useTodoStore((state) => state)

    return (
        <div className="flex items-center gap-3">
            <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            />
            <button
                onClick={saveEdit}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
                Save
            </button>
            <button
                onClick={cancelEdit}
                className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}