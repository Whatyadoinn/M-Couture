import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "mcouture_cart";

function loadLocalCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load cart on mount and auth change
  useEffect(() => {
    const loadCart = async () => {
      setItems(loadLocalCart());
      setLoaded(true);
    };
    loadCart();
  }, [user]);

  // Persist cart whenever items change
  useEffect(() => {
    if (!loaded) return;
    saveLocalCart(items);
  }, [items, user, loaded]);

  // Merge two cart arrays (avoid duplicate product+size combos)
  function mergeCartItems(base, incoming) {
    const merged = [...base];
    for (const item of incoming) {
      const idx = merged.findIndex(
        (m) => m.productId === item.productId && m.size === item.size
      );
      if (idx >= 0) {
        merged[idx].quantity += item.quantity;
      } else {
        merged.push(item);
      }
    }
    return merged;
  }

  const addToCart = useCallback((product, size = "Free Size", quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === product.id && i.size === size
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image || product.images?.[0] || "",
          size,
          quantity,
          collection: product.collection || "",
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback((productId, size, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, quantity }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, [user]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    items,
    itemCount,
    subtotal,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
