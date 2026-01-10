import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, X, QrCode, CheckCircle, Wallet as WalletIcon, 
  Landmark, Bell, Plus, RefreshCw, CreditCard, 
  ArrowDownUp, Smartphone, ShoppingBag,
  ChevronDown, User, Compass, Monitor, Tablet, Smartphone as PhoneIcon,
  Search, ExternalLink, ShieldCheck, History, DollarSign, ArrowRight, Lock,
  Download, Clock, Trash2, Eye, EyeOff, MoreHorizontal, Unlock, Zap, Users, Database, Star, Globe, 
  Shield, Sliders, Wifi, Building2, Copy, ArrowRightLeft, CreditCard as CardIcon,
  AlertCircle, Share2, Info, HardDrive, Cpu, Layers, Fingerprint, ShieldAlert, Key, ChevronUp, Settings, Link, Activity, MousePointer2,
  Server, HardDrive as StorageIcon, Terminal, Globe2
} from 'lucide-react';

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

interface Transaction {
  id: string;
  timestamp: number;
  date: string;
  type: string;
  asset: string;
  amount: string;
  numericAmount: number;
  status: string;
  hash: string;
  to?: string;
  from?: string;
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const INITIAL_TOKENS: Token[] = [
  { id: 'fluid', symbol: 'FLD', name: 'Fluid Token', icon: <div className="text-cyan-400">{FLUID_LOGO_SVG}</div>, price: 0.85, balance: 45200, color: '#22d3ee', network: 'Fluid Mainnet' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-full" alt="ETH" />, price: 3450, balance: 4.25, color: '#6366f1', network: 'Ethereum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-full" alt="USDC" />, price: 1, balance: 12500, color: '#2775ca', network: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-full" alt="SOL" />, price: 145, balance: 120, color: '#14f195', network: 'Solana' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', timestamp: Date.now() - 3600000, date: '2024-05-24 14:20', type: 'Receive', asset: 'FLUID', amount: '+1,200.00', numericAmount: 1200, status: 'Success', hash: '0xabc71f92e123', from: '0x3321...4412' },
  { id: '2', timestamp: Date.now() - 86400000, date: '2024-05-23 09:15', type: 'Swap', asset: 'ETH ➔ FLD', amount: '-0.50', numericAmount: -0.5, status: 'Success', hash: '0xdef22c42f456' },
  { id: '3', timestamp: Date.now() - 259200000, date: '2024-05-21 18:45', type: 'Send', asset: 'USDC', amount: '-500.00', numericAmount: -500, status: 'Success', hash: '0xghi33a11a789', to: '0x7122...9901' },
  { id: '4', timestamp: Date.now() - 345600000, date: '2024-05-20 12:10', type: 'Buy', asset: 'USDT', amount: '+2,500.00', numericAmount: 2500, status: 'Pending', hash: '0xjkl44b22b012' },
];

const Toast = ({ message, show }: { message: string, show: boolean }) => (
  <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
    {message}
  </div>
);

const ProcessingOverlay = ({ show, title, sub, icon: Icon, onDone }: any) => {
  if (!show) return null;
  return (
    <div className="absolute inset-0 z-[600] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in-up rounded-[inherit]">
      <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mb-6 relative">
        <Icon size={32} className={onDone ? '' : 'animate-spin'} />
        {!onDone && <div className="absolute inset-0 border-4 border-cyan-500/20 border-t-cyan-500 rounded-3xl animate-spin"></div>}
      </div>
      <h3 className="text-xl font-black text-white mb-2 text-center leading-tight tracking-tighter uppercase">{title}</h3>
      <p className="text-slate-400 text-center mb-8 text-sm font-medium tracking-tight">{sub}</p>
      {onDone && (
        <button onClick={onDone} className="px-8 py-3 bg-white text-black font-black text-xs tracking-tight rounded-xl shadow-lg active:scale-95 transition-transform uppercase">Done</button>
      )}
    </div>
  );
};

const PortfolioTab = ({ tokens, setTokens, addTransaction, deviceSize, onNavigateToSwap }: any) => {
  const [modalType, setModalType] = useState<'send' | 'receive' | 'buy' | 'details' | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [simState, setSimState] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [toast, setToast] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const totalValue = tokens.reduce((acc: number, t: Token) => acc + (t.balance * t.price), 0);

  const handleAction = (type: string) => {
    if ((type === 'send' || type === 'buy') && !amount) return;
    
    setSimState({ 
        title: type === 'send' ? 'Broadcasting' : 'Processing', 
        sub: type === 'send' ? 'Syncing with sharded validator pool...' : 'Authenticating through fiat gateway...', 
        icon: type === 'send' ? RefreshCw : ShieldCheck 
    });
    
    setTimeout(() => {
        if (type === 'send') {
            const numAmount = parseFloat(amount);
            setTokens(tokens.map((t: Token) => t.id === selectedToken.id ? { ...t, balance: t.balance - numAmount } : t));
            addTransaction({ type: 'Send', asset: selectedToken.symbol, amount: `-${numAmount.toLocaleString()}`, numericAmount: -numAmount, to: address });
        } else if (type === 'buy') {
            const boughtAmount = Math.floor(parseFloat(amount) / selectedToken.price);
            setTokens(tokens.map((t: Token) => t.id === selectedToken.id ? { ...t, balance: t.balance + boughtAmount } : t));
            addTransaction({ type: 'Buy', asset: selectedToken.symbol, amount: `+${boughtAmount.toLocaleString()}`, numericAmount: boughtAmount });
        }
        setSimState({ title: 'Success', sub: 'Operation confirmed on Fluid Layer-1.', icon: CheckCircle, done: true });
    }, 2000);
  };

  return (
    <div className="p-4 space-y-8 pb-32 animate-fade-in-up relative h-full overflow-y-auto">
      <ProcessingOverlay show={!!simState} title={simState?.title} sub={simState?.sub} icon={simState?.icon} onDone={simState?.done ? () => {setSimState(null); setModalType(null); setAddress(''); setAmount('');} : null} />
      <Toast message={toast} show={!!toast} />

      <div className="text-center pt-4 relative group">
        <button onClick={() => setShowBalance(!showBalance)} className="absolute right-0 top-0 text-slate-600 hover:text-cyan-400 transition-colors">
          {showBalance ? <Eye size={16}/> : <EyeOff size={16}/>}
        </button>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Vault Equity</p>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-2">
          {showBalance ? `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••••'}
        </h2>
        <div className="flex items-center justify-center gap-1 text-emerald-400 text-[10px] font-black tracking-widest uppercase">
          <ArrowUpRight size={14} /> +1.4% (24h)
        </div>
      </div>

      <div className="flex justify-center gap-2 px-2">
        {[
            { id: 'send', icon: ArrowUpRight, label: 'Send', color: 'bg-cyan-500 text-slate-950' },
            { id: 'receive', icon: ArrowDownLeft, label: 'Receive', color: 'bg-slate-900 text-white border border-slate-800' },
            { id: 'swap', icon: RefreshCw, label: 'Swap', color: 'bg-slate-900 text-white border border-slate-800', special: onNavigateToSwap },
            { id: 'buy', icon: Plus, label: 'Buy', color: 'bg-slate-900 text-white border border-slate-800' }
        ].map(btn => (
            <button key={btn.id} onClick={() => btn.special ? btn.special() : setModalType(btn.id as any)} className="flex-1 flex flex-col items-center gap-2 group max-w-[80px]">
                <div className={`w-12 h-12 rounded-2xl ${btn.color} flex items-center justify-center group-hover:scale-105 transition-all shadow-lg`}>
                  <btn.icon size={22}/>
                </div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">{btn.label}</span>
            </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
          Assets <span>Market (LIVE)</span>
        </h3>
        <div className={`grid gap-3 ${deviceSize === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {tokens.map((token: Token) => (
            <button 
              key={token.id} 
              onClick={() => {setSelectedToken(token); setModalType('details');}} 
              className={`w-full flex flex-col p-5 rounded-[2.5rem] border transition-all group text-left relative overflow-hidden ${
                token.id === 'fluid' 
                ? 'bg-slate-900/90 border-cyan-500/50 ring-1 ring-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.2)] scale-[1.03]' 
                : 'bg-slate-900 border-slate-800/50 hover:border-cyan-500/30'
              }`}
            >
                <div className="absolute inset-0 bg-tech-grid opacity-[0.04] pointer-events-none"></div>
                
                {token.id === 'fluid' && (
                  <>
                    <div className="absolute top-0 right-0 p-4 z-20">
                      <div className="bg-cyan-500 text-slate-950 text-[8px] font-black uppercase px-2.5 py-1 rounded-full border border-white/20 shadow-lg tracking-widest">
                        Native Ecosystem
                      </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-400/20 transition-all"></div>
                  </>
                )}
                
                <div className="flex items-center justify-between w-full relative z-10 mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl p-3 group-hover:scale-110 transition-transform shadow-inner border flex items-center justify-center ${token.id === 'fluid' ? 'bg-slate-950 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-slate-950 border-white/5'}`}>
                            {token.icon}
                        </div>
                        <div>
                            <div className="font-black text-white leading-none mb-1 text-base uppercase tracking-tight">{token.name}</div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{token.network}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`font-black text-xl tracking-tighter leading-none mb-1.5 ${token.id === 'fluid' ? 'text-cyan-400' : 'text-white'}`}>
                            ${(token.balance * token.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">+1.2%</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full relative z-10 pt-4 border-t border-white/5">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Total Balance</span>
                        <div className={`text-sm font-black tracking-tight leading-none ${token.id === 'fluid' ? 'text-white' : 'text-slate-300'}`}>
                            {token.balance.toLocaleString()} {token.symbol}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Current Price</span>
                        <div className={`text-sm font-black tracking-tight leading-none ${token.id === 'fluid' ? 'text-cyan-400' : 'text-slate-400'}`}>
                            ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </button>
            ))}
        </div>
      </div>

      {modalType && (
        <div className="absolute inset-0 z-[500] bg-slate-950/80 backdrop-blur-xl p-4 flex flex-col animate-fade-in-up rounded-[inherit]">
          <header className="flex justify-between items-center py-4 mb-4">
            <button onClick={() => setModalType(null)} className="p-2 bg-slate-900 rounded-xl text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">{modalType} {modalType === 'details' ? selectedToken.name : 'Crypto'}</h4>
            <div className="w-10"></div>
          </header>

          <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-1">
            {modalType === 'send' && (
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Target Address</span>
                    <button className="text-cyan-400">Scan QR</button>
                  </div>
                  <input 
                    type="text" 
                    placeholder="0x... or .fluid domain" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-cyan-500 transition-all text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Amount (USD)</span>
                    <span>Max: ${ (selectedToken.balance * selectedToken.price).toLocaleString() }</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="flex-1 bg-transparent text-3xl font-black text-white outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedToken.symbol}</div>
                  </div>
                </div>
                <button onClick={() => handleAction('send')} className="w-full py-5 bg-white text-slate-950 font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-transform">Confirm Transfer</button>
              </div>
            )}

            {modalType === 'receive' && (
              <div className="flex flex-col items-center justify-center space-y-8 pt-8 text-center">
                <div className="p-8 bg-white rounded-[2.5rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  <QrCode size={200} className="text-slate-950" />
                </div>
                <div>
                  <h5 className="font-black text-white text-lg tracking-tighter uppercase mb-2">My Vault Address</h5>
                  <div className="flex items-center gap-2 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <code className="text-xs text-slate-400 font-mono">0x4F12...668A</code>
                    <button onClick={() => triggerToast('Address Copied')} className="text-cyan-400 hover:text-white transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <button className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-800">Save QR</button>
                  <button className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-800">Share</button>
                </div>
              </div>
            )}

            {modalType === 'buy' && (
              <div className="space-y-6">
                 <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-center">
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                     <Building2 size={32} />
                   </div>
                   <h5 className="text-lg font-black text-white tracking-tighter uppercase">Instant Fiat On-Ramp</h5>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Bridging legacy rails to Fluid sharding</p>
                 </div>
                 <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span>Deposit Amount</span>
                      <span>Min: $50</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        className="flex-1 bg-transparent text-3xl font-black text-white outline-none"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <span className="text-xl font-black text-slate-700">USD</span>
                    </div>
                 </div>
                 <button onClick={() => handleAction('buy')} className="w-full py-5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-transform">Continue to Gateway</button>
              </div>
            )}

            {modalType === 'details' && (
              <div className="space-y-8">
                <div className="flex flex-col items-center pt-4">
                  <div className={`w-20 h-20 bg-slate-900 rounded-[2rem] p-4 mb-6 shadow-2xl border ${selectedToken.id === 'fluid' ? 'border-cyan-500/30' : 'border-white/5'}`}>{selectedToken.icon}</div>
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">{selectedToken.name}</h3>
                  <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">${selectedToken.price.toLocaleString()} <span className="text-[10px] text-emerald-400 font-black ml-1">+1.2%</span></p>
                </div>
                
                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden divide-y divide-slate-800/50">
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Balance</span>
                    <span className="text-sm font-black text-white tracking-tight">{selectedToken.balance.toLocaleString()} {selectedToken.symbol}</span>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network</span>
                    <span className="text-sm font-black text-cyan-500 tracking-tight uppercase">{selectedToken.network}</span>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Equity</span>
                    <span className="text-sm font-black text-white tracking-tight">${(selectedToken.balance * selectedToken.price).toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setModalType('send')} className="py-4 bg-slate-900 border border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white flex items-center justify-center gap-2 group hover:bg-white hover:text-slate-950 transition-all">
                    <ArrowUpRight size={16} /> Send
                  </button>
                  <button onClick={() => setModalType('receive')} className="py-4 bg-slate-900 border border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white flex items-center justify-center gap-2 group hover:bg-white hover:text-slate-950 transition-all">
                    <ArrowDownLeft size={16} /> Receive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SwapTab = ({ tokens, setTokens, addTransaction }: any) => {
    const [tokenA, setTokenA] = useState(tokens[1]);
    const [tokenB, setTokenB] = useState(tokens[0]);
    const [amountA, setAmountA] = useState('');
    const [amountB, setAmountB] = useState('');
    const [isSwapping, setIsSwapping] = useState(false);
    const [simState, setSimState] = useState<any>(null);

    useEffect(() => {
        if (!amountA || isNaN(parseFloat(amountA))) { setAmountB(''); return; }
        const est = (parseFloat(amountA) * (tokenA.price / tokenB.price)).toFixed(4);
        setAmountB(est);
    }, [amountA, tokenA, tokenB]);

    const handleSwap = () => {
        if (!amountA) return;
        setSimState({ title: 'Atomic Swap', sub: 'Routing through Fluid sharded pool...', icon: RefreshCw });
        setTimeout(() => {
            const numA = parseFloat(amountA);
            const numB = parseFloat(amountB);
            setTokens(tokens.map((t: Token) => {
                if (t.id === tokenA.id) return { ...t, balance: t.balance - numA };
                if (t.id === tokenB.id) return { ...t, balance: t.balance + numB };
                return t;
            }));
            addTransaction({ type: 'Swap', asset: `${tokenA.symbol} ➔ ${tokenB.symbol}`, amount: `-${numA} / +${numB}`, numericAmount: numB });
            setSimState({ title: 'Success', sub: 'Exchange settled in 640ms.', icon: CheckCircle, done: true });
        }, 1500);
    };

    return (
        <div className="p-4 space-y-6 h-full overflow-y-auto pb-32 animate-fade-in-up relative">
            <ProcessingOverlay show={!!simState} title={simState?.title} sub={simState?.sub} icon={simState?.icon} onDone={simState?.done ? () => {setSimState(null); setAmountA('');} : null} />
            <div className="pt-4 text-center">
                <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-1">Fluid DEX</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Sharded atomic swaps</p>
            </div>

            <div className="space-y-2">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] shadow-inner relative overflow-hidden group">
                    <div className="absolute inset-0 bg-tech-grid opacity-[0.02] pointer-events-none"></div>
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">
                        <span>From</span>
                        <span>Balance: {tokenA.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="number" placeholder="0.00" value={amountA} onChange={e => setAmountA(e.target.value)} className="bg-transparent text-2xl font-black text-white outline-none w-full placeholder:text-slate-800" />
                        <button className="flex items-center gap-2 bg-slate-950 p-2 pr-3 rounded-2xl border border-slate-800">
                           <div className="w-6 h-6 rounded-lg overflow-hidden">{tokenA.icon}</div>
                           <span className="font-black text-xs text-white uppercase">{tokenA.symbol}</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center -my-5 relative z-10">
                    <button onClick={() => { const t = tokenA; setTokenA(tokenB); setTokenB(t); }} className="p-3 bg-slate-800 rounded-2xl border-4 border-slate-950 text-cyan-400 hover:text-white transition-all shadow-xl active:scale-90">
                        <ArrowDownUp size={20} />
                    </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] shadow-inner pt-8">
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">
                        <span>To (Estimated)</span>
                        <span>Balance: {tokenB.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="text" readOnly placeholder="0.00" value={amountB} className="bg-transparent text-2xl font-black text-emerald-400 outline-none w-full" />
                        <button className="flex items-center gap-2 bg-slate-950 p-2 pr-3 rounded-2xl border border-slate-800">
                           <div className="w-6 h-6 rounded-lg overflow-hidden">{tokenB.icon}</div>
                           <span className="font-black text-xs text-white uppercase">{tokenB.symbol}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight">
                    <span className="text-slate-500">Slippage Tolerance</span>
                    <span className="text-cyan-500">0.5%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight">
                    <span className="text-slate-500">Protocol Fee</span>
                    <span className="text-slate-300">0.01%</span>
                </div>
            </div>

            <button onClick={handleSwap} disabled={!amountA} className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all disabled:opacity-30">Confirm Swap</button>
        </div>
    );
};

const CardsTab = () => {
  const [activeCard, setActiveCard] = useState<'virtual' | 'physical'>('virtual');
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [toast, setToast] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="p-4 space-y-8 pb-32 animate-fade-in-up h-full overflow-y-auto">
      <Toast message={toast} show={!!toast} />
      <div className="pt-4 text-center">
        <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-1">Fluid Card</h3>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Global Crypto rails</p>
      </div>

      <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
        <button 
          onClick={() => setActiveCard('virtual')} 
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCard === 'virtual' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500'}`}
        >Virtual</button>
        <button 
          onClick={() => setActiveCard('physical')} 
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCard === 'physical' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500'}`}
        >Physical</button>
      </div>

      <div className="perspective-1000">
        <div className={`relative w-full aspect-[1.6/1] rounded-3xl transition-all duration-700 preserve-3d p-6 flex flex-col justify-between overflow-hidden shadow-2xl ${activeCard === 'virtual' ? 'bg-gradient-to-br from-cyan-400/20 to-blue-600/20 backdrop-blur-xl border border-white/20' : 'bg-gradient-to-br from-slate-800 to-black border border-slate-700'}`}>
          <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">{FLUID_LOGO_SVG}</div>
              <span className="font-black italic text-lg tracking-tighter">fluid</span>
            </div>
            <Wifi className="text-white/30 rotate-90" />
          </div>

          <div className="relative z-10">
            <div className="text-xl font-mono text-white tracking-[0.2em] mb-4">
              {showDetails ? '4532 8842 9901 1245' : '•••• •••• •••• 1245'}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] text-white/40 uppercase font-black tracking-widest mb-0.5">Card Holder</p>
                <p className="text-sm font-black text-white tracking-tight">ALEX RIVERA</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-white/40 uppercase font-black tracking-widest mb-0.5">Expiry</p>
                <p className="text-sm font-black text-white tracking-tight">05/28</p>
              </div>
            </div>
          </div>
          {isFrozen && <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-20"><Lock className="text-white animate-pulse" size={48} /></div>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => { setShowDetails(!showDetails); triggerToast(showDetails ? 'Details Hidden' : 'Details Shown'); }} className="flex flex-col items-center gap-3 p-5 bg-slate-900 rounded-3xl border border-slate-800 group hover:border-cyan-500/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">{showDetails ? <EyeOff size={20}/> : <Eye size={20}/>}</div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{showDetails ? 'Hide' : 'Reveal'} Details</span>
        </button>
        <button onClick={() => { setIsFrozen(!isFrozen); triggerToast(isFrozen ? 'Card Frozen' : 'Card Frozen'); }} className="flex flex-col items-center gap-3 p-5 bg-slate-900 rounded-3xl border border-slate-800 group hover:border-rose-500/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-rose-400 transition-colors">{isFrozen ? <Unlock size={20}/> : <Lock size={20}/>}</div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{isFrozen ? 'Unfreeze' : 'Freeze'} Card</span>
        </button>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800"><h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Card Settings</h4></div>
        <div className="divide-y divide-slate-800">
           {[
             { icon: Sliders, label: 'Spending Limits', val: '$5,000/mo' },
             { icon: Globe, label: 'Online Payments', val: 'Enabled' },
             { icon: PhoneIcon, label: 'Add to Apple Wallet', val: 'Ready' }
           ].map((opt, i) => (
             <button key={i} onClick={() => triggerToast(`${opt.label} Selected`)} className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800 transition-colors group">
                <div className="flex items-center gap-4">
                  <opt.icon size={18} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xs font-bold text-white tracking-tight">{opt.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-cyan-500">{opt.val}</span>
                  <ArrowRight size={14} className="text-slate-700" />
                </div>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

const BankTab = () => {
  const [activeBankSubTab, setActiveBankSubTab] = useState<'bank' | 'mobile'>('bank');
  const [simState, setSimState] = useState<any>(null);
  const [toast, setToast] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleDeposit = () => {
    setSimState({ title: 'Authenticating', sub: 'Initializing gateway...', icon: Building2 });
    setTimeout(() => {
      setSimState({ title: 'Success', sub: 'Funding source verified.', icon: CheckCircle, done: true });
    }, 2000);
  };

  const mobileWallets = [
    { id: 'revolut', name: 'Revolut', status: 'Connected', color: 'bg-white text-black' },
    { id: 'wise', name: 'Wise', status: 'Not Linked', color: 'bg-[#9FE35B] text-[#001D45]' },
    { id: 'monzo', name: 'Monzo', status: 'Not Linked', color: 'bg-[#FF4D57] text-white' },
  ];

  return (
    <div className="p-4 space-y-8 pb-32 animate-fade-in-up h-full overflow-y-auto relative">
      <ProcessingOverlay show={!!simState} title={simState?.title} sub={simState?.sub} icon={simState?.icon} onDone={simState?.done ? () => setSimState(null) : null} />
      <Toast message={toast} show={!!toast} />
      
      <div className="pt-4 text-center">
        <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-1">Fiat Gateway</h3>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">IBAN & Mobile Wallets</p>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 p-8 text-center shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-slate-800/20 pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-700"><Landmark size={120} /></div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-tight mb-1">Available balance</p>
        <h2 className="text-4xl font-black text-white tracking-tighter mb-8">€12,500.80</h2>
        <div className="flex gap-3">
          <button onClick={handleDeposit} className="flex-1 py-4 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">Add Funds</button>
          <button onClick={() => triggerToast('Withdrawal Flow Initiated')} className="flex-1 py-4 bg-slate-950 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-800 active:scale-95 transition-all">Withdraw</button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
        <button 
          onClick={() => setActiveBankSubTab('bank')} 
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeBankSubTab === 'bank' ? 'bg-slate-800 text-cyan-400 shadow-lg' : 'text-slate-500'}`}
        >Bank Info</button>
        <button 
          onClick={() => setActiveBankSubTab('mobile')} 
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeBankSubTab === 'mobile' ? 'bg-slate-800 text-cyan-400 shadow-lg' : 'text-slate-500'}`}
        >Mobile Wallets</button>
      </div>

      {activeBankSubTab === 'bank' ? (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account Details</h4>
            <button onClick={() => triggerToast('Account Info Copied')} className="text-[9px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors"><Copy size={10}/> Copy All</button>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
             {[
               { label: 'Beneficiary', val: 'ALEX RIVERA' },
               { label: 'IBAN', val: 'LT14 2024 1124 5589 1234' },
               { label: 'BIC/SWIFT', val: 'FLD LT 21' },
               { label: 'Bank', val: 'Fluid European Rails' }
             ].map((item, i) => (
               <div key={i} onClick={() => triggerToast(`${item.label} Copied`)} className="flex justify-between items-center group cursor-pointer">
                 <div>
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{item.label}</p>
                   <p className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">{item.val}</p>
                 </div>
                 <Copy size={14} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
               </div>
             ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Linked Apps</h4>
            <button onClick={() => triggerToast('Search for apps')} className="text-[9px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors"><Plus size={10}/> Add New</button>
          </div>

          <div className="grid gap-3">
             {mobileWallets.map((wallet) => (
               <div key={wallet.id} className="bg-slate-900 border border-slate-800/50 p-4 rounded-3xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${wallet.color} flex items-center justify-center font-black text-sm shadow-xl`}>
                      {wallet.name[0]}
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-white uppercase tracking-tight">{wallet.name}</h5>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${wallet.status === 'Connected' ? 'text-emerald-400' : 'text-slate-600'}`}>{wallet.status}</span>
                    </div>
                 </div>
                 {wallet.status === 'Connected' ? (
                   <div className="flex items-center gap-3">
                     <span className="text-[10px] font-black text-slate-500 uppercase">Primary</span>
                     <button onClick={() => triggerToast(`Manage ${wallet.name}`)} className="p-2 bg-slate-950 rounded-xl text-slate-600 hover:text-white transition-colors"><Settings size={14}/></button>
                   </div>
                 ) : (
                   <button onClick={() => triggerToast(`Linking to ${wallet.name}...`)} className="px-4 py-2 bg-cyan-500 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all">Link App</button>
                 )}
               </div>
             ))}
          </div>
          
          <div className="p-6 bg-slate-950 border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center gap-3 group hover:border-cyan-500/50 transition-colors cursor-pointer" onClick={() => triggerToast('Scanning for banking APIs...')}>
             <Smartphone className="text-slate-700 group-hover:text-cyan-500 transition-colors" size={32} />
             <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Scan for more mobile banking apps</p>
          </div>
        </div>
      )}

      <div className="p-6 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-3xl border border-cyan-500/10 flex items-center gap-4 group cursor-pointer hover:border-cyan-500/50 transition-colors" onClick={() => triggerToast('Instant Ramp Initiated')}>
        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform"><RefreshCw size={24}/></div>
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1">Instant On-Ramp</h4>
          <p className="text-[10px] text-slate-500 font-bold leading-relaxed tracking-tight">Convert fiat or app balances to FLUID instantly with 0% settlement fees.</p>
        </div>
      </div>
    </div>
  );
};

const DAppsTab = () => {
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [connectionStep, setConnectionStep] = useState<'request' | 'connecting' | 'active'>('request');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [toast, setToast] = useState('');
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const categories = ["All", "DeFi", "Games", "Social", "Tools"];
  const apps = [
    { id: 1, name: "Fluid Stake", category: "DeFi", icon: <Zap className="text-yellow-400"/>, desc: "High yield native staking on Fluid L1", url: "stake.fluid", users: "12.4k" },
    { id: 2, name: "ParmaSwap", category: "DeFi", icon: <RefreshCw className="text-cyan-400"/>, desc: "Community governed sharded DEX", url: "swap.fluid", users: "45.2k" },
    { id: 3, name: "Fluid Social", category: "Social", icon: <Users className="text-purple-400"/>, desc: "Decentralized messaging protocol", url: "social.fluid", users: "8.9k" },
    { id: 4, name: "Block Miner", category: "Games", icon: <Database className="text-emerald-400"/>, desc: "Play-to-earn mining simulator", url: "miner.fluid", users: "3.2k" },
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || app.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = () => {
    setConnectionStep('connecting');
    setTimeout(() => {
        setConnectionStep('active');
    }, 2500);
  };

  if (selectedApp) {
    return (
      <div className="flex flex-col h-full bg-slate-950 animate-fade-in-up">
        <Toast message={toast} show={!!toast} />
        <div className="p-4 border-b border-slate-900 flex justify-between items-center bg-slate-900/50">
          <button onClick={() => {setSelectedApp(null); setConnectionStep('request');}} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"><X size={18}/></button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Secure Sharded Bridge</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-white tracking-tight">
              <Lock size={10} className="text-emerald-400" />
              {selectedApp.url}
            </div>
          </div>
          <button className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"><ExternalLink size={18}/></button>
        </div>

        {connectionStep === 'request' && (
           <div className="flex-1 p-8 flex flex-col items-center justify-center animate-fade-in-up">
              <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center text-white">
                      <div className="w-8 h-8">{FLUID_LOGO_SVG}</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-100"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-200"></div>
                      </div>
                  </div>
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center">
                      {React.cloneElement(selectedApp.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
              </div>
              
              <h3 className="text-2xl font-black text-white text-center mb-4 uppercase tracking-tighter">Connection Request</h3>
              <p className="text-slate-500 text-center mb-10 text-sm font-medium leading-relaxed">
                <span className="text-white font-bold">{selectedApp.name}</span> wants to connect to your Fluid Vault. This will allow the DApp to view your account address and balances.
              </p>

              <div className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-6 mb-10 space-y-4">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400"><Activity size={16}/></div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">View wallet balance & activity</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400"><MousePointer2 size={16}/></div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Request approval for transactions</span>
                  </div>
              </div>

              <div className="flex flex-col w-full gap-3">
                  <button onClick={handleConnect} className="w-full py-5 bg-white text-slate-950 font-black rounded-3xl text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl">Connect Wallet</button>
                  <button onClick={() => setSelectedApp(null)} className="w-full py-5 bg-slate-900 text-slate-400 font-black rounded-3xl text-sm uppercase tracking-widest border border-slate-800 hover:text-white transition-colors">Reject</button>
              </div>
           </div>
        )}

        {connectionStep === 'connecting' && (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-white/5 flex items-center justify-center">
                <RefreshCw size={40} className="animate-spin text-cyan-400" />
              </div>
              <div className="absolute -inset-4 border-2 border-dashed border-cyan-500/20 rounded-[2.5rem] animate-[spin_10s_linear_infinite]"></div>
            </div>
            <h2 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase">Syncing Shard</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Establishing Parmaweb protocol link...</p>
            <div className="w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 animate-[marquee_2s_infinite]"></div>
            </div>
          </div>
        )}

        {connectionStep === 'active' && (
            <div className="flex-1 p-8 flex flex-col items-center justify-center animate-fade-in-up">
                <div className="relative mb-10">
                    <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] p-6 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)] flex items-center justify-center">
                         {React.cloneElement(selectedApp.icon as React.ReactElement<any>, { size: 40 })}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center text-slate-950">
                        <CheckCircle size={20} />
                    </div>
                </div>

                <h3 className="text-3xl font-black text-white text-center mb-2 uppercase tracking-tighter">{selectedApp.name} Connected</h3>
                <p className="text-[10px] text-emerald-400 font-black text-center mb-12 uppercase tracking-[0.3em]">Active Session Shared</p>

                <div className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-6 mb-12 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span>Status</span>
                        <span className="text-emerald-400">Live</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span>Connection Type</span>
                        <span className="text-white">Fluid Shard V2</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span>Signed In As</span>
                        <span className="text-cyan-400 font-mono">0x4F12...668A</span>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-3">
                  <button onClick={() => triggerToast(`Navigating to ${selectedApp.url}...`)} className="w-full py-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-black rounded-3xl text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Launch Application</button>
                  <button onClick={() => {setConnectionStep('request'); setSelectedApp(null);}} className="w-full py-5 bg-slate-900 text-rose-500 font-black rounded-3xl text-sm uppercase tracking-widest border border-slate-800 hover:bg-rose-500/10 transition-colors">Disconnect Session</button>
                </div>
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-32 animate-fade-in-up">
      <Toast message={toast} show={!!toast} />
      <div className="pt-4 text-center">
        <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-1">Explore DApps</h3>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Fluid Parmaweb Nodes</p>
      </div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
        <input 
          type="text" 
          placeholder="Search decentralized apps..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pl-12 text-sm text-white font-bold outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === cat ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {filteredApps.length > 0 ? filteredApps.map(app => (
          <button key={app.id} onClick={() => setSelectedApp(app)} className="w-full flex items-center justify-between p-4 rounded-3xl bg-slate-900 border border-slate-800/50 hover:border-cyan-500/30 transition-all group text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.02] pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center shadow-lg border border-white/5 group-hover:scale-110 transition-transform">
                {React.cloneElement(app.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <div>
                <span className="font-black text-white tracking-tight text-sm uppercase">{app.name}</span>
                <p className="text-[10px] text-slate-500 font-medium leading-tight max-w-[160px] tracking-tight uppercase mt-0.5">{app.desc}</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
          </button>
        )) : (
          <div className="text-center py-12 text-slate-700 uppercase font-black text-xs tracking-widest">No DApps found</div>
        )}
      </div>
    </div>
  );
};

const HostingTab = () => {
  const [toast, setToast] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'deployments' | 'domains'>('deployments');
  
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const deployments = [
    { id: 1, name: 'Fluid DEX UI', domain: 'trade.fluid', status: 'Healthy', storage: '240MB', nodes: 12, expiry: 'Eternal' },
    { id: 2, name: 'Personal Blog', domain: 'alex.fluid', status: 'Healthy', storage: '12MB', nodes: 8, expiry: 'Eternal' }
  ];

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-32 animate-fade-in-up">
      <Toast message={toast} show={!!toast} />
      <div className="pt-4 text-center">
        <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-1">Parmaweb Ops</h3>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Permanent Shard Storage</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-inner relative overflow-hidden group">
         <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
         <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400"><Server size={20}/></div>
              <div>
                <h4 className="text-xs font-black text-white uppercase">Storage Status</h4>
                <p className="text-[8px] text-emerald-400 font-bold uppercase">Linked to mainnet</p>
              </div>
            </div>
            <Activity className="text-indigo-500 animate-pulse" size={16} />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
               <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-1">Total Hosted</span>
               <span className="text-sm font-black text-white">2 Assets</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
               <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-1">Endowment Share</span>
               <span className="text-sm font-black text-cyan-400">0.002%</span>
            </div>
         </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
        <button 
          onClick={() => setActiveSubTab('deployments')} 
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'deployments' ? 'bg-slate-800 text-indigo-400 shadow-lg' : 'text-slate-500'}`}
        >Deployments</button>
        <button 
          onClick={() => setActiveSubTab('domains')} 
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'domains' ? 'bg-slate-800 text-indigo-400 shadow-lg' : 'text-slate-500'}`}
        >Domains</button>
      </div>

      {activeSubTab === 'deployments' ? (
        <div className="space-y-3">
          {deployments.map(d => (
            <div key={d.id} className="bg-slate-900 border border-slate-800 p-4 rounded-[2rem] flex flex-col gap-4 group hover:border-indigo-500/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors border border-white/5"><Globe2 size={20}/></div>
                  <div>
                    <h5 className="text-sm font-black text-white uppercase tracking-tight">{d.name}</h5>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase">
                      <Lock size={10} className="text-emerald-400" /> {d.domain}
                    </div>
                  </div>
                </div>
                <button onClick={() => triggerToast(`Deploying ${d.name} update...`)} className="p-2 bg-slate-950 rounded-xl text-slate-600 hover:text-white transition-colors border border-white/5"><Terminal size={14}/></button>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/50">
                 <div className="text-center">
                    <span className="text-[7px] font-black text-slate-600 uppercase block">Storage</span>
                    <span className="text-[10px] font-bold text-slate-300">{d.storage}</span>
                 </div>
                 <div className="text-center">
                    <span className="text-[7px] font-black text-slate-600 uppercase block">Nodes</span>
                    <span className="text-[10px] font-bold text-slate-300">{d.nodes}</span>
                 </div>
                 <div className="text-center">
                    <span className="text-[7px] font-black text-slate-600 uppercase block">Cycle</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">{d.expiry}</span>
                 </div>
              </div>
            </div>
          ))}
          <button className="w-full py-4 bg-slate-950 border border-dashed border-slate-800 rounded-3xl flex items-center justify-center gap-3 group hover:border-indigo-500/50 transition-all">
             <Plus size={18} className="text-slate-700 group-hover:text-indigo-400" />
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-white">New Deployment</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
              <Globe size={48} className="mx-auto text-indigo-500/20" />
              <h4 className="text-sm font-black text-white uppercase tracking-tight">Fluid Name Service</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Claim your sharded identity on the permanent web.</p>
              <div className="relative">
                 <input type="text" placeholder="your-name" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-indigo-500 transition-all pr-20 text-xs" />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600 uppercase">.fluid</span>
              </div>
              <button onClick={() => triggerToast('Registry connecting...')} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all">Register Domain</button>
           </div>
           
           <div className="px-2"><h5 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Your Identities</h5></div>
           <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center text-indigo-400 border border-white/5 shadow-lg font-black text-[10px]">F</div>
                 <span className="text-xs font-bold text-white tracking-tight">trade.fluid</span>
              </div>
              <span className="text-[8px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded uppercase tracking-widest">Primary</span>
           </div>
        </div>
      )}
    </div>
  );
};

const HistoryTab = ({ transactions }: { transactions: Transaction[] }) => {
    const [toast, setToast] = useState('');
    const [sortField, setSortField] = useState<keyof Transaction>('timestamp');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const triggerToast = (msg: string) => {
      setToast(msg);
      setTimeout(() => setToast(''), 2000);
    };

    const handleSort = (field: keyof Transaction) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const sortedTransactions = useMemo(() => {
        return [...transactions].sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];
            
            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortDirection === 'asc' ? valA - valB : valB - valA;
            }
            
            const stringA = String(valA).toLowerCase();
            const stringB = String(valB).toLowerCase();
            
            if (stringA < stringB) return sortDirection === 'asc' ? -1 : 1;
            if (stringA > stringB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [transactions, sortField, sortDirection]);

    const SortIcon = ({ field }: { field: keyof Transaction }) => {
        if (sortField !== field) return <div className="w-3 h-3 opacity-20"><ChevronUp size={12}/></div>;
        return <div className={`w-3 h-3 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}><ChevronUp size={12}/></div>;
    };

    return (
        <div className="p-4 space-y-6 h-full overflow-y-auto pb-32">
            <Toast message={toast} show={!!toast} />
            
            <div className="flex justify-between items-end px-2 pt-4">
              <div>
                <h3 className="text-lg font-black text-white tracking-tighter uppercase">Vault Ledger</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Sharded Transaction Log</p>
              </div>
              <button onClick={() => triggerToast('Log Exported')} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors">Export CSV</button>
            </div>

            <div className="flex gap-2 px-2 overflow-x-auto no-scrollbar pb-2">
                {[
                    { label: 'Date', field: 'timestamp' },
                    { label: 'Type', field: 'type' },
                    { label: 'Amount', field: 'numericAmount' },
                    { label: 'Status', field: 'status' }
                ].map(item => (
                    <button 
                        key={item.label}
                        onClick={() => handleSort(item.field as keyof Transaction)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shrink-0 ${sortField === item.field ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                    >
                        {item.label} <SortIcon field={item.field as keyof Transaction} />
                    </button>
                ))}
            </div>

            <div className="space-y-3">
              {sortedTransactions.length > 0 ? sortedTransactions.map(tx => ( 
                <div key={tx.id} onClick={() => { triggerToast(`TX Copied: ${tx.hash}`); navigator.clipboard.writeText(tx.hash); }} className="group relative overflow-hidden">
                  <div className="p-4 bg-slate-900 border border-slate-800/50 rounded-[2rem] flex flex-col gap-4 group-hover:border-cyan-500/30 transition-all cursor-pointer relative z-10">
                    <div className="absolute inset-0 bg-tech-grid opacity-[0.02] pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors border border-white/5 shadow-inner">
                                {tx.type === 'Receive' || tx.type === 'Buy' ? <ArrowDownLeft size={24} /> : tx.type === 'Swap' ? <RefreshCw size={20} /> : <ArrowUpRight size={24} />}
                            </div>
                            <div>
                                <div className="font-black text-white text-base tracking-tight uppercase leading-none mb-1.5">{tx.type} {tx.asset}</div>
                                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5 tracking-tight uppercase"><Clock size={12} /> {tx.date}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`font-black text-lg tracking-tighter ${tx.numericAmount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{tx.amount}</div>
                            <div className="flex items-center gap-1.5 justify-end mt-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{tx.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Shard Hash</span>
                            <code className="text-[10px] text-slate-500 font-mono tracking-tight bg-slate-950 px-2 py-0.5 rounded border border-white/5">{tx.hash}</code>
                        </div>
                        <div className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy size={14} />
                        </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-4 -bottom-1 h-8 bg-cyan-500/5 blur-xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div> 
              )) : (
                <div className="py-20 text-center flex flex-col items-center gap-4 opacity-30">
                    <History size={48} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">No transactions recorded</span>
                </div>
              )}
            </div>
        </div>
    );
};

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'cards' | 'apps' | 'history' | 'bank' | 'swap' | 'hosting'>('portfolio');
  const [deviceSize, setDeviceSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const [toast, setToast] = useState('');
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const addTransaction = (data: Partial<Transaction>) => {
      const now = Date.now();
      const newTx: Transaction = {
          id: Math.random().toString(),
          timestamp: now,
          date: new Date(now).toISOString().slice(0, 16).replace('T', ' '),
          type: 'Transfer', 
          asset: 'FLD', 
          amount: '0', 
          numericAmount: 0,
          status: 'Success', 
          hash: `0x${Math.random().toString(16).slice(2, 14)}`, 
          ...data
      };
      setTransactions([newTx, ...transactions]);
  };

  const mainTabs = [
    { id: 'portfolio', icon: WalletIcon, label: 'Vault' },
    { id: 'swap', icon: RefreshCw, label: 'Swap' },
    { id: 'cards', icon: CardIcon, label: 'Cards' },
    { id: 'apps', icon: Compass, label: 'Explore' },
  ];

  const moreTabs = [
    { id: 'hosting', icon: Server, label: 'Hosting' },
    { id: 'bank', icon: Building2, label: 'Bank' },
    { id: 'history', icon: History, label: 'History' }
  ];

  const isMoreActive = moreTabs.some(tab => tab.id === activeTab);

  const handleTabChange = (id: any) => {
    setActiveTab(id);
    setIsMoreOpen(false);
  };

  const capabilities = [
    {
      title: "Hardened Security",
      desc: "Non-custodial vault architecture with AES-256 hardware-level encryption. Your assets, your keys, strictly biometric passkey access.",
      icon: ShieldCheck,
      color: "text-emerald-400"
    },
    {
      title: "Universal Vault",
      desc: "Native support to store, receive, and send assets across Fluid L1, Ethereum, and Solana. Sub-second finality on all sharded transactions.",
      icon: WalletIcon,
      color: "text-cyan-400"
    },
    {
      title: "Fluid Payment Cards",
      desc: "Generate virtual disposable cards for online anonymity or order premium metal physical cards for global spending powered by crypto.",
      icon: CardIcon,
      color: "text-indigo-400"
    },
    {
      title: "Fiat Banking Bridge",
      desc: "Integrated SEPA/SWIFT ramps with native IBAN support. Deposit fiat directly to your vault or off-ramp to global bank rails instantly.",
      icon: Landmark,
      color: "text-blue-400"
    },
    {
      title: "Institutional DEX",
      desc: "Built-in sharded decentralized exchange for atomic swaps with 0.01% fee settlement and native liquidity providing incentives.",
      icon: RefreshCw,
      color: "text-purple-400"
    },
    {
      title: "DApp & Hosting Ops",
      desc: "One-tap deployment of front-ends to Parmaweb. Manage your permanent hosting and browse the sharded internet safely.",
      icon: Globe,
      color: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white selection:bg-cyan-500/30">
      <Toast message={toast} show={!!toast} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
                <div className="w-4 h-4 text-cyan-400">{FLUID_LOGO_SVG}</div>
                <span className="text-white text-[10px] font-bold tracking-widest uppercase italic leading-none">Wallet Ecosystem under Development</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight max-w-4xl mx-auto uppercase">Your assets, your keys.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-600 italic">Pure Sovereignty.</span></h1>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-10 tracking-tight">The most advanced multichain wallet for the Fluid ecosystem. Integrated DEX, fiat ramps, and permanent hosting controls.</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {(['mobile', 'tablet', 'desktop'] as const).map(size => (
            <button key={size} onClick={() => setDeviceSize(size)} className={`p-3 rounded-2xl transition-all border ${deviceSize === size ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'}`}>{size === 'mobile' ? <PhoneIcon size={20}/> : size === 'tablet' ? <Tablet size={20}/> : <Monitor size={20}/>}</button>
          ))}
        </div>

        <div className="flex justify-center perspective-2000 pb-20">
          <div className={`relative transition-all duration-700 ease-in-out border-[12px] border-slate-900 rounded-[3.5rem] bg-slate-950 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden ${deviceSize === 'mobile' ? 'w-full max-w-[360px] h-[720px]' : deviceSize === 'tablet' ? 'w-full max-w-[600px] h-[800px]' : 'w-full max-w-5xl h-[700px]'}`}>
            <header className="pt-10 px-6 pb-4 flex items-center justify-end bg-slate-950/80 backdrop-blur-md sticky top-0 z-[200] h-20">
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer z-10" onClick={() => handleTabChange('portfolio')}>
                  <div className="w-8 h-8 text-white">{FLUID_LOGO_SVG}</div>
                  <span className="font-black text-lg text-white tracking-tighter leading-none uppercase italic">Fluid</span>
                </div>
                <div className="flex gap-2 relative z-20">
                    <button onClick={() => triggerToast('Notifications coming soon')} className="p-2.5 bg-slate-900 rounded-2xl text-slate-500 hover:text-white transition-colors"><Bell size={18}/></button>
                    <button onClick={() => triggerToast('Profile settings coming soon')} className="p-2.5 bg-slate-900 rounded-2xl text-slate-500 hover:text-white transition-colors"><User size={18}/></button>
                </div>
            </header>

            <div className="h-full overflow-hidden flex flex-col pt-0">
               {activeTab === 'portfolio' && <PortfolioTab tokens={tokens} setTokens={setTokens} addTransaction={addTransaction} deviceSize={deviceSize} onNavigateToSwap={() => setActiveTab('swap')} />}
               {activeTab === 'cards' && <CardsTab />}
               {activeTab === 'swap' && <SwapTab tokens={tokens} setTokens={setTokens} addTransaction={addTransaction} />}
               {activeTab === 'apps' && <DAppsTab />}
               {activeTab === 'bank' && <BankTab />}
               {activeTab === 'history' && <HistoryTab transactions={transactions} />}
               {activeTab === 'hosting' && <HostingTab />}
            </div>

            {/* More Menu Overlay */}
            {isMoreOpen && (
              <div className="absolute inset-0 z-[400] bg-slate-950/60 backdrop-blur-sm animate-fade-in flex flex-col justify-end">
                  <div onClick={() => setIsMoreOpen(false)} className="flex-1"></div>
                  <div className="bg-slate-900 border-t border-slate-800 rounded-t-[2.5rem] p-6 pb-12 animate-fade-in-up shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                      <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto mb-8"></div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 text-center">Protocol Resources</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {moreTabs.map(tab => (
                          <button key={tab.id} onClick={() => handleTabChange(tab.id as any)} className={`flex flex-col items-center gap-3 p-4 rounded-3xl transition-all ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-950 border border-white/5 text-slate-500 hover:text-white'}`}>
                            <tab.icon size={24} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                          </button>
                        ))}
                        <button onClick={() => triggerToast('Wallet Settings')} className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-950 border border-white/5 text-slate-500 hover:text-white">
                           <Settings size={24} />
                           <span className="text-[8px] font-black uppercase tracking-widest">Setup</span>
                        </button>
                        <button onClick={() => triggerToast('Security Audit')} className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-950 border border-white/5 text-slate-500 hover:text-white">
                           <Shield size={24} />
                           <span className="text-[8px] font-black uppercase tracking-widest">Verify</span>
                        </button>
                        <button onClick={() => setIsMoreOpen(false)} className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                           <X size={24} />
                           <span className="text-[8px] font-black uppercase tracking-widest">Close</span>
                        </button>
                      </div>
                  </div>
              </div>
            )}

            <nav className="absolute bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-slate-900 px-1 py-5 flex justify-between items-center z-[300]">
                {mainTabs.map(item => (
                    <button key={item.id} onClick={() => handleTabChange(item.id as any)} className={`flex flex-col items-center gap-1.5 transition-all flex-1 ${activeTab === item.id ? 'text-cyan-400 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                      <item.icon size={deviceSize === 'mobile' ? 18 : 20} strokeWidth={activeTab === item.id ? 2.5 : 2} className={item.id === 'swap' && activeTab === 'swap' ? 'animate-spin-slow' : ''} />
                      <span className="text-[6px] font-black tracking-widest uppercase">{item.label}</span>
                    </button>
                ))}
                <button onClick={() => setIsMoreOpen(!isMoreOpen)} className={`flex flex-col items-center gap-1.5 transition-all flex-1 ${isMoreActive || isMoreOpen ? 'text-cyan-400 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                  <div className="relative">
                    <MoreHorizontal size={deviceSize === 'mobile' ? 18 : 20} strokeWidth={(isMoreActive || isMoreOpen) ? 2.5 : 2} />
                    {isMoreActive && !isMoreOpen && <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>}
                  </div>
                  <span className="text-[6px] font-black tracking-widest uppercase">More</span>
                </button>
            </nav>
          </div>
        </div>

        <section className="mt-20 py-24 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto relative z-10 text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-2xl shadow-cyan-500/10">
              Protocol Specifications
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[1.1]">
              Institutional-Grade <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Vault Architecture</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium tracking-tight leading-relaxed">
              The Fluid Vault isn't just a wallet—it's a sharding-aware command center for the sharded internet. Secure, liquid, and eternally connected to global financial rails.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative z-10">
            {capabilities.map((cap, i) => (
              <div key={i} className="scroll-card p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden flex flex-col h-full shadow-2xl">
                <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
                
                <div className={`w-16 h-16 rounded-[1.5rem] bg-slate-950 flex items-center justify-center shrink-0 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform mb-8 ${cap.color}`}>
                  <cap.icon size={32} />
                </div>
                
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight leading-tight">{cap.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed tracking-tight flex-grow">{cap.desc}</p>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Active System</span>
                  <CheckCircle size={14} className="text-emerald-500 opacity-50" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 flex justify-center px-4 relative z-10">
            <div className="p-12 bg-slate-900 border border-white/10 rounded-[4rem] max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative group overflow-hidden">
              <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
              
              <div className="text-center md:text-left flex-1 relative z-10">
                <h4 className="text-white font-black text-2xl md:text-3xl mb-4 uppercase tracking-tight leading-tight">Master Your <br/><span className="text-cyan-400">Digital Sovereignty</span></h4>
                <p className="text-slate-500 text-sm md:text-base font-medium tracking-tight leading-relaxed">
                  Join 45,000+ pioneers who have transitioned to the world's first sharded non-custodial vault ecosystem.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10 shrink-0">
                <button className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-50 active:scale-95 transition-all shadow-2xl shadow-white/5">
                  Launch Desktop Vault
                </button>
                <div className="flex items-center justify-center gap-6 opacity-40">
                   <PhoneIcon size={20} className="text-white" />
                   <Monitor size={20} className="text-white" />
                   <Tablet size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WalletPage;