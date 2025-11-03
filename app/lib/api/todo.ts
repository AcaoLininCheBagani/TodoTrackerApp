import { Todo } from "@/app/entities/todos";

export async function GetAllTodos() {
    try {
        let data = await fetch(`http://localhost:8000/api/todos`, {
            method: 'GET',
            // i will add JWT later
        })
        const result = await data.json();
        return result;

    } catch (err) {
        console.log({ "Error": err })
    }

}

export async function addTodo(todo: Todo) {
    try {
        let data = await fetch(`http://localhost:8000/api/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
            // i will add JWT later
        })
        const result = await data.json();
        if(result){
            return result
        }
    } catch (err) {
        console.error({ "Error": err })
    }

}


export async function updateTodo(todo: Todo) {
    try {
        let data = await fetch(`http://localhost:8000/api/todos/${todo._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
            // i will add JWT later
        })
        const result = await data.json();
        if(result){
            return result;
        }

    } catch (err) {
        console.error({ "Error": err })
    }

}

export async function deletTodo(id: number) {
    try {
        let data = await fetch(`http://localhost:8000/api/todos/${id}`, {
            method: 'DELETE',
            // i will add JWT later
        })
        const result = await data.json();
        if(result){
            return result;
        }

    } catch (err) {
        console.error({ "Error": err })
    }

}