import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="max-w-7xl mx-auto py-10 px-4">
            <Component {...pageProps} />
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
