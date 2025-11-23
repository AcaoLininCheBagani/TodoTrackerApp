"use client";
import { useEffect } from "react";

import AgentButton from "../Features/AgentButton";
import { useTodoStore } from "../providers/todo-store-provider";

export default function Dashboard() {
  const { todos, loadTodos } = useTodoStore((state) => state);
  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* AI Agent */}
        <AgentButton />
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 ">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-hidden overflow-y-auto">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className=" gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      todo.completed
                        ? "bg-green-500"
                        : todo.priority === "high"
                          ? "bg-red-500"
                          : todo.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                  ></div>
                  <span
                    className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"} ml-3`}
                  >
                    {todo.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500 ml-5">
                  {todo.createdAt &&
                    new Date(todo.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
