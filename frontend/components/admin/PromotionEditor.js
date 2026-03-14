import { useState } from 'react';
import { Calendar, Clock, Tag, Layers, ChevronRight } from 'lucide-react';

export default function PromotionEditor() {
  const [promoType, setPromoType] = useState('time');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <Tag className="text-indigo-600 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Nueva Promoción</h2>
          <p className="text-gray-500 text-xs">Configura descuentos estratégicos para tus clientes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => setPromoType('time')}
          className={`p-4 rounded-2xl border-2 transition-all text-left ${promoType === 'time' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-50 hover:border-indigo-200'}`}
        >
          <Clock className={`w-6 h-6 mb-2 ${promoType === 'time' ? 'text-indigo-600' : 'text-gray-400'}`} />
          <p className="font-bold text-sm text-gray-800">Por Tiempo</p>
          <p className="text-[10px] text-gray-500">Válido hasta fecha límite</p>
        </button>
        <button 
          onClick={() => setPromoType('days')}
          className={`p-4 rounded-2xl border-2 transition-all text-left ${promoType === 'days' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-50 hover:border-indigo-200'}`}
        >
          <Calendar className={`w-6 h-6 mb-2 ${promoType === 'days' ? 'text-indigo-600' : 'text-gray-400'}`} />
          <p className="font-bold text-sm text-gray-800">Días Específicos</p>
          <p className="text-[10px] text-gray-500">Ej: Fines de semana</p>
        </button>
        <button 
          onClick={() => setPromoType('quantity')}
          className={`p-4 rounded-2xl border-2 transition-all text-left ${promoType === 'quantity' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-50 hover:border-indigo-200'}`}
        >
          <Layers className={`w-6 h-6 mb-2 ${promoType === 'quantity' ? 'text-indigo-600' : 'text-gray-400'}`} />
          <p className="font-bold text-sm text-gray-800">Por Cantidad</p>
          <p className="text-[10px] text-gray-500">Ej: 2x1 o lleva X por Y</p>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Producto Aplicable</label>
          <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500">
            <option>Seleccionar producto...</option>
            <option>Smartphone Pro Max</option>
            <option>Laptops Ultra Slim</option>
          </select>
        </div>

        {promoType === 'time' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Fecha Inicio</label>
              <input type="datetime-local" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Fecha Fin</label>
              <input type="datetime-local" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        )}

        <div className="pt-6 flex justify-end">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
            Activar Promoción
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
