// Importa a função createSlice do pacote '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

// Cria um slice do Redux chamado 'balance'
const balanceSlice = createSlice({
  // Nome do slice, usado para identificar as ações geradas automaticamente
  name: 'balance',
  // Estado inicial do slice, contendo uma propriedade 'amount' inicializada com o valor 0
  initialState: {
    amount: 0,
  },
  // Redutores, definem como o estado é modificado em resposta a ações
  reducers: {
    // Redutor para a ação 'deposit', incrementa o valor 'amount' com o payload da ação
    deposit: (state, action) => {
      state.amount += action.payload;
    },
    // Redutor para a ação 'withdraw', decrementa o valor 'amount' com o payload da ação
    withdraw: (state, action) => {
      state.amount -= action.payload;
    },
  },
});

// Exporta as ações geradas automaticamente (deposit e withdraw) e o redutor
export const { deposit, withdraw } = balanceSlice.actions;
export default balanceSlice.reducer;