'use client'
import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Edit3, X, User, Settings, LogOut, Menu, X as XIcon } from 'lucide-react';
import Header from './PageComponents/Header';
import StatsCard from './PageComponents/StatsCard';

  type IDprops = {
    id: number
  }

  
export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 2, text: 'Review team submissions', completed: true, priority: 'medium' },
    { id: 3, text: 'Schedule client meeting', completed: false, priority: 'high' },
    { id: 4, text: 'Update documentation', completed: false, priority: 'low' },
  ]);

type Todo = {
    id: number,
    text: string,
    completed: boolean,
    priority: string
  }
  
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: 'medium'
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id:number ) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo ) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editingText } : todo
    ));
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
     {/* header*/}
     <Header  />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <StatsCard stats={stats} />

        {/* Add Todo Form */}
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

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 flex border border-gray-200">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 capitalize ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredTodos.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks found</h3>
              <p className="text-gray-600">
                {filter === 'completed' 
                  ? 'You haven\'t completed any tasks yet.' 
                  : filter === 'active' 
                    ? 'All tasks are completed!' 
                    : 'Add your first task to get started.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  {editingId === todo.id ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
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
                          className={`text-lg ${
                            todo.completed 
                              ? 'line-through text-gray-500' 
                              : 'text-gray-800'
                          }`}
                        >
                          {todo.text}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                          todo.priority === 'high' 
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

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Click on the circle to mark tasks as complete • Double-click to edit</p>
        </div>
      </div>
    </div>
  );
}


