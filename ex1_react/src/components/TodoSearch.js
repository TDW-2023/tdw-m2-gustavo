// Define o componente funcional 'TodoSearch', que recebe as propriedades 'searchTerm' e 'setSearchTerm'
function TodoSearch({ searchTerm, setSearchTerm }) {
  // Função chamada quando o valor do input é alterado
  const handleInputChange = (event) => {
    // Atualiza o estado 'searchTerm' com o valor do input
    setSearchTerm(event.target.value);
  };

  // Retorna a estrutura JSX do componente
  return (
    <form>
      {/* Adiciona um campo de entrada de texto para a pesquisa, com um placeholder e valor controlado pelo estado 'searchTerm' */}
      <input
        type="text"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </form>
  );
}

// Exporta o componente TodoSearch como o componente padrão deste módulo
export default TodoSearch;
