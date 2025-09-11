import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='orders'>
      <h3 className='orders-title'>Order List</h3>
      <div className='orders-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <div className='order-item-header'>
              <img src={assets.parcel_icon} alt="Order Icon" className='order-item-icon' />
              <div className='order-item-details'>
                <p className='order-item-food'>
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className='order-item-address'>
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}
                </p>
                <p className='order-item-phone'>{order.address.phoneNumber}</p>
              </div>
            </div>
            <div className='order-item-footer'>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='order-status'
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
