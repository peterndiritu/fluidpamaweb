import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, X, Copy, QrCode, Check, Loader2, CheckCircle, Wallet as WalletIcon, 
  Landmark, Bell, Plus, RefreshCw, CreditCard, 
  ArrowDownUp, Smartphone, ShoppingBag,
  ChevronDown, User, Fingerprint, Compass, Monitor, Tablet, Smartphone as PhoneIcon,
  Search, ExternalLink, ShieldCheck, History, Settings, DollarSign, ArrowRight, Lock
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

const TOKENS: Token[] = [
  { id: 'fluid', symbol: 'FLD', name: 'Fluid', icon: <div className="text-cyan-400">{FLUID_LOGO_SVG}</div>, price: 0.85, balance: 45200, color: '#22d3ee', network: 'Fluid' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="w-full" alt="ETH" />, price: 3450, balance: 4.25, color: '#6366f1', network: 'Ethereum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-full" alt="USDC" />, price: 1, balance: 12500, color: '#2775ca', network: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-full" alt="SOL" />, price: 145, balance: 120, color: '#14f195', network: 'Solana' },
];

// --- Shared UI Components ---

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
  const [modalType, setModalType] = useState<'send' | 'receive' | 'buy' | 'details' | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token>(TOKENS[0]);
  const [simState, setSimState] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const totalValue = TOKENS.reduce((acc, t) => acc + (t.balance * t.price), 0);

  const handleAction = (type: string) => {
    setSimState({ 
        title: type === 'send' ? 'Broadcasting Transfer' : 'Processing Payment', 
        sub: type === 'send' ? 'Confirming on Fluid Mainnet...' : 'Authenticating via MoonPay Aggregation...', 
        icon: type === 'send' ? RefreshCw : ShieldCheck 
    });
    setTimeout(() => setSimState({ 
        title: 'Success', 
        sub: type === 'send' ? 'Assets successfully transferred.' : 'Payment confirmed. Assets arriving shortly.', 
        icon: CheckCircle, 
        done: true 
    }), 2000);
  };

  const copyAddress = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 space-y-8 pb-32 animate-fade-in-up relative h-full overflow-y-auto custom-scrollbar">
      <ProcessingOverlay 
        show={!!simState} 
        title={simState?.title} 
        sub={simState?.sub} 
        icon={simState?.icon} 
        onDone={simState?.done ? () => {setSimState(null); setModalType(null); setAddress(''); setAmount('');} : null} 
      />

      {/* Internal Modals */}
      {modalType === 'send' && (
        <div className="absolute inset-0 z-[350] bg-slate-950 p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => setModalType(null)} className="p-2 bg-slate-900 rounded-xl text-slate-500"><X size={20}/></button>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter">Send Asset</h3>
                <div className="w-10"></div>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recipient Address</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter .fluid or 0x address" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-sm focus:border-cyan-500 outline-none" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount</label>
                    <div className="relative">
                        <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00" 
                          className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold text-lg focus:border-cyan-500 outline-none" 
                        />
                        <button 
                          onClick={() => setAmount(selectedToken.balance.toString())}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 font-black uppercase text-[10px]"
                        >
                          Max
                        </button>
                    </div>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 p-1.5">{selectedToken.icon}</div>
                        <span className="text-white font-bold uppercase text-xs">{selectedToken.symbol}</span>
                    </div>
                    <span className="text-slate-500 text-xs font-bold">Balance: {selectedToken.balance}</span>
                </div>
                <button 
                  disabled={!address || !amount}
                  onClick={() => handleAction('send')} 
                  className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-20"
                >
                  Confirm Send
                </button>
            </div>
        </div>
      )}

      {modalType === 'receive' && (
        <div className="absolute inset-0 z-[350] bg-slate-950 p-6 animate-fade-in-up flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-12">
                <button onClick={() => setModalType(null)} className="p-2 bg-slate-900 rounded-xl text-slate-500"><X size={20}/></button>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter">Receive</h3>
                <div className="w-10"></div>
            </div>
            <div className="w-64 h-64 bg-white p-4 rounded-[2.5rem] shadow-2xl mb-8 flex items-center justify-center">
                <QrCode size={200} className="text-slate-900" />
            </div>
            <div className="text-center space-y-4 w-full">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Fluid Address</p>
                <div 
                  onClick={copyAddress}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 font-mono text-xs break-all cursor-pointer hover:bg-slate-800 transition-colors relative"
                >
                    0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    {copied && <div className="absolute inset-0 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black uppercase text-[10px]">Copied!</div>}
                </div>
                <p className="text-[9px] text-slate-600 font-medium">Send only FLUID or ERC-20 tokens to this address.</p>
            </div>
        </div>
      )}

      {modalType === 'buy' && (
        <div className="absolute inset-0 z-[350] bg-slate-950 p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => setModalType(null)} className="p-2 bg-slate-900 rounded-xl text-slate-500"><X size={20}/></button>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter">Buy Crypto</h3>
                <div className="w-10"></div>
            </div>
            <div className="space-y-6">
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">You Pay</p>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl font-black text-white">$</span>
                        <input type="number" defaultValue="500" className="bg-transparent text-4xl font-black text-white w-24 outline-none border-b border-slate-800 focus:border-cyan-500 text-center" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-full border border-slate-800">
                        <DollarSign size={14} className="text-slate-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">USD via MoonPay</span>
                    </div>
                </div>
                <div className="flex justify-center -my-3 relative z-10"><div className="bg-slate-950 p-2 rounded-xl border border-slate-800"><RefreshCw size={16} className="text-slate-600" /></div></div>
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">You Receive</p>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl font-black text-cyan-400">~588</span>
                        <span className="text-lg font-black text-cyan-400/50 uppercase">FLD</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-full border border-slate-800">
                        <div className="w-4 h-4">{FLUID_LOGO_SVG}</div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Fluid Asset</span>
                    </div>
                </div>
                <button 
                  onClick={() => handleAction('buy')} 
                  className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl shadow-lg active:scale-95"
                >
                  Continue to Provider
                </button>
            </div>
        </div>
      )}

      {/* Main Portfolio Content */}
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
            <button 
              key={btn.id} 
              onClick={() => setModalType(btn.id as any)} 
              className="flex-1 max-w-[120px] flex flex-col items-center gap-2 group"
            >
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
            <button 
              key={token.id} 
              onClick={() => {setSelectedToken(token); setModalType('details');}}
              className="w-full flex items-center justify-between p-4 rounded-3xl bg-slate-900 border border-slate-800/50 hover:border-slate-700 transition-all group"
            >
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

const TradeTab = () => {
    const [amountIn, setAmountIn] = useState('');
    const [tokenIn, setTokenIn] = useState(TOKENS[1]); // ETH
    const [tokenOut, setTokenOut] = useState(TOKENS[0]); // FLUID
    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(false);

    const handleSwap = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setDone(true);
        }, 2000);
    };

    return (
        <div className="p-4 space-y-6 relative h-full">
            <ProcessingOverlay 
              show={processing || done} 
              title={done ? "Trade Executed" : "Atomic Swap"} 
              sub={done ? "Settled on Fluid Mainnet" : "Confirming shard settlement..."} 
              icon={done ? CheckCircle : RefreshCw} 
              onDone={done ? () => {setDone(false); setAmountIn('');} : null} 
            />
            <div className="text-center pt-4">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Swap Assets</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Fluid 2.4M TPS Engine</p>
            </div>
            <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
                    <p className="text-[10px] font-black text-slate-600 uppercase mb-3">Pay</p>
                    <div className="flex justify-between items-center">
                        <input 
                          type="number" 
                          value={amountIn} 
                          onChange={(e) => setAmountIn(e.target.value)}
                          placeholder="0.00" 
                          className="bg-transparent text-3xl font-black text-white outline-none w-1/2" 
                        />
                        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <div className="w-6 h-6">{tokenIn.icon}</div>
                            <span className="text-xs font-black text-white uppercase">{tokenIn.symbol}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center -my-6 relative z-10">
                    <button 
                      onClick={() => { const t = tokenIn; setTokenIn(tokenOut); setTokenOut(t); }} 
                      className="p-3 bg-slate-900 border-[6px] border-slate-950 rounded-2xl text-cyan-400 hover:text-white transition-all shadow-xl"
                    >
                        <ArrowDownUp size={20}/>
                    </button>
                </div>
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 pt-8">
                    <p className="text-[10px] font-black text-slate-600 uppercase mb-3">Receive (Est.)</p>
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-black text-emerald-400">{(parseFloat(amountIn || '0') * (tokenIn.price / tokenOut.price)).toFixed(4)}</span>
                        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <div className="w-6 h-6">{tokenOut.icon}</div>
                            <span className="text-xs font-black text-white uppercase">{tokenOut.symbol}</span>
                        </div>
                    </div>
                </div>
                <button 
                  disabled={!amountIn}
                  onClick={handleSwap}
                  className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-3xl shadow-xl active:scale-95 disabled:opacity-20 transition-all uppercase tracking-widest"
                >
                  Confirm Swap
                </button>
            </div>
        </div>
    );
};

const CardsTab = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center pt-4">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Fluid Cards</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Manage your physical & virtual assets</p>
            </div>
            <div className="space-y-4">
                <div className="relative group w-full aspect-[1.6/1] bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl border border-slate-700 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full"></div>
                    <div className="flex justify-between items-start">
                        <span className="text-white font-black italic tracking-tighter">Fluid <span className="text-cyan-400">Metal</span></span>
                        <div className="p-2 bg-slate-950 rounded-xl border border-slate-800"><RefreshCw size={14} className="text-slate-600"/></div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Locked Vault Balance</p>
                        <p className="text-2xl font-black text-white">$12,400.00</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center gap-2 group">
                        <Lock size={20} className="text-slate-500 group-hover:text-cyan-400 transition-colors"/>
                        <span className="text-[9px] font-black text-slate-500 uppercase">Freeze Card</span>
                    </button>
                    <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center gap-2 group">
                        <Plus size={20} className="text-slate-500 group-hover:text-cyan-400 transition-colors"/>
                        <span className="text-[9px] font-black text-slate-500 uppercase">Add Virtual</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const BankTab = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center pt-4">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Fiat Rails</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Connect to global bank accounts</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-600 mb-6"><Landmark size={32}/></div>
                <h4 className="text-white font-bold mb-2">No bank connected</h4>
                <p className="text-xs text-slate-500 mb-8 px-4">Link your Revolut, Wise, or local bank for instant 0% fee ramps.</p>
                <button className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl shadow-lg active:scale-95 uppercase text-xs tracking-widest">Link Bank Account</button>
            </div>
        </div>
    );
};

const AppsTab = () => {
    const apps = [
        { name: 'Fluid DEX', icon: <RefreshCw size={20}/>, desc: 'Institutional trading' },
        { name: 'Aave', icon: <Landmark size={20}/>, desc: 'Lend & Borrow' },
        { name: 'OpenSea', icon: <ShoppingBag size={20}/>, desc: 'NFT Marketplace' },
        { name: 'Uniswap', icon: <ArrowRight size={20}/>, desc: 'V3 Liquidity' }
    ];

    return (
        <div className="p-4 space-y-6 h-full overflow-y-auto custom-scrollbar pb-32">
            <div className="text-center pt-4">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">DApp Explorer</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Verified ecosystem dApps</p>
            </div>
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input type="text" placeholder="Search or enter URL" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pl-12 text-sm text-white font-bold outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                {apps.map(app => (
                    <button key={app.name} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-start gap-2 hover:border-cyan-500 transition-all text-left">
                        <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-cyan-400 border border-slate-800">{app.icon}</div>
                        <div>
                            <p className="text-xs font-black text-white">{app.name}</p>
                            <p className="text-[9px] text-slate-600 font-bold uppercase">{app.desc}</p>
                        </div>
                    </button>
                ))}
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
               {activeTab === 'trade' && <TradeTab />}
               {activeTab === 'cards' && <CardsTab />}
               {activeTab === 'bank' && <BankTab />}
               {activeTab === 'apps' && <AppsTab />}
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