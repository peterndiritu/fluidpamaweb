import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, 
  Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, 
  Wallet, Clock, ArrowRightLeft, Plus, Droplets, Minus, BarChart2, 
  Search, X, Info, AlertTriangle, Star, History, Shield, Timer, ChevronUp,
  Percent, Coins, PieChart
} from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  balance: number;
  color: string;
}

const FluidLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
        <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
    </svg>
);

const TOKENS: Token[] = [
    { symbol: 'FLUID', name: 'Fluid', icon: <FluidLogo className="w-full h-full text-cyan-400" />, price: 0.85, balance: 150240.50, color: 'text-cyan-400' },
    { symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full h-full" alt="ETH" />, price: 3450, balance: 12.55, color: 'text-blue-500' },
    { symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-full h-full" alt="USDC" />, price: 1, balance: 25000.00, color: 'text-blue-400' },
    { symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=026" className="w-full h-full" alt="SOL" />, price: 145, balance: 88.2, color: 'text-purple-500' },
    { symbol: 'USDT', name: 'Tether', icon: <img src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=026" className="w-full h-full" alt="USDT" />, price: 1, balance: 63852.12, color: 'text-emerald-500' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: <img src="https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=026" className="w-full h-full" alt="WBTC" />, price: 65200, balance: 0.45, color: 'text-orange-500' },
    { symbol: 'LINK', name: 'Chainlink', icon: <img src="https://cryptologos.cc/logos/chainlink-link-logo.png?v=026" className="w-full h-full" alt="LINK" />, price: 18.5, balance: 450, color: 'text-blue-600' },
];

const COMMON_BASES = TOKENS.slice(0, 3);

const DexPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity' | 'stake'>('swap');
  
  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-cyan-400"><FluidLogo /></div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">DEX Protocol under Development</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter uppercase">Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">trading hub</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm font-bold uppercase tracking-widest">
            High-speed atomic asset settlements
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-2 shadow-2xl relative animate-fade-in-up w-full">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/5 rounded-full blur-[80px] -z-10 animate-pulse delay-700"></div>
          
          <div className="p-3">
            <div className="relative flex gap-1 p-1 bg-slate-950/80 rounded-2xl mb-6 border border-slate-800 shadow-inner group">
                <button 
                  onClick={() => setActiveTab('swap')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all z-10 ${activeTab === 'swap' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <RefreshCw size={14} className={activeTab === 'swap' ? 'animate-spin-slow' : ''} /> Swap
                </button>
                <button 
                  onClick={() => setActiveTab('liquidity')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all z-10 ${activeTab === 'liquidity' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Droplets size={14} /> Pool
                </button>
                <button 
                  onClick={() => setActiveTab('stake')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all z-10 ${activeTab === 'stake' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <BarChart2 size={14} /> Stake
                </button>
                
                <div 
                  className="absolute top-1 bottom-1 bg-slate-800 border border-slate-700 rounded-xl transition-all duration-300 ease-out shadow-lg"
                  style={{ 
                    left: activeTab === 'swap' ? '4px' : activeTab === 'liquidity' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 1px)',
                    width: 'calc(33.33% - 4px)'
                  }}
                />
            </div>

            <div className="min-h-[480px]">
                {activeTab === 'swap' && <SwapView />}
                {activeTab === 'liquidity' && <LiquidityView />}
                {activeTab === 'stake' && <StakeView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SwapView = () => {
  const [tokenA, setTokenA] = useState(TOKENS[1]);
  const [tokenB, setTokenB] = useState(TOKENS[0]);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [showSelector, setShowSelector] = useState<'A' | 'B' | null>(null);
  const [slippage, setSlippage] = useState(0.5);
  const [deadline, setDeadline] = useState(20);
  const [showSettings, setShowSettings] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    if (!amountA || parseFloat(amountA) <= 0) { setAmountB(''); return; }
    const estimated = (parseFloat(amountA) * (tokenA.price / tokenB.price));
    setAmountB(estimated.toLocaleString(undefined, { maximumFractionDigits: 6, useGrouping: false }));
  }, [amountA, tokenA, tokenB]);

  const handleSwap = () => {
    if (!amountA) return;
    setIsSwapping(true);
    setTimeout(() => { setIsSwapping(false); setAmountA(''); alert('Trade settled on Fluid mainnet'); }, 2000);
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <TokenSelectorModal isOpen={!!showSelector} onClose={() => setShowSelector(null)} currentToken={showSelector === 'A' ? tokenA : tokenB} onSelect={(t) => showSelector === 'A' ? setTokenA(t) : setTokenB(t)} />
      <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Atomic swap</h3>
            <History size={12} className="text-slate-700 hover:text-slate-400 cursor-pointer transition-colors" />
          </div>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-xl transition-all ${showSettings ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-600 hover:text-white'}`}>
            <Settings size={16} />
          </button>
      </div>
      <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 group relative transition-all hover:border-slate-700 shadow-inner">
        <div className="flex justify-between text-[9px] font-black text-slate-700 mb-3 uppercase tracking-widest">
          <span>Paying</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setAmountA(tokenA.balance.toString())} className="text-cyan-500 hover:text-cyan-400 transition-colors uppercase font-black text-[9px] tracking-widest">Max</button>
            <span className="flex items-center gap-1 cursor-help"><Wallet size={10} /> {tokenA.balance.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
            <input type="number" value={amountA} onChange={e => setAmountA(e.target.value)} placeholder="0.00" className="bg-transparent text-3xl font-black text-white outline-none w-full placeholder-slate-900 tracking-tighter" />
            <button onClick={() => setShowSelector('A')} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2 pl-2.5 pr-3.5 rounded-2xl border border-slate-700 transition-all shrink-0">
              <div className="w-8 h-8 flex items-center justify-center p-1.5 bg-slate-900 rounded-xl">{tokenA.icon}</div>
              <span className="font-black text-xs text-white uppercase">{tokenA.symbol}</span>
              <ChevronDown size={14} className="text-slate-600" />
            </button>
        </div>
      </div>
      <div className="flex justify-center -my-6 relative z-10">
        <button onClick={() => { const t = tokenA; setTokenA(tokenB); setTokenB(t); setAmountA(amountB); }} className="bg-slate-900 border-[5px] border-slate-950 p-3 rounded-2xl text-cyan-400 hover:text-white transition-all shadow-xl active:scale-90">
          <ArrowDownUp size={20} />
        </button>
      </div>
      <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 pt-9 group transition-all hover:border-slate-700 shadow-inner">
        <div className="flex justify-between text-[9px] font-black text-slate-700 mb-3 uppercase tracking-widest">
          <span>Receiving (est.)</span>
          <span className="flex items-center gap-1"><Wallet size={10} /> {tokenB.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
            <input type="text" value={amountB} readOnly placeholder="0.00" className="bg-transparent text-3xl font-black text-emerald-400 outline-none w-full placeholder-slate-900 cursor-default tracking-tighter" />
            <button onClick={() => setShowSelector('B')} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2 pl-2.5 pr-3.5 rounded-2xl border border-slate-700 transition-all shrink-0">
              <div className="w-8 h-8 flex items-center justify-center p-1.5 bg-slate-900 rounded-xl">{tokenB.icon}</div>
              <span className="font-black text-xs text-white uppercase">{tokenB.symbol}</span>
              <ChevronDown size={14} className="text-slate-600" />
            </button>
        </div>
      </div>
      <button disabled={!amountA || isSwapping} onClick={handleSwap} className="w-full py-5 bg-gradient-to-br from-cyan-400 to-blue-700 text-slate-950 font-black text-lg rounded-3xl shadow-2xl shadow-cyan-950/40 active:scale-[0.98] disabled:opacity-20 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
        {isSwapping ? <Loader2 className="animate-spin" size={20} /> : <ArrowRightLeft size={20} />}
        {isSwapping ? 'Broadcasting...' : (amountA ? 'Execute swap' : 'Enter amount')}
      </button>
    </div>
  );
};

const TokenSelectorModal = ({ isOpen, onClose, onSelect, currentToken }: { isOpen: boolean, onClose: () => void, onSelect: (t: Token) => void, currentToken: Token }) => {
    const [search, setSearch] = useState('');
    const filteredTokens = useMemo(() => {
        const lowerSearch = search.toLowerCase();
        return TOKENS.filter(t => t.name.toLowerCase().includes(lowerSearch) || t.symbol.toLowerCase().includes(lowerSearch));
    }, [search]);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in-up">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Select asset</h3>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-xl"><X size={18}/></button>
                </div>
                <div className="p-5 overflow-y-auto custom-scrollbar space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
                        <input type="text" placeholder="Search name or symbol" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white font-bold text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-800 shadow-inner" autoFocus />
                    </div>
                </div>
            </div>
        </div>
    );
};

const LiquidityView = () => (
    <div className="animate-fade-in-up space-y-6">
      <div className="text-center space-y-2 mt-4">
        <h3 className="text-xl font-black text-white tracking-tight uppercase">Provision liquidity</h3>
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Earn 0.3% on all shard pair settlements</p>
      </div>
      <button className="w-full py-5 bg-white text-slate-950 font-black text-lg rounded-3xl hover:bg-slate-200 transition-all uppercase tracking-widest shadow-xl shadow-white/5 active:scale-95">Supply capital</button>
    </div>
);

const StakeView = () => (
    <div className="animate-fade-in-up space-y-6">
       <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group shadow-inner">
         <div className="flex justify-between items-start mb-10">
             <div>
                <h4 className="font-black text-white text-2xl tracking-tighter uppercase leading-none mb-2">Vault staking</h4>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">Secure the network and earn protocol yield</p>
             </div>
             <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20 shadow-xl group-hover:scale-110 transition-transform"><Coins size={28}/></div>
         </div>
         <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-2xl shadow-cyan-900/20 transition-all active:scale-95 text-[10px] uppercase tracking-widest">Lock assets</button>
       </div>
    </div>
);

export default DexPage;