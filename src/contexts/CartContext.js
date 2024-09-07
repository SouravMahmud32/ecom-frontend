import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart with the specified quantity
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        // product already exists, update the quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } //  existing quantity
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  // update the quantity of an item in the cart
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId); 
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalCartPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity, totalItemsInCart, totalCartPrice }}>
      {children}
    </CartContext.Provider>
  );
};
