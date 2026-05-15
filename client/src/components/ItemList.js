import React from 'react';
import './ItemList.css';

function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h3>No items yet</h3>
        <p>Add your first item using the form above</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      <h2>Items ({items.length})</h2>
      <div className="items-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <div className="item-header">
              <h3>{item.name}</h3>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </div>
            
            <p className="item-description">{item.description}</p>
            
            <div className="item-footer">
              <span className="item-quantity">
                Qty: <strong>{item.quantity}</strong>
              </span>
              
              <div className="item-actions">
                <button 
                  onClick={() => onEdit(item)} 
                  className="btn-edit"
                  title="Edit item"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => onDelete(item._id)} 
                  className="btn-delete"
                  title="Delete item"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
