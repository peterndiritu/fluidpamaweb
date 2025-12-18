
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, 
  Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, 
  Wallet, Clock, ArrowRightLeft, Plus, Droplets, Minus, BarChart2, 
  Search, X, Info, AlertTriangle, Star, History, Shield
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
          {/* Animated Background Blur */}
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
                            placeholder="Search by name or paste address" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-14 pr-4 text-white font-bold focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700 shadow-inner"
                            autoFocus
                        />
                    </div>

                    {/* Common Bases */}
                    <div className="mb-8">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Common Tokens</p>
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
        // Simple mock price logic
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
        setAmountA(amountB); // Swap amounts too for convenience
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
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl animate-fade-in-up mb-4 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                    <Clock size={14} /> Slippage Tolerance
                 </div>
                 <Info size={14} className="text-slate-600 cursor-help" />
              </div>
              <div className="flex gap-2 mb-4">
                  {[0.1, 0.5, 1.0].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setSlippage(s)}
                        className={`flex-1 py-3 rounded-xl text-xs font-black transition-all border ${slippage === s ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                      >
                          {s}%
                      </button>
                  ))}
                  <div className="flex-1 flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 group focus-within:border-cyan-500 transition-colors">
                      <input 
                        type="number" 
                        value={slippage} 
                        onChange={e => setSlippage(parseFloat(e.target.value))}
                        className="w-full bg-transparent text-xs font-black text-white text-right outline-none" 
                        placeholder="Custom"
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
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-2xl border border-slate-700 shadow-xl transition-all active:scale-95"
            >
                <div className="w-6 h-6">{tokenA.icon}</div>
                <span className="font-black text-white text-lg tracking-tight">{tokenA.symbol}</span>
                <ChevronDown size={18} className="text-slate-500" />
            </button>
        </div>
        <div className="mt-3 text-xs text-slate-600 font-black flex items-center gap-1">
            ≈ ${(parseFloat(amountA || '0') * tokenA.price).toLocaleString()} <Info size={10}/>
        </div>
      </div>
      
      {/* Reversal Button */}
      <div className="flex justify-center -my-6 relative z-10">
        <button 
            onClick={reverseSwap}
            className="bg-slate-900 border-[6px] border-slate-950 p-3.5 rounded-[1.5rem] text-cyan-400 hover:text-white transition-all shadow-2xl shadow-cyan-900/40 active:scale-90 group"
        >
            <ArrowDownUp size={24} className={`transition-transform duration-300 ${isReversing ? 'rotate-180' : 'group-hover:scale-110'}`} />
        </button>
      </div>
      
      {/* Token B Input */}
      <div className={`bg-slate-950 rounded-[2rem] p-6 border border-slate-800 hover:border-slate-700 transition-all group pt-10 ${isReversing ? 'opacity-50 scale-95' : ''}`}>
        <div className="flex justify-between text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest">
            <span>Receive Assets (Estimated)</span>
            <span className="flex items-center gap-1">
                <Wallet size={10} /> {tokenB.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <input 
                type="text" 
                value={amountB} 
                readOnly 
                placeholder="0.0"
                className="bg-transparent text-4xl font-black text-emerald-400 outline-none w-1/2 placeholder-slate-900 cursor-default" 
            />
            <button 
                onClick={() => setShowSelector('B')}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-2xl border border-slate-700 shadow-xl transition-all active:scale-95"
            >
                <div className="w-6 h-6">{tokenB.icon}</div>
                <span className="font-black text-white text-lg tracking-tight">{tokenB.symbol}</span>
                <ChevronDown size={18} className="text-slate-500" />
            </button>
        </div>
        <div className="mt-3 text-xs text-slate-600 font-black">
            ≈ ${(parseFloat(amountB || '0') * tokenB.price).toLocaleString()}
        </div>
      </div>
      
      {/* Swap Details */}
      <div className="p-5 bg-slate-950/40 rounded-2xl text-[11px] font-black space-y-3 border border-slate-800/50 shadow-inner">
        <div className="flex justify-between items-center">
            <span className="text-slate-500 flex items-center gap-1.5"><Zap size={12} className="text-yellow-500"/> Exchange Rate</span>
            <span className="text-white">1 {tokenA.symbol} = {(tokenA.price / tokenB.price).toFixed(6)} {tokenB.symbol}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-slate-500 flex items-center gap-1.5"><TrendingUp size={12} className="text-cyan-500"/> Price Impact</span>
            <span className="text-emerald-400 font-black">0.02%</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-slate-500 flex items-center gap-1.5"><AlertTriangle size={12} className="text-orange-500"/> Minimum Received</span>
            <span className="text-slate-200">{(parseFloat(amountB || '0') * (1 - slippage/100)).toFixed(4)} {tokenB.symbol}</span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        disabled={!amountA || isSwapping}
        onClick={handleSwap}
        className={`w-full py-5 bg-gradient-to-br from-cyan-400 via-cyan-600 to-blue-700 hover:brightness-110 text-slate-950 font-black text-xl rounded-3xl shadow-2xl shadow-cyan-950/40 transition-all active:scale-[0.97] disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 mt-4 group`}
      >
        {isSwapping ? <Loader2 className="animate-spin" size={24} /> : <ArrowRightLeft size={24} className="group-hover:rotate-180 transition-transform duration-500" />}
        {isSwapping ? 'Executing Swap...' : (amountA ? 'Swap Now' : 'Enter an Amount')}
      </button>

      <div className="flex items-center justify-center gap-4 mt-6">
          <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest flex items-center gap-1.5">
             <Globe size={10}/> Powered by Fluid Smart Router
          </p>
          <div className="h-1 w-1 bg-slate-800 rounded-full"></div>
          <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest hover:text-cyan-500 cursor-help transition-colors">
             Route: Fluid AMM v2
          </p>
      </div>
    </div>
  );
};

const LiquidityView = () => {
  const [tokenA, setTokenA] = useState(TOKENS[1]); // ETH
  const [tokenB, setTokenB] = useState(TOKENS[0]); // FLUID
  const [amountA, setAmountA] = useState('1');
  const [amountB, setAmountB] = useState('');
  const [showSelector, setShowSelector] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    if (!amountA || !tokenA || !tokenB) { setAmountB(''); return; }
    const val = parseFloat(amountA); if (isNaN(val)) return;
    setAmountB((val * (tokenA.price / tokenB.price)).toFixed(4));
  }, [amountA, tokenA, tokenB]);

  return (
    <div className="animate-fade-in-up space-y-4">
      <TokenSelectorModal 
        isOpen={!!showSelector} 
        onClose={() => setShowSelector(null)} 
        currentToken={showSelector === 'A' ? tokenA : tokenB}
        onSelect={(t) => showSelector === 'A' ? setTokenA(t) : setTokenB(t)}
      />
      
      <div className="text-center mb-8 px-6">
        <h3 className="text-2xl font-black text-white tracking-tight">Add Liquidity</h3>
        <p className="text-sm text-slate-500 mt-2 font-medium">Pool your assets to facilitate decentralized trades and earn 0.3% protocol fees.</p>
      </div>
      
      <div className="bg-slate-950 rounded-[2rem] p-6 border border-slate-800 space-y-6">
          {/* Token A Input */}
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span>Input</span>
                <span>Balance: {tokenA.balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
                <input type="number" value={amountA} onChange={e => setAmountA(e.target.value)} className="bg-transparent text-3xl font-black text-white outline-none w-1/2" />
                <button onClick={() => setShowSelector('A')} className="flex items-center gap-2 bg-slate-800 p-2.5 px-4 rounded-2xl border border-slate-700 shadow-lg">
                    <div className="w-6 h-6">{tokenA.icon}</div>
                    <span className="font-black text-white tracking-tight">{tokenA.symbol}</span>
                    <ChevronDown size={14} className="text-slate-500" />
                </button>
            </div>
          </div>
          
          <div className="flex justify-center -my-2 relative z-10"><Plus size={24} className="text-slate-800 bg-slate-950 rounded-full border border-slate-800" /></div>
          
          {/* Token B Input */}
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span>Input</span>
                <span>Balance: {tokenB.balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
                <input type="number" value={amountB} readOnly className="bg-transparent text-3xl font-black text-white outline-none w-1/2 cursor-default" />
                <button onClick={() => setShowSelector('B')} className="flex items-center gap-2 bg-slate-800 p-2.5 px-4 rounded-2xl border border-slate-700 shadow-lg">
                    <div className="w-6 h-6">{tokenB.icon}</div>
                    <span className="font-black text-white tracking-tight">{tokenB.symbol}</span>
                    <ChevronDown size={14} className="text-slate-500" />
                </button>
            </div>
          </div>
      </div>
      
      <div className="p-5 bg-slate-950/50 rounded-2xl text-[10px] space-y-3 border border-slate-800/50 font-black shadow-inner">
        <div className="flex justify-between items-center"><span className="text-slate-500 uppercase tracking-widest">Estimated Pool Share</span><span className="text-cyan-400 text-sm">0.052%</span></div>
        <div className="flex justify-between items-center"><span className="text-slate-500 uppercase tracking-widest">LP Tokens to Receive</span><span className="text-white text-sm">1,245.40</span></div>
      </div>
      
      <button className="w-full py-5 bg-white text-slate-950 font-black text-xl rounded-3xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 active:scale-95 mt-4">Supply Liquidity</button>
    </div>
  );
};

const StakeView = () => {
  return (
    <div className="animate-fade-in-up space-y-6">
       <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px] transition-all group-hover:bg-cyan-500/10"></div>
         <div className="flex justify-between items-start mb-8">
             <div>
                <h4 className="font-black text-white text-2xl tracking-tighter">Stake FLUID</h4>
                <p className="text-xs text-slate-500 mt-2 font-medium">Earn a compounding portion of all protocol swap fees.</p>
             </div>
             <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20 shadow-lg"><BarChart2 size={28}/></div>
         </div>
         
         <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 shadow-inner">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Variable APY</div>
                 <div className="text-3xl font-black text-emerald-400">12.55%</div>
             </div>
             <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 shadow-inner">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Your Staked</div>
                 <div className="text-3xl font-black text-white">10,500</div>
             </div>
         </div>

         <div className="flex gap-3">
            <div className="flex-[2] bg-slate-900 border border-slate-800 rounded-2xl px-5 flex items-center shadow-inner group focus-within:border-cyan-500 transition-all">
                <input type="number" placeholder="0.0" className="w-full bg-transparent font-black text-white outline-none text-lg" />
                <span className="text-[10px] font-black text-slate-500 ml-2 uppercase tracking-tighter">FLUID</span>
            </div>
            <button className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-2xl shadow-cyan-900/20 transition-all active:scale-95">Stake</button>
         </div>
       </div>

       {/* Secondary Staking Card */}
       <div className="p-8 bg-slate-950/30 border border-slate-800 border-dashed rounded-[2.5rem] relative overflow-hidden group">
         <div className="flex justify-between items-start mb-8">
             <div className="opacity-40">
                <h4 className="font-black text-white text-2xl tracking-tighter">Stake LP Tokens</h4>
                <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-widest font-black">Coming Soon</p>
             </div>
             <div className="p-4 bg-slate-800 rounded-2xl text-slate-600 shadow-lg"><Lock size={28}/></div>
         </div>
         <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-slate-800">
             <div className="h-full bg-slate-800 w-[35%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.05)]"></div>
         </div>
         <p className="text-[10px] text-slate-700 font-black uppercase mt-4 tracking-tighter">Ecosystem expansion scheduled for Q1 2026</p>
       </div>
    </div>
  );
};

export default DexPage;
