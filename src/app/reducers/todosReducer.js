import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodo = currentTodos.filter(
        (e) => e.id !== action.payload.dialogTodo.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return updatedTodo;
    }
    case "edited": {
      const updatedTodos = currentTodos.map((e) => {
        if (e.id === action.payload.dialogTodo.id) {
          return {
            ...e,
            title: action.payload.editTitle,
            details: action.payload.editDetails,
          };
        }
        return e;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos"));
      if (storageTodos) {
        return storageTodos;
      }
    }
    case "toggledCompleted": {
      const updatedTodo = currentTodos.map((e) => {
        if (e.id === action.payload.todos.id) {
          return { ...e, isCompleted: !e.isCompleted };
        }
        return e;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return updatedTodo;
    }
    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
  return [];
}
