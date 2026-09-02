import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "shadestyle_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const getProductId = (product) => {
    return product?._id || product?.id;
  };

  const addToCart = (product, quantity = 1, selectedSize = "") => {
    const productId = getProductId(product);

    if (!productId) return;

    setCart((previous) => {
      const existingItem = previous.find(
        (item) =>
          String(item._id || item.id) === String(productId) &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return previous.map((item) =>
          String(item._id || item.id) === String(productId) &&
          item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity,
          selectedSize,
        },
      ];
    });
  };

  const removeFromCart = (productId, selectedSize = "") => {
    setCart((previous) =>
      previous.filter(
        (item) =>
          !(
            String(item._id || item.id) === String(productId) &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const increaseQuantity = (productId, selectedSize = "") => {
    setCart((previous) =>
      previous.map((item) =>
        String(item._id || item.id) === String(productId) &&
        item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId, selectedSize = "") => {
    setCart((previous) =>
      previous.map((item) =>
        String(item._id || item.id) === String(productId) &&
        item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const isInCart = (productId, selectedSize = "") => {
    return cart.some(
      (item) =>
        String(item._id || item.id) === String(productId) &&
        item.selectedSize === selectedSize
    );
  };

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      isInCart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [cart, cartCount, cartTotal]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export default CartContext;