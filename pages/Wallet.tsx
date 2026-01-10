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
  Server, HardDrive as StorageIcon, Terminal, Globe2, LogOut, ChevronRight, LifeBuoy
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
  { id: 'fluid', symbol: 'Fluids', name: 'Fluid Token', icon: <div className="text-cyan-400">{FLUID_LOGO_SVG}</div>, price: 0.85, balance: 45200, color: '#22d3ee', network: 'Fluid Mainnet' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full" alt="ETH" />, price: 3450, balance: 4.25, color: '#6366f1', network: 'Ethereum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-full" alt="USDC" />, price: 1, balance: 12500, color: '#2775ca', network: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=026" className="w-full" alt="SOL" />, price: 145, balance: 120, color: '#14f195', network: 'Solana' },
  { id: 'bitcoin', symbol: 'WBTC', name: 'Wrapped BTC', icon: <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026" className="w-full" alt="BTC" />, price: 65200, balance: 0.045, color: '#f7931a', network: 'Ethereum' },
  { id: 'link', symbol: 'LINK', name: 'Chainlink', icon: <img src="https://cryptologos.cc/logos/chainlink-link-logo.png?v=026" className="w-full" alt="LINK" />, price: 18.2, balance: 350, color: '#2a5ada', network: 'Ethereum' },
  { id: 'polygon', symbol: 'POL', name: 'Polygon', icon: <img src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=026" className="w-full" alt="POL" />, price: 0.72, balance: 14500, color: '#8247e5', network: 'Polygon' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', timestamp: Date.now() - 3600000, date: '2024-05-24 14:20', type: 'Receive', asset: 'Fluids', amount: '+1,200.00', numericAmount: 1200, status: 'Success', hash: '0xabc71f92e123', from: '0x3321...4412' },
  { id: '2', timestamp: Date.now() - 86400000, date: '2024-05-23 09:15', type: 'Swap', asset: 'ETH ➔ Fluids', amount: '-0.50', numericAmount: -0.5, status: 'Success', hash: '0xdef22c42f456' },
  { id: '3', timestamp: Date.now() - 259200000, date: '2024-05-21 18:45', type: 'Send', asset: 'USDC', amount: '-500.00', numericAmount: -500, status: 'Success', hash: '0xghi33a11a789', to: '0x7122...9901' },
  { id: '4', timestamp: Date.now() - 345600000, date: '2024-05-20 12:10', type: 'Buy', asset: 'USDT', amount: '+2,500.00', numericAmount: 2500, status: 'Pending', hash: '0xjkl44b22b012' },
  { id: '5', timestamp: Date.now() - 518400000, date: '2024-05-18 10:05', type: 'Receive', asset: 'ETH', amount: '+2.15', numericAmount: 2.15, status: 'Success', hash: '0xmno55c33c345', from: '0x8823...1122' },
  { id: '6', timestamp: Date.now() - 604800000, date: '2024-05-17 15:30', type: 'Swap', asset: 'Fluids ➔ SOL', amount: '-450.00', numericAmount: -450, status: 'Success', hash: '0xpqr66d44d678' },
  { id: '7', timestamp: Date.now() - 864000000, date: '2024-05-14 08:45', type: 'Send', asset: 'Fluids', amount: '-1,000.00', numericAmount: -1000, status: 'Success', hash: '0xstu77e55e901', to: '0x2233...7788' },
];

const Toast = ({ message, show }: { message: string, show: boolean }) => (
  <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
    {message}
  </div>
);

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
      asset: data.asset || 'Fluids',
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
                                {activeTab === item.id && deviceSize !== 'mobile' && <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30"></div>}
                            </button>
                        ))}
                    </div>

                    {deviceSize !== 'mobile' && (
                        <div className="mt-auto p-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mainnet Node</span>
                                </div>
                                <div className="text-[10px] font-bold text-slate-900 dark:text-white">Fluid Cluster #842</div>
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
                             <header className="mb-10 flex justify-between items-end">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Ledger Activity</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Fluid Shard Consensus History</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-cyan-500 transition-colors"><Search size={18}/></button>
                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-cyan-500 transition-colors"><Download size={18}/></button>
                                </div>
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
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{tx.date} • {tx.from || tx.to || tx.hash.slice(0, 10)}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-black text-base tracking-tighter mb-1 ${tx.numericAmount > 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                                                {tx.amount}
                                            </div>
                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 text-[8px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-white/5">
                                                <div className="w-1 h-1 rounded-full bg-emerald-500"></div> Confirmed
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                    {activeTab === 'cards' && (
                        <div className="p-8 animate-fade-in-up h-full flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-cyan-500/10 rounded-[2.5rem] flex items-center justify-center text-cyan-400 mb-8 border border-cyan-500/20 shadow-2xl">
                                <CardIcon size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Card Network</h2>
                            <p className="text-slate-400 max-w-sm mb-10 leading-relaxed font-medium">Link your vault to virtual and physical Fluid cards. 0% FX fees, instant ramps, and 3% cashback in Fluids.</p>
                            <button className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Request Genesis Card</button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                         <div className="p-8 animate-fade-in-up h-full overflow-y-auto custom-scrollbar pb-32">
                            <header className="mb-12">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Vault Security</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Protocol Guardian Settings</p>
                            </header>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: 'Biometric Access', desc: 'Secure signing via FIDO2 passkeys.', icon: Fingerprint, status: 'Enabled', color: 'text-cyan-500' },
                                    { title: 'Social Recovery', desc: 'Shard your key across trusted contacts.', icon: Users, status: 'Setup', color: 'text-blue-500' },
                                    { title: 'Auto-Lock', desc: 'Automatic vault locking after 10m inactivity.', icon: Lock, status: '10m', color: 'text-purple-500' },
                                    { title: 'TEE Signing', desc: 'Hardware-isolated transaction execution.', icon: Cpu, status: 'Verified', color: 'text-emerald-500' }
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

                            <div className="mt-12 p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><ShieldAlert size={80} className="text-rose-500" /></div>
                                <h3 className="text-xl font-black text-rose-500 uppercase tracking-tighter italic mb-3">Emergency Access</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-8 leading-relaxed max-w-sm">If you lose your device, use your recovery shards to restore access. Never share your master seed with anyone.</p>
                                <button className="px-8 py-3 bg-rose-500 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/20">View Recovery Shards</button>
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
    <div className="p-4 md:p-8 space-y-8 pb-32 animate-fade-in-up relative h-full overflow-y-auto custom-scrollbar">
      <ProcessingOverlay show={!!simState} title={simState?.title} sub={simState?.sub} icon={simState?.icon} onDone={simState?.done ? () => {setSimState(null); setModalType(null); setAddress(''); setAmount('');} : null} />
      <Toast message={toast} show={!!toast} />

      <div className="text-center pt-4 relative group">
        <button onClick={() => setShowBalance(!showBalance)} className="absolute right-0 top-0 text-slate-400 hover:text-cyan-500 transition-colors">
          {showBalance ? <Eye size={16}/> : <EyeOff size={16}/>}
        </button>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Vault Equity</p>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">
          {showBalance ? `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••••'}
        </h2>
        <div className="flex items-center justify-center gap-1 text-emerald-500 dark:text-emerald-400 text-[10px] font-black tracking-widest uppercase">
          <ArrowUpRight size={14} /> +1.4% (24h)
        </div>
      </div>

      <div className="flex justify-center gap-2 px-2">
        {[
            { id: 'send', icon: ArrowUpRight, label: 'Send', color: 'bg-cyan-500 text-slate-950' },
            { id: 'receive', icon: ArrowDownLeft, label: 'Receive', color: 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10' },
            { id: 'buy', icon: Plus, label: 'Buy', color: 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10' }
        ].map(btn => (
            <button key={btn.id} onClick={() => setModalType(btn.id as any)} className="flex-1 flex flex-col items-center gap-2 group max-w-[100px]">
                <div className={`w-14 h-14 rounded-2xl ${btn.color} flex items-center justify-center group-hover:scale-105 transition-all shadow-lg`}>
                  <btn.icon size={24}/>
                </div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-slate-300">{btn.label}</span>
            </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
          Assets <span>Market (LIVE)</span>
        </h3>
        <div className={`grid gap-4 ${deviceSize === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {tokens.map((token: Token) => (
            <button 
              key={token.id} 
              onClick={() => {setSelectedToken(token); setModalType('details');}} 
              className={`w-full flex flex-col p-6 rounded-[2.5rem] border transition-all group text-left relative overflow-hidden ${
                token.id === 'fluid' 
                ? 'bg-white dark:bg-slate-900/90 border-cyan-500/50 ring-1 ring-cyan-500/20 shadow-xl scale-[1.01]' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 hover:border-cyan-500/30 shadow-md'
              }`}
            >
                <div className="absolute inset-0 bg-tech-grid opacity-[0.04] pointer-events-none"></div>
                
                <div className="flex items-center justify-between w-full relative z-10 mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl p-3 group-hover:scale-110 transition-transform shadow-inner border flex items-center justify-center ${token.id === 'fluid' ? 'bg-white dark:bg-slate-950 border-cyan-500/40 shadow-lg' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/5'}`}>
                            {token.icon}
                        </div>
                        <div>
                            <div className="font-black text-slate-900 dark:text-white leading-none mb-1 text-base uppercase tracking-tight">{token.name}</div>
                            <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{token.network}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`font-black text-xl tracking-tighter leading-none mb-1.5 ${token.id === 'fluid' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>
                            ${(token.balance * token.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">+1.2%</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full relative z-10 pt-4 border-t border-slate-100 dark:border-white/5">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none">Total Balance</span>
                        <div className={`text-sm font-black tracking-tight leading-none ${token.id === 'fluid' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                            {token.balance.toLocaleString()} {token.symbol}
                        </div>
                    </div>
                </div>
            </button>
            ))}
        </div>
      </div>

      {modalType && (
        <div className="absolute inset-0 z-[500] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl p-6 flex flex-col animate-fade-in-up rounded-[inherit]">
          <header className="flex justify-between items-center py-4 mb-6">
            <button onClick={() => setModalType(null)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{modalType} {modalType === 'details' ? selectedToken.name : 'Crypto'}</h4>
            <div className="w-10"></div>
          </header>

          <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-1 pb-10">
            {modalType === 'send' && (
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Target Address</span>
                    <button className="text-cyan-600 dark:text-cyan-400">Scan QR</button>
                  </div>
                  <input 
                    type="text" 
                    placeholder="0x... or .fluid domain" 
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white font-bold outline-none focus:border-cyan-500 transition-all text-sm shadow-inner"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Amount ({selectedToken.symbol})</span>
                    <span>Available: {selectedToken.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="flex-1 bg-transparent text-4xl font-black text-slate-900 dark:text-white outline-none tracking-tighter"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="px-4 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest shadow-sm">{selectedToken.symbol}</div>
                  </div>
                </div>
                <button onClick={() => handleAction('send')} className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-transform">Initiate Shard Transfer</button>
              </div>
            )}

            {modalType === 'receive' && (
              <div className="flex flex-col items-center justify-center space-y-8 pt-8 text-center max-w-md mx-auto">
                <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100 group relative">
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <QrCode size={240} className="text-slate-950 relative z-10" />
                </div>
                <div className="w-full">
                  <h5 className="font-black text-slate-900 dark:text-white text-lg tracking-tighter uppercase mb-2 italic">Non-Custodial Vault ID</h5>
                  <div className="flex items-center justify-between gap-2 p-5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full shadow-inner">
                     <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">0x9F82A7C3...8E21</span>
                     <button onClick={() => triggerToast('Address copied')} className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-cyan-500 transition-colors shadow-sm"><Copy size={16}/></button>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">Send only supported assets on the Fluid/EVM network.</p>
                </div>
              </div>
            )}

            {modalType === 'details' && (
                <div className="space-y-8">
                    <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><selectedToken.icon size={120} /></div>
                        <div className="w-20 h-20 bg-white dark:bg-slate-950 rounded-3xl p-5 mb-6 shadow-xl border border-slate-100 dark:border-white/5">{selectedToken.icon}</div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-1">{selectedToken.name}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">{selectedToken.network}</p>
                        <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">${(selectedToken.balance * selectedToken.price).toLocaleString()}</div>
                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+4.2% Past Month</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setModalType('send')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/5 transition-all hover:bg-cyan-500 hover:text-slate-950">Send</button>
                        <button onClick={() => setModalType('receive')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/5 transition-all hover:bg-cyan-500 hover:text-slate-950">Receive</button>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Market Statistics</h5>
                        <div className="space-y-3">
                            {[
                                { label: 'Liquidity Depth', val: '$420M' },
                                { label: '24h Volume', val: '$12.5M' },
                                { label: 'Protocol Yield', val: '5.2% APR' }
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-2xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;