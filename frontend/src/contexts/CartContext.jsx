import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart");
      setItems(response.data.items || []);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if already exists
        const updatedItems = items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setItems(updatedItems);
      } else {
        setItems([...items, { ...product, quantity: 1 }]);
      }

      await api.post("/cart/add", { productId: product.id, quantity: 1 });
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
      loadCart();
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setItems(items.filter((item) => item.id !== productId));
      await api.delete(`/cart/remove/${productId}`);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to remove item from cart");
      loadCart();
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const updatedItems = items
        .map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0);

      setItems(updatedItems);

      await api.put("/cart/update", { productId, quantity });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
      loadCart();
    }
  };

  const clearCart = async () => {
    try {
      setItems([]);
      await api.delete("/cart/clear");
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};