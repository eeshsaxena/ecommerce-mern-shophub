import React, { useState, useEffect } from 'react';
import './ItemForm.css';

function ItemForm({ onSubmit, editingItem, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description,
        quantity: editingItem.quantity,
        price: editingItem.price
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      onSubmit(editingItem._id, formData);
    } else {
      onSubmit(formData);
    }

    setFormData({
      name: '',
      description: '',
      quantity: 0,
      price: 0
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      quantity: 0,
      price: 0
    });
    onCancel();
  };

  return (
    <div className="item-form-container">
      <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter item name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter item description"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
          {editingItem && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
