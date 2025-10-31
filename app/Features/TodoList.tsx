import { CheckCircle, Circle, Trash2, Edit3, X} from 'lucide-react';
import { useTodoStore } from '../providers/todo-store-provider';
import TodoListEmpty from '../components/TodoListEmpty';
import TodoListEdit from '../components/TodoListEdit';
import TodoListElements from '../components/TodoListElements';
export default function TodoList(){
  const {todos, filter, editingId, editingText, setEditingText, saveEdit, cancelEdit, toggleTodo, startEditing, deleteTodo} = useTodoStore((state) => state)
   
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredTodos.length === 0 ? (
            <TodoListEmpty filter={filter} />
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  {editingId === todo.id ? (
                    <TodoListEdit/>
                  ) : (
                    <TodoListElements todo={todo} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
    )
}