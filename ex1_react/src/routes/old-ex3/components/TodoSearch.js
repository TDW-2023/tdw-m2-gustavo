// // Importa as funcionalidades necessárias do React
// import React, { useState } from 'react';

// // Define o componente funcional 'TodoSearch', que recebe as propriedades 'searchTerm' e 'setSearchTerm'
// function TodoSearch({ searchTerm }) {
//   // Define um estado local 'name' com um valor inicial vazio
//   const [name, setName] = useState('');

//   // Função chamada quando o valor do input é alterado
//   const handleInputChange = (event) => {
//     // Impede o comportamento padrão do formulário, que é enviar os dados
//     event.preventDefault();
//     // Obtém o valor do input a partir do evento
//     const value = event.target.value;
//     // Atualiza o estado 'name' com o valor do input
//     setName(value);
//   };

//   // Retorna a estrutura JSX do componente
//   return (
//     <form onSubmit={handleInputChange}>
//       {/* Adiciona um campo de entrada de texto para a pesquisa, com um placeholder e valor controlado pelo estado 'name' */}
//       <input
//         type="text"
//         className="input input__lg"
//         name="text"
//         autoComplete="off"
//         placeholder="Search by name..."
//         value={name}
//         onChange={handleInputChange}
//       />
//       {/* Adiciona um botão de submit ao formulário */}
//       <input placeholder='Search' type="submit" />
//     </form>
//   );
// }

// // Exporta o componente TodoSearch como o componente padrão deste módulo
// export default TodoSearch;

import React, { useState } from "react";
// Define o componente funcional 'TodoSearch', que recebe props para acessar as propriedades 'searchTerm' e 'setSearchTerm'
function TodoSearch(props) {
  // Função chamada quando o valor do input é alterado
  const handleInputChange = (event) => {
    // Atualiza o estado 'searchTerm' com o valor do input
    event.preventDefault();
    props.setSearchTerm(name);
  };
  const [name, setName] = useState("");

  // Retorna a estrutura JSX do componente
  return (
    <form onSubmit={handleInputChange}>
      {/* Adiciona um campo de entrada de texto para a pesquisa, com um placeholder e valor controlado pelo estado 'searchTerm' */}
      <input
        type="text"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn toggle-btn">
        Search
      </button>
    </form>
  );
}

// Exporta o componente TodoSearch como o componente padrão deste módulo
export default TodoSearch;
