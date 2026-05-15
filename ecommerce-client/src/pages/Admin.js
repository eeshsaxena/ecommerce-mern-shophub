import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Electronics',
    stock: 0,
    image: '',
    featured: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const response = await axios.get('/api/products');
        setProducts(response.data.products || []);
      } else if (activeTab === 'orders') {
        const response = await axios.get('/api/orders');
        setOrders(response.data || []);
      }
      
      // Fetch stats
      const productsRes = await axios.get('/api/products');
      const ordersRes = await axios.get('/api/orders');
      
      const allProducts = productsRes.data.products || [];
      const allOrders = ordersRes.data || [];
      
      setStats({
        totalProducts: allProducts.length,
        totalOrders: allOrders.length,
        totalRevenue: allOrders.reduce((sum, order) => sum + order.totalPrice, 0),
        pendingOrders: allOrders.filter(o => o.status === 'Pending').length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, productForm);
      } else {
        await axios.post('/api/products', productForm);
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: 0,
        category: 'Electronics',
        stock: 0,
        image: '',
        featured: false
      });
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      featured: product.featured
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>🛠️ Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{stats.totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <h3>{stats.totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${stats.totalRevenue.toFixed(2)}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pendingOrders}</h3>
              <p>Pending Orders</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🛒 Orders
          </button>
        </div>

        {/* Content */}
        <div className="admin-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="products-section">
                  <div className="section-header">
                    <h2>Products Management</h2>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setShowProductForm(true);
                        setEditingProduct(null);
                        setProductForm({
                          name: '',
                          description: '',
                          price: 0,
                          category: 'Electronics',
                          stock: 0,
                          image: '',
                          featured: false
                        });
                      }}
                    >
                      ➕ Add Product
                    </button>
                  </div>

                  {showProductForm && (
                    <div className="product-form-modal">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                          <button
                            className="close-btn"
                            onClick={() => setShowProductForm(false)}
                          >
                            ✕
                          </button>
                        </div>
                        <form onSubmit={handleProductSubmit} className="product-form">
                          <div className="form-group">
                            <label>Product Name</label>
                            <input
                              type="text"
                              value={productForm.name}
                              onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              value={productForm.description}
                              onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                              required
                              rows="3"
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label>Price ($)</label>
                              <input
                                type="number"
                                step="0.01"
                                value={productForm.price}
                                onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Stock</label>
                              <input
                                type="number"
                                value={productForm.stock}
                                onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Category</label>
                            <select
                              value={productForm.category}
                              onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                            >
                              <option value="Electronics">Electronics</option>
                              <option value="Clothing">Clothing</option>
                              <option value="Books">Books</option>
                              <option value="Home">Home</option>
                              <option value="Sports">Sports</option>
                              <option value="Toys">Toys</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Image URL</label>
                            <input
                              type="url"
                              value={productForm.image}
                              onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div className="form-group checkbox-group">
                            <label>
                              <input
                                type="checkbox"
                                checked={productForm.featured}
                                onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                              />
                              Featured Product
                            </label>
                          </div>
                          <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                              {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowProductForm(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <div className="products-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
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
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{product.featured ? '⭐ Yes' : 'No'}</td>
                            <td>
                              <button
                                className="btn-edit-small"
                                onClick={() => handleEditProduct(product)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-delete-small"
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="orders-section">
                  <h2>Orders Management</h2>
                  <div className="orders-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order._id}>
                            <td>#{order._id.slice(-8)}</td>
                            <td>{order.user}</td>
                            <td>{order.orderItems.length} items</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                className={`status-select status-${order.status.toLowerCase()}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button
                                className="btn-view-small"
                                onClick={() => alert(`Order Details:\n${JSON.stringify(order, null, 2)}`)}
                              >
                                👁️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
