import "./cart.css";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutData, setCheckoutData] = useState({});

  const checkoutDataHandler = data => {
    setCheckoutData(data);
  };

  const addToCart = course => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === course.id);
      if (existingItem) {
        return prevItems.map(
          item =>
            item.id === course.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
        );
      }
      return [...prevItems, { ...course, quantity: 1 }];
    });

    setSuccessMessage(`${course.course_name} added to cart!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const removeFromCart = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems => {
      return prevItems.map(
        item => (item.id === id ? { ...item, quantity } : item)
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkoutData,
        setCheckoutData,
        checkoutDataHandler
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
