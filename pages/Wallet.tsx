import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, X, Copy, QrCode, Check, Loader2, CheckCircle, Wallet as WalletIcon, 
  ArrowLeft, ChevronRight, Search, AppWindow, Landmark, SlidersHorizontal, LogOut, ShieldCheck, Bell, Palette,
  Globe, Briefcase, Minus, Plus, Building, Network, AlertTriangle, RefreshCw, CreditCard, 
  ArrowDownUp, Droplets, BarChart2, Zap, Eye, EyeOff, Ban, Trash2, Smartphone, ShoppingBag, Music, Tv,
  ChevronDown, Wifi, ExternalLink, Shield, HardDrive, Tablet, Monitor, History, User, Fingerprint, Lock
} from 'lucide-react';

// --- Shared Types ---
interface Token {
  id: string; 
  symbol: string; 
  name: string; 
  icon: React.ReactNode; 
  price: number; 
  balance: number; 
  color: string; 
  network: string;
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const NETWORKS = [
  { id: 'fluid', name: 'Fluid Mainnet', icon: <div className="text-cyan-400 w-4 h-4">{FLUID_LOGO_SVG}</div> },
  { id: 'ethereum', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-4 h-4" alt="ETH" /> },
  { id: 'solana', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-4 h-4" alt="SOL" /> },
  { id: 'polygon', name: 'Polygon', icon: <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" className="w-4 h-4" alt="MATIC" /> },
];

const TOKENS: Token[] = [
  { id: 'fluid', symbol: 'FLD', name: 'Fluid', icon: <div className="text-cyan-400">{FLUID_LOGO_SVG}</div>, price: 0.85, balance: 45200, color: '#22d3ee', network: 'Fluid' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-full" alt="ETH" />, price: 3450, balance: 4.25, color: '#6366f1', network: 'Ethereum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-full" alt="USDC" />, price: 1, balance: 12500, color: '#2775ca', network: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-full" alt="SOL" />, price: 145, balance: 120, color: '#14f195', network: 'Solana' },
];

const TRANSACTIONS = [
  { id: '1', date: 'May 24', type: 'Receive', amount: '+1,200 FLD', status: 'Success', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: '2', date: 'May 23', type: 'Swap', amount: '-0.25 ETH', status: 'Success', color: 'text-slate-300', bg: 'bg-slate-500/10' },
  { id: '3', date: 'May 21', type: 'Send', amount: '-500 USDC', status: 'Success', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { id: '4', date: 'May 20', type: 'Stake', amount: '10k FLD', status: 'Success', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { id: '5', date: 'May 19', type: 'Buy', amount: '+0.1 ETH', status: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

// --- Sub-Components ---

const SimulationOverlay = ({ show, title, sub, icon: Icon, onDone }: any) => {
  if (!show) return null;
  return (
    <div className="absolute inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-fade-in-up rounded-[inherit]">
      <div className="w-24 h-24 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mb-6 relative">
        <Icon size={40} className={onDone ? '' : 'animate-spin'} />
        {!onDone && <div className="absolute inset-0 border-4 border-cyan-500/20 border-t-cyan-500 rounded-3xl animate-spin"></div>}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-center mb-8">{sub}</p>
      {onDone && (
        <button onClick={onDone} className="px-8 py-3 bg-white text-black font-bold rounded-xl">Continue</button>
      )}
    </div>
  );
};

// --- TABS ---

const PortfolioTab = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalType, setModalType] = useState<'send' | 'receive' | null>(null);
  const [simState, setSimState] = useState<any>(null);

  const totalValue = TOKENS.reduce((acc, t) => acc + (t.balance * t.price), 0);

  const handleSend = () => {
    setSimState({ title: 'Sending Assets...', sub: 'Confirming on Fluid Mainnet', icon: RefreshCw });
    setTimeout(() => {
      setSimState({ title: 'Transfer Complete!', sub: 'Transaction hash: 0x8a2...4f9', icon: CheckCircle, done: true });
    }, 2000);
  };

  return (
    <div className="p-4 space-y-8 pb-28 animate-fade-in-up relative h-full overflow-y-auto custom-scrollbar">
      <SimulationOverlay 
        show={!!simState} 
        title={simState?.title} 
        sub={simState?.sub} 
        icon={simState?.icon} 
        onDone={simState?.done ? () => {setSimState(null); setModalType(null); setSelectedToken(null);} : null} 
      />

      <div className="text-center pt-4">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Assets</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
        <div className="flex items-center justify-center gap-1 mt-2 text-emerald-400 text-sm font-bold">
          <ArrowUpRight size={16} /> +$1,240.55 (1.4%) Today
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setModalType('send')} className="flex-1 max-w-[100px] md:max-w-[120px] flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"><ArrowUpRight size={24}/></div>
          <span className="text-xs font-bold text-slate-400">Send</span>
        </button>
        <button onClick={() => setModalType('receive')} className="flex-1 max-w-[100px] md:max-w-[120px] flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800 text-white border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform"><ArrowDownLeft size={24}/></div>
          <span className="text-xs font-bold text-slate-400">Receive</span>
        </button>
        <button className="flex-1 max-w-[100px] md:max-w-[120px] flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800 text-white border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform"><Plus size={24}/></div>
          <span className="text-xs font-bold text-slate-400">Buy</span>
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Assets</h3>
        <div className="space-y-2">
            {TOKENS.map(token => (
            <button 
                key={token.id} 
                onClick={() => setSelectedToken(token)}
                className="w-full flex items-center justify-between p-4 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
            >
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-2xl p-2 group-hover:scale-110 transition-transform">{token.icon}</div>
                <div className="text-left">
                    <div className="font-bold text-white leading-none mb-1">{token.name}</div>
                    <div className="text-xs text-slate-500 font-medium">{token.balance.toLocaleString()} {token.symbol}</div>
                </div>
                </div>
                <div className="text-right">
                <div className="font-bold text-white mb-1 text-sm md:text-base">${(token.balance * token.price).toLocaleString()}</div>
                <div className="text-[10px] text-emerald-400 font-bold">+1.2%</div>
                </div>
            </button>
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Transaction History</h3>
            <button className="text-[10px] text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center gap-1">
                View All <ChevronRight size={12}/>
            </button>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-inner">
            <div className="grid grid-cols-4 px-4 py-3 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span>Date</span>
                <span>Type</span>
                <span>Amount</span>
                <span className="text-right">Status</span>
            </div>
            <div className="divide-y divide-slate-800/50">
                {TRANSACTIONS.map(tx => (
                    <div key={tx.id} className="grid grid-cols-4 items-center px-4 py-3.5 hover:bg-slate-800/20 transition-colors">
                        <span className="text-[10px] font-bold text-slate-400">{tx.date}</span>
                        <span className="text-xs font-extrabold text-white">{tx.type}</span>
                        <span className={`text-xs font-black ${tx.color}`}>{tx.amount}</span>
                        <div className="flex justify-end">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${tx.bg} ${tx.color} border border-white/5`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {selectedToken && !modalType && (
        <div className="absolute inset-0 z-[150] bg-slate-950/90 flex flex-col animate-fade-in-up rounded-[inherit]">
           <header className="p-4 border-b border-slate-800 flex justify-between items-center">
              <button onClick={() => setSelectedToken(null)} aria-label="Back">
                <ArrowLeft size={24} />
              </button>
              <h3 className="font-bold text-white">{selectedToken.name}</h3>
              <div className="w-6 h-6"></div>
           </header>
           <div className="flex-1 p-6 space-y-8 overflow-y-auto">
              <div className="text-center">
                 <p className="text-3xl font-extrabold text-white">${(selectedToken.balance * selectedToken.price).toLocaleString()}</p>
                 <p className="text-slate-400">{selectedToken.balance} {selectedToken.symbol}</p>
              </div>
              <div className="h-48 bg-slate-900/50 rounded-3xl border border-slate-800 flex items-center justify-center italic text-slate-600">
                 [Interactive Chart Simulation]
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setModalType('send')} className="py-4 bg-cyan-600 text-white font-bold rounded-2xl">Send</button>
                 <button onClick={() => setModalType('receive')} className="py-4 bg-slate-800 text-white font-bold rounded-2xl">Receive</button>
              </div>
           </div>
        </div>
      )}

      {modalType === 'send' && (
        <div className="absolute inset-0 z-[150] bg-slate-950 flex flex-col animate-fade-in-up p-6 rounded-[inherit]">
           <header className="flex justify-between items-center mb-8">
              <button onClick={() => setModalType(null)} className="text-slate-400">
                <X size={24} />
              </button>
              <h3 className="font-bold text-white">Send Crypto</h3>
              <div className="w-6" />
           </header>
           <div className="space-y-6">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                 <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Recipient</label>
                 <input type="text" placeholder="0x... or ENS" className="w-full bg-transparent text-white outline-none font-medium" />
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                 <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Amount</label>
                 <div className="flex justify-between items-center">
                    <input type="number" placeholder="0.00" className="w-2/3 bg-transparent text-2xl md:text-3xl font-bold text-white outline-none" />
                    <button className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">FLD <ChevronDown size={14}/></button>
                 </div>
              </div>
              <button onClick={handleSend} className="w-full py-4 bg-cyan-600 text-white font-bold rounded-2xl shadow-xl">Review & Send</button>
           </div>
        </div>
      )}

      {modalType === 'receive' && (
        <div className="absolute inset-0 z-[150] bg-slate-950 flex flex-col animate-fade-in-up p-6 rounded-[inherit]">
           <header className="flex justify-between items-center mb-8">
              <button onClick={() => setModalType(null)} className="text-slate-400">
                <X size={24} />
              </button>
              <h3 className="font-bold text-white">Receive</h3>
              <div className="w-6" />
           </header>
           <div className="flex flex-col items-center gap-8 py-8 text-center overflow-y-auto">
              <div className="p-4 bg-white rounded-3xl shadow-2xl">
                 <QrCode size={180} className="text-slate-950" />
              </div>
              <div className="w-full p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
                 <span className="font-mono text-xs text-slate-400 truncate pr-4">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                 <button className="text-cyan-400"><Copy size={20}/></button>
              </div>
              <p className="text-xs text-slate-500">Only send assets supported by Fluid Network to this address. Using incorrect networks may result in permanent loss.</p>
           </div>
        </div>
      )}
    </div>
  );
};

const TradeTab = () => {
  const [subTab, setSubTab] = useState<'swap' | 'pool' | 'stake'>('swap');
  const [payAmount, setPayAmount] = useState('1.0');
  const [simState, setSimState] = useState<any>(null);

  const handleSwap = () => {
    setSimState({ title: 'Swapping...', sub: 'Finding best route via Fluid DEX', icon: RefreshCw });
    setTimeout(() => {
      setSimState({ title: 'Swap Successful!', sub: 'Received 12,450.55 FLD', icon: CheckCircle, done: true });
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6 pb-28 animate-fade-in-up h-full overflow-y-auto custom-scrollbar relative">
      <SimulationOverlay 
        show={!!simState} 
        title={simState?.title} 
        sub={simState?.sub} 
        icon={simState?.icon} 
        onDone={simState?.done ? () => setSimState(null) : null} 
      />

      <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
        {(['swap', 'pool', 'stake'] as const).map(t => (
          <button 
            key={t} 
            onClick={() => setSubTab(t)} 
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all capitalize ${subTab === t ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === 'swap' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Pay</span>
                <span>Balance: 4.25 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} className="bg-transparent text-3xl md:text-4xl font-bold text-white outline-none w-1/2" />
                <button className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-5 h-5" alt="ETH" /> <span className="font-bold text-sm text-white">ETH</span> <ChevronDown size={14}/>
                </button>
              </div>
            </div>
            <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-slate-900 border-4 border-slate-950 p-2 rounded-2xl text-cyan-400 shadow-xl"><ArrowDownUp size={20}/></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Receive</span>
                <span>Balance: 45k FLD</span>
              </div>
              <div className="flex justify-between items-center">
                <input type="number" readOnly value={(parseFloat(payAmount) * 4058).toFixed(2)} className="bg-transparent text-3xl md:text-4xl font-bold text-emerald-400 outline-none w-1/2" />
                <button className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                  <div className="w-5 h-5 text-cyan-400">{FLUID_LOGO_SVG}</div> <span className="font-bold text-sm text-white">FLD</span> <ChevronDown size={14}/>
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleSwap} className="w-full py-4 md:py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-extrabold text-lg rounded-3xl shadow-xl shadow-cyan-900/20 active:scale-95 transition-all">Swap Assets</button>
        </div>
      )}

      {subTab === 'pool' && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
           <Droplets size={48} className="text-blue-400 mx-auto" />
           <h4 className="text-xl font-bold text-white">Liquidity Pools</h4>
           <p className="text-sm text-slate-400">Add assets to the Fluid AMM and earn 0.3% fees on all protocol swaps.</p>
           <button className="w-full py-4 bg-white text-black font-bold rounded-2xl">Create New Position</button>
        </div>
      )}

      {subTab === 'stake' && (
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 md:p-8 space-y-6">
           <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-white">FLD Staking</h4>
              <Zap size={24} className="text-indigo-400" />
           </div>
           <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                 <p className="text-[10px] text-slate-500 font-bold mb-1">APY</p>
                 <p className="text-xl font-bold text-emerald-400">12.4%</p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                 <p className="text-[10px] text-slate-500 font-bold mb-1">STAKED</p>
                 <p className="text-xl font-bold text-white">15,000</p>
              </div>
           </div>
           <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl">Stake FLD</button>
        </div>
      )}
    </div>
  );
};

const CardsTab = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [cardStatus, setCardStatus] = useState<'active' | 'deleted'>('active');
  const [simState, setSimState] = useState<any>(null);

  const handleOrder = () => {
    setSimState({ title: 'Verifying Identity...', sub: 'Processing Physical Metal Card Request', icon: ShieldCheck });
    setTimeout(() => {
      setSimState({ title: 'Card Ordered!', sub: 'Shipping to your registered address in 5-7 days.', icon: CheckCircle, done: true });
    }, 2000);
  };

  if (cardStatus === 'deleted') {
    return (
      <div className="p-8 text-center space-y-6 animate-fade-in-up h-full flex flex-col justify-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500"><CreditCard size={40}/></div>
        <h3 className="text-2xl font-bold text-white">No Active Cards</h3>
        <p className="text-slate-400">Request a virtual or physical card to start spending your crypto globally.</p>
        <button onClick={() => setCardStatus('active')} className="w-full py-4 bg-cyan-600 text-white font-bold rounded-2xl">Create Virtual Card</button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8 pb-28 animate-fade-in-up h-full overflow-y-auto custom-scrollbar relative">
      <SimulationOverlay 
        show={!!simState} 
        title={simState?.title} 
        sub={simState?.sub} 
        icon={simState?.icon} 
        onDone={simState?.done ? () => setSimState(null) : null} 
      />

      <div className={`relative w-full max-w-[340px] h-[200px] md:h-[214px] mx-auto perspective-1000 transition-all duration-700 ${isFrozen ? 'grayscale opacity-50 blur-[1px]' : ''}`}>
        <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 p-6 md:p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="flex justify-between items-start mb-6 md:mb-10">
            <div className="flex items-center gap-1.5"><div className="w-5 h-5 md:w-6 md:h-6 text-white">{FLUID_LOGO_SVG}</div><span className="font-bold text-lg md:text-xl italic text-white">fluid</span></div>
            <Wifi size={24} className="text-slate-600 rotate-90" />
          </div>
          <div className="space-y-4">
            <div className="font-mono text-lg md:text-xl tracking-widest text-white">{showDetails ? '4532 8842 1234 5678' : '•••• •••• •••• 5678'}</div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">Holder</p>
                <p className="text-[10px] md:text-xs text-white font-bold">MARCUS FLUID</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">EXP / CVV</p>
                <p className="text-[10px] md:text-xs text-white font-bold">12/28 • {showDetails ? '842' : '•••'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setShowDetails(!showDetails)} className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] md:text-xs font-bold text-white">
           {showDetails ? <EyeOff size={16}/> : <Eye size={16}/>} {showDetails ? 'Hide' : 'Reveal'} Details
        </button>
        <button onClick={() => setIsFrozen(!isFrozen)} className={`flex items-center justify-center gap-2 py-3 border rounded-2xl text-[10px] md:text-xs font-bold transition-all ${isFrozen ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-900 border-slate-800 text-white'}`}>
           <Ban size={16}/> {isFrozen ? 'Unfreeze' : 'Freeze Card'}
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] md:text-xs font-bold text-white"><SlidersHorizontal size={16}/> Controls</button>
        <button onClick={() => setCardStatus('deleted')} className="flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] md:text-xs font-bold"><Trash2 size={16}/> Delete</button>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 text-center space-y-4">
         <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-2 text-white"><CreditCard size={32}/></div>
         <h4 className="text-lg md:text-xl font-bold text-white">Physical Metal Card</h4>
         <p className="text-[10px] md:text-xs text-slate-400">Order your 18g surgical-grade stainless steel card for high-limit global spending.</p>
         <button onClick={handleOrder} className="w-full py-4 bg-white text-black font-bold rounded-2xl text-sm transition-transform active:scale-95">Upgrade Now - 5,000 FLD</button>
      </div>
    </div>
  );
};

const BankTab = () => {
  const [bankLinked, setBankLinked] = useState(false);
  const [simState, setSimState] = useState<any>(null);

  const handleLink = () => {
    setSimState({ title: 'Connecting to Bank...', sub: 'Securely authenticating via Plaid', icon: Landmark });
    setTimeout(() => {
      setSimState({ title: 'Bank Linked!', sub: 'Chase Personal (**** 8842) added.', icon: CheckCircle, done: true });
      setBankLinked(true);
    }, 2000);
  };

  const rwas = [
    { name: 'NYC Penthouse Share', value: 125000, yield: '4.2%', icon: <Building size={24} /> },
    { name: 'Gold Bullion (LBMA)', value: 4500, yield: 'N/A', icon: <Briefcase size={24} /> }
  ];

  return (
    <div className="p-4 space-y-8 pb-28 animate-fade-in-up h-full overflow-y-auto custom-scrollbar relative">
      <SimulationOverlay 
        show={!!simState} 
        title={simState?.title} 
        sub={simState?.sub} 
        icon={simState?.icon} 
        onDone={simState?.done ? () => setSimState(null) : null} 
      />

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Fiat Banking</h3>
        {bankLinked ? (
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400"><Landmark size={24}/></div>
              <div>
                <p className="font-bold text-white text-sm md:text-base">Chase Checking</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">**** 8842</p>
              </div>
            </div>
            <p className="text-base md:text-lg font-bold text-white">$12,450.22</p>
          </div>
        ) : (
          <button onClick={handleLink} className="w-full py-8 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 font-bold flex flex-col items-center justify-center gap-2 hover:border-slate-600 hover:text-white transition-all">
            <Plus size={24}/>
            Link Bank or Mobile Banking
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Real World Assets (RWA)</h3>
          <ExternalLink size={14} className="text-slate-500" />
        </div>
        <div className="space-y-3">
          {rwas.map(rwa => (
            <div key={rwa.name} className="p-5 bg-slate-900 border border-slate-800 rounded-3xl flex justify-between items-center group cursor-pointer hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-black transition-colors">{rwa.icon}</div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">{rwa.name}</p>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Yield: {rwa.yield}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsTab = () => {
    const settingsItems = [
        { icon: User, label: 'Profile Settings', sub: 'Manage account details' },
        { icon: Lock, label: 'Security & Privacy', sub: '2FA, Biometrics, Recovery' },
        { icon: Network, label: 'Network Config', sub: 'Custom RPC, Nodes' },
        { icon: Bell, label: 'Notifications', sub: 'Alerts, Price updates' },
        { icon: Palette, label: 'App Theme', sub: 'Dark mode, custom styles' },
        { icon: Fingerprint, label: 'Identity Verification', sub: 'KYC Tier 2' },
        { icon: HardDrive, label: 'Data & Storage', sub: 'Cache, backup export' },
    ];

    return (
        <div className="p-4 space-y-8 pb-28 animate-fade-in-up h-full overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 p-4 relative">
                    {FLUID_LOGO_SVG}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center text-[10px] text-black font-black"><Check size={14}/></div>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white">Marcus Fluid</h3>
                    <p className="text-xs text-slate-500 font-bold">Premium User • 0x71C...88B</p>
                </div>
            </div>

            <div className="space-y-2">
                {settingsItems.map((item, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors"><item.icon size={20}/></div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white leading-none mb-1">{item.label}</p>
                                <p className="text-[10px] text-slate-500 font-medium">{item.sub}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-600" />
                    </button>
                ))}
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 transition-all mt-4">
                    <LogOut size={20}/>
                    <span className="text-sm font-bold">Logout Session</span>
                </button>
            </div>
            
            <div className="text-center pt-8">
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest">Fluid v1.2.4 (Mainnet)</p>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const WalletPage: React.FC = () => {
  const [tab, setTab] = useState<'portfolio' | 'trade' | 'cards' | 'bank' | 'settings'>('portfolio');
  const [currentNetwork, setCurrentNetwork] = useState(NETWORKS[0]);
  const [isNetworkSelectorOpen, setIsNetworkSelectorOpen] = useState(false);
  const networkRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (networkRef.current && !networkRef.current.contains(event.target as Node)) {
        setIsNetworkSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4">Fluid Non-Custodial Wallet</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">Your assets, your keys. The most advanced multichain wallet for the Fluid ecosystem.</p>
      </div>

      {/* Simulator Container */}
      <div className="relative w-full max-w-[420px] h-[840px] bg-slate-950 border-[12px] border-slate-900 rounded-[4rem] shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-3xl z-[100] flex items-center justify-center">
            <div className="w-16 h-1 bg-slate-800 rounded-full"></div>
        </div>

        {/* Dynamic Header with Network Selector */}
        <header className="flex justify-between items-center p-6 pt-10 border-b border-slate-800/50 relative z-40 bg-slate-950">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/5 rounded-lg p-1.5 text-white">{FLUID_LOGO_SVG}</div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">Fluid Wallet</h1>
            </div>
            
            {/* Network Selector Dropdown */}
            <div className="relative" ref={networkRef}>
              <button 
                onClick={() => setIsNetworkSelectorOpen(!isNetworkSelectorOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                {currentNetwork.icon}
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">{currentNetwork.name}</span>
                <ChevronDown size={10} className={`text-slate-500 transition-transform ${isNetworkSelectorOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isNetworkSelectorOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-[60] animate-fade-in-up">
                   <p className="px-3 py-1 text-[9px] font-black text-slate-600 uppercase tracking-widest">Select Network</p>
                   {NETWORKS.map(net => (
                     <button
                        key={net.id}
                        onClick={() => {
                          setCurrentNetwork(net);
                          setIsNetworkSelectorOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold transition-colors ${currentNetwork.id === net.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                     >
                        <div className="w-5 h-5 flex items-center justify-center bg-slate-950 rounded-md p-1 border border-slate-800">
                          {net.icon}
                        </div>
                        {net.name}
                        {currentNetwork.id === net.id && <Check size={12} className="ml-auto" />}
                     </button>
                   ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 hover:text-white transition-colors relative">
                <Bell size={20}/>
                <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <button onClick={() => setTab('settings')} className={`p-2.5 rounded-xl border transition-all ${tab === 'settings' ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}`}><SlidersHorizontal size={20}/></button>
          </div>
        </header>

        {/* Simulator Main View Area */}
        <div className="h-full bg-slate-950">
          {tab === 'portfolio' && <PortfolioTab />}
          {tab === 'trade' && <TradeTab />}
          {tab === 'cards' && <CardsTab />}
          {tab === 'bank' && <BankTab />}
          {tab === 'settings' && <SettingsTab />}
        </div>

        {/* Enhanced Navigation Bar with Labels */}
        <nav className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800 flex justify-around items-center p-3 pb-8 z-50 rounded-b-[3.5rem] shadow-2xl">
          <button 
            onClick={() => setTab('portfolio')} 
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all min-w-[64px] ${tab === 'portfolio' ? 'bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
          >
            <WalletIcon size={22}/>
            <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button 
            onClick={() => setTab('trade')} 
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all min-w-[64px] ${tab === 'trade' ? 'bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
          >
            <RefreshCw size={22}/>
            <span className="text-[9px] font-black uppercase tracking-tighter">Swap</span>
          </button>
          <button 
            onClick={() => setTab('cards')} 
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all min-w-[64px] ${tab === 'cards' ? 'bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
          >
            <CreditCard size={22}/>
            <span className="text-[9px] font-black uppercase tracking-tighter">Cards</span>
          </button>
          <button 
            onClick={() => setTab('bank')} 
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all min-w-[64px] ${tab === 'bank' ? 'bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10' : 'text-slate-500 hover:text-white'}`}
          >
            <Landmark size={22}/>
            <span className="text-[9px] font-black uppercase tracking-tighter">Bank</span>
          </button>
        </nav>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
        <div className="flex items-center gap-3 text-slate-400"><ShieldCheck className="text-emerald-500"/> AES-256 Encrypted</div>
        <div className="flex items-center gap-3 text-slate-400"><Globe className="text-blue-500"/> 10+ Blockchains</div>
        <div className="flex items-center gap-3 text-slate-400"><Zap className="text-yellow-500"/> Instant Off-Ramp</div>
        <div className="flex items-center gap-3 text-slate-400"><ArrowDownUp className="text-cyan-500"/> Native Bridge</div>
      </div>
    </div>
  );
};

export default WalletPage;