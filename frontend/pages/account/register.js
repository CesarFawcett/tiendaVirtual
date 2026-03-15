import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, User, UserPlus, Github, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import api from '@/utils/api/client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingLocal(true);
    
    try {
      // The backend register endpoint takes name as a query param and AuthRequest in body
      const response = await api.post(`/auth/register?name=${encodeURIComponent(name)}`, { 
        email, 
        password 
      });
      login(response.data);
      router.push('/products');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Error al crear la cuenta. Intenta de nuevo.');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Head>
        <title>Registrarse | VirtualStore</title>
      </Head>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Crea tu cuenta</h1>
          <p className="text-gray-500 mt-2">Únete a nuestra comunidad hoy mismo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-black"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loadingLocal}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-black"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loadingLocal}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-black"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loadingLocal}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loadingLocal}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loadingLocal ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta? <Link href="/account/login" className="font-bold text-indigo-600 hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
