import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, 
  Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, 
  Wallet, Clock, ArrowRightLeft, Plus, Droplets, Minus, BarChart2, 
  Search, X, Info, AlertTriangle, Star, History, Shield, Timer, ChevronUp,
  Percent, Coins, PieChart, Layout, Layers, Activity, MousePointer2
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

const Toast = ({ message, show, type = 'success' }: { message: string, show: boolean, type?: 'success' | 'error' }) => (
  <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 flex items-center gap-3 ${show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'} ${type === 'success' ? 'bg-white text-slate-950' : 'bg-rose-600 text-white'}`}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
    {message}
  </div>
);

const DexPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity' | 'stake'>('swap');
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error', show: boolean }>({ msg: '', type: 'success', show: false });

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };
  
  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white selection:bg-cyan-500/30">
      <Toast message={toast.msg} show={toast.show} type={toast.type} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Branding */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-cyan-400"><FluidLogo /></div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase italic">Shard-Aware Trading Protocol</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase leading-none">
            Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Atomic Swap</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-[10px] font-black uppercase tracking-[0.3em] mt-4">
            Direct on-chain settlement across 1,024 shards
          </p>
        </div>

        {/* Main DEX Container */}
        <div className="max-w-xl mx-auto bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[3rem] p-3 shadow-2xl relative animate-fade-in-up w-full ring-1 ring-white/5 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="p-4 space-y-6">
            {/* Tab Selector */}
            <div className="relative flex gap-1 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-inner group">
                {[
                    { id: 'swap', label: 'Swap', icon: RefreshCw },
                    { id: 'liquidity', label: 'Pool', icon: Droplets },
                    { id: 'stake', label: 'Stake', icon: BarChart2 }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)} 
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all z-10 ${activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <tab.icon size={14} className={activeTab === tab.id && tab.id === 'swap' ? 'animate-spin-slow' : ''} />
                        {tab.label}
                    </button>
                ))}
                
                <div 
                    className="absolute top-1 bottom-1 bg-slate-800 border border-slate-700 rounded-xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-xl"
                    style={{ 
                        left: activeTab === 'swap' ? '4px' : activeTab === 'liquidity' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 1px)',
                        width: 'calc(33.33% - 4px)'
                    }}
                />
            </div>

            <div className="min-h-[500px]">
                {activeTab === 'swap' && <SwapView onNotify={triggerToast} />}
                {activeTab === 'liquidity' && <LiquidityView onNotify={triggerToast} />}
                {activeTab === 'stake' && <StakeView onNotify={triggerToast} />}
            </div>
          </div>
        </div>
        
        {/* Support Footer Info */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl opacity-50">
            {[
                { label: 'Avg Latency', val: '582ms', icon: Activity },
                { label: 'Liquidity', val: '$420M', icon: Droplets },
                { label: '24h Volume', val: '$12.5M', icon: BarChart2 },
                { label: 'Gas Cost', val: '<$0.01', icon: Zap }
            ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                    <stat.icon size={14} className="text-cyan-500 mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{stat.label}</span>
                    <span className="text-sm font-black text-white">{stat.val}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-VIEWS ---

const SwapView = ({ onNotify }: { onNotify: (msg: string, type?: 'success' | 'error') => void }) => {
  const [tokenA, setTokenA] = useState(TOKENS[1]);
  const [tokenB, setTokenB] = useState(TOKENS[0]);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [showSelector, setShowSelector] = useState<'A' | 'B' | null>(null);
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    if (!amountA || isNaN(parseFloat(amountA))) { setAmountB(''); return; }
    const estimated = (parseFloat(amountA) * (tokenA.price / tokenB.price));
    setAmountB(estimated.toFixed(6));
  }, [amountA, tokenA, tokenB]);

  const handleSwap = () => {
    if (!amountA) return;
    setIsSwapping(true);
    setTimeout(() => {
        setIsSwapping(false);
        setAmountA('');
        onNotify(`Swapped ${amountA} ${tokenA.symbol} for ${amountB} ${tokenB.symbol}`);
    }, 2500);
  };

  const flipTokens = () => {
    const temp = tokenA;
    setTokenA(tokenB);
    setTokenB(temp);
    setAmountA(amountB);
  };

  return (
    <div className="animate-fade-in-up space-y-4 h-full flex flex-col relative">
      <TokenSelectorModal 
        isOpen={!!showSelector} 
        onClose={() => setShowSelector(null)} 
        onSelect={(t) => { showSelector === 'A' ? setTokenA(t) : setTokenB(t); setShowSelector(null); }} 
      />

      <div className="flex justify-between items-center px-1 mb-2">
          <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <Zap size={12} className="text-cyan-400" /> Atomic Engine 
          </h3>
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-slate-900 rounded-xl text-slate-500 hover:text-white transition-all"><History size={14} /></button>
            <button 
                onClick={() => setShowSettings(!showSettings)} 
                className={`p-2.5 rounded-xl transition-all ${showSettings ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
            >
                <Settings size={14} />
            </button>
          </div>
      </div>

      {showSettings && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-4 animate-fade-in-up shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Slippage Tolerance</span>
                  <span className="text-[10px] font-black text-cyan-400">{slippage}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                  {['0.1', '0.5', '1.0', '3.0'].map(v => (
                      <button 
                        key={v} 
                        onClick={() => setSlippage(v)}
                        className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all ${slippage === v ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'}`}
                      >
                        {v}%
                      </button>
                  ))}
              </div>
          </div>
      )}

      {/* Input A */}
      <div className="bg-slate-950 rounded-[2rem] p-6 border border-slate-800 group relative transition-all hover:border-slate-700 shadow-inner">
        <div className="flex justify-between text-[8px] font-black text-slate-600 mb-4 uppercase tracking-widest">
          <span>Asset Allocation</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setAmountA(tokenA.balance.toString())} className="text-cyan-500 hover:text-cyan-400 transition-colors">MAX</button>
            <span className="opacity-50">Bal: {tokenA.balance.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
            <input 
                type="number" 
                value={amountA} 
                onChange={e => setAmountA(e.target.value)} 
                placeholder="0.00" 
                className="bg-transparent text-4xl font-black text-white outline-none w-full placeholder-slate-900 tracking-tighter" 
            />
            <button onClick={() => setShowSelector('A')} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 p-2 pl-2 pr-4 rounded-2xl border border-slate-800 transition-all shrink-0 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center p-1.5 bg-slate-950 rounded-xl border border-white/5">{tokenA.icon}</div>
              <span className="font-black text-xs text-white uppercase tracking-tighter">{tokenA.symbol}</span>
              <ChevronDown size={14} className="text-slate-700" />
            </button>
        </div>
      </div>

      <div className="flex justify-center -my-6 relative z-10">
        <button 
            onClick={flipTokens}
            className="bg-slate-900 border-[6px] border-slate-950 p-4 rounded-2xl text-cyan-400 hover:text-white transition-all shadow-2xl hover:scale-110 active:scale-90 ring-1 ring-white/5"
        >
          <ArrowDownUp size={18} />
        </button>
      </div>

      {/* Input B */}
      <div className="bg-slate-950 rounded-[2rem] p-6 border border-slate-800 pt-10 group transition-all hover:border-slate-700 shadow-inner">
        <div className="flex justify-between text-[8px] font-black text-slate-600 mb-4 uppercase tracking-widest">
          <span>Target Settlement</span>
          <span className="opacity-50">Bal: {tokenB.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
            <input 
                type="text" 
                value={amountB} 
                readOnly 
                placeholder="0.00" 
                className="bg-transparent text-4xl font-black text-emerald-400 outline-none w-full placeholder-slate-900 cursor-default tracking-tighter" 
            />
            <button onClick={() => setShowSelector('B')} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 p-2 pl-2 pr-4 rounded-2xl border border-slate-800 transition-all shrink-0 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center p-1.5 bg-slate-950 rounded-xl border border-white/5">{tokenB.icon}</div>
              <span className="font-black text-xs text-white uppercase tracking-tighter">{tokenB.symbol}</span>
              <ChevronDown size={14} className="text-slate-700" />
            </button>
        </div>
      </div>

      {/* Details Accordion */}
      <div className="px-1 py-4">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <span>Price Impact</span>
              <span className="text-emerald-500">0.01%</span>
          </div>
      </div>

      <button 
        disabled={!amountA || isSwapping} 
        onClick={handleSwap} 
        className={`w-full py-6 rounded-[2rem] font-black text-lg transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group ${!amountA || isSwapping ? 'bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed' : 'bg-white text-slate-950 hover:bg-cyan-50 active:scale-95'}`}
      >
        {isSwapping ? (
            <><Loader2 className="animate-spin" size={24} /> Shard Routing...</>
        ) : (
            <><ArrowRightLeft size={24} /> {amountA ? 'Execute Order' : 'Enter amount'}</>
        )}
      </button>
    </div>
  );
};

const LiquidityView = ({ onNotify }: { onNotify: (msg: string) => void }) => {
    const [step, setStep] = useState<'list' | 'add'>('list');
    const [isAdding, setIsAdding] = useState(false);
    
    const pools = [
        { pair: 'FLUID / ETH', liquidity: '$120M', apr: '12.4%', volume: '$5.2M' },
        { pair: 'FLUID / USDC', liquidity: '$85M', apr: '8.2%', volume: '$3.1M' },
        { pair: 'ETH / USDC', liquidity: '$210M', apr: '4.5%', volume: '$12.8M' }
    ];

    const handleAdd = () => {
        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
            setStep('list');
            onNotify("Provisioned $2,500.00 liquidity to FLUID/ETH");
        }, 2500);
    };

    return (
        <div className="animate-fade-in-up space-y-6 h-full flex flex-col">
            <header className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">
                    {step === 'list' ? 'Liquidity Pools' : 'Add Liquidity'}
                </h3>
                {step === 'add' && <button onClick={() => setStep('list')} className="p-2 text-slate-500 hover:text-white"><X size={20}/></button>}
            </header>

            {step === 'list' ? (
                <>
                    <div className="space-y-3 overflow-y-auto max-h-[340px] pr-2 custom-scrollbar">
                        {pools.map((p, i) => (
                            <div key={i} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 transition-all shadow-lg">
                                <div>
                                    <div className="text-sm font-black text-white uppercase mb-1">{p.pair}</div>
                                    <div className="flex gap-4">
                                        <span className="text-[8px] font-black text-slate-600 uppercase">Liquidity: {p.liquidity}</span>
                                        <span className="text-[8px] font-black text-slate-600 uppercase">Vol: {p.volume}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-black text-emerald-500 mb-1">{p.apr} APR</div>
                                    <button onClick={() => setStep('add')} className="text-[9px] font-black text-cyan-400 uppercase tracking-widest hover:text-white transition-colors">Supply</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setStep('add')} className="w-full py-5 bg-slate-900 border border-slate-800 text-white font-black rounded-3xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest mt-auto">
                        <Plus size={18}/> Create New Pool
                    </button>
                </>
            ) : (
                <div className="space-y-6 flex-1 flex flex-col animate-fade-in-up">
                    <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group shadow-inner">
                        <div className="absolute inset-0 bg-tech-grid opacity-[0.05]"></div>
                        <div className="flex flex-col items-center text-center gap-4 relative z-10">
                            <div className="flex -space-x-4">
                                <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center p-3 text-cyan-400"><FluidLogo /></div>
                                <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center p-3 overflow-hidden">
                                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full" alt="ETH" />
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Pair: FLUID-ETH</h4>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">You will earn a 0.3% share of all transaction fees on this pair across the shard cluster.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl text-center">
                            <div className="text-[8px] font-black text-slate-600 uppercase mb-2">FLUID Share</div>
                            <div className="text-xl font-black text-white">2,450.00</div>
                        </div>
                        <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl text-center">
                            <div className="text-[8px] font-black text-slate-600 uppercase mb-2">ETH Share</div>
                            <div className="text-xl font-black text-white">0.62</div>
                        </div>
                    </div>

                    <button 
                        onClick={handleAdd}
                        disabled={isAdding}
                        className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest mt-auto shadow-2xl transition-all ${isAdding ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-950 hover:bg-cyan-50'}`}
                    >
                        {isAdding ? <><Loader2 className="animate-spin" size={16} /> Initializing LP...</> : 'Supply Assets'}
                    </button>
                </div>
            )}
        </div>
    );
};

const StakeView = ({ onNotify }: { onNotify: (msg: string) => void }) => {
    const [period, setPeriod] = useState(12);
    const [amount, setAmount] = useState('50000');
    const [isStaking, setIsStaking] = useState(false);

    const apr = period === 12 ? '5.2%' : period === 24 ? '8.4%' : '14.2%';

    const handleStake = () => {
        setIsStaking(true);
        setTimeout(() => {
            setIsStaking(false);
            onNotify(`Locked ${parseFloat(amount).toLocaleString()} FLUID for ${period} months. Yield active.`);
        }, 2500);
    };

    return (
        <div className="animate-fade-in-up space-y-6 h-full flex flex-col">
            <header>
                <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">Vault Staking</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Secure the protocol, earn real yield</p>
            </header>

            <div className="space-y-6 flex-1">
                {/* Amount Box */}
                <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-inner">
                    <div className="flex justify-between text-[8px] font-black text-slate-600 mb-4 uppercase tracking-widest">
                        <span>Stake Amount (FLUID)</span>
                        <span>Bal: 150,240</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)}
                            className="bg-transparent text-3xl font-black text-white outline-none w-full tracking-tighter" 
                        />
                        <div className="w-10 h-10 p-2 bg-slate-900 rounded-xl text-cyan-400"><FluidLogo /></div>
                    </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Lock Duration</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[12, 24, 48].map(m => (
                            <button 
                                key={m}
                                onClick={() => setPeriod(m)}
                                className={`py-4 rounded-2xl text-[10px] font-black uppercase transition-all ${period === m ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'}`}
                            >
                                {m} Months
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projection */}
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-tech-grid opacity-[0.03]"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Estimated Yield</span>
                            <div className="text-3xl font-black text-white">{apr} <span className="text-xs text-emerald-500">APR</span></div>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Rewards</span>
                            <div className="text-xl font-black text-cyan-400">+{(parseFloat(amount) * (parseFloat(apr) / 100)).toLocaleString()} FLD</div>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleStake}
                disabled={isStaking || !amount}
                className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest mt-auto shadow-2xl transition-all ${isStaking ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-950 hover:bg-cyan-50'}`}
            >
                {isStaking ? <><Loader2 className="animate-spin" size={16} /> Locking Vault...</> : 'Lock Assets & Earn'}
            </button>
        </div>
    );
};

const TokenSelectorModal = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (t: Token) => void }) => {
    const [search, setSearch] = useState('');
    const filteredTokens = useMemo(() => {
        const lowerSearch = search.toLowerCase();
        return TOKENS.filter(t => t.name.toLowerCase().includes(lowerSearch) || t.symbol.toLowerCase().includes(lowerSearch));
    }, [search]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in-up">
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh] ring-1 ring-white/10">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Select Asset</h3>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Shard Cluster Liquidity</p>
                    </div>
                    <button onClick={onClose} className="p-3 text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-2xl"><X size={20}/></button>
                </div>
                
                <div className="p-6 space-y-6 flex-1 overflow-hidden flex flex-col">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-cyan-400 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Name or ticker symbol" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-white font-black text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-900 shadow-inner tracking-tight" 
                            autoFocus 
                        />
                    </div>

                    <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-2">
                        {filteredTokens.map((t, i) => (
                            <button 
                                key={i}
                                onClick={() => onSelect(t)}
                                className="w-full p-4 rounded-2xl border border-transparent hover:border-slate-800 hover:bg-slate-800/50 flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 p-2.5 bg-slate-950 rounded-xl border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                                        {t.icon}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-black text-white uppercase tracking-tight">{t.name}</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.symbol}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-white">${t.price.toLocaleString()}</div>
                                    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{t.balance.toLocaleString()}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DexPage;