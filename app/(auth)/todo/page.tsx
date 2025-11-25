"use client";
import { useEffect } from "react";
import StatsCard from "../../PageComponents/StatsCard";
import AddTodo from "../../Features/AddTodo";
import FilterButton from "../../Features/FilterButton";
import TodoList from "../../Features/TodoList";
import { Card, CardContent } from "@/components/ui/card";
import { useTodoStore } from "../../providers/todo-store-provider";
import * as motion from "motion/react-client";

export default function Home() {
  const getTodos = useTodoStore((state) => state.loadTodos);
  useEffect(() => {
    getTodos();
  }, [getTodos]);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Stats Cards */}
      <StatsCard />

      {/* Add Todo Form */}
      <AddTodo />

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <Card className="@container/card">
          {/* Filter Buttons */}
          <FilterButton />
          {/* Todo List */}
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <TodoList />
          </CardContent>
        </Card>
      </motion.article>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>
          Click on the circle to mark tasks as complete • Double-click to edit
        </p>
      </div>
    </div>
  );
}
