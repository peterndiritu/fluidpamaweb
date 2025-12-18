import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, X, Copy, QrCode, Check, Loader2, CheckCircle, Wallet as WalletIcon, 
  Landmark, Bell, Plus, RefreshCw, CreditCard, 
  ArrowDownUp, Smartphone, ShoppingBag,
  ChevronDown, User, Fingerprint, Compass, Monitor, Tablet, Smartphone as PhoneIcon
} from 'lucide-react';

// --- Shared UI Components ---
const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

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

const TOKENS: Token[] = [
  { id: 'fluid', symbol: 'FLD', name: 'Fluid', icon: <div className="text-cyan-400">{FLUID_LOGO_SVG}</div>, price: 0.85, balance: 45200, color: '#22d3ee', network: 'Fluid' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-full" alt="ETH" />, price: 3450, balance: 4.25, color: '#6366f1', network: 'Ethereum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-full" alt="USDC" />, price: 1, balance: 12500, color: '#2775ca', network: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-full" alt="SOL" />, price: 145, balance: 120, color: '#14f195', network: 'Solana' },
];

const ProcessingOverlay = ({ show, title, sub, icon: Icon, onDone }: any) => {
  if (!show) return null;
  return (
    <div className={`absolute inset-0 z-[400] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in-up rounded-[inherit]`}>
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

const PortfolioTab = ({ deviceSize }: { deviceSize: string }) => {
  const [modalType, setModalType] = useState<'send' | 'receive' | 'buy' | null>(null);
  const totalValue = TOKENS.reduce((acc, t) => acc + (t.balance * t.price), 0);

  return (
    <div className="p-4 space-y-8 pb-32 animate-fade-in-up relative h-full overflow-y-auto custom-scrollbar">
      <div className="text-center pt-4">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Vault balance</p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
        <div className="flex items-center justify-center gap-1 mt-2 text-emerald-400 text-xs font-bold">
          <ArrowUpRight size={14} /> +$1,240.55 (1.4%) today
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {[
            { id: 'send', icon: ArrowUpRight, label: 'Send', color: 'bg-cyan-500' },
            { id: 'receive', icon: ArrowDownLeft, label: 'Receive', color: 'bg-slate-800' },
            { id: 'buy', icon: Plus, label: 'Buy', color: 'bg-slate-800' }
        ].map(btn => (
            <button key={btn.id} onClick={() => setModalType(btn.id as any)} className="flex-1 max-w-[120px] flex flex-col items-center gap-2 group">
                <div className={`w-14 h-14 rounded-2xl ${btn.color} ${btn.id === 'send' ? 'text-slate-950' : 'text-white border border-slate-700'} flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/10`}>
                    <btn.icon size={28}/>
                </div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">{btn.label}</span>
            </button>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Your assets</h3>
        <div className={`grid gap-2 ${deviceSize === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {TOKENS.map(token => (
            <button key={token.id} className="w-full flex items-center justify-between p-4 rounded-3xl bg-slate-900 border border-slate-800/50 hover:border-slate-700 transition-all group">
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
  const [activeTab, setActiveTab] = useState<'portfolio' | 'trade' | 'apps' | 'cards' | 'bank'>('portfolio');
  const [deviceSize, setDeviceSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  
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
                The most advanced multichain wallet for the Fluid ecosystem. Comprehensive integration for wallet services, dex, fiat integration, RWA management, crypto card management, and permanent hosting.
            </p>

            <div className="flex items-center justify-center gap-2 text-cyan-500/60 font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">
                Explore our interactive ecosystem <ChevronDown size={14} className="animate-bounce" />
            </div>
        </div>

        {/* Device Selection */}
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

        {/* Device Frame */}
        <div className="flex justify-center perspective-2000 pb-20">
          <div 
            className={`relative transition-all duration-700 ease-in-out border-[12px] border-slate-900 rounded-[3.5rem] bg-slate-950 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden ${
              deviceSize === 'mobile' ? 'w-full max-w-[360px] h-[720px]' : 
              deviceSize === 'tablet' ? 'w-full max-w-[600px] h-[800px]' : 
              'w-full max-w-5xl h-[700px]'
            }`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-[1.5rem] z-[300] flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            <header className="pt-10 px-6 pb-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-[200]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 text-white">{FLUID_LOGO_SVG}</div>
                    <span className="font-black text-lg italic text-white uppercase tracking-tighter leading-none">Fluid</span>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-900 rounded-2xl text-slate-500 hover:text-white transition-colors relative"><Bell size={18}/></button>
                    <button className="p-2.5 bg-slate-900 rounded-2xl text-slate-500 hover:text-white transition-colors"><User size={18}/></button>
                </div>
            </header>

            <div className="h-full overflow-hidden flex flex-col pt-0">
               {activeTab === 'portfolio' && <PortfolioTab deviceSize={deviceSize} />}
               {activeTab !== 'portfolio' && <div className="p-20 text-center uppercase font-black text-slate-500 text-[10px] tracking-widest">{activeTab} active</div>}
            </div>

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
                        <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
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

export default WalletPage;