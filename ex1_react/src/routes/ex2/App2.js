// import TodoForm from "./components/TodoForm";
// import React, { useState, useEffect } from "react";
// import Todo from "./components/Todo";
// import TodoListFilter from "./components/TodoListFilter";
// import TodoSearch from "./components/TodoSearch";
// import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import PropTypes from "prop-types";

// const AppContainer = styled.div`
//   background: #fff;
//   margin: 2rem 0 4rem 0;
//   padding: 1rem;
//   position: relative;
//   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);

//   @media screen and (min-width: 550px) {
//     padding: 4rem;
//   }

//   > * {
//     max-width: 50rem;
//     margin-left: auto;
//     margin-right: auto;
//   }

//   > form {
//     max-width: 100%;
//   }

//   > h1 {
//     display: block;
//     max-width: 100%;
//     text-align: center;
//     margin: 0;
//     margin-bottom: 1rem;
//   }
// `;

// const ErrorMessage = styled.h6`
//   id: "list-heading";
//   margin: 0;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const TodoApp = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const TodoContainer = styled.div`
//   width: 100%;
// `;

// function App4() {
//   // Define um estado 'allTodo' que representa a lista de tarefas e a função 'setTodo' para atualizá-lo.
//   const [allTodo, setTodo] = useState([]);
//   // Define um estado 'errorRepeatedText' para armazenar mensagens de erro relacionadas a tarefas duplicadas.
//   const [errorRepeatedText, setErrorRepeatedText] = useState("");
//   // Define um estado local 'allSelected' para controlar se todas as tarefas estão selecionadas
//   const [allSelected, setAllSelected] = useState(false);
//   // Define um estado 'filter' e a função 'setFilter' para atualizá-lo, inicializando com o valor 'AllTasks'
//   const [filter, setFilter] = useState("AllTasks");
//   // Adiciona o estado 'filteredTodo'
//   const [filteredTodo, setFilteredTodo] = useState([]);
//   // Define um estado 'searchTerm' para controlar o termo de pesquisa na barra de busca
//   const [searchTerm, setSearchTerm] = useState("");

//   if(allTodo){
//     document.title = `Total: ${allTodo.length} ${allTodo.length === 1 ? "task" : "tasks"}${" "}`;
//   }

//   // Efeito que executa no montamento inicial para recuperar os dados do cookie
//   useEffect(() => {
//     // Define uma função assíncrona chamada fetchData que recupera os dados do cookie
//     const fetchData = async () => {
//       try {
//         // Recupera o valor do cookie com o nome "todoData"
//         const todoDataFromCookie = await Cookies.get("todoData");
//         // Imprime o valor do cookie no console para fins de depuração
//         console.log("Todo data from cookie:", todoDataFromCookie);

//         // Verifica se o valor do cookie não é indefinido
//         if (todoDataFromCookie !== undefined) {
//           // Converte os dados do cookie para um array
//           const todoDataArray = JSON.parse(todoDataFromCookie);

//           // Filtra itens duplicados antes de atualizar o estado
//           const uniqueTodoData = todoDataArray.filter((item) =>
//             // Verifica se cada item do estado anterior não tem o mesmo ID do item atual
//             allTodo.every((existingItem) => existingItem.id !== item.id)
//           );

//           // Imprime os dados filtrados no console para fins de depuração
//           console.log("Parsed todo data:", uniqueTodoData);

//           // Atualiza o estado apenas se houver novos dados a serem adicionados
//           if (uniqueTodoData.length > 0) {
//             setTodo((prevTodo) => prevTodo.concat(uniqueTodoData));
//           }
//         } else {
//           // Define o estado como um array vazio se não houver dados no cookie
//           setTodo([]);
//           // Imprime uma mensagem no console indicando que o estado foi definido como um array vazio
//           console.log("Setting todo data to an empty array");
//         }
//       } catch (error) {
//         // Trata qualquer erro que possa ocorrer durante a recuperação dos dados do cookie
//         console.error("Error fetching data from cookie:", error);
//       }
//     };

//     // Chama a função fetchData para executar o efeito
//     fetchData();
//   }, []); // Adiciona 'allTodo' à lista de dependências

//   // Efeito que executa sempre que 'allTodo' for alterado
//   useEffect(() => {
//     // Converte o array allTodo em uma string JSON
//     const allTodoString = JSON.stringify(
//       [...new Set(allTodo.map(JSON.stringify))].map(JSON.parse)
//     );
//     // Armazena a string JSON no cookie com o nome "todoData"
//     Cookies.set("todoData", allTodoString);

//     document.title = `Total: ${allTodo.length} ${allTodo.length === 1 ? "task" : "tasks"}${" "}`;

//   }, [allTodo]);

//   // Efeito que executa sempre que 'filter' ou 'allTodo' for alterado
//   useEffect(() => {
//     // Define a função de filtro com base no estado 'filter'
//     const getFilteredTodo = () => {
//       switch (filter) {
//         // Filtra as tarefas não selecionadas para o caso 'ShowActiveTasks'
//         case "ShowActiveTasks":
//           return allTodo.filter((todo) => !todo.selected);
//         // Filtra as tarefas selecionadas para o caso 'ShowCompleted'
//         case "ShowCompleted":
//           return allTodo.filter((todo) => todo.selected);
//         // Retorna todas as tarefas para o caso padrão ('AllTasks')
//         default:
//           return allTodo;
//       }
//     };

//     // Executa a função de filtro e atualiza o estado 'filteredTodo' no componente pai
//     setFilteredTodo(getFilteredTodo());
//   }, [filter, allTodo]); // Dependências do efeito colateral

//   // Efeito que executa sempre que 'allTodo' ou 'searchTerm' for alterado
//   useEffect(() => {
//     // Filtra os dados da lista ('allTodo') com base no termo de pesquisa ('searchTerm')
//     const filteredData = allTodo.filter(
//       (item) =>
//         item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     // Atualiza o estado 'filteredTodo' com os dados filtrados
//     setFilteredTodo(filteredData);
//   }, [allTodo, searchTerm]);

//   // Função para adicionar uma nova tarefa à lista.
//   const addNewTodo = (name) => {
//     // Verifica se já existe uma tarefa com o mesmo nome na lista.
//     if (allTodo.some((todo) => todo.name === name)) {
//       // Define a mensagem de erro se a tarefa estiver duplicada.
//       setErrorRepeatedText("Repeated task, please type a new task.");
//       // Encerra a execução da função.
//       return;
//     }

//     // Limpa a mensagem de erro, indicando que não há erros.
//     setErrorRepeatedText("");
//     // Cria um novo objeto representando a nova tarefa.
//     const newTodo = { id: allTodo.length, name, completed: false };
//     // Atualiza o estado 'allTodo' adicionando a nova tarefa à lista existente.
//     setTodo([...allTodo, newTodo]);
//     console.log(allTodo);
//   };

//   // Função 'handleSelectAll' chamada ao selecionar ou deselecionar todas as tarefas
//   const handleSelectAll = () => {
//     // Cria um novo array 'newTodo' baseado nas tarefas existentes, atualizando a propriedade 'selected' de cada uma
//     const newTodo = allTodo.map((todo) => ({
//       ...todo,
//       selected: !allSelected,
//     }));
//     // Atualiza o estado 'allTodo' com o novo array
//     setTodo(newTodo);
//     // Inverte o estado de 'allSelected' para refletir a seleção/deseleção geral
//     setAllSelected(!allSelected);
//   };

//   // Função 'handleSelectTodo' chamada ao selecionar ou deselecionar uma tarefa específica
//   const handleSelectTodo = (id) => {
//     // Cria um novo array 'newTodo' baseado nas tarefas existentes, atualizando a propriedade 'selected' apenas para a tarefa com o ID correspondente
//     const newTodo = allTodo.map((todo) =>
//       todo.id === id ? { ...todo, selected: !todo.selected } : todo
//     );
//     // Atualiza o estado 'allTodo' com o novo array
//     setTodo(newTodo);
//     // Atualiza o estado 'allSelected' verificando se todas as tarefas estão selecionadas
//     setAllSelected(newTodo.every((todo) => todo.selected));
//   };

//   const tasksNoun = filteredTodo.length !== 1 ? "tasks" : "task";
//   const headingText = `${filteredTodo.length} ${tasksNoun} remaining`;

//   // Retorna a estrutura JSX da aplicação.
//   return (
//     <AppContainer>
//       <Link to="/">Home</Link>
//       <TodoApp>
//         <TodoForm addNewTodo={addNewTodo} setFilter={setFilter} />
//         {errorRepeatedText !== "" ? (
//           <ErrorMessage>{errorRepeatedText}</ErrorMessage>
//         ) : null}
//         <TodoListFilter filter={filter} setFilter={setFilter} />
//         <div>
//           <h2>{headingText}</h2>
//         </div>
//         <TodoContainer>
//           <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <Todo
//             allTodo={filteredTodo}
//             setTodo={setTodo}
//             handleSelectAll={handleSelectAll}
//             handleSelectTodo={handleSelectTodo}
//             allSelected={allSelected}
//             filteredTodo={filteredTodo}
//           />
//         </TodoContainer>
//       </TodoApp>
//     </AppContainer>
//   );
// }

// // Define os PropTypes para as propriedades do componente App3
// App4.propTypes = {
//   // allTodo deve ser um array contendo objetos com uma estrutura específica
//   //A função arrayOf recebe um argumento, que geralmente é outro tipo de PropTypes ou um conjunto de validações
//   allTodo: PropTypes.arrayOf(
//     //.shape(): É um método disponível em PropTypes que permite especificar a forma desejada de um objeto.
//     PropTypes.shape({
//       // id deve ser um número obrigatório
//       id: PropTypes.number,
//       // name deve ser uma string obrigatória
//       name: PropTypes.string,
//       // completed deve ser um booleano obrigatório
//       completed: PropTypes.bool,
//       // selected é opcional e pode ser um booleano
//       selected: PropTypes.bool,
//     })
//   ), // allTodo é obrigatório

//   // setTodo deve ser uma função obrigatória
//   setTodo: PropTypes.func,
//   // setAllSelected deve ser uma função obrigatória
//   setAllSelected: PropTypes.func,
//   // setErrorRepeatedText deve ser uma função obrigatória
//   setErrorRepeatedText: PropTypes.func,
//   // allSelected deve ser um booleano obrigatório
//   allSelected: PropTypes.bool,
//   // handleSelectAll deve ser uma função obrigatória
//   handleSelectAll: PropTypes.func,
//   // handleSelectTodo deve ser uma função obrigatória
//   handleSelectTodo: PropTypes.func,
// };

//export default App4;

import TodoForm from "./components/TodoForm";
import React from "react";
import Todo from "./components/Todo";
import TodoListFilter from "./components/TodoListFilter";
import TodoSearch from "./components/TodoSearch";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import TodoProvider from "../../context/TodoProvider";

const AppContainer = styled.div`
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 550px) {
    padding: 4rem;
  }

  > * {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }

  > form {
    max-width: 100%;
  }

  > h1 {
    display: block;
    max-width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.h6`
  id: "list-heading";
  margin: 0;
  margin-bottom: 1rem;
  text-align: center;
`;

const TodoApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoContainer = styled.div`
  width: 100%;
`;

export default function App2() {
  return (
    <main>
      <TodoProvider>
        <AppContainer>
          <Link to="/">Home</Link>
          <TodoApp>
            <TodoForm />
            <TodoListFilter />
            <TodoContainer>
              <TodoSearch />
              <Todo />
            </TodoContainer>
          </TodoApp>
        </AppContainer>
      </TodoProvider>
    </main>
  );
}

// Define os PropTypes para as propriedades do componente App3
App2.propTypes = {
  // allTodo deve ser um array contendo objetos com uma estrutura específica
  //A função arrayOf recebe um argumento, que geralmente é outro tipo de PropTypes ou um conjunto de validações
  allTodo: PropTypes.arrayOf(
    //.shape(): É um método disponível em PropTypes que permite especificar a forma desejada de um objeto.
    PropTypes.shape({
      // id deve ser um número obrigatório
      id: PropTypes.number,
      // name deve ser uma string obrigatória
      name: PropTypes.string,
      // completed deve ser um booleano obrigatório
      completed: PropTypes.bool,
      // selected é opcional e pode ser um booleano
      selected: PropTypes.bool,
    })
  ), // allTodo é obrigatório

  // setTodo deve ser uma função obrigatória
  setTodo: PropTypes.func,
  // setAllSelected deve ser uma função obrigatória
  setAllSelected: PropTypes.func,
  // setErrorRepeatedText deve ser uma função obrigatória
  setErrorRepeatedText: PropTypes.func,
  // allSelected deve ser um booleano obrigatório
  allSelected: PropTypes.bool,
  // handleSelectAll deve ser uma função obrigatória
  handleSelectAll: PropTypes.func,
  // handleSelectTodo deve ser uma função obrigatória
  handleSelectTodo: PropTypes.func,
};
