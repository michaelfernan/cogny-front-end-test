import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Supondo que o App.js seja o arquivo principal

const container = document.getElementById('root');
const root = createRoot(container); // Cria a raiz usando a nova API
root.render(<App />);
