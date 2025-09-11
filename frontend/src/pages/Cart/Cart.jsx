import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = () => {
    if (promoInput.trim() !== '') {
      setPromoApplied(true);
      setTimeout(() => {
        setPromoApplied(false);
      }, 3000);
    } else {
      alert('Please enter a promo code!');
    }
  };

  const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

  return (
    <div className="cart">
      {isCartEmpty ? (
        <div className="empty-cart">
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Empty Cart" />
          
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet!</p>
          
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />

            {food_list.map((item) =>
              cartItems[item._id] > 0 ? (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cross">×</p>
                  </div>
                  <hr />
                </div>
              ) : null
            )}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{getTotalCartAmount()===0?0:20}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount() + 20}</b>
                </div>
                <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
              </div>

              <div className="cart-promocode">
                <p>If you have a promocode, enter it here:</p>
                <div className="cart-promocode-input">
                  <input 
                    type="text" 
                    placeholder="Promo code" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button onClick={handleApplyPromo}>Apply</button>
                </div>
                {promoApplied && (
                  <p className="promo-success">✅ Promo code applied successfully!</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
