import Head from 'next/head';
import { Calendar, MessageSquare, Plus, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MOCK_UPDATES = [
  {
    id: 1,
    title: 'Nueva Colección de Verano 2026',
    date: '14 de Marzo, 2026',
    description: 'Hemos añadido más de 50 nuevos productos a nuestro catálogo. ¡No te pierdas los descuentos exclusivos!',
    image: 'https://images.unsplash.com/photo-1523381235312-3a1647fa9921?q=80&w=800&auto=format&fit=crop',
    comments: 12
  },
  {
    id: 2,
    title: 'Mantenimiento del Sistema',
    date: '12 de Marzo, 2026',
    description: 'Estaremos realizando mejoras en nuestra pasarela de pagos este domingo a las 02:00 AM. El servicio se verá interrumpido por 1 hora.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    comments: 5
  }
];

export default function UpdatesPage() {
  const { isAdmin } = useAuth();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Head>
        <title>Novedades | VirtualStore</title>
      </Head>

      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="text-indigo-600 w-8 h-8" />
            Actualizaciones
          </h1>
          <p className="text-gray-500 mt-2">Mantente al día con las últimas noticias de nuestra plataforma.</p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Nueva Entrada
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_UPDATES.map((update) => (
          <div key={update.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="aspect-[16/9] overflow-hidden">
              <img 
                src={update.image} 
                alt={update.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {update.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {update.comments} comentarios
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {update.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                {update.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Leer más →</button>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">U{i}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
