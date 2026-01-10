import React, { useEffect, useState } from 'react';
import { ChevronDown, Wallet, CheckCircle, AlertCircle, Info, TrendingUp, ShieldCheck } from 'lucide-react';
import { 
  useActiveAccount, 
  ConnectButton,
  useSwitchActiveWalletChain,
  useActiveWalletChain
} from "thirdweb/react";
import { 
  defineChain,
} from "thirdweb";
import { client, wallets } from "../client";
import { useTheme } from '../context/ThemeContext';

// --- Configuration ---
const FALLBACK_FLUID_PRICE = 0.05; // $0.05 per Fluid

interface PaymentOption {
  id: string;
  symbol: string;
  name: string;
  network: string;
  chainId: number;
  icon: string;
  isNative: boolean;
  address?: string; 
  decimals: number;
  coingeckoId: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', network: 'ERC-20', chainId: 1, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026', isNative: true, decimals: 18, coingeckoId: 'ethereum' },
  { id: 'bnb', symbol: 'BNB', name: 'BNB Smart Chain', network: 'BEP-20', chainId: 56, icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026', isNative: true, decimals: 18, coingeckoId: 'binancecoin' },
  { id: 'usdt_eth', symbol: 'USDT', name: 'Tether', network: 'ERC-20', chainId: 1, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, decimals: 6, coingeckoId: 'tether' },
  { id: 'matic', symbol: 'POL', name: 'Polygon', network: 'Polygon', chainId: 137, icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=026', isNative: true, decimals: 18, coingeckoId: 'matic-network' },
];

const PresaleCard: React.FC = () => {
  const account = useActiveAccount();
  const { theme } = useTheme();
  const { mutateAsync: switchChain } = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const chainId = activeChain?.id;

  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(PAYMENT_OPTIONS[0]);
  const [usdAmount, setUsdAmount] = useState<string>('500');
  const [cryptoPrice, setCryptoPrice] = useState<number>(3400); 
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [progress, setProgress] = useState(64);
  
  const fluidAmount = usdAmount ? parseFloat(usdAmount) / FALLBACK_FLUID_PRICE : 0;

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedPayment.symbol === 'USDT') { setCryptoPrice(1); return; }
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedPayment.coingeckoId}&vs_currencies=usd`);
        const data = await res.json();
        if (data[selectedPayment.coingeckoId]?.usd) setCryptoPrice(data[selectedPayment.coingeckoId].usd);
      } catch (e) {
        console.warn("Fallback used for price");
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [selectedPayment]);

  const handleBuy = async () => {
    if (!account || !usdAmount) return;
    setStatus('PENDING');
    try {
      if (chainId !== selectedPayment.chainId) {
         await switchChain(defineChain(selectedPayment.chainId));
      }
      setTimeout(() => setStatus('SUCCESS'), 2500);
    } catch (e) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto z-10 scroll-card">
      <div className="bg-white dark:bg-slate-950/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-blue-500/10">
        
        {/* Header with Progress */}
        <div className="p-8 pb-4">
            <div className="flex justify-between items-end mb-6">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Presale Genesis</h2>
                   <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                     <ShieldCheck size={12} className="text-emerald-500" /> Audited Smart Contracts
                   </p>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-widest block mb-1">Stage 1 of 5</span>
                   <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">64.2% SOLD</span>
                </div>
            </div>
            
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-white/5">
                <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 rounded-full animate-gradient-x shadow-[0_0_15px_rgba(6,182,212,0.5)]" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <span>Softcap: $500k</span>
               <span className="text-emerald-500">Raised: $1,284,500</span>
               <span>Hardcap: $2M</span>
            </div>
        </div>

        <div className="p-8 pt-6 space-y-8">
            {/* Payment Method */}
            <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span>Select Network & Asset</span>
                    <TrendingUp size={14} className="text-emerald-500" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {PAYMENT_OPTIONS.map(opt => (
                        <button 
                          key={opt.id} 
                          onClick={() => setSelectedPayment(opt)} 
                          className={`flex flex-col items-center p-4 rounded-[1.5rem] border transition-all relative overflow-hidden group ${selectedPayment.id === opt.id ? 'bg-blue-600/5 dark:bg-cyan-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}
                        >
                            <img src={opt.icon} alt={opt.symbol} className="w-8 h-8 rounded-full mb-3 shadow-md group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black text-slate-900 dark:text-slate-300 tracking-tighter">{opt.symbol}</span>
                            {selectedPayment.id === opt.id && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 dark:bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,1)]"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Amount Inputs */}
            <div className="space-y-5">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Investment Amount (USD)</label>
                    <div className="relative">
                        <input 
                          type="number" 
                          value={usdAmount} 
                          onChange={(e) => setUsdAmount(e.target.value)} 
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[1.5rem] py-5 pl-6 pr-32 text-3xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-all shadow-inner tracking-tighter" 
                          placeholder="0.00" 
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 dark:text-white">USD</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[1.5rem] p-5 flex justify-between items-center relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-tech-grid opacity-[0.02]"></div>
                    <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Expected Tokens</span>
                        <div className="text-2xl font-black text-blue-600 dark:text-cyan-400 tracking-tighter">
                            {fluidAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm">FLD</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Price Per Unit</span>
                        <div className="text-sm font-black text-slate-900 dark:text-white">$0.05</div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
                {!account ? (
                    <ConnectButton 
                        client={client} 
                        wallets={wallets} 
                        theme={theme === 'dark' ? "dark" : "light"} 
                        connectButton={{ label: "Connect to Buy", className: "!w-full !py-5 !rounded-3xl !text-lg !font-black !bg-slate-900 dark:!bg-white !text-white dark:!text-black !shadow-2xl !tracking-widest !uppercase !transition-all hover:!opacity-90" }} 
                    />
                ) : (
                    <button 
                      onClick={handleBuy} 
                      disabled={status === 'PENDING'} 
                      className="w-full py-5 rounded-3xl text-lg font-black bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-cyan-400 dark:to-blue-600 text-white dark:text-slate-950 hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                        {status === 'PENDING' ? (
                            <><div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> Syncing Node</>
                        ) : (
                            <><Wallet size={20} /> Swap for FLUID</>
                        )}
                    </button>
                )}
            </div>

            {status === 'SUCCESS' && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black text-center uppercase tracking-widest animate-fade-in-up flex items-center justify-center gap-2">
                    <CheckCircle size={14} /> Transaction Confirmed on Shard #102
                </div>
            )}
            
            <div className="flex items-center justify-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <div className="flex items-center gap-1"><ShieldCheck size={12} className="text-blue-500" /> Secure</div>
               <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
               <div className="flex items-center gap-1"><Info size={12} /> Min: $50</div>
               <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
               <div className="flex items-center gap-1"><TrendingUp size={12} className="text-emerald-500" /> Yield Active</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleCard;