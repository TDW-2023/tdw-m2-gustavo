// Importa o React e o hook 'useState' do React para gerenciar o estado local
import React, { useState } from 'react';
// Importa o hook 'useDispatch' do 'react-redux' para despachar ações Redux
import { useDispatch } from 'react-redux';
// Importa as ações 'deposit' e 'withdraw' do arquivo 'balanceSlice' localizado no diretório '../reduxFeatures/'
import { deposit, withdraw } from '../reduxFeatures/balanceSlice';
// Importa a biblioteca 'styled-components' para estilização de componentes
import styled from 'styled-components';

// Cria um componente estilizado de botão usando 'styled-components'
const StyledButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

// Componente funcional Transaction
const Transaction = () => {
    // Obtém a função dispatch do Redux para despachar ações
    const dispatch = useDispatch();
    // Define um estado local 'amount' usando o hook 'useState'
    const [amount, setAmount] = useState('');
  
    // Função para lidar com depósitos e retiradas com base no tipo de transação
    const handleTransaction = (transactionType) => {
      // Verifica se o valor 'amount' não está vazio
      if (amount) {
        // Executa a ação 'deposit' se o tipo de transação for 'deposit'
        if (transactionType === 'deposit') {
          dispatch(deposit(Number(amount)));
        } 
        // Executa a ação 'withdraw' se o tipo de transação for 'withdraw'
        else if (transactionType === 'withdraw') {
          dispatch(withdraw(Number(amount)));
        }
        // Limpa o estado 'amount' após a execução da transação
        setAmount('');
      }
    };
  
    // Renderiza o componente Transaction, incluindo um input e dois botões estilizados
    return (
      <div>
        Amount <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <StyledButton onClick={() => handleTransaction('deposit')}>Deposit</StyledButton>
        <StyledButton onClick={() => handleTransaction('withdraw')}>Withdraw</StyledButton>
      </div>
    );
  };

// Exporta o componente Transaction para ser usado em outros lugares
export default Transaction;