import React from 'react';
import './App.css';
import ProductList from './components/ProductList/ProductList'; // Certifique-se de que o caminho está correto

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProductList />
      </header>
    </div>
  );
}

export default App;
