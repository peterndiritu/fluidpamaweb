import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, X, Copy, QrCode, Check, Loader2, CheckCircle, Wallet as WalletIcon, 
  ArrowLeft, ChevronRight, Landmark, SlidersHorizontal, LogOut, ShieldCheck, Bell, Palette,
  Globe, Briefcase, Plus, Building, Network, RefreshCw, CreditCard, 
  ArrowDownUp, Droplets, Zap, Eye, EyeOff, Ban, Trash2, Smartphone, ShoppingBag,
  ChevronDown, Wifi, ExternalLink, HardDrive, User, Fingerprint, Lock, Settings, Info, Clock, Timer, AlertTriangle,
  AppWindow, Search, Compass, ExternalLink as LinkIcon, ShieldAlert, History, Filter, Download, DollarSign, PieChart,
  ChevronLeft, Monitor, Tablet, Smartphone as PhoneIcon
} from 'lucide-react';

// --- Shared Types & Mock Data ---
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
  { id: 'fluid', name: 'Fluid mainnet', icon: <div className="text-cyan-400 w-4 h-4">{FLUID_LOGO_SVG}</div> },
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

const ALL_TRANSACTIONS = [
  { id: '1', date: 'May 24', type: 'Receive', amount: '+1,200 FLD', status: 'Success', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: '2', date: 'May 23', type: 'Swap', amount: '-0.25 ETH', status: 'Success', color: 'text-slate-300', bg: 'bg-slate-500/10' },
  { id: '3', date: 'May 21', type: 'Send', amount: '-500 USDC', status: 'Success', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { id: '4', date: 'May 20', type: 'Stake', amount: '10k FLD', status: 'Success', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
];

// --- Shared UI Components ---

const ProcessingOverlay = ({ show, title, sub, icon: Icon, onDone, isSmall }: any) => {
  if (!show) return null;
  return (
    <div className={`absolute inset-0 z-[400] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in-up rounded-[inherit] ${isSmall ? 'scale-90' : ''}`}>
      <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mb-6 relative">
        <Icon size={32} className={onDone ? '' : 'animate-spin'} />
        {!onDone && <div className="absolute inset-0 border-4 border-cyan-500/20 border-t-cyan-500 rounded-3xl animate-spin"></div>}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 text-center leading-tight">{title}</h3>
      <p className="text-slate-400 text-center mb-8 text-sm">{sub}</p>
      {onDone && (
        <button onClick={onDone} className="px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl shadow-lg active:scale-95 transition-transform">Done</button>
      )}
    </div>
  );
};

const TokenSelectorModal = ({ isOpen, onClose, onSelect, currentToken }: { isOpen: boolean, onClose: () => void, onSelect: (t: Token) => void, currentToken: Token }) => {
    const [search, setSearch] = useState('');
    const filteredTokens = TOKENS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.symbol.toLowerCase().includes(search.toLowerCase()));

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-[500] bg-slate-950/98 backdrop-blur-xl flex flex-col animate-fade-in-up rounded-[inherit]">
            <header className="p-6 border-b border-slate-900 flex justify-between items-center">
                <h3 className="text-xl font-black text-white">Select asset</h3>
                <button onClick={onClose} className="p-2 bg-slate-900 rounded-xl text-slate-500"><X size={20}/></button>
            </header>
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search name or symbol" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-cyan-500 transition-all"
                        autoFocus
                    />
                </div>
                <div className="space-y-2">
                    {filteredTokens.map(t => (
                        <button 
                            key={t.id} 
                            onClick={() => { onSelect(t); onClose(); }}
                            className={`w-full flex items-center justify-between p-4 rounded-3xl border transition-all ${currentToken.id === t.id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 p-2">{t.icon}</div>
                                <div className="text-left">
                                    <p className="font-bold text-white leading-none">{t.symbol}</p>
                                    <p className="text-[10px] text-slate-500 font-bold mt-1">{t.name}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-white">{t.balance.toLocaleString()}</p>
                                <p className="text-[8px] text-slate-600 font-black uppercase">Balance</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Tab Components ---

const PortfolioTab = ({ setTab, deviceSize }: { setTab: (t: any) => void, deviceSize: string }) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalType, setModalType] = useState<'send' | 'receive' | 'buy' | null>(null);
  const [simState, setSimState] = useState<any>(null);

  const totalValue = TOKENS.reduce((acc, t) => acc + (t.balance * t.price), 0);

  const handleAction = (type: string) => {
    setSimState({ 
        title: type === 'send' ? 'Broadcasting transfer' : 'Processing purchase', 
        sub: type === 'send' ? 'Confirming on Fluid mainnet...' : 'Authenticating via MoonPay aggregation...', 
        icon: type === 'send' ? RefreshCw : ShieldCheck 
    });
    setTimeout(() => setSimState({ 
        title: 'Success', 
        sub: type === 'send' ? 'Assets successfully transferred.' : 'Payment confirmed. Assets arriving shortly.', 
        icon: CheckCircle, 
        done: true 
    }), 2000);
  };

  return (
    <div className="p-4 space-y-8 pb-32 animate-fade-in-up relative h-full overflow-y-auto custom-scrollbar">
      <ProcessingOverlay show={!!simState} title={simState?.title} sub={simState?.sub} icon={simState?.icon} onDone={simState?.done ? () => {setSimState(null); setModalType(null); setSelectedToken(null);} : null} />

      <div className="text-center pt-4">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total assets</p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
        <div className="flex items-center justify-center gap-1 mt-2 text-emerald-400 text-xs font-bold">
          <ArrowUpRight size={14} /> +$1,240.55 (1.4%) today
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setModalType('send')} className="flex-1 max-w-[120px] flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"><ArrowUpRight size={28}/></div>
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Send</span>
        </button>
        <button onClick={() => setModalType('receive')} className="flex-1 max-w-[120px] flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform"><ArrowDownLeft size={28}/></div>
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Receive</span>
        </button>
        <button onClick={() => setModalType('buy')} className="flex-1 max-w-[120px] flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform"><Plus size={28}/></div>
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Buy</span>
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Your assets</h3>
        <div className={`grid gap-2 ${deviceSize === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {TOKENS.map(token => (
            <button key={token.id} onClick={() => setSelectedToken(token)} className="w-full flex items-center justify-between p-4 rounded-3xl bg-slate-900 border border-slate-800/50 hover:border-slate-700 transition-all group">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-slate-950 rounded-xl p-2 group-hover:scale-110 transition-transform">{token.icon}</div>
                    <div className="text-left">
                        <div className="font-bold text-white leading-none mb-1">{token.name}</div>
                        <div className="text-xs text-slate-500 font-medium">{token.balance.toLocaleString()} {token.symbol}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-black text-white mb-1 text-sm">${(token.balance * token.price).toLocaleString()}</div>
                    <div className="text-[9px] text-emerald-400 font-bold">+1.2%</div>
                </div>
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'trade' | 'apps' | 'cards' | 'bank' | 'history'>('portfolio');
  const [deviceSize, setDeviceSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  
  const totalValue = TOKENS.reduce((acc, t) => acc + (t.balance * t.price), 0);

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Branding Section */}
        <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-500/20 mb-6 backdrop-blur-md shadow-lg">
                <div className="w-5 h-5 text-cyan-400">{FLUID_LOGO_SVG}</div>
                <span className="text-cyan-400 text-xs font-black tracking-[0.2em] uppercase">Fluid super non-custodial wallet</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight max-w-4xl mx-auto">
                Your assets, your keys.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-600">Pure multichain sovereignty.</span>
            </h1>
            
            <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-10">
                The most advanced multichain wallet for the Fluid ecosystem. Comprehensive integration for wallet services, DEX trading, fiat ramps, RWA management, crypto card management, and permanent hosting.
            </p>

            <div className="flex items-center justify-center gap-2 text-cyan-500/60 font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">
                Explore our interactive ecosystem <ChevronDown size={14} className="animate-bounce" />
            </div>
        </div>

        {/* Scroll To Interact Hint */}
        <div className="flex justify-center mb-12">
            <div className="px-6 py-3 bg-slate-900/40 border border-slate-800 rounded-full text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-3 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                Scroll to interact
            </div>
        </div>

        {/* Device Selection / Interactive Shell */}
        <div className="flex justify-center gap-3 mb-8">
          {(['mobile', 'tablet', 'desktop'] as const).map(size => (
            <button 
              key={size} 
              onClick={() => setDeviceSize(size)}
              className={`p-3 rounded-2xl transition-all border ${deviceSize === size ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'}`}
            >
              {size === 'mobile' ? <PhoneIcon size={20}/> : size === 'tablet' ? <Tablet size={20}/> : <Monitor size={20}/>}
            </button>
          ))}
        </div>

        {/* The Device Frame */}
        <div className="flex justify-center perspective-2000 pb-20">
          <div 
            className={`relative transition-all duration-700 ease-in-out border-[12px] border-slate-900 rounded-[3.5rem] bg-slate-950 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden ${
              deviceSize === 'mobile' ? 'w-full max-w-[360px] h-[720px]' : 
              deviceSize === 'tablet' ? 'w-full max-w-[600px] h-[800px]' : 
              'w-full max-w-5xl h-[700px]'
            }`}
          >
            {/* Device Notch/Top Bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-[1.5rem] z-[300] flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* In-App Header */}
            <header className="pt-10 px-6 pb-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-[200]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 text-white">{FLUID_LOGO_SVG}</div>
                    <span className="font-black text-lg italic text-white uppercase tracking-tighter leading-none">fluid</span>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-900 rounded-2xl text-slate-500 hover:text-white transition-colors relative">
                        <Bell size={18}/>
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-cyan-500 rounded-full border-2 border-slate-950"></div>
                    </button>
                    <button className="p-2.5 bg-slate-900 rounded-2xl text-slate-500 hover:text-white transition-colors"><User size={18}/></button>
                </div>
            </header>

            {/* App Content */}
            <div className="h-full overflow-hidden flex flex-col pt-0">
               {activeTab === 'portfolio' && <PortfolioTab setTab={setActiveTab} deviceSize={deviceSize} />}
               {activeTab === 'trade' && <TradeTab deviceSize={deviceSize} />}
               {activeTab === 'apps' && <AppsTab deviceSize={deviceSize} />}
               {activeTab === 'cards' && <CardsTab deviceSize={deviceSize} />}
               {activeTab === 'bank' && <BankTab deviceSize={deviceSize} />}
               {activeTab === 'history' && <HistoryTab setTab={setActiveTab} />}
            </div>

            {/* App Navigation Bar */}
            <nav className="absolute bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-slate-900 px-6 py-5 flex justify-between items-center z-[300]">
                {[
                    { id: 'portfolio', icon: WalletIcon, label: 'Vault' },
                    { id: 'trade', icon: RefreshCw, label: 'Trade' },
                    { id: 'cards', icon: CreditCard, label: 'Card' },
                    { id: 'bank', icon: Landmark, label: 'Bank' },
                    { id: 'apps', icon: Compass, label: 'Apps' }
                ].map(item => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === item.id ? 'text-cyan-400 scale-110' : 'text-slate-600 hover:text-slate-400'}`}
                    >
                        <item.icon size={deviceSize === 'mobile' ? 22 : 24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </nav>
          </div>
        </div>

      </div>
    </div>
  );
};

// Placeholder components to maintain stability
const TradeTab = ({ deviceSize }: any) => <div className="p-8 text-center text-slate-500 uppercase font-black text-xs pt-20">Trade interface active (2.4M TPS Engine)</div>;
const AppsTab = ({ deviceSize }: any) => <div className="p-8 text-center text-slate-500 uppercase font-black text-xs pt-20">dApp browser active</div>;
const CardsTab = ({ deviceSize }: any) => <div className="p-8 text-center text-slate-500 uppercase font-black text-xs pt-20">Card management module</div>;
const BankTab = ({ deviceSize }: any) => <div className="p-8 text-center text-slate-500 uppercase font-black text-xs pt-20">Fiat rails integrated</div>;
const HistoryTab = ({ setTab }: any) => <div className="p-8 text-center text-slate-500 uppercase font-black text-xs pt-20">Full audit trail</div>;

export default WalletPage;