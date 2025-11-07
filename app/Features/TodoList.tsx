import { useTodoStore } from '../providers/todo-store-provider';
import TodoListEmpty from '../components/TodoListEmpty';
import TodoListEdit from '../components/TodoListEdit';
import TodoListElements from '../components/TodoListElements';
import * as motion from "motion/react-client"

export default function TodoList() {
  const { todos, filter, editingId } = useTodoStore((state) => state)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {filteredTodos.length === 0 ? (
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}

        >
          <TodoListEmpty filter={filter} />
        </motion.article>
      ) : (
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-auto">
          {filteredTodos.map((todo, key) => (
            <div key={todo._id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
              {editingId === todo._id ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 1 }}
                >
                  <TodoListEdit />
                </motion.div>

              ) : (
                <motion.article
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TodoListElements todo={todo} />
                </motion.article>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
