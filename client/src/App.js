import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/items');
      setItems(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load items. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (itemData) => {
    try {
      const response = await axios.post('/api/items', itemData);
      setItems([response.data, ...items]);
      setError(null);
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Failed to create item');
    }
  };

  const handleUpdateItem = async (id, itemData) => {
    try {
      const response = await axios.put(`/api/items/${id}`, itemData);
      setItems(items.map(item => item._id === id ? response.data : item));
      setEditingItem(null);
      setError(null);
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        setItems(items.filter(item => item._id !== id));
        setError(null);
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📦 MERN Inventory Manager</h1>
        <p>MongoDB + Express + React + Node.js</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <ItemForm
          onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
          editingItem={editingItem}
          onCancel={handleCancelEdit}
        />

        {loading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <ItemList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDeleteItem}
          />
        )}
      </main>
    </div>
  );
}

export default App;
