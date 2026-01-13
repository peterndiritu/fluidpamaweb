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
  Server, HardDrive as StorageIcon, Terminal, Globe2, LogOut, ChevronRight, LifeBuoy, TrendingUp, BarChart2, Gift
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full" alt="ETH" />, price: 3450, balance: 4.25, color: '#6366f1', network: 'Ethereum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-full" alt="USDC" />, price: 1, balance: 12500, color: '#2775ca', network: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=026" className="w-full" alt="SOL" />, price: 145, balance: 120, color: '#14f195', network: 'Solana' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', timestamp: Date.now() - 3600000, date: '2024-05-24 14:20', type: 'Receive', asset: 'Dividend', amount: '+$142.50', numericAmount: 142.5, status: 'Success', hash: '0xabc71f92e123', from: 'Fluid DRP Engine' },
  { id: '2', timestamp: Date.now() - 86400000, date: '2024-05-23 09:15', type: 'Swap', asset: 'ETH ➔ FLD', amount: '-0.50', numericAmount: -0.5, status: 'Success', hash: '0xdef22c42f456' },
  { id: '3', timestamp: Date.now() - 259200000, date: '2024-05-21 18:45', type: 'Send', asset: 'USDC', amount: '-500.00', numericAmount: -500, status: 'Success', hash: '0xghi33a11a789', to: '0x7122...9901' },
];

const ProcessingOverlay = ({ show, title, sub, icon: Icon, onDone }: any) => {
  if (!show) return null;
  return (
    <div className="absolute inset-0 z-[600] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in-up rounded-[inherit]">
      <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-500 dark:text-cyan-400 mb-6 relative">
        <Icon size={32} className={onDone ? '' : 'animate-spin'} />
        {!onDone && <div className="absolute inset-0 border-4 border-cyan-500/20 border-t-cyan-500 rounded-3xl animate-spin"></div>}
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 text-center leading-tight tracking-tighter uppercase">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-8 text-sm font-medium tracking-tight">{sub}</p>
      {onDone && (
        <button onClick={onDone} className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-tight rounded-xl shadow-lg active:scale-95 transition-transform uppercase">Done</button>
      )}
    </div>
  );
};

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'history' | 'cards' | 'settings'>('portfolio');
  const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [deviceSize, setDeviceSize] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => setDeviceSize(window.innerWidth < 1024 ? 'mobile' : 'desktop');
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addTransaction = (data: Partial<Transaction>) => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      type: data.type || 'Transfer',
      asset: data.asset || 'FLD',
      amount: data.amount || '0',
      numericAmount: data.numericAmount || 0,
      status: 'Success',
      hash: '0x' + Math.random().toString(16).substr(2, 12),
      ...data
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Sidebar / Nav */}
            <aside className={`lg:w-72 shrink-0 ${deviceSize === 'mobile' ? 'fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4' : ''}`}>
                <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-2 shadow-2xl flex transition-all ${deviceSize === 'mobile' ? 'rounded-3xl flex-row justify-between' : 'rounded-[3rem] flex-col h-[calc(100vh-10rem)] sticky top-32'}`}>
                    <div className={`flex ${deviceSize === 'mobile' ? 'flex-row w-full gap-1' : 'flex-col gap-2 p-4'}`}>
                        {[
                            { id: 'portfolio', label: 'Vault', icon: Database },
                            { id: 'history', label: 'History', icon: History },
                            { id: 'cards', label: 'Cards', icon: CardIcon },
                            { id: 'settings', label: 'Safety', icon: ShieldCheck }
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group relative overflow-hidden ${activeTab === item.id ? 'bg-cyan-500 text-slate-950 shadow-xl' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                            >
                                <item.icon size={20} className={activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                                <span className={`text-xs font-black uppercase tracking-widest ${deviceSize === 'mobile' ? 'hidden' : 'block'}`}>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {deviceSize !== 'mobile' && (
                        <div className="mt-auto p-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shard Node #842</span>
                                </div>
                                <div className="text-[10px] font-bold text-slate-900 dark:text-white uppercase">Sovereign Cluster Active</div>
                            </div>
                            <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-rose-500 transition-colors">
                                <LogOut size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">Lock Vault</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[4rem] h-full shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-tech-grid opacity-[0.02] pointer-events-none"></div>
                    
                    {activeTab === 'portfolio' && (
                        <PortfolioTab 
                            tokens={tokens} 
                            setTokens={setTokens} 
                            addTransaction={addTransaction} 
                            deviceSize={deviceSize}
                        />
                    )}

                    {activeTab === 'history' && (
                        <div className="p-8 animate-fade-in-up h-full flex flex-col">
                             <header className="mb-10">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Ledger History</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Fluid Shard Consensus Log</p>
                             </header>

                             <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1 pb-20">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="p-5 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-3xl flex items-center justify-between group hover:border-cyan-500/30 transition-all shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                                                tx.type === 'Receive' ? 'bg-emerald-500/10 text-emerald-500' : 
                                                tx.type === 'Send' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                                {tx.type === 'Receive' ? <ArrowDownLeft size={20}/> : tx.type === 'Send' ? <ArrowUpRight size={20}/> : <RefreshCw size={20}/>}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight mb-0.5">{tx.type} {tx.asset}</div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{tx.date} • {tx.from || tx.hash.slice(0, 10)}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-black text-base tracking-tighter mb-1 ${tx.numericAmount > 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                                                {tx.amount}
                                            </div>
                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 text-[8px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-white/5">
                                                Confirmed
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                    {activeTab === 'cards' && (
                        <div className="p-12 animate-fade-in-up h-full flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-cyan-500/10 rounded-[2.5rem] flex items-center justify-center text-cyan-400 mb-8 border border-cyan-500/20 shadow-2xl">
                                <CardIcon size={48} />
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Fluid Card Network</h2>
                            <p className="text-slate-400 max-w-sm mb-12 leading-relaxed font-medium">Synced to your vault. 0% FX fees. 3% cashback. Real-time fiat bridges for global liquidity.</p>
                            <button className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Request Metal Card</button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                         <div className="p-8 animate-fade-in-up h-full overflow-y-auto custom-scrollbar pb-32">
                            <header className="mb-12">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Vault Security</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Protocol Guardian Protocol</p>
                            </header>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: 'Biometric Signing', desc: 'Secure vault access via FIDO2.', icon: Fingerprint, status: 'Active', color: 'text-cyan-500' },
                                    { title: 'Shard Recovery', desc: 'Secret-shared key restoration.', icon: Users, status: 'Setup', color: 'text-blue-500' },
                                    { title: 'TEE Execution', desc: 'Isolated transaction signing.', icon: Cpu, status: 'Verified', color: 'text-emerald-500' },
                                    { title: 'Auto-Lock', desc: '10m inactivity threshold.', icon: Lock, status: 'Active', color: 'text-purple-500' }
                                ].map((item, i) => (
                                    <button key={i} className="p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-3xl flex items-center justify-between hover:border-cyan-500/30 transition-all text-left">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${item.color} shadow-inner`}>
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight mb-0.5">{item.title}</div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.status}</span>
                                    </button>
                                ))}
                            </div>
                         </div>
                    )}
                </div>
            </main>
        </div>
      </div>
    </div>
  );
};

const PortfolioTab = ({ tokens, setTokens, addTransaction, deviceSize }: any) => {
  const [subTab, setSubTab] = useState<'assets' | 'dividends'>('assets');
  const [modalType, setModalType] = useState<'send' | 'receive' | 'details' | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [simState, setSimState] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showBalance, setShowBalance] = useState(true);

  const totalValue = tokens.reduce((acc: number, t: Token) => acc + (t.balance * t.price), 0);

  const handleAction = (type: string) => {
    if (type === 'send' && !amount) return;
    setSimState({ title: 'Broadcasting', sub: 'Syncing with sharded validator pool...', icon: RefreshCw });
    setTimeout(() => {
        const numAmount = parseFloat(amount);
        setTokens(tokens.map((t: Token) => t.id === selectedToken.id ? { ...t, balance: t.balance - numAmount } : t));
        addTransaction({ type: 'Send', asset: selectedToken.symbol, amount: `-${numAmount.toLocaleString()}`, numericAmount: -numAmount, to: address });
        setSimState({ title: 'Success', sub: 'Operation confirmed on Fluid L1.', icon: CheckCircle, done: true });
    }, 2000);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-32 animate-fade-in-up relative h-full overflow-y-auto custom-scrollbar">
      <ProcessingOverlay show={!!simState} title={simState?.title} sub={simState?.sub} icon={simState?.icon} onDone={simState?.done ? () => {setSimState(null); setModalType(null); setAddress(''); setAmount('');} : null} />

      <div className="text-center pt-4 relative">
        <button onClick={() => setShowBalance(!showBalance)} className="absolute right-0 top-0 text-slate-400 hover:text-cyan-500 transition-colors">
          {showBalance ? <Eye size={16}/> : <EyeOff size={16}/>}
        </button>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Vault Equity</p>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">
          {showBalance ? `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••••'}
        </h2>
        <div className="flex items-center justify-center gap-1 text-emerald-500 dark:text-emerald-400 text-[10px] font-black tracking-widest uppercase">
          <TrendingUp size={14} /> +1.4% (24h)
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {[
            { id: 'assets', label: 'Assets', icon: Database },
            { id: 'dividends', label: 'Dividends', icon: Gift }
        ].map(tab => (
            <button 
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${subTab === tab.id ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
                <tab.icon size={14} /> {tab.label}
            </button>
        ))}
      </div>

      {subTab === 'assets' ? (
        <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Holdings</h3>
            <div className={`grid gap-4 ${deviceSize === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {tokens.map((token: Token) => (
                <button 
                key={token.id} 
                onClick={() => {setSelectedToken(token); setModalType('details');}} 
                className="w-full flex flex-col p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-cyan-500/30 transition-all text-left relative overflow-hidden group shadow-md"
                >
                    <div className="absolute inset-0 bg-tech-grid opacity-[0.04] pointer-events-none"></div>
                    <div className="flex items-center justify-between w-full relative z-10 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 flex items-center justify-center">
                                {token.icon}
                            </div>
                            <div>
                                <div className="font-black text-slate-900 dark:text-white text-base uppercase tracking-tight">{token.name}</div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{token.network}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-black text-lg text-slate-900 dark:text-white tracking-tighter leading-none mb-1">
                                ${(token.balance * token.price).toLocaleString()}
                            </div>
                            <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">+1.2%</div>
                        </div>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {token.balance.toLocaleString()} {token.symbol}
                    </div>
                </button>
                ))}
            </div>
        </div>
      ) : (
        <div className="animate-fade-in-up space-y-6">
            <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute inset-0 bg-tech-grid opacity-[0.05]"></div>
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={80}/></div>
                <div className="relative z-10">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-4">Genesis Dividend Portfolio</span>
                    <div className="text-4xl font-black text-white tracking-tighter leading-none mb-2">$2,842.15</div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total shared profits earned from ecosystem pillars</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'DEX Swaps', val: '$1,240.50', icon: RefreshCw, color: 'text-blue-400' },
                    { label: 'Card Network', val: '$842.15', icon: CardIcon, color: 'text-indigo-400' },
                    { label: 'Storage Fees', val: '$420.00', icon: Database, color: 'text-purple-400' },
                    { label: 'Validator Bonus', val: '$339.50', icon: Cpu, color: 'text-emerald-400' }
                ].map((p, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-3xl group shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${p.color} shadow-inner`}><p.icon size={16}/></div>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{p.label}</span>
                        </div>
                        <div className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{p.val}</div>
                    </div>
                ))}
            </div>

            <button className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">Claim All Dividends</button>
        </div>
      )}

      {modalType === 'details' && (
        <div className="absolute inset-0 z-[500] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl p-6 flex flex-col animate-fade-in-up rounded-[inherit]">
          <header className="flex justify-between items-center py-4 mb-6">
            <button onClick={() => setModalType(null)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={20} /></button>
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{selectedToken.name}</h4>
            <div className="w-10"></div>
          </header>

          <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[3rem] flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white dark:bg-slate-950 rounded-3xl p-5 mb-6 shadow-xl border border-slate-100 dark:border-white/5 flex items-center justify-center">
                    {selectedToken.icon}
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">${(selectedToken.balance * selectedToken.price).toLocaleString()}</div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">{selectedToken.balance.toLocaleString()} {selectedToken.symbol}</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <button className="py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/5 transition-all hover:bg-cyan-500 hover:text-slate-950">Send</button>
                    <button className="py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/5 transition-all hover:bg-cyan-500 hover:text-slate-950">Receive</button>
                </div>
            </div>

            <div className="space-y-4">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Market Performance</h5>
                <div className="h-40 w-full bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-center">
                    <BarChart2 size={32} className="text-slate-300 dark:text-slate-700" />
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;