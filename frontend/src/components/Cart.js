import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul className="space-y-4">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p>${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white p-2 rounded ml-4"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="bg-white p-4 rounded-lg shadow-md">No items in cart</li>
        )}
      </ul>
      <button
        onClick={() => navigate('/food')}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Continue Shopping
      </button>
      {cart.length > 0 && (
        <button
          onClick={() => navigate('/address')}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;