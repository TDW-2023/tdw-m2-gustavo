// src/store.js
// Importa a função 'configureStore' do '@reduxjs/toolkit' para configurar a loja Redux
import { configureStore } from '@reduxjs/toolkit';
// Importa o redutor 'balanceReducer' do arquivo 'balanceSlice' localizado no diretório '../reduxFeatures/'
import balanceReducer from '../reduxFeatures/balanceSlice';

// Configura e cria a loja Redux usando 'configureStore'
const store = configureStore({
  // Define os redutores da loja, neste caso, apenas o redutor 'balanceReducer' sob o nome 'balance'
  reducer: {
    balance: balanceReducer,
  },
});

// Exporta a loja configurada para ser utilizada em outros lugares da aplicação
export default store;