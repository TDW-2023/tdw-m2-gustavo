import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App1 from './routes/ex1/App1';
import AppIndex from './components/AppIndex';

// Criando um navegador de rotas para a aplicação
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppIndex />,
  },
  {
    path: '/ex1',
    element: <App1 />,
  },
]);

function App() {
  // Retornando o componente RouterProvider envolto em StrictMode
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// createBrowserRouter: Cria um navegador de rotas para a aplicação.
// router: Configura as rotas da aplicação, associando caminhos a elementos React.
// function App(): Define o componente principal da aplicação.
// RouterProvider: Componente que fornece o contexto do roteador para os componentes descendentes.

export default App;
