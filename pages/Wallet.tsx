import React, { useState, useEffect } from 'react';
import { 
  Play, Apple, ArrowUpRight, ArrowDownLeft, Repeat, Plus, 
  CreditCard, Lock, Settings, Globe, Server, 
  Search, Cloud, Wifi, ChevronRight, Activity, Smartphone,
  ShieldCheck, Zap, MoreHorizontal, ArrowDownUp, RefreshCw, 
  TrendingUp, CheckCircle, ExternalLink, Loader2, ArrowRightLeft,
  Sliders, ShoppingBag, Layers, Wallet as WalletIcon, X, Copy, QrCode, Eye, EyeOff, Trash2, Ban,
  // Fix: Added missing 'Check', 'Music', and 'Tv' icons to the import.
  Check, Music, Tv
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// --- MOCK DATA & TYPES ---
interface Token {
  id: string; symbol: string; name: string; icon: React.ReactNode; price: number; balance: number; color: string;
}
interface Transaction { id: string; type: 'sent' | 'received'; amount: string; symbol: string; date: string; }
interface CardTransaction { id: string; vendor: string; amount: number; date: string; icon: React.ReactNode; }

// --- Shared Fluid Logo Component ---
const FluidLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
        <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
    </svg>
);

const TOKENS: Token[] = [
    { id: 'fluid', symbol: 'FLD', name: 'Fluid', icon: <FluidLogo className="w-full h-full text-cyan-400" />, price: 0.50, balance: 45000, color: '#22d3ee' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full h-full" alt="ETH" />, price: 3824, balance: 12.5, color: '#6366f1' },
    { id: 'tether', symbol: 'USDT', name: 'Tether', icon: <img src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=026" className="w-full h-full" alt="USDT" />, price: 1, balance: 63852, color: '#10b981' },
];


// --- MODAL COMPONENT ---
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up" onClick={onClose}>
            <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-800 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors rounded-full"><X size={20} /></button>
                </div>
                {children}
            </div>
        </div>
    );
};


// --- TAB 1: PORTFOLIO VIEW ---
const PortfolioView: React.FC<{ onNavigateToDex: () => void }> = ({ onNavigateToDex }) => {
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [modal, setModal] = useState<'send' | 'receive' | null>(null);
    const [sendAmount, setSendAmount] = useState('');
    const [sendAddress, setSendAddress] = useState('');
    const [sendStep, setSendStep] = useState(0); // 0: input, 1: confirming, 2: success
    const [isCopied, setIsCopied] = useState(false);

    const portfolioValue = TOKENS.reduce((acc, token) => acc + token.balance * token.price, 0);

    const handleSend = () => {
        setSendStep(1);
        setTimeout(() => setSendStep(2), 2000);
        setTimeout(() => {
            setModal(null);
            setSendStep(0);
            setSendAmount('');
            setSendAddress('');
        }, 4000);
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText("0x1a2b...c3d4");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const SendModalContent = () => (
        <>
           {sendStep === 0 && (
              <div className="space-y-4">
                  <div className="p-3 bg-slate-800 rounded-lg flex items-center gap-3">
                      <div className="w-8 h-8">{selectedToken?.icon}</div>
                      <div>
                          <div className="text-sm text-slate-400">Asset</div>
                          <div className="font-bold text-white">{selectedToken?.name}</div>
                      </div>
                  </div>
                  <input type="text" value={sendAddress} onChange={e => setSendAddress(e.target.value)} placeholder="Recipient Address" className="w-full bg-slate-800 p-3 rounded-lg text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" />
                  <input type="number" value={sendAmount} onChange={e => setSendAmount(e.target.value)} placeholder="Amount" className="w-full bg-slate-800 p-3 rounded-lg text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" />
                  <button onClick={handleSend} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors">Confirm Send</button>
              </div>
           )}
           {sendStep === 1 && <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-400 mb-4" /><p className="text-slate-300">Sending transaction...</p></div>}
           {sendStep === 2 && <div className="text-center py-8"><CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" /><h4 className="text-xl font-bold text-white">Transaction Sent!</h4><p className="text-slate-400">Your funds are on their way.</p></div>}
        </>
    );
    
    const ReceiveModalContent = () => (
        <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-xl"><QrCode size={160} className="text-black" /></div>
            <div className="w-full p-3 bg-slate-800 rounded-lg text-center font-mono text-sm text-slate-300 break-all">0x1a2b...c3d4</div>
            <button onClick={handleCopy} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">{isCopied ? <><Check size={18}/> Copied!</> : <><Copy size={16}/> Copy Address</>}</button>
        </div>
    );
    
    return (
        <div className="animate-fade-in-up">
            <Modal isOpen={!!selectedToken} onClose={() => setSelectedToken(null)} title={selectedToken?.name || ''}>
                {selectedToken && (
                    <div className="space-y-4">
                        <div className="h-40 -mx-6 -mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={Array.from({length: 20}, (_, i) => ({ n: i, p: selectedToken.price * (1 + (Math.random() - 0.5) * 0.1) }))}><defs><linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={selectedToken.color} stopOpacity={0.4}/><stop offset="95%" stopColor={selectedToken.color} stopOpacity={0}/></linearGradient></defs><Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155'}} /><Area type="monotone" dataKey="p" stroke={selectedToken.color} strokeWidth={2} fill="url(#chartColor)" /></AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                            <span className="text-slate-400">Balance</span>
                            <span className="font-bold text-white">{selectedToken.balance} {selectedToken.symbol}</span>
                        </div>
                         <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                            <span className="text-slate-400">Value</span>
                            <span className="font-bold text-white">${(selectedToken.balance * selectedToken.price).toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                           <button onClick={() => { setSelectedToken(null); setTimeout(() => setModal('send'), 100); }} className="py-3 bg-cyan-500/10 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/20">Send</button>
                           <button onClick={() => { setSelectedToken(null); setTimeout(() => setModal('receive'), 100); }} className="py-3 bg-emerald-500/10 text-emerald-400 font-bold rounded-lg hover:bg-emerald-500/20">Receive</button>
                        </div>
                    </div>
                )}
            </Modal>
            <Modal isOpen={modal === 'send'} onClose={() => setModal(null)} title={`Send ${selectedToken?.symbol || 'Crypto'}`}><SendModalContent /></Modal>
            <Modal isOpen={modal === 'receive'} onClose={() => setModal(null)} title="Receive Crypto"><ReceiveModalContent /></Modal>
            
            <div className="text-center mb-12">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total Balance</span>
                <h2 className="text-5xl font-bold text-white mt-2 mb-2">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold">
                    <ArrowUpRight size={14} /> +${(portfolioValue * 0.024).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (2.4%) Today
                </div>
            </div>

            <div className="flex justify-center gap-4 mb-12">
               {[ { icon: ArrowUpRight, label: "Send", action: () => setModal('send') }, { icon: ArrowDownLeft, label: "Receive", action: () => setModal('receive') }, { icon: RefreshCw, label: "Swap", action: onNavigateToDex }, { icon: Plus, label: "Buy", action: () => alert("Fiat on-ramp coming soon!") }
               ].map((action, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                     <button onClick={action.action} className="w-16 h-16 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black transition-colors flex items-center justify-center text-white border border-slate-700/50 shadow-lg">
                        <action.icon size={24} />
                     </button>
                     <span className="text-xs font-medium text-slate-400">{action.label}</span>
                  </div>
               ))}
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
               <h3 className="text-sm font-bold text-slate-500 px-2">Assets</h3>
               {TOKENS.map((token) => (
                  <div key={token.id} onClick={() => setSelectedToken(token)} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold" style={{ color: token.color }}>
                           {token.icon}
                        </div>
                        <div>
                           <div className="font-bold text-white">{token.name}</div>
                           <div className="text-sm text-slate-500">{token.balance} {token.symbol}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="font-bold text-white">${(token.balance * token.price).toLocaleString()}</div>
                        <div className="text-xs text-emerald-500">+1.2%</div>
                     </div>
                  </div>
               ))}
            </div>
        </div>
    );
};


// --- TAB 2: DEX VIEW ---
const DexView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'swap' | 'limit' | 'bridge'>('swap');
    const [payAmount, setPayAmount] = useState<string>('1.5');
    const [receiveAmount, setReceiveAmount] = useState<string>('');
    const [payToken, setPayToken] = useState<Token>(TOKENS[1]);
    const [receiveToken, setReceiveToken] = useState<Token>(TOKENS[2]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStatus, setProcessStatus] = useState<'idle' | 'approving' | 'processing' | 'success'>('idle');
    const [modalFor, setModalFor] = useState<'pay' | 'receive' | null>(null);

    const chartData = [ { name: '10:00', price: 3840 }, { name: '11:00', price: 3855 }, { name: '12:00', price: 3848 }, { name: '13:00', price: 3870 }, { name: '14:00', price: 3865 }, { name: '15:00', price: 3885 }, { name: '16:00', price: 3890 } ];

    useEffect(() => {
        if (!payAmount || !payToken || !receiveToken) { setReceiveAmount(''); return; }
        const val = parseFloat(payAmount); if (isNaN(val)) return;
        setReceiveAmount((val * (payToken.price / receiveToken.price)).toFixed(4));
    }, [payAmount, payToken, receiveToken]);

    const handleAction = () => {
        setIsProcessing(true); setProcessStatus('approving');
        setTimeout(() => setProcessStatus('processing'), 1500);
        setTimeout(() => setProcessStatus('success'), 3500);
        setTimeout(() => { setIsProcessing(false); setProcessStatus('idle'); setPayAmount(''); }, 5500);
    };

    const handleSelectToken = (token: Token) => {
        if (modalFor === 'pay') {
            if (token.id === receiveToken.id) setReceiveToken(payToken); // Swap
            setPayToken(token);
        } else {
            if (token.id === payToken.id) setPayToken(receiveToken); // Swap
            setReceiveToken(token);
        }
        setModalFor(null);
    };

    const getButtonLabel = () => {
        if (processStatus === 'idle') return 'Swap';
        if (processStatus === 'approving') return 'Approving...';
        if (processStatus === 'processing') return 'Swapping...';
        return 'Success!';
    };

    return (
        <div className="animate-fade-in-up">
            <Modal isOpen={!!modalFor} onClose={() => setModalFor(null)} title="Select Token">
                <div className="space-y-2">
                    {TOKENS.map(token => <button key={token.id} onClick={() => handleSelectToken(token)} className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800 transition-colors"><div className="w-8 h-8">{token.icon}</div><div><div className="font-bold text-white text-left">{token.name}</div><div className="text-sm text-slate-400">{token.symbol}</div></div></button>)}
                </div>
            </Modal>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-white mt-2 mb-2">Trade instantly with zero slippage.</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Connect to any DApp via WalletConnect.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                   <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-2">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>You pay</span><span>Balance: {payToken.balance.toLocaleString()} {payToken.symbol}</span></div>
                       <div className="flex justify-between items-center"><input type="number" placeholder="0.00" className="bg-transparent text-3xl font-bold text-white outline-none w-1/2" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} disabled={isProcessing} /><button onClick={() => setModalFor('pay')} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700"><div className="w-6 h-6">{payToken.icon}</div><span className="font-bold text-white text-lg">{payToken.symbol}</span><ChevronRight size={16} className="text-slate-400" /></button></div>
                    </div>
                    <div className="flex justify-center -my-3 relative z-10"><button onClick={() => {const temp=payToken; setPayToken(receiveToken); setReceiveToken(temp);}} className="bg-slate-900 border-4 border-slate-900 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-lg"><ArrowDownUp size={20} /></button></div>
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-4 pt-6">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>You receive</span><span>Balance: {receiveToken.balance.toLocaleString()} {receiveToken.symbol}</span></div>
                       <div className="flex justify-between items-center"><input type="number" placeholder="0.00" className="bg-transparent text-3xl font-bold text-emerald-400 outline-none w-1/2" value={receiveAmount} readOnly /><button onClick={() => setModalFor('receive')} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700"><div className="w-6 h-6">{receiveToken.icon}</div><span className="font-bold text-white text-lg">{receiveToken.symbol}</span><ChevronRight size={16} className="text-slate-400" /></button></div>
                    </div>
                    <button onClick={handleAction} disabled={isProcessing || !payAmount} className={`w-full font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20`}><>
                       {processStatus !== 'idle' && processStatus !== 'success' && <Loader2 className="animate-spin" />}
                       {processStatus === 'success' && <CheckCircle className="text-white" />}
                       {getButtonLabel()}</>
                    </button>
                </div>
                <div className="space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-[300px] flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                           <div><h3 className="text-xl font-bold text-white">{payToken.name}</h3><div className="text-xs text-slate-500">{payToken.symbol}/{receiveToken.symbol}</div></div>
                           <div className="text-right"><div className="text-xl font-bold text-white">${payToken.price.toLocaleString()}</div><div className="text-xs text-emerald-500 font-bold">+2.1%</div></div>
                        </div>
                        <div className="flex-1 -mx-6 -mb-6">
                            <ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs><Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.8)', border: '1px solid #334155' }}/><Area type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" /></AreaChart></ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- TAB 3: CARDS VIEW ---
const CardsView: React.FC = () => {
    const [showVDetails, setShowVDetails] = useState(false);
    const [isVFrozen, setIsVFrozen] = useState(false);
    const [pCardState, setPCardState] = useState<'none' | 'requested' | 'active'>('none');
    const [showPPin, setShowPPin] = useState(false);
    
    const cardTransactions: CardTransaction[] = [
        { id: '1', vendor: 'Spotify', amount: 9.99, date: 'May 20', icon: <Music /> },
        { id: '2', vendor: 'Amazon', amount: 45.50, date: 'May 19', icon: <ShoppingBag /> },
        { id: '3', vendor: 'Netflix', amount: 15.49, date: 'May 18', icon: <Tv /> },
    ];
    
    return (
        <div className="animate-fade-in-up">
            <Modal isOpen={pCardState === 'requested'} onClose={() => {}} title="Physical Card">
                <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-400 mb-4" /><h4 className="font-bold text-white text-xl">Your Card is on its way!</h4><p className="text-slate-400">Est. delivery: 5-7 business days.</p><button onClick={() => setPCardState('active')} className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg font-bold">Simulate Arrival & Activate</button></div>
            </Modal>
            <div className="text-center mb-16"><h2 className="text-3xl font-extrabold text-white mt-2 mb-2">One Wallet. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Two Realities.</span></h2><p className="text-slate-400 max-w-2xl mx-auto">Instantly generate virtual cards for secure online spending, or order the premium metal card for the physical world.</p></div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Virtual Card */}
                <div className="space-y-6">
                    <div className={`relative group w-full max-w-[380px] h-[240px] transition-all duration-500 mx-auto ${isVFrozen ? 'opacity-50' : ''}`}>
                        <div className="relative h-full w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"><div className="flex justify-between items-start z-10"><span className="font-bold text-xl text-white tracking-tighter flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500"></div>fluid <span className="text-[10px] uppercase font-normal text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">Virtual</span></span><Wifi size={24} className="text-white/50 rotate-90" /></div><div className="z-10"><div className="font-mono text-xl text-white tracking-widest mb-3 text-shadow-sm">{showVDetails ? '1234 5678 9012 8842' : '•••• •••• •••• 8842'}</div><div className="flex justify-between items-end"><div><span className="text-[9px] text-cyan-200/70 uppercase block mb-0.5">Card Holder</span><span className="text-sm text-white font-bold tracking-wider">HOLDER'S NAME</span></div><div className="flex flex-col items-end"><span className="text-[9px] text-white/50 font-bold mb-1">{showVDetails ? 'CVV 123' : 'CVV •••'} / EXP 12/28</span><FluidLogo className="w-7 h-7" /></div></div></div></div>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-center">
                        <button onClick={() => setShowVDetails(!showVDetails)} className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-white transition-colors">{showVDetails ? <EyeOff size={14}/> : <Eye size={14} />} {showVDetails ? 'Hide' : 'Show'} Details</button>
                        <button onClick={() => setIsVFrozen(!isVFrozen)} className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${isVFrozen ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}><Ban size={14}/> {isVFrozen ? 'Unfreeze' : 'Freeze'}</button>
                        <button onClick={() => confirm('Are you sure?') && alert('Card Deactivated!')} className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-white transition-colors"><X size={14}/> Deactivate</button>
                        <button onClick={() => confirm('This is permanent!') && alert('Card Deleted!')} className="flex items-center justify-center gap-2 py-2 px-3 bg-red-950/50 hover:bg-red-900/50 rounded-lg text-xs font-bold text-red-500 transition-colors"><Trash2 size={14}/> Delete</button>
                    </div>
                </div>
                {/* Physical Card & Transactions */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
                        <h3 className="text-xl font-bold text-white mb-4">Physical Metal Card</h3>
                        {pCardState === 'none' && <><p className="text-slate-400 text-sm mb-4">Order your premium 18g metal card for worldwide spending.</p><button onClick={() => setPCardState('requested')} className="w-full py-3 bg-white text-black rounded-lg font-bold">Request Card</button></>}
                        {pCardState === 'active' && <><div className="font-mono text-slate-400 mb-2">•••• •••• •••• 5678</div><button onClick={() => setShowPPin(!showPPin)} className="text-sm text-cyan-400 font-bold">{showPPin ? `PIN: ${'1234'}` : 'View PIN'}</button></>}
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
                        <div className="space-y-3">{cardTransactions.map(tx => <div key={tx.id} className="flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">{tx.icon}</div><div><div className="font-bold text-white">{tx.vendor}</div><div className="text-xs text-slate-500">{tx.date}</div></div></div><div className="font-bold text-white">-${tx.amount.toFixed(2)}</div></div>)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN WALLET PAGE COMPONENT ---
const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'dex' | 'cards'>('wallet');

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#0a0a16] text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
         <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            The Super App for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Decentralized Living</span>
         </h1>
         <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage your entire digital life in one place. From high-frequency trading and fiat spending to deploying censorship-resistant websites.
         </p>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-4 md:p-8 backdrop-blur-xl">
              <div className="flex justify-center mb-8">
                  <div className="flex gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800">
                      {[ { id: 'wallet', label: 'Wallet', icon: WalletIcon }, { id: 'dex', label: 'DEX', icon: RefreshCw }, { id: 'cards', label: 'Cards', icon: CreditCard }
                      ].map(tab => (
                          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                              <tab.icon size={16} /><span className="hidden sm:inline">{tab.label}</span>
                          </button>
                      ))}
                  </div>
              </div>
              
              <div>
                  {activeTab === 'wallet' && <PortfolioView onNavigateToDex={() => setActiveTab('dex')} />}
                  {activeTab === 'dex' && <DexView />}
                  {activeTab === 'cards' && <CardsView />}
              </div>
          </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-800/50">
         <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 text-center flex flex-col items-center"><div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-4"><ShieldCheck size={24} /></div><h3 className="text-2xl font-bold text-white">Non-Custodial Security</h3><p className="text-slate-400 leading-relaxed">Your private keys are encrypted on your device and never shared with our servers.</p></div>
            <div className="space-y-4 text-center flex flex-col items-center"><div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4"><Zap size={24} /></div><h3 className="text-2xl font-bold text-white">Lightning Fast</h3><p className="text-slate-400 leading-relaxed">Built on Fluid Chain, transactions confirm in milliseconds, not minutes.</p></div>
            <div className="space-y-4 text-center flex flex-col items-center"><div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-4"><Globe size={24} /></div><h3 className="text-2xl font-bold text-white">Truly Decentralized</h3><p className="text-slate-400 leading-relaxed">Access DApps directly and host content permanently on Parmaweb.</p></div>
         </div>
      </section>
    </div>
  );
};

// Fix: Removed local dummy icon definitions; they are now imported from lucide-react.


export default WalletPage;
