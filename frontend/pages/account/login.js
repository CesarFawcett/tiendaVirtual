import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, LogIn, Github } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified login for demo
    login({ name: 'César Fawcett', email, role: 'admin', token: 'mock-jwt-token' });
    router.push('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Head>
        <title>Ingresar | VirtualStore</title>
      </Head>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-gray-500 mt-2">Ingresa a tu cuenta para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-gray-400"><span className="bg-white px-2 italic">O continúa con</span></div>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          ¿No tienes una cuenta? <Link href="/account/register" className="font-bold text-indigo-600 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
