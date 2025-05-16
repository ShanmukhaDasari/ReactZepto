import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Order.css';

function Orders() {
  const orders = useSelector(state => state.orders);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = index => {
    setExpandedOrder(prev => (prev === index ? null : index));
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">📜 My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-message">You haven't placed any orders yet.</p>
      ) : (
        <div className="order-cards">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header" onClick={() => toggleExpand(index)}>
                <h4>Order {order.id || `#${index + 1}`}</h4>
                <span>🆔 {order.orderId}</span>
                <span>📅{order.date}</span>
                <button className="expand-btn">
                  {expandedOrder === index ? '▲ Hide' : '▼ Show'}
                </button>
              </div>

              {expandedOrder === index && (
                <div className="order-body">
                  {order.items.map(item => (
                    <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-info">
                        <p><strong>{item.name}</strong></p>
                        <p>Price: ₹{item.Price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ₹{(item.Price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="order-footer">
                    <h4>Total Paid: ₹{order.finalPrice}</h4>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
