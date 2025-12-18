import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, 
  Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, 
  Wallet, Clock, ArrowRightLeft, Plus, Droplets, Minus, BarChart2, 
  Search, X, Info, AlertTriangle 
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
    { symbol: 'FLUID', name: 'Fluid', icon: <FluidLogo className="w-full h-full text-cyan-400" />, price: 0.85, balance: 150000.00, color: 'text-cyan-400' },
    { symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full h-full" alt="ETH" />, price: 3450, balance: 12.5, color: 'text-blue-500' },
    { symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-full h-full" alt="USDC" />, price: 1, balance: 25000.00, color: 'text-blue-400' },
    { symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=026" className="w-full h-full" alt="SOL" />, price: 145, balance: 88, color: 'text-purple-500' },
    { symbol: 'USDT', name: 'Tether', icon: <img src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=026" className="w-full h-full" alt="USDT" />, price: 1, balance: 63852, color: 'text-emerald-500' },
];

const DexPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity' | 'stake'>('swap');
  
  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-4">Fluid DEX</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            High-performance trading, deep liquidity pools, and sustainable yield farming.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
          
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-slate-950 rounded-2xl mb-6 border border-slate-800">
            <button onClick={() => setActiveTab('swap')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'swap' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-white'}`}><RefreshCw size={14} /> Swap</button>
            <button onClick={() => setActiveTab('liquidity')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'liquidity' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-white'}`}><Droplets size={14} /> Liquidity</button>
            <button onClick={() => setActiveTab('stake')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'stake' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-white'}`}><BarChart2 size={14} /> Stake</button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'swap' && <SwapView />}
            {activeTab === 'liquidity' && <LiquidityView />}
            {activeTab === 'stake' && <StakeView />}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for each tab ---

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Select a token</h3>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
                </div>
                <div className="p-6">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or symbol" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                    <div className="space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredTokens.map(t => (
                            <button 
                                key={t.symbol} 
                                onClick={() => { onSelect(t); onClose(); }}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${currentToken.symbol === t.symbol ? 'bg-cyan-500/10 border border-cyan-500/30' : 'hover:bg-slate-800 border border-transparent'}`}
                            >
                                <div className="flex items-center gap-3 text-left">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 p-2">{t.icon}</div>
                                    <div>
                                        <div className="font-bold text-white leading-none mb-1">{t.symbol}</div>
                                        <div className="text-xs text-slate-500">{t.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-white">{t.balance.toLocaleString()}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Balance</div>
                                </div>
                            </button>
                        ))}
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

  useEffect(() => {
    if (!amountA || parseFloat(amountA) === 0) {
      setAmountB('');
      return;
    }
    const val = parseFloat(amountA);
    if (!isNaN(val)) {
        setAmountB((val * (tokenA.price / tokenB.price)).toFixed(4));
    }
  }, [amountA, tokenA, tokenB]);

  const reverseSwap = () => {
    const tempT = tokenA;
    setTokenA(tokenB);
    setTokenB(tempT);
    setAmountA('');
    setAmountB('');
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

      <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-lg font-bold text-white">Swap</h3>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-all ${showSettings ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-white'}`}
          >
              <Settings size={20} />
          </button>
      </div>

      {showSettings && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl animate-fade-in-up mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  <Clock size={12} /> Slippage Tolerance
              </div>
              <div className="flex gap-2">
                  {[0.1, 0.5, 1.0].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setSlippage(s)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${slippage === s ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                      >
                          {s}%
                      </button>
                  ))}
                  <div className="flex-1 flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2">
                      <input 
                        type="number" 
                        value={slippage} 
                        onChange={e => setSlippage(parseFloat(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-white text-right outline-none" 
                      />
                      <span className="text-[10px] text-slate-500 font-bold ml-1">%</span>
                  </div>
              </div>
          </div>
      )}
      
      {/* Token A Input */}
      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all group">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-widest">
            <span>You Sell</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => setAmountA(tokenA.balance.toString())}>
                <Wallet size={10} /> Balance: {tokenA.balance.toLocaleString()}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <input 
                type="number" 
                value={amountA} 
                onChange={e => setAmountA(e.target.value)} 
                placeholder="0.0"
                className="bg-transparent text-4xl font-bold text-white outline-none w-1/2 placeholder-slate-800" 
            />
            <button 
                onClick={() => setShowSelector('A')}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-2xl border border-slate-700 shadow-sm transition-all"
            >
                <div className="w-6 h-6">{tokenA.icon}</div>
                <span className="font-bold text-white">{tokenA.symbol}</span>
                <ChevronDown size={14} className="text-slate-500" />
            </button>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-bold">
            ≈ ${(parseFloat(amountA || '0') * tokenA.price).toLocaleString()}
        </div>
      </div>
      
      <div className="flex justify-center -my-6 relative z-10">
        <button 
            onClick={reverseSwap}
            className="bg-slate-900 border-4 border-slate-950 p-3 rounded-[1.25rem] text-cyan-400 hover:text-white transition-all shadow-xl shadow-cyan-900/20 active:scale-95"
        >
            <ArrowDownUp size={24} />
        </button>
      </div>
      
      {/* Token B Input */}
      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all group pt-8">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-widest">
            <span>You Buy (Estimated)</span>
            <span className="flex items-center gap-1">
                <Wallet size={10} /> Balance: {tokenB.balance.toLocaleString()}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <input 
                type="number" 
                value={amountB} 
                readOnly 
                placeholder="0.0"
                className="bg-transparent text-4xl font-bold text-emerald-400 outline-none w-1/2 placeholder-slate-800 cursor-default" 
            />
            <button 
                onClick={() => setShowSelector('B')}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-2xl border border-slate-700 shadow-sm transition-all"
            >
                <div className="w-6 h-6">{tokenB.icon}</div>
                <span className="font-bold text-white">{tokenB.symbol}</span>
                <ChevronDown size={14} className="text-slate-500" />
            </button>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-bold">
            ≈ ${(parseFloat(amountB || '0') * tokenB.price).toLocaleString()}
        </div>
      </div>
      
      <div className="p-4 bg-slate-950/50 rounded-2xl text-[11px] font-bold space-y-2 border border-slate-800/50">
        <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1"><Zap size={10}/> Rate</span>
            <span className="text-white">1 {tokenA.symbol} = {(tokenA.price / tokenB.price).toFixed(6)} {tokenB.symbol}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1"><TrendingUp size={10}/> Price Impact</span>
            <span className="text-emerald-400">&lt; 0.01%</span>
        </div>
        <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1"><AlertTriangle size={10}/> Minimum Received</span>
            <span className="text-white">{(parseFloat(amountB || '0') * (1 - slippage/100)).toFixed(4)} {tokenB.symbol}</span>
        </div>
      </div>

      <button 
        disabled={!amountA || isSwapping}
        onClick={handleSwap}
        className={`w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-extrabold text-lg rounded-3xl shadow-xl shadow-cyan-950/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3`}
      >
        {isSwapping ? <Loader2 className="animate-spin" /> : <ArrowRightLeft size={22} />}
        {isSwapping ? 'Processing Swap...' : (amountA ? 'Swap Now' : 'Enter an amount')}
      </button>

      <p className="text-[10px] text-center text-slate-600 font-bold uppercase tracking-widest mt-2">
          Powered by Fluid Smart Router
      </p>
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
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">Add Liquidity</h3>
        <p className="text-sm text-slate-500 mt-1">Earn 0.3% of all trades proportional to your share.</p>
      </div>
      
      {/* Token A Input */}
      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
            <span>Input</span>
            <span>Balance: {tokenA.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
            <input type="number" value={amountA} onChange={e => setAmountA(e.target.value)} className="bg-transparent text-3xl font-bold text-white outline-none w-1/2" />
            <button onClick={() => setShowSelector('A')} className="flex items-center gap-2 bg-slate-800 p-2 px-3 rounded-2xl border border-slate-700">
                <div className="w-6 h-6">{tokenA.icon}</div>
                <span className="font-bold text-white">{tokenA.symbol}</span>
                <ChevronDown size={14} className="text-slate-500" />
            </button>
        </div>
      </div>
      
      <div className="flex justify-center -my-2 relative z-10"><Plus size={24} className="text-slate-700" /></div>
      
      {/* Token B Input */}
      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
            <span>Input</span>
            <span>Balance: {tokenB.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
            <input type="number" value={amountB} readOnly className="bg-transparent text-3xl font-bold text-white outline-none w-1/2 cursor-default" />
            <button onClick={() => setShowSelector('B')} className="flex items-center gap-2 bg-slate-800 p-2 px-3 rounded-2xl border border-slate-700">
                <div className="w-6 h-6">{tokenB.icon}</div>
                <span className="font-bold text-white">{tokenB.symbol}</span>
                <ChevronDown size={14} className="text-slate-500" />
            </button>
        </div>
      </div>
      
      <div className="p-4 bg-slate-950/50 rounded-2xl text-[10px] space-y-2 border border-slate-800/50 font-bold">
        <div className="flex justify-between"><span className="text-slate-500">ESTIMATED POOL SHARE</span><span className="text-cyan-400">0.05%</span></div>
        <div className="flex justify-between"><span className="text-slate-500">FLUID/ETH PER LP TOKEN</span><span className="text-white">125.40</span></div>
      </div>
      
      <button className="w-full py-5 bg-white text-black font-extrabold text-lg rounded-3xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 active:scale-95">Supply Liquidity</button>
    </div>
  );
};

const StakeView = () => {
  return (
    <div className="animate-fade-in-up space-y-6">
       <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl transition-all group-hover:bg-cyan-500/10"></div>
         <div className="flex justify-between items-start mb-6">
             <div>
                <h4 className="font-bold text-white text-xl">Stake FLUID</h4>
                <p className="text-xs text-slate-500 mt-1">Earn a portion of protocol fees.</p>
             </div>
             <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20"><BarChart2 size={24}/></div>
         </div>
         
         <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">APY</div>
                 <div className="text-2xl font-black text-emerald-400">12.5%</div>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">STAKED</div>
                 <div className="text-2xl font-black text-white">10.5k</div>
             </div>
         </div>

         <div className="flex gap-2">
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 flex items-center">
                <input type="number" placeholder="0.0" className="w-full bg-transparent font-bold text-white outline-none" />
                <span className="text-[10px] font-black text-slate-500 ml-2">FLD</span>
            </div>
            <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-95">Stake</button>
         </div>
       </div>

       <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2rem] relative overflow-hidden group border-dashed">
         <div className="flex justify-between items-start mb-6">
             <div>
                <h4 className="font-bold text-white text-xl opacity-60">Stake LP Tokens</h4>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">Coming Soon</p>
             </div>
             <div className="p-3 bg-slate-800 rounded-2xl text-slate-600"><Lock size={24}/></div>
         </div>
         <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
             <div className="h-full bg-slate-800 w-[40%] rounded-full"></div>
         </div>
       </div>
    </div>
  );
};

export default DexPage;
