import { useCallback, useState, useEffect } from "react";
import todosDB from "../gun";

export default function useTodos() {
  const [todos, setTodos] = useState({});

  // initialize
  useEffect(() => {
    todosDB
      .map()
      .once((data, id) => {
        if (!data) return;
        console.log("first update", data);
        const { content, isDone } = data;
        setTodos((prevTodos) => ({
          ...prevTodos,
          [id]: { content, isDone },
        }));
      });
    
    todosDB.map().on((data, id) => {
      console.log(id, data);
      if (!data) {
        setTodos(prevTodos => {
          const nextTodos = { ...prevTodos };
          delete nextTodos[id]
          return nextTodos
        })
        return 
      };
      const { content, isDone } = data;
      setTodos(prevTodos => {
        const nextTodos = { ...prevTodos };
        nextTodos[id] = { content, isDone }
        return nextTodos
      })
      console.log(content, isDone);
    
    })
    
      
  }, []);
  // todosDB
  const addTodo = useCallback((content) => {
    todosDB.set({
      content,
      isDone: false,
    });
  }, []);

  const deleteTodo = useCallback((id) => {
    console.log(id);
    setTodos((prevTodos) => {
      const nextTodos = { ...prevTodos };
      delete nextTodos[id];
      return nextTodos;
    });
    todosDB.get(id).put(null);
    // setTodos((prevTodosData) => prevTodosData.filter((todo) => todo.id !== id));
  }, []);

  const updateTodoContent = useCallback((id, content) => {
    todosDB.get(id).put({
      content,
    });
    setTodos((prevTodos) => {
      const nextTodos = { ...prevTodos };
      nextTodos[id].content = content;
      return nextTodos;
    });
  }, []);

  const toggleTodoDone = useCallback(
    (id) => {
      console.log(todos);
      console.log(todos[id]);
      todosDB.get(id).put({
        isDone: !todos[id].isDone,
      });
      setTodos((prevTodos) => {
        const nextTodos = { ...prevTodos };
        nextTodos[id].isDone = !prevTodos[id].isDone;
        return nextTodos;
      });
    },
    [todos]
  );
  const todosData = Object.entries(todos).map(([key, value]) => ({
    id: key,
    ...value,
  }));
  return {
    todosData,
    setTodosData: setTodos,
    addTodo,
    deleteTodo,
    updateTodoContent,
    toggleTodoDone,
  };
}
