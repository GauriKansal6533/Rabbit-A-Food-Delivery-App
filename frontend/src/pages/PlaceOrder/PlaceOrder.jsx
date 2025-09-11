import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, url } = useContext(StoreContext);
  const token = localStorage.getItem("token"); // ✅ get token from localStorage

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phoneNumber: "",
  });

  const totalAmount = getTotalCartAmount();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (totalAmount === 0) {
      alert("Cart is empty.");
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount + 20,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Corrected
        },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error placing order.");
      }
    } catch (err) {
      console.error("Order Placement Error:", err.response?.data || err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  const navigate= useNavigate();

  useEffect(()=>{
    if (!token) {
    navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={data.firstName} onChange={onChangeHandler} required />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={data.lastName} onChange={onChangeHandler} required />
          </div>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={data.email} onChange={onChangeHandler} required />
        </div>
        <div className="input-group">
          <label>Street</label>
          <input type="text" name="street" value={data.street} onChange={onChangeHandler} required />
        </div>
        <div className="multi-fields">
          <div className="input-group">
            <label>City</label>
            <input type="text" name="city" value={data.city} onChange={onChangeHandler} required />
          </div>
          <div className="input-group">
            <label>State</label>
            <input type="text" name="state" value={data.state} onChange={onChangeHandler} required />
          </div>
        </div>
        <div className="multi-fields">
          <div className="input-group">
            <label>Pin Code</label>
            <input type="text" name="pinCode" value={data.pinCode} onChange={onChangeHandler} required />
          </div>
          <div className="input-group">
            <label>Country</label>
            <input type="text" name="country" value={data.country} onChange={onChangeHandler} required />
          </div>
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={data.phoneNumber} onChange={onChangeHandler} required />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{totalAmount === 0 ? 0 : 20}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{totalAmount === 0 ? 0 : totalAmount + 20}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
