import { CheckCircle, Circle, Trash2, Edit3, X} from 'lucide-react';
import { TodoProps } from '../entities/todos';
import { useTodoStore } from '../providers/todo-store-provider';

export default function TodoList({filter, filteredTodos, editingId, editingText, setEditingText, saveEdit, cancelEdit, toggleTodo, startEditing, deleteTodo}: TodoProps){
  const {todos: td, filter: ft, editingId: ei, editingText: et, setEditingText: sett, saveEdit: se} = useTodoStore((state) => state)
   const filtered = td.filter(todo => {
    if (ft === 'active') return !todo.completed;
    if (ft === 'completed') return todo.completed;
    return true;
  });

  return (
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks found</h3>
              <p className="text-gray-600">
                {ft === 'completed'
                  ? 'You haven\'t completed any tasks yet.'
                  : ft === 'active'
                    ? 'All tasks are completed!'
                    : 'Add your first task to get started.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((todo) => (
                <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  {ei === todo.id ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={et}
                        onChange={(e) => sett(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && se()}
                      />
                      <button
                        onClick={se}
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
                  ) : (
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
    )
}