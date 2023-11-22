import React, { useState } from "react";

// Definição do componente funcional TodoForm que recebe a propriedade 'addNewTodo'
function TodoForm({ addNewTodo }) {
    // Define um estado 'todoNewItem' para controlar o valor do input
    const [todoNewItem, setNewItem] = useState("");

    // Função chamada ao submeter o formulário
    const handleTodoSubmit = (e) => {
      // Impede o comportamento padrão de recarregar a página ao enviar o formulário
      e.preventDefault();
      // Verifica se o valor do input é vazio e retorna se for
      if (!todoNewItem.trim()) return;
      // Chama a função 'addNewTodo' passando o valor do input como argumento
      addNewTodo(todoNewItem);
      // Limpa o valor do input após a adição da nova tarefa
      setNewItem("");
    };

  // Retorna o JSX que compõe o formulário
  return (
    <form onSubmit={handleTodoSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={todoNewItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
