'use client'
import { useState } from 'react';
import StatsCard from './PageComponents/StatsCard';
import AddTodo from './Features/AddTodo';
import FilterButton from './Features/FilterButton';
import TodoList from './Features/TodoList';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 2, text: 'Review team submissions', completed: true, priority: 'medium' },
    { id: 3, text: 'Schedule client meeting', completed: false, priority: 'high' },
    { id: 4, text: 'Update documentation', completed: false, priority: 'low' },
  ]);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Stats Cards */}
      <StatsCard  />

      {/* Add Todo Form */}
      <AddTodo />

      <Card className="@container/card">
        {/* Filter Buttons */}
        <FilterButton />
        {/* Todo List */}
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <TodoList
          />
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Click on the circle to mark tasks as complete • Double-click to edit</p>
      </div>
    </div>
  );
}


