import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Em um projeto React, index.js é o ponto de entrada para a aplicação.
// Ele é responsável por carregar a aplicação e encontrar um elemento DOM para renderizá-la.
// Já App.js é o componente principal da aplicação.
// Ele contém a lógica principal da aplicação e é o componente raiz da hierarquia de componentes.
// Em geral, é uma boa prática manter a lógica principal da aplicação em App.js e usar index.js apenas para renderizar o componente App.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App tasks={TODOFUNCTIONS} />*/}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
