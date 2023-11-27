import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Cria um contexto para os estados e funções relacionados a tarefas
const TodoContext = createContext();

// Hook customizado para usar o contexto
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext deve ser usado dentro de um TodoProvider');
  }
  return context;
};

// Componente TodoProvider que envolve sua aplicação
export const TodoProvider = ({ children }) => {
  const [allTodo, setTodo] = useState([]);
  const [errorRepeatedText, setErrorRepeatedText] = useState("");
  const [allSelected, setAllSelected] = useState(false);
  const [filter, setFilter] = useState("AllTasks");
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todoDataFromCookie = await Cookies.get("todoData");
        console.log("Todo data from cookie:", todoDataFromCookie);

        if (todoDataFromCookie !== undefined) {
          const todoDataArray = JSON.parse(todoDataFromCookie);
          const uniqueTodoData = todoDataArray.filter((item) =>
            allTodo.every((existingItem) => existingItem.id !== item.id)
          );

          console.log("Parsed todo data:", uniqueTodoData);

          if (uniqueTodoData.length > 0) {
            setTodo((prevTodo) => prevTodo.concat(uniqueTodoData));
          }
        } else {
          setTodo([]);
          console.log("Setting todo data to an empty array");
        }
      } catch (error) {
        console.error("Error fetching data from cookie:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allTodoString = JSON.stringify(
      [...new Set(allTodo.map(JSON.stringify))].map(JSON.parse)
    );
    Cookies.set("todoData", allTodoString);

    document.title = `Total: ${allTodo.length} ${
      allTodo.length === 1 ? "task" : "tasks"
    }${" "}`;
  }, [allTodo]);

  useEffect(() => {
    const getFilteredTodo = () => {
      switch (filter) {
        case "ShowActiveTasks":
          return allTodo.filter((todo) => !todo.selected);
        case "ShowCompleted":
          return allTodo.filter((todo) => todo.selected);
        default:
          return allTodo;
      }
    };

    setFilteredTodo(getFilteredTodo());
  }, [filter, allTodo]);

  useEffect(() => {
    const filteredData = allTodo.filter(
      (item) =>
        item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodo(filteredData);
  }, [allTodo, searchTerm]);

  const addNewTodo = (name) => {
    if (allTodo.some((todo) => todo.name === name)) {
      setErrorRepeatedText("Repeated task, please type a new task.");
      return;
    }

    setErrorRepeatedText("");
    const newTodo = { id: allTodo.length, name, completed: false };
    setTodo([...allTodo, newTodo]);
    console.log(allTodo);
  };

  const handleSelectAll = () => {
    const newTodo = allTodo.map((todo) => ({
      ...todo,
      selected: !allSelected,
    }));
    setTodo(newTodo);
    setAllSelected(!allSelected);
  };

  const handleSelectTodo = (id) => {
    const newTodo = allTodo.map((todo) =>
      todo.id === id ? { ...todo, selected: !todo.selected } : todo
    );
    setTodo(newTodo);
    setAllSelected(newTodo.every((todo) => todo.selected));
  };

  const tasksNoun = filteredTodo.length !== 1 ? "tasks" : "task";
  const headingText = `${filteredTodo.length} ${tasksNoun} remaining`;

  // Fornece o contexto para os componentes filhos
  const contextValue = {
    allTodo,
    setTodo,
    errorRepeatedText,
    setErrorRepeatedText,
    allSelected,
    setAllSelected,
    filter,
    setFilter,
    filteredTodo,
    setFilteredTodo,
    searchTerm,
    setSearchTerm,
    addNewTodo,
    handleSelectAll,
    handleSelectTodo,
    headingText,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};


export default TodoProvider;
