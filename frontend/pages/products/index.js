import { useState, useMemo } from 'react';
import ProductCard from '@/components/products/ProductCard';
import FilterBar from '@/components/products/FilterBar';
import Head from 'next/head';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Smartphone Pro Max', price: 999, discount: 15, stock: 5, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Laptops Ultra Slim', price: 1299, discount: 0, stock: 25, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Wireless Headphones', price: 199, discount: 20, stock: 40, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Smartwatch Series X', price: 349, discount: 10, stock: 8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Gaming Console', price: 499, discount: 5, stock: 15, image: 'https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Mechanical Keyboard', price: 129, discount: 30, stock: 2, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop' },
];

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: '',
    sort: 'price-asc',
  });

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (filters.search) {
      result = result.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    }

    result.sort((a, b) => {
      const priceA = a.price - (a.price * (a.discount / 100));
      const priceB = b.price - (b.price * (b.discount / 100));

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
  }, [filters]);

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

      {filteredProducts.length > 0 ? (
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
