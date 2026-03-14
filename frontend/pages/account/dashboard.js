import Head from 'next/head';
import WalletModule from '@/components/wallet/WalletModule';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, Settings, User as UserIcon } from 'lucide-react';

export default function Dashboard() {
  const { user, isLoggedIn, loading, isMounted } = useAuth();

  if (!isMounted || loading) return <div className="p-20 text-center">Cargando...</div>;
  if (!isLoggedIn) return <div className="p-20 text-center">Inicia sesión para ver tu perfil</div>;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Head>
        <title>Mi Perfil | VirtualStore</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* User Info & Menu */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-600 text-3xl font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'Usuario'}</h2>
            <p className="text-gray-500 text-sm mt-1">{user?.email || 'usuario@ejemplo.com'}</p>
            <span className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Cliente VIP</span>
          </div>

          <nav className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-indigo-600 bg-indigo-50">
              <UserIcon className="w-5 h-5" />
              Información de Perfil
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-gray-500 hover:bg-gray-50">
              <ShoppingBag className="w-5 h-5" />
              Mis Compras
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-gray-500 hover:bg-gray-50">
              <Settings className="w-5 h-5" />
              Ajustes
            </button>
          </nav>
        </div>

        {/* Wallet & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <WalletModule />
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h3>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Compra de Smartphone Pro</p>
                      <p className="text-xs text-gray-400 tracking-wider font-medium">10 MARZO, 2026</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-500">-$999.00</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">Saldo Virtual</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
