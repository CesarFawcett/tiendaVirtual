import Link from 'next/link';
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              Virtual<span className="text-gray-900">Store</span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              La mejor tecnología premium al alcance de tu mano. Calidad, seguridad y rapidez en cada entrega.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Tienda</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/products" className="hover:text-indigo-600 transition-colors">Todos los Productos</Link></li>
              <li><Link href="/promotions" className="hover:text-indigo-600 transition-colors">Promociones</Link></li>
              <li><Link href="/updates" className="hover:text-indigo-600 transition-colors">Novedades</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Soporte</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>soporte@virtualstore.com</li>
              <li>+57 XXX XXX XXXX</li>
              <li>Santa Marta, Colombia</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          <p>© 2026 VirtualStore. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
