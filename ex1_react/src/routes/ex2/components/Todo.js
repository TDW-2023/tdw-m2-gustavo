// Importa o React e a função 'useEffect' do pacote 'react'
import React, { useEffect, useState } from "react";
import { useTodoContext } from "../../../context/TodoProvider";
import Cookies from "js-cookie";

// Define o componente funcional 'Todo'
function Todo() {
  // Obtém os estados e funções do contexto
  const {
    allTodo,
    setTodo,
    handleSelectAll,
    handleSelectTodo,
    filteredTodo,
    errorRepeatedText,
  } = useTodoContext();

  // Estado local para verificar se todos os elementos estão selecionados
  const [allSelectedState, setAllSelectedState] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID da tarefa em modo de edição
  const [editedName, setEditedName] = useState(""); // Nome editado

  // Efeito que é acionado sempre que 'filteredTodo' for alterado
  useEffect(() => {
    // Verifica se todos os elementos em 'filteredTodo' estão selecionados
    const allElementsSelected = filteredTodo.every((todo) => todo.selected);
    // Atualiza o estado 'allSelectedState' com base na verificação
    setAllSelectedState(allElementsSelected);
  }, [filteredTodo]);

  // Função local 'handleSelectAllLocal' chamada ao selecionar ou deselecionar todas as tarefas
  const handleSelectAllLocal = () => {
    // Atualiza o estado 'allSelectedState' antes de atualizar 'allTodo'
    setAllSelectedState((prev) => !prev);
    // Cria um novo array 'newTodo' baseado nas tarefas existentes, atualizando a propriedade 'selected' de cada uma
    const newTodo = allTodo.map((todo) => ({
      ...todo,
      selected: !allSelectedState,
    }));
    // Atualiza o estado 'allTodo' com o novo array
    setTodo(newTodo);
    // Chama a função passada como propriedade para tratar a seleção/deseleção geral
    handleSelectAll();
  };

  // Função local 'handleSelectTodoLocal' chamada ao selecionar ou deselecionar uma tarefa específica
  const handleSelectTodoLocal = (id) => {
    // Cria um novo array 'newTodo' baseado nas tarefas existentes, atualizando a propriedade 'selected' apenas para a tarefa com o ID correspondente
    const newTodo = allTodo.map((todo) =>
      todo.id === id ? { ...todo, selected: !todo.selected } : todo
    );
    // Atualiza o estado 'allTodo' com o novo array
    setTodo(newTodo);
    // Atualiza o estado 'allSelectedState' verificando se todas as tarefas estão selecionadas
    setAllSelectedState(newTodo.every((todo) => todo.selected));
    // Chama a função passada como propriedade para tratar a seleção/deseleção específica
    handleSelectTodo(id);
  };

  const handleEditClick = (id) => {
    // Ativa o modo de edição ao clicar em "Edit"
    setEditingId(id);
    // Inicializa o nome editado com o nome atual da tarefa
    setEditedName(allTodo.find((todo) => todo.id === id).name);
  };

  const handleCancelEdit = () => {
    // Desativa o modo de edição ao clicar em "Cancel"
    setEditingId(null);
    setEditedName("");
  };

  const handleSaveEdit = (id) => {
    let finalName =
      editedName.trim() === ""
        ? allTodo.find((todo) => todo.id === id).name
        : editedName;
    const newTodo = allTodo.map((todo) =>
      todo.id === id ? { ...todo, name: finalName } : todo
    );
    setTodo(newTodo);
    setEditingId(null);
    setEditedName("");
  };

  const handleDelete = (id) => {
    // Remove a tarefa da lista ao clicar em "Delete"
    const newTodo = allTodo.filter((todo) => todo.id !== id);
    setTodo(newTodo);

    // Remove o item do cookie
    const todoDataArray = JSON.parse(Cookies.get("todoData") || "[]");
    const updatedTodoData = todoDataArray.filter((todo) => todo.id !== id);
    Cookies.remove("todoData", { path: "/" });
    Cookies.set("todoData", JSON.stringify(updatedTodoData), { path: "/" });
  };

  // Retorna a estrutura JSX do componente Todo
  return (
    <div>
      {/* Lista de tarefas */}
      {filteredTodo.length > 0 ? (
        <div className="form-group">
          <div className="stack-small">
            <div className="c-cb">
              <input
                type="checkbox"
                className="todo-text"
                checked={allSelectedState}
                onChange={handleSelectAllLocal}
              />
              <label htmlFor="select-all todo-label">Select all</label>
            </div>
          </div>
        </div>
      ) : (
        <h6 id="list-heading" tabIndex="-1">
          This filter doesn't have any results.
        </h6>
      )}
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* Mapeia cada tarefa e renderiza um item de lista com checkbox associado */}
        {filteredTodo.map((todo) => (
          <li className="todo" key={todo.id}>
            {/* Checkbox para selecionar ou deselecionar uma tarefa específica */}
            {editingId !== todo.id && (
              <div className="c-cb">
                <input
                  type="checkbox"
                  className="todo-text"
                  checked={todo.selected || false}
                  onChange={() => handleSelectTodoLocal(todo.id)}
                />
                {/* Se não estiver em modo de edição, exibe o nome da tarefa */}
                <label className="todo-label">{todo.name}</label>
              </div>
            )}
            {/* Se estiver em modo de edição, exibe o input para editar o nome */}
            {editingId === todo.id ? (
              <div>
                <input
                  type="text"
                  className="input input__lg"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <div className="btn-group">
                  {/* Botões para cancelar ou salvar a edição */}
                  <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn__primary todo-edit"
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : null}
            {/* Botões "Edit" e "Delete" */}
            {editingId !== todo.id ? (
              <div className="btn-group">
                {" "}
                <button
                  type="button"
                  className="btn toggle-btn"
                  onClick={() => handleEditClick(todo.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn btn__danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      {errorRepeatedText !== "" ? <div>{errorRepeatedText}</div> : null}
    </div>
  );
}

// Exporta o componente Todo como o componente padrão deste módulo
export default Todo;