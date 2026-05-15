import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './ManageOrders.css';

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter(order => order.status === filter);

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="manage-orders">
      <div className="container">
        <div className="page-header">
          <h1>Manage Orders</h1>
          <button onClick={() => navigate('/admin')} className="btn btn-outline">
            ← Back to Dashboard
          </button>
        </div>

        <div className="order-filters">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <p className="no-data">No orders found</p>
          ) : (
            filteredOrders.map(order => (
              <div key={order._id} className="order-card-admin">
                <div className="order-header-admin">
                  <div>
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="order-details-admin">
                  <div className="detail-row">
                    <strong>Customer:</strong> {order.user}
                  </div>
                  <div className="detail-row">
                    <strong>Payment:</strong> {order.paymentMethod}
                  </div>
                  <div className="detail-row">
                    <strong>Shipping:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </div>
                </div>

                <div className="order-items-admin">
                  <h4>Items ({order.orderItems.length})</h4>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="order-item-admin">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <p><strong>{item.name}</strong></p>
                        <p>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer-admin">
                  <div className="order-summary">
                    <p>Items: ${order.itemsPrice.toFixed(2)}</p>
                    <p>Shipping: ${order.shippingPrice.toFixed(2)}</p>
                    <p>Tax: ${order.taxPrice.toFixed(2)}</p>
                  </div>
                  <div className="order-total-admin">
                    <strong>Total: ${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
