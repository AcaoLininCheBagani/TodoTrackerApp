'use client'
import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Edit3, X, User, Settings, LogOut, Menu, X as XIcon } from 'lucide-react';
import Header from './PageComponents/Header';
import StatsCard from './PageComponents/StatsCard';
import AddTodo from './Features/AddTodo';
import FilterButton from './Features/FilterButton';
import TodoList from './Features/TodoList';

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

  const [newTodo, setNewTodo] = useState<string>('');
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

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
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
      <Header />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <StatsCard stats={stats} />

        {/* Add Todo Form */}
        <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

        {/* Filter Buttons */}
        <FilterButton filter={filter} setFilter={setFilter}/>

        {/* Todo List */}
        <TodoList 
          filter={filter}
          filteredTodos={filteredTodos}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          toggleTodo={toggleTodo}
          startEditing={startEditing}
          deleteTodo={deleteTodo}
          />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Click on the circle to mark tasks as complete • Double-click to edit</p>
        </div>
      </div>
    </div>
  );
}


