import React from "react";

// Define o componente funcional 'TodoListFilter' que recebe propriedades desestruturadas
function TodoListFilter({ setFilter }) {
  return (
    <div className="filters btn-group stack-exception">
      {/* Botão para definir o filtro como 'AllTasks' quando clicado */}
      <button className="btn toggle-btn" onClick={() => setFilter("AllTasks")}>All Tasks</button>
      {/* Botão para definir o filtro como 'ShowActiveTasks' quando clicado */}
      <button className="btn toggle-btn" onClick={() => setFilter("ShowActiveTasks")}>Show Active Tasks</button>
      {/* Botão para definir o filtro como 'ShowCompleted' quando clicado */}
      <button className="btn toggle-btn" onClick={() => setFilter("ShowCompleted")}>Show Completed Tasks</button>
    </div>
  );
}

// Exporta o componente TodoListFilter como o componente padrão deste módulo
export default TodoListFilter;
