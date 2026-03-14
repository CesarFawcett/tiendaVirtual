import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Tienda Virtual | Inicio</title>
        <meta name="description" content="Bienvenido a nuestra tienda virtual" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Bienvenido a Tu Tienda Virtual
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Encuentra los mejores productos con las mejores promociones.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a href="/products" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Ver Productos
            </a>
            <a href="/promotions" className="text-sm font-semibold leading-6 text-gray-900">
              Promociones <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
