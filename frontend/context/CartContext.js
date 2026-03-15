import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/utils/api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn } = useAuth();

  // Cargar carrito de localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      const currentQty = existing ? existing.quantity : 0;

      // No permitir agregar más del stock disponible
      if (currentQty >= product.stock) {
        alert(`Solo hay ${product.stock} unidades disponibles de "${product.name}".`);
        return prev;
      }

      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter(item => item.id !== productId);
      }
      return prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = async () => {
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para comprar');
      return;
    }

    try {
      for (const item of cartItems) {
        await api.post('/purchase', {
          productId: item.id,
          quantity: item.quantity
        });
      }
      alert('Compra realizada con éxito');
      await refreshUser();
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err.response?.data || 'Error al procesar la compra. Verifica tu saldo y el stock.');
    }
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      decreaseQuantity,
      clearCart, 
      checkout,
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
