import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} VirtualStore. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
