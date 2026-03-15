import { useState } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import PromotionEditor from '@/components/admin/PromotionEditor';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import api from '@/utils/api/client';
import { useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Percent, Megaphone, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const { isAdmin, loading, isMounted } = useAuth();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching admin products:', err);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  const handleCreateProduct = async (data) => {
    try {
      await api.post('/products/admin', data);
      alert('Producto creado con éxito');
      fetchProducts();
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Error al crear el producto');
    }
  };

  if (!isMounted || loading) return <div className="p-20 text-center">Cargando...</div>;
  if (!isAdmin) return <div className="p-20 text-center text-red-500 font-bold">Acceso Denegado</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <title>Panel Admin | VirtualStore</title>
      </Head>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:block overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Menú Principal</h2>
          <nav className="mt-4 space-y-2">
            <button 
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'products' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              Productos
            </button>
            <button 
              onClick={() => setActiveTab('promotions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'promotions' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Percent className="w-5 h-5" />
              Promociones
            </button>
            <button 
              onClick={() => setActiveTab('updates')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'updates' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Megaphone className="w-5 h-5" />
              Actualizaciones
            </button>
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {activeTab === 'products' ? 'Gestión de Productos' : 
                 activeTab === 'promotions' ? 'Gestión de Promociones' : 
                 'Publicar Actualización'}
              </h1>
              <p className="text-gray-500 mt-1">Panel de control del propietario.</p>
            </div>
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
            </div>
          </header>

          {activeTab === 'products' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ProductForm onSubmit={handleCreateProduct} />
              
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                            <img src={product.imageUrl || "https://via.placeholder.com/40"} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-semibold text-gray-700">{product.name}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-indigo-600 text-sm">${product.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{product.stock} u.</td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-xs font-bold text-red-500 hover:underline"
                            onClick={async () => {
                              if(confirm('¿Eliminar producto?')) {
                                await api.delete(`/products/${product.id}`);
                                fetchProducts();
                              }
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">No hay productos registrados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PromotionEditor />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
