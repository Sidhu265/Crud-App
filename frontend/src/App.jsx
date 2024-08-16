/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import './App.css';

function App() {
  const [itemsChanged, setItemsChanged] = useState(false);

  const handleItemSaved = () => {
    setItemsChanged(!itemsChanged);
  };

  return (
    <div style={{ margin: '100px 100px 800px 400px', textAlign: 'center' }} className="App">
      <header className="App-header">
        <h1>CRUD-APP</h1>
      </header>
      <ItemForm onItemSaved={handleItemSaved} />
      <ItemList key={itemsChanged} />
    </div>
  );
}

export default App;