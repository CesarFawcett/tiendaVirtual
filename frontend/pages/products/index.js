import { useState, useMemo, useEffect, useCallback } from 'react';
import ProductCard from '@/components/products/ProductCard';
import FilterBar from '@/components/products/FilterBar';
import Head from 'next/head';
import api from '@/utils/api/client';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    sort: 'price-asc',
  });
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/products');
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar los productos. Por favor intenta más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar al montar y cada vez que el router vuelve a esta ruta
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    router.events?.on('routeChangeComplete', fetchProducts);
    return () => router.events?.off('routeChangeComplete', fetchProducts);
  }, [router.events, fetchProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      result = result.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    }

    result.sort((a, b) => {
      // Backend return price directly, sometimes with no separate discount field in DTO
      // but let's assume the entity logic we saw
      const getPrice = (p) => p.price;
      const priceA = getPrice(a);
      const priceB = getPrice(b);

      switch (filters.sort) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'discount': return b.discount - a.discount;
        case 'stock-low': return a.stock - b.stock;
        case 'stock-high': return b.stock - a.stock;
        default: return 0;
      }
    });

    return result;
  }, [filters, products]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Head>
        <title>Productos | VirtualStore</title>
      </Head>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
          <p className="text-gray-500 mt-2">Explora nuestra selección de tecnología premium.</p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          Mostrando <span className="text-indigo-600 font-bold">{filteredProducts.length}</span> resultados
        </div>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100 p-8">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-900">Ups! Algo salió mal</h3>
          <p className="text-red-700 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
          >
            Reintentar
          </button>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-300 w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No encontramos productos</h3>
          <p className="text-gray-500 mt-2">Prueba ajustando tus filtros de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
