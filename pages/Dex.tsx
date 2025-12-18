import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, 
  Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, 
  Wallet, Clock, ArrowRightLeft, Plus, Droplets, Minus, BarChart2, 
  Search, X, Info, AlertTriangle, Star, History, Shield, Timer
} from 'lucide-react';

// --- Types & Data ---
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

const COMMON_BASES = TOKENS.slice(0, 3); // FLUID, ETH, USDC

const DexPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity' | 'stake'>('swap');
  
  return (
    <div className="min-h-screen pt-32 pb-16 bg-slate-950 text-white selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">
             Fluid Protocol DEX v2
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">Trade Assets</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Swap instantly with low fees using our dynamic sharding liquidity router.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-2 shadow-2xl relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>
          
          <div className="p-4">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-slate-950/80 rounded-2xl mb-6 border border-slate-800 shadow-inner">
                <button 
                  onClick={() => setActiveTab('swap')} 
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'swap' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-white'}`}
                >
                  <RefreshCw size={16} /> Swap
                </button>
                <button 
                  onClick={() => setActiveTab('liquidity')} 
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'liquidity' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-white'}`}
                >
                  <Droplets size={16} /> Liquidity
                </button>
                <button 
                  onClick={() => setActiveTab('stake')} 
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'stake' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-white'}`}
                >
                  <BarChart2 size={16} /> Stake
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[440px]">
                {activeTab === 'swap' && <SwapView />}
                {activeTab === 'liquidity' && <LiquidityView />}
                {activeTab === 'stake' && <StakeView />}
            </div>
          </div>
        </div>

        {/* Info Cards Footer */}
        <div className="max-w-lg mx-auto mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Shield size={18}/></div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase">Security</p>
                   <p className="text-xs font-bold text-white">Audited Contracts</p>
                </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Zap size={18}/></div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase">Speed</p>
                   <p className="text-xs font-bold text-white">~600ms Finality</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const TokenSelectorModal = ({ isOpen, onClose, onSelect, currentToken }: { isOpen: boolean, onClose: () => void, onSelect: (t: Token) => void, currentToken: Token }) => {
    const [search, setSearch] = useState('');
    
    const filteredTokens = useMemo(() => {
        return TOKENS.filter(t => 
            t.name.toLowerCase().includes(search.toLowerCase()) || 
            t.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in-up">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h3 className="text-xl font-black text-white tracking-tight">Select Token</h3>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-xl"><X size={20}/></button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {/* Search Field */}
                    <div className="relative mb-6 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name or symbol" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-14 pr-12 text-white font-bold focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700 shadow-inner"
                            autoFocus
                        />
                        {search && (
                          <button 
                            onClick={() => setSearch('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1 rounded-full bg-slate-800 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                    </div>

                    {/* Common Bases */}
                    <div className="mb-8">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Common Bases</p>
                        <div className="flex flex-wrap gap-2">
                            {COMMON_BASES.map(t => (
                                <button 
                                    key={t.symbol} 
                                    onClick={() => { onSelect(t); onClose(); }}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-sm transition-all ${currentToken.symbol === t.symbol ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                                >
                                    <div className="w-5 h-5">{t.icon}</div>
                                    {t.symbol}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Token List */}
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Token List</p>
                        {filteredTokens.length > 0 ? filteredTokens.map(t => (
                            <button 
                                key={t.symbol} 
                                onClick={() => { onSelect(t); onClose(); }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${currentToken.symbol === t.symbol ? 'bg-cyan-500/10 border-cyan-500/20' : 'hover:bg-slate-800/50 border-transparent'}`}
                            >
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 p-2.5 shadow-lg flex items-center justify-center">{t.icon}</div>
                                    <div>
                                        <div className="font-black text-white text-lg leading-none mb-1">{t.symbol}</div>
                                        <div className="text-xs text-slate-500 font-bold">{t.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-white">{t.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Balance</div>
                                </div>
                            </button>
                        )) : (
                            <div className="py-12 text-center text-slate-600">
                                <Search size={40} className="mx-auto mb-4 opacity-10" />
                                <p className="font-bold">No tokens found matching "{search}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SwapView = () => {
  const [tokenA, setTokenA] = useState(TOKENS[1]); // ETH
  const [tokenB, setTokenB] = useState(TOKENS[0]); // FLUID
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [showSelector, setShowSelector] = useState<'A' | 'B' | null>(null);
  const [slippage, setSlippage] = useState(0.5);
  const [isAutoSlippage, setIsAutoSlippage] = useState(true);
  const [deadline, setDeadline] = useState(20);
  const [showSettings, setShowSettings] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    if (!amountA || parseFloat(amountA) <= 0) {
      setAmountB('');
      return;
    }
    const val = parseFloat(amountA);
    if (!isNaN(val)) {
        const estimated = (val * (tokenA.price / tokenB.price));
        setAmountB(estimated.toLocaleString(undefined, { maximumFractionDigits: 6, useGrouping: false }));
    }
  }, [amountA, tokenA, tokenB]);

  const reverseSwap = () => {
    setIsReversing(true);
    setTimeout(() => {
        const tempT = tokenA;
        setTokenA(tokenB);
        setTokenB(tempT);
        setAmountA(amountB);
        setIsReversing(false);
    }, 250);
  };

  const handleMax = () => {
      setAmountA(tokenA.balance.toString());
  };

  const handleSwap = () => {
    if (!amountA) return;
    setIsSwapping(true);
    setTimeout(() => {
        setIsSwapping(false);
        alert(`Successfully swapped ${amountA} ${tokenA.symbol} for ${amountB} ${tokenB.symbol}`);
        setAmountA('');
    }, 2000);
  };

  const handleSlippageChange = (val: number) => {
    setSlippage(val);
    setIsAutoSlippage(false);
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <TokenSelectorModal 
        isOpen={!!showSelector} 
        onClose={() => setShowSelector(null)} 
        currentToken={showSelector === 'A' ? tokenA : tokenB}
        onSelect={(t) => showSelector === 'A' ? setTokenA(t) : setTokenB(t)}
      />

      <div className="flex justify-between items-center mb-1 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-white">Swap</h3>
            <History size={16} className="text-slate-600 hover:text-slate-400 cursor-pointer transition-colors" />
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-all ${showSettings ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
              <Settings size={20} />
          </button>
      </div>

      {showSettings && (
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl animate-fade-in-up mb-4 shadow-2xl space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <Clock size={14} /> Slippage Tolerance
                   </div>
                   <button 
                      onClick={() => { setIsAutoSlippage(true); setSlippage(0.5); }}
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md transition-all ${isAutoSlippage ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                   >
                      Auto
                   </button>
                </div>
                <div className="flex gap-2">
                    {[0.1, 0.5, 1.0].map(s => (
                        <button 
                          key={s} 
                          onClick={() => handleSlippageChange(s)}
                          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all border ${!isAutoSlippage && slippage === s ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                            {s}%
                        </button>
                    ))}
                    <div className="flex-1 flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 group focus-within:border-cyan-500 transition-colors">
                        <input 
                          type="number" 
                          value={slippage} 
                          onChange={e => handleSlippageChange(parseFloat(e.target.value))}
                          className="w-full bg-transparent text-xs font-black text-white text-right outline-none" 
                          placeholder="0.00"
                        />
                        <span className="text-[10px] text-slate-500 font-black ml-1">%</span>
                    </div>
                </div>
                {slippage > 2 && (
                    <div className="flex items-center gap-2 text-[10px] text-orange-400 font-bold bg-orange-400/5 p-2 rounded-lg border border-orange-400/20">
                       <AlertTriangle size={12} /> High slippage tolerance might result in a bad trade.
                    </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                      <Timer size={14} /> Transaction Deadline
                   </div>
                   <Info size={12} className="cursor-help" />
                </div>
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
                   <input 
                      type="number" 
                      value={deadline} 
                      onChange={e => setDeadline(parseInt(e.target.value) || 0)}
                      className="bg-transparent text-xs font-black text-white outline-none w-12"
                   />
                   <span className="text-xs font-bold text-slate-500">minutes</span>
                </div>
              </div>
          </div>
      )}
      
      {/* Token A Input */}
      <div className={`bg-slate-950 rounded-[2rem] p-6 border border-slate-800 hover:border-slate-700 transition-all group relative ${isReversing ? 'opacity-50 scale-95' : ''}`}>
        <div className="flex justify-between text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest">
            <span>Pay From Wallet</span>
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 cursor-default">
                    <Wallet size={10} /> {tokenA.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <button onClick={handleMax} className="text-cyan-500 hover:text-cyan-400 font-black transition-colors px-2 py-0.5 bg-cyan-500/10 rounded-md">MAX</button>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <input 
                type="number" 
                value={amountA} 
                onChange={e => setAmountA(e.target.value)} 
                placeholder="0.0"
                className="bg-transparent text-4xl font-black text-white outline-none w-1/2 placeholder-slate-900" 
            />
            <button 
                onClick={() => setShowSelector('A')}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2.5 pr-4 rounded-2xl border border-slate-700 shadow-xl transition-all active:scale-95"
            >
                <div className="w-8 h-8 flex items-center justify-center p-1 bg-slate-900 rounded-lg">{tokenA.icon}</div>
                <div className="flex flex-col text-left">
                  <span className="font-black text-white text-base leading-none mb-0.5 tracking-tight">{tokenA.symbol}</span>
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 leading-none">
                    <Wallet size={8}/>{tokenA.balance > 1000 ? (tokenA.balance / 1000).toFixed(1) + 'k' : tokenA.balance.toFixed(2)}
                  </span>
                </div>
                <ChevronDown size={16} className="text-slate-500" />
            </button>
        </div>
        <div className="mt-3 text-xs text-slate-600 font-black flex items-center gap-1">
            ≈ ${(parseFloat(amountA || '0') * tokenA.price).toLocaleString()} <Info size={10}/>
        </div>
      </div>
      
      {/* Reversal Button */}
      <div className="flex justify-center -my-6