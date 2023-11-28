import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App1 from './routes/ex1/App1';
import App2 from './routes/ex2/App2';
import App3 from './routes/ex3/App3';

// import App4 from './routes/ex4/App4';
import AppIndex from './AppIndex';

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
  {
    path: '/ex2',
    element: <App2 />,
  },
  {
    path: '/ex3',
    element: <App3 />,
  },
  // {
  //   path: '/ex4',
  //   element: <App4 />,
  // },
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
