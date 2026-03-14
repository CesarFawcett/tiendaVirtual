import { Wallet, ArrowUpCircle, History, CreditCard } from 'lucide-react';

export default function WalletModule() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-indigo-100 text-sm font-medium">Saldo Disponible</p>
            <h2 className="text-4xl font-bold mt-1 tracking-tight">$2,540.00</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 flex gap-3">
          <button className="flex-1 bg-white text-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors active:scale-95 text-sm">
            <ArrowUpCircle className="w-4 h-4" />
            Recargar Saldo
          </button>
          <button className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors backdrop-blur-md">
            <History className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Metodos de Pago vinculados</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-indigo-200 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-black rounded-md flex items-center justify-center text-white font-bold text-[8px] italic">VISA</div>
              <div>
                <p className="text-sm font-bold text-gray-700">•••• 4242</p>
                <p className="text-xs text-gray-400 uppercase">Exp: 12/28</p>
              </div>
            </div>
            <CreditCard className="w-5 h-5 text-gray-300 group-hover:text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
