import { Trash2, Plus, Minus } from 'lucide-react';

export default function ProductCard({ product }) {
  const { id, name, price, discount, image, stock } = product;
  const discountedPrice = price - (price * (discount / 100));

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Badge Descuento */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg animate-pulse">
          -{discount}%
        </div>
      )}
      
      {/* Imagen */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img 
          src={image || 'https://via.placeholder.com/400'} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>

      {/* Contenido */}
      <div className="p-5">
        <div className="mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Electrónicos</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {name}
        </h3>
        
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">${discountedPrice.toLocaleString()}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">${price.toLocaleString()}</span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className={`text-xs font-medium ${stock < 10 ? 'text-orange-500' : 'text-green-500'}`}>
            {stock < 10 ? `¡Solo ${stock} disponibles!` : 'Stock disponible'}
          </span>
        </div>

        <button className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
