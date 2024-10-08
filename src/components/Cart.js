import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart } = useContext(CartContext);
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const handleQuantityChange = (productId, quantity) => {
    updateCartQuantity(productId, quantity);
  };

  const handleOrder = () => {
    // Show toast notification
    toast.success('Order Successful!');

    // Clear cart items and reset cart count
    clearCart();

    // Set state to show order confirmation message
    setOrderSuccessful(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {orderSuccessful && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Order Successful!</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={item.images[0].image} alt={item.name} className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>${item.price}</p>
                </div>
              </div>

              {/* Quantity Management */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* Remove Item Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
              >
                Order
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Cart;
