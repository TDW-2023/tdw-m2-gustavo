// Importa a biblioteca React do pacote 'react'
import React from "react";
// Importa o hook 'useSelector' do 'react-redux' para acessar o estado da loja Redux
import { useSelector } from "react-redux";
// Importa a biblioteca 'styled-components' para estilização de componentes
import styled from "styled-components";

// Cria um componente estilizado de div usando 'styled-components'
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

// Componente funcional Balance
const Balance = () => {
  // Obtém o saldo do ATM do estado da loja Redux usando 'useSelector'
  const atmBalance = useSelector((state) => state.balance.amount);

  // Renderiza o componente Balance, exibindo o saldo do ATM no centro de uma div estilizada
  return (
    <StyledDiv>
      <h6>You still have: ${atmBalance}</h6>
    </StyledDiv>
  );
};

// Exporta o componente Balance para ser usado em outros lugares
export default Balance;
