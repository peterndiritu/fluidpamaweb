
import React, { useEffect, useState, useMemo } from 'react';
import { 
  ChevronDown, Wallet, CheckCircle, AlertCircle, Info, 
  TrendingUp, ShieldCheck, Star, Calculator, ArrowRight, 
  Activity, Copy, Share2, Sparkles, Zap, Timer, 
  Crown, Gift, ArrowDownUp, RefreshCw
} from 'lucide-react';
import { 
  useActiveAccount, 
  ConnectButton,
  useSwitchActiveWalletChain,
  useActiveWalletChain
} from "thirdweb/react";
import { defineChain } from "thirdweb";
import { client, wallets } from "../client";
import { useTheme } from '../context/ThemeContext';

const FLUID_PRICE = 0.05;
const PRICE_INCREASE_DATE = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);

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
  const [progress, setProgress] = useState(68);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcPeriod, setCalcPeriod] = useState<'month' | 'year'>('year');
  const [showReferral, setShowReferral] = useState(false);
  
  const fluidAmount = useMemo(() => {
    const base = usdAmount ? parseFloat(usdAmount) / FLUID_PRICE : 0;
    let bonusMult = 1;
    const val = parseFloat(usdAmount || '0');
    if (val >= 10000) bonusMult = 1.15;
    else if (val >= 5000) bonusMult = 1.10;
    else if (val >= 1000) bonusMult = 1.05;
    return Math.floor(base * bonusMult);
  }, [usdAmount]);

  const projectedRevenue = 50000000;
  const totalGenesisPool = 2000000;
  const dividendYield = useMemo(() => {
    const userStake = parseFloat(usdAmount || '0');
    const annual = (userStake / totalGenesisPool) * (projectedRevenue * 0.40);
    return calcPeriod === 'year' ? annual : annual / 12;
  }, [usdAmount, calcPeriod]);

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
      setTimeout(() => setStatus('SUCCESS'), 3000);
    } catch (e) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="w-full max-w-[540px] mx-auto z-10 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative ring-1 ring-white/5">
        <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
        
        <div className="bg-slate-50 dark:bg-white/5 border-b border-white/5 px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shard #1024 Execution</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-1"><ShieldCheck size={12} className="text-cyan-500" /> Audit Passed</div>
                <div className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> 2M+ TPS Ready</div>
            </div>
        </div>

        <div className="p-10 pb-6 relative z-10">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Genesis Round</h2>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                      <Crown size={12} className="text-cyan-500" />
                      <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Phase 1: Tier Alpha</span>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Current Price</span>
                   <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">$0.05 <span className="text-xs text-slate-500">/ FLD</span></span>
                </div>
            </div>
            
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-3 flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Timer size={16} className="text-rose-500" />
                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Price Increase in:</span>
                </div>
                <span className="text-xs font-black text-rose-400 font-mono tracking-widest">02D : 14H : 52M</span>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <span>Progress</span>
                   <span className="text-cyan-400 font-black">68.2% Sold Out</span>
                </div>
                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden shadow-inner border border-white/5 relative">
                    <div className="h-full bg-fluid-gradient animate-gradient-x rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-1000" style={{ width: `${progress}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-glow-line"></div>
                    </div>
                </div>
                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   <span>Goal: 40M FLD</span>
                   <span className="text-emerald-500">Total Raised: $1,420,000</span>
                </div>
            </div>
        </div>

        <div className="p-10 pt-4 space-y-8 relative z-10">
            <div className="space-y-4">
                <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-8 shadow-inner relative group hover:border-cyan-500/30 transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Investment Amount</label>
                        <div className="flex gap-2">
                             {['100', '500', '2500'].map(v => (
                                 <button key={v} onClick={() => setUsdAmount(v)} className="text-[9px] font-black text-slate-400 hover:text-cyan-400 uppercase transition-colors px-2 py-1 rounded-md hover:bg-cyan-500/5">${v}</button>
                             ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <input 
                          type="number" 
                          value={usdAmount} 
                          onChange={(e) => setUsdAmount(e.target.value)} 
                          className="flex-1 bg-transparent text-5xl font-black text-slate-900 dark:text-white outline-none tracking-tighter placeholder:text-slate-800" 
                          placeholder="0.00" 
                        />
                        <div className="bg-slate-800 px-5 py-3 rounded-2xl border border-white/5 shadow-xl flex items-center gap-2">
                            <span className="text-sm font-black text-white">USD</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center -my-6 relative z-20">
                    <div className="bg-slate-900 p-2 rounded-2xl border-4 border-slate-950 shadow-2xl">
                        <ArrowDownUp size={20} className="text-cyan-500" />
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-8 shadow-inner relative group">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Expected Distribution</label>
                        {parseFloat(usdAmount) >= 1000 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                <Gift size={10} className="text-emerald-500" />
                                <span className="text-[8px] font-black text-emerald-500 uppercase">+{parseFloat(usdAmount) >= 10000 ? '15%' : parseFloat(usdAmount) >= 5000 ? '10%' : '5%'} Bonus</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 text-5xl font-black text-fluid-gradient tracking-tighter">
                            {fluidAmount.toLocaleString()}
                        </div>
                        <div className="bg-cyan-500/10 px-5 py-3 rounded-2xl border border-cyan-500/20 shadow-xl flex items-center gap-2">
                            <div className="w-5 h-5 text-cyan-400">
                                <svg viewBox="0 0 100 100" fill="currentColor"><path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" /><path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" /><path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" /></svg>
                            </div>
                            <span className="text-sm font-black text-cyan-400">FLD</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                {!account ? (
                    <ConnectButton 
                        client={client} 
                        wallets={wallets} 
                        theme="dark"
                        connectButton={{ 
                            label: "Initialize Genesis", 
                            className: "!w-full !py-7 !rounded-[2.5rem] !text-xl !font-black !bg-white !text-slate-950 !shadow-2xl !tracking-[0.2em] !uppercase !transition-all hover:!opacity-90 active:!scale-95" 
                        }} 
                    />
                ) : (
                    <button 
                      onClick={handleBuy} 
                      disabled={status === 'PENDING' || !usdAmount} 
                      className={`w-full py-7 rounded-[2.5rem] text-xl font-black transition-all shadow-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-[0.98] ${
                        status === 'PENDING' 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-fluid-gradient animate-gradient-x text-white hover:brightness-110'
                      }`}
                    >
                        {status === 'PENDING' ? (
                            <><RefreshCw className="animate-spin" size={24} /> Syncing Shards...</>
                        ) : (
                            <><Wallet size={24} /> Secure {fluidAmount.toLocaleString()} Fluids</>
                        )}
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleCard;
