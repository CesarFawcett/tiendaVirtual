import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-bold text-gray-400 uppercase">Ordenar por:</span>
          <select 
            className="bg-transparent border-none text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer"
            value={filters.sort}
            onChange={(e) => setFilters({...filters, sort: e.target.value})}
          >
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="discount">Mayor % Descuento</option>
            <option value="stock-low">Bajo Stock</option>
            <option value="stock-high">Alto Stock</option>
          </select>
        </div>

        <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>
    </div>
  );
}
