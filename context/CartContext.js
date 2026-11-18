
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

// Start with an empty cart whenever the app loads
useEffect(() => {
  localStorage.removeItem("marketora-cart");
  setCartItems([]);
  setCartLoaded(true);
}, []);

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const productId = String(product._id || product.id);

      const existingItem = previousItems.find(
        (item) =>
          String(item._id || item.id) === productId
      );

      if (existingItem) {
        return previousItems.map((item) =>
          String(item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCartItems((items) =>
      items.map((item) =>
        String(item._id || item.id) === String(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCartItems((items) =>
      items
        .map((item) =>
          String(item._id || item.id) === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (productId) => {
    setCartItems((items) =>
      items.filter(
        (item) =>
          String(item._id || item.id) !== String(productId)
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of items
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      (Number(
        String(item.price ?? 0).replace(/[^0-9.]/g, "")
      ) || 0) *
        item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoaded,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
