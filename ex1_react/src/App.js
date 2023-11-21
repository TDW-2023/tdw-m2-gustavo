import "./App.css";
import TodoForm from "./components/TodoForm";
import { TODOFUNCTIONS } from "./constants";
import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoListFilter from "./components/TodoListFilter";
import TodoSearch from "./components/TodoSearch";

function App() {
  // Define um estado 'allTodo' que representa a lista de tarefas e a função 'setTodo' para atualizá-lo.
  const [allTodo, setTodo] = useState(TODOFUNCTIONS);
  // Define um estado 'errorRepeatedText' para armazenar mensagens de erro relacionadas a tarefas duplicadas.
  const [errorRepeatedText, setErrorRepeatedText] = useState("");
  // Define um estado local 'allSelected' para controlar se todas as tarefas estão selecionadas
  const [allSelected, setAllSelected] = useState(false);
  // Define um estado 'filter' e a função 'setFilter' para atualizá-lo, inicializando com o valor 'AllTasks'
  const [filter, setFilter] = useState("AllTasks");
  // Adiciona o estado 'filteredTodo'
  const [filteredTodo, setFilteredTodo] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // Define um efeito colateral que será executado sempre que 'filter' for alterado
  useEffect(() => {
    // Define a função de filtro com base no estado 'filter'
    const getFilteredTodo = () => {
      switch (filter) {
        // Filtra as tarefas não selecionadas para o caso 'ShowActiveTasks'
        case "ShowActiveTasks":
          return allTodo.filter((todo) => !todo.selected);
        // Filtra as tarefas selecionadas para o caso 'ShowCompleted'
        case "ShowCompleted":
          return allTodo.filter((todo) => todo.selected);
        // Retorna todas as tarefas para o caso padrão ('AllTasks')
        default:
          return allTodo;
      }
    };

    // Executa a função de filtro e atualiza o estado 'filteredTodo' no componente pai
    setFilteredTodo(getFilteredTodo());
  }, [filter, allTodo]); // Dependências do efeito colateral

  // UseEffect é utilizado para realizar a filtragem das tarefas com base nas alterações em 'allTodo' e 'searchTerm'
  useEffect(() => {
    // Filtra os dados da lista ('allTodo') com base no termo de pesquisa ('searchTerm')
    const filteredData = allTodo.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Atualiza o estado 'filteredTodo' com os dados filtrados
    setFilteredTodo(filteredData);
  }, [allTodo, searchTerm]);

  // Função para adicionar uma nova tarefa à lista.
  const addNewTodo = (name) => {
    // Verifica se já existe uma tarefa com o mesmo nome na lista.
    if (allTodo.some((todo) => todo.name === name)) {
      // Define a mensagem de erro se a tarefa estiver duplicada.
      setErrorRepeatedText("Repeated task, please type a new task.");
      // Encerra a execução da função.
      return;
    }

    // Limpa a mensagem de erro, indicando que não há erros.
    setErrorRepeatedText("");
    // Cria um novo objeto representando a nova tarefa.
    const newTodo = { id: allTodo.length, name, completed: false };
    // Atualiza o estado 'allTodo' adicionando a nova tarefa à lista existente.
    setTodo([...allTodo, newTodo]);
  };

  // Função 'handleSelectAll' chamada ao selecionar ou deselecionar todas as tarefas
  const handleSelectAll = () => {
    // Cria um novo array 'newTodo' baseado nas tarefas existentes, atualizando a propriedade 'selected' de cada uma
    const newTodo = allTodo.map((todo) => ({
      ...todo,
      selected: !allSelected,
    }));
    // Atualiza o estado 'allTodo' com o novo array
    setTodo(newTodo);
    // Inverte o estado de 'allSelected' para refletir a seleção/deseleção geral
    setAllSelected(!allSelected);
  };

  // Função 'handleSelectTodo' chamada ao selecionar ou deselecionar uma tarefa específica
  const handleSelectTodo = (id) => {
    // Cria um novo array 'newTodo' baseado nas tarefas existentes, atualizando a propriedade 'selected' apenas para a tarefa com o ID correspondente
    const newTodo = allTodo.map((todo) =>
      todo.id === id ? { ...todo, selected: !todo.selected } : todo
    );
    // Atualiza o estado 'allTodo' com o novo array
    setTodo(newTodo);
    // Atualiza o estado 'allSelected' verificando se todas as tarefas estão selecionadas
    setAllSelected(newTodo.every((todo) => todo.selected));
  };

  const tasksNoun = filteredTodo.length !== 1 ? "tasks" : "task";
  const headingText = `${filteredTodo.length} ${tasksNoun} remaining`;

  // Retorna a estrutura JSX da aplicação.
  return (
    <div>
      {/* Container principal da aplicação */}
      <div className="todoapp stack-large">
        {/* Componente TodoForm utilizado para adicionar novas tarefas */}
        <TodoForm addNewTodo={addNewTodo} />
        {/* Verifica se há uma mensagem de erro e a exibe se necessário */}
        {errorRepeatedText !== "" ? (
          <h6 id="list-heading" tabIndex="-1">
            {errorRepeatedText}
          </h6>
        ) : null}
        {/* Renderiza o componente TodoListFilter passando as propriedades 'filter' e 'setFilter' */}
        <TodoListFilter filter={filter} setFilter={setFilter} />
        <div>
          <h2 id="list-heading" tabIndex="-1">
            {headingText}
          </h2>
        </div>
        {/* Passa setTodo como propriedade para o componente Todo */}

        <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Todo
          allTodo={filteredTodo}
          setTodo={setTodo}
          handleSelectAll={handleSelectAll}
          handleSelectTodo={handleSelectTodo}
          allSelected={allSelected}
          filteredTodo={filteredTodo}
        />
      </div>
    </div>
  );
}

export default App;
