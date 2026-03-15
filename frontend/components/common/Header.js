import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Menu, X, Wallet, Trash2, CreditCard, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8080';
const getImageSrc = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

export default function Header() {
  const { user, isLoggedIn, isAdmin, logout, isMounted } = useAuth();
  const { cartItems, total, removeFromCart, decreaseQuantity, addToCart, checkout, clearCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              Virtual<span className="text-gray-900">Store</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">Productos</Link>
            <Link href="/promotions" className="text-gray-600 hover:text-indigo-600 transition-colors">Promociones</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isMounted && isLoggedIn && (
              <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 font-medium text-sm">
                <Wallet className="w-4 h-4 mr-1.5" />
                <span>${user?.balance?.toLocaleString() || '0.00'}</span>
              </div>
            )}
            
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                    {cartItems.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Tu Carrito
                    <span className="text-xs font-normal text-gray-400">({cartItems.length} items)</span>
                  </h3>
                  
                  <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <img 
                          src={getImageSrc(item.imageUrl)} 
                          className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-0.5 flex-shrink-0" 
                          alt={item.name} 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button 
                            onClick={() => decreaseQuantity(item.id)} 
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-gray-800 w-5 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item)} 
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-1 text-gray-200 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {cartItems.length === 0 && (
                      <p className="text-center text-sm text-gray-400 py-4 italic">El carrito está vacío</p>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 pt-4 space-y-3">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>Total:</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={checkout}
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                      >
                        <CreditCard className="w-4 h-4" />
                        Comprar Ahora
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {isMounted && (
              isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href={isAdmin ? "/admin" : "/account/dashboard"} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                    <User className="w-6 h-6" />
                  </Link>
                  <button onClick={logout} className="text-sm font-medium text-gray-500 hover:text-red-500">Salir</button>
                </div>
              ) : (
                <Link href="/account/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Ingresar
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 shadow-lg">
          <Link href="/products" className="block text-gray-600 hover:text-indigo-600 font-medium">Productos</Link>
          <Link href="/promotions" className="block text-gray-600 hover:text-indigo-600 font-medium">Promociones</Link>
          <Link href="/updates" className="block text-gray-600 hover:text-indigo-600 font-medium">Novedades</Link>
          <hr className="border-gray-100" />
          {isMounted && (
            isLoggedIn ? (
              <>
                <div className="flex items-center justify-between text-indigo-700 font-medium">
                  <span className="flex items-center"><Wallet className="w-4 h-4 mr-1.5" /> Saldo</span>
                  <span>${user?.balance?.toLocaleString() || '0.00'}</span>
                </div>
                <Link href={isAdmin ? "/admin" : "/account/dashboard"} className="block text-gray-600 font-medium">Mi Cuenta</Link>
                <button onClick={logout} className="block w-full text-left text-red-500 font-medium">Cerrar Sesión</button>
              </>
            ) : (
              <Link href="/account/login" className="block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center font-medium">Ingresar</Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
