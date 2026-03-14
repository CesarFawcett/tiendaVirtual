import { useState } from 'react';
import { Upload, X, Package, DollarSign, AlignLeft, Tag } from 'lucide-react';

export default function ProductForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    stock: initialData.stock || '',
    category: initialData.category || '',
    image: null,
    imagePreview: initialData.image || null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna Izquierda: Imagen */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Imagen del Producto</label>
          <div className="relative group aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-400 transition-colors overflow-hidden flex flex-col items-center justify-center bg-gray-50">
            {formData.imagePreview ? (
              <>
                <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, image: null, imagePreview: null})}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <Upload className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">Haz clic para subir o arrastra una imagen</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 10MB</p>
              </div>
            )}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Columna Derecha: Datos */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre del Producto</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Ej: Auriculares Bluetooth"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Precio ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Stock</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Items"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Descripción</label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea 
                rows="4"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe los beneficios del producto..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit"
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
        >
          Guardar Producto
        </button>
      </div>
    </form>
  );
}
