import { Todo } from "@/app/entities/todos";
import { toast } from "sonner";

export async function GetAllTodos(userId: string) {
  try {
    const data = await fetch(
      `https://express-todo-api-u2nx.onrender.com/api/todos?id=${userId}`,
      {
        method: "GET",
        // i will add JWT later
      },
    );
    const result = await data.json();
    if (result) {
      toast.success("Fetch all todos");
      return result;
    }
  } catch (err) {
    toast.error("Error fetching todos");
    console.log({ Error: err });
  }
}

export async function addTodo(todo: Todo) {
  try {
    const data = await fetch(
      `https://express-todo-api-u2nx.onrender.com/api/todos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
        // i will add JWT later
      },
    );
    const result = await data.json();
    if (result) {
      toast.success("Todo has been created");
      return result;
    }
  } catch (err) {
    toast.error("Error creating todo");
    console.error({ Error: err });
  }
}

export async function updateTodo(todo: Todo) {
  try {
    const data = await fetch(
      `https://express-todo-api-u2nx.onrender.com/api/todos/${todo._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
        // i will add JWT later
      },
    );
    const result = await data.json();
    if (result) {
      toast.info("Successfully updated todo");
      return result;
    }
  } catch (err) {
    toast.error("Error updating todo");
    console.error({ Error: err });
  }
}

export async function deletTodo(id: number) {
  try {
    const data = await fetch(
      `https://express-todo-api-u2nx.onrender.com/api/todos/${id}`,
      {
        method: "DELETE",
        // i will add JWT later
      },
    );
    const result = await data.json();
    if (result) {
      toast.success("Successfully deleted todo");
      return result;
    }
  } catch (err) {
    toast.error("Error deleting todo");
    console.error({ Error: err });
  }
}
