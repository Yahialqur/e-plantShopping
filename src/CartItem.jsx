import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const itemCost = parseFloat(item.cost.replace('$', ''));
      total += item.quantity * itemCost;
    });
    return total.toFixed(2);
  };

  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity })); // Dispatch updateQuantity action
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity })); // Dispatch updateQuantity action
    } else {
      dispatch(removeItem(item.name)); // Dispatch removeItem action if quantity reaches 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch removeItem action to remove item from the cart
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
        <div className="cart-icon">
          <i className="shopping-cart-icon"></i>
          <span className="cart-count">{totalQuantity}</span> {/* Display totalQuantity */}
        </div>
      </div>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalAmount(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
