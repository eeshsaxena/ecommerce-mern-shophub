import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './ManageProducts.css';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/edit-product/${product._id}`, { state: { product } });
  };

  const toggleFeatured = async (product) => {
    try {
      const updated = await axios.put(`/api/products/${product._id}`, {
        ...product,
        featured: !product.featured
      });
      setProducts(products.map(p => p._id === product._id ? updated.data : p));
    } catch (error) {
      alert('Failed to update product');
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="manage-products">
      <div className="container">
        <div className="page-header">
          <h1>Manage Products</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/admin')} className="btn btn-outline">
              ← Back to Dashboard
            </button>
            <button onClick={() => navigate('/admin/add-product')} className="btn btn-primary">
              ➕ Add New Product
            </button>
          </div>
        </div>

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} className="product-thumb" />
                  </td>
                  <td><strong>{product.name}</strong></td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <span className={product.stock > 0 ? 'stock-available' : 'stock-out'}>
                      {product.stock}
                    </span>
                  </td>
                  <td>⭐ {product.rating}</td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(product)}
                      className={`btn-featured ${product.featured ? 'active' : ''}`}
                    >
                      {product.featured ? '⭐ Featured' : 'Set Featured'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(product)} className="btn-edit">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="btn-delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
