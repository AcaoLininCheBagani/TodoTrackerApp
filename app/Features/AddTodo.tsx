import { Plus } from 'lucide-react';
import { AddTodoProps } from '../entities/todos';

export default function AddTodo({newTodo, setNewTodo, addTodo} : AddTodoProps){
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && !e.repeat && addTodo()}
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>
    )
}