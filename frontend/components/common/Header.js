import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, User, Menu, X, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, isLoggedIn, isAdmin, logout, isMounted } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/updates" className="text-gray-600 hover:text-indigo-600 transition-colors">Novedades</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isMounted && isLoggedIn && (
              <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 font-medium text-sm">
                <Wallet className="w-4 h-4 mr-1.5" />
                <span>$2,500.00</span>
              </div>
            )}
            
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">2</span>
            </button>

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
                  <span>$2,500.00</span>
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
