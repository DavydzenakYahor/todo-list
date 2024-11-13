import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/main.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoList } from './components/TodoList';

const client = new QueryClient();

const App = () => {
  return (
    <TodoList />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
