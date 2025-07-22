import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Handle $ symbol or number for cost
    const parseItemCostToInteger = (itemCost) => {
        if (typeof itemCost === 'string') {
            const numeric = itemCost.replace(/[^0-9.]/g, '');
            return parseFloat(numeric);
        } else if (typeof itemCost === 'number') {
            return itemCost;
        } else {
            return 0;
        }
    };

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            const itemCost = parseItemCostToInteger(item.cost);
            return total + itemCost * item.quantity;
        }, 0);
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    const handleIncrement = (item) => {
        const newQuantity = item.quantity + 1;
        dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    };

    const handleDecrement = (item) => {
        if (item.quantity === 1) {
            dispatch(removeItem({ name: item.name, quantity: 1 }));
        } else {
            const newQuantity = item.quantity - 1;
            dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem({ name: item.name, quantity: item.quantity }));
    };

    const calculateTotalCost = (item) => {
        const itemCost = parseItemCostToInteger(item.cost);
        return (item.quantity * itemCost).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">${parseItemCostToInteger(item.cost).toFixed(2)}</div>
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >-</button>
                                <span className="cart-item-quantity-value">{Number(item.quantity) || 0}</span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>
                    Continue Shopping
                </button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;
