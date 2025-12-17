import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, Wallet, Clock, ArrowRightLeft } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

// --- Types & Data ---
interface Token {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  balance: number;
}

const FluidLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
        <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
    </svg>
);

const TOKENS: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', icon: <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-full h-full" alt="ETH" />, price: 1840, balance: 4.20 },
    { symbol: 'USDC', name: 'USD Coin', icon: <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-full h-full" alt="USDC" />, price: 1, balance: 25000.00 },
    { symbol: 'FLUID', name: 'Fluid', icon: <FluidLogo className="w-full h-full text-cyan-400" />, price: 0.05, balance: 150000.00 },
];

// Mock Data for Chart
const data = [
  { name: '10:00', price: 1840 },
  { name: '11:00', price: 1855 },
  { name: '12:00', price: 1848 },
  { name: '13:00', price: 1870 },
  { name: '14:00', price: 1865 },
  { name: '15:00', price: 1885 },
  { name: '16:00', price: 1890 },
];

const DexPage: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'swap' | 'limit' | 'bridge'>('swap');
  
  // Swap/Limit/Bridge Input State
  const [payAmount, setPayAmount] = useState<string>('1.5');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [limitPrice, setLimitPrice] = useState<string>('1900'); // Default target price for limit
  
  // Token selection state
  const [payToken, setPayToken] = useState<Token>(TOKENS[0]);
  const [receiveToken, setReceiveToken] = useState<Token>(TOKENS[1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState<'pay' | 'receive' | null>(null);

  // Process State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<'idle' | 'approving' | 'processing' | 'success'>('idle');
  
  // DApp Connectivity State
  const [activeDapp, setActiveDapp] = useState<string | null>(null);

  // Auto-calculate receive amount based on mode
  useEffect(() => {
    if (!payAmount || !payToken || !receiveToken) {
        setReceiveAmount('');
        return;
    }
    const val = parseFloat(payAmount);
    if (isNaN(val)) return;

    if (activeTab === 'swap') {
        const rate = payToken.price / receiveToken.price;
        setReceiveAmount((val * rate).toFixed(4));
    } else if (activeTab === 'limit') {
        const price = parseFloat(limitPrice) || 0;
        setReceiveAmount((val * price).toFixed(2));
    } else if (activeTab === 'bridge') {
        setReceiveAmount((val * 0.999).toFixed(4));
    }
  }, [payAmount, payToken, receiveToken, activeTab, limitPrice]);

  const handleAction = () => {
    setIsProcessing(true);
    setProcessStatus('approving');
    
    setTimeout(() => setProcessStatus('processing'), 1500);
    setTimeout(() => setProcessStatus('success'), 3500);
    setTimeout(() => {
        setIsProcessing(false);
        setProcessStatus('idle');
        setPayAmount(''); 
    }, 5500);
  };

  const handleSelectToken = (token: Token) => {
    if (modalFor === 'pay') {
        if (token.symbol === receiveToken.symbol) {
            setReceiveToken(payToken); // Swap them
        }
        setPayToken(token);
    } else {
        if (token.symbol === payToken.symbol) {
            setPayToken(receiveToken); // Swap them
        }
        setReceiveToken(token);
    }
    setIsModalOpen(false);
  };

  const handleSwapTokens = () => {
    const tempPay = payToken;
    setPayToken(receiveToken);
    setReceiveToken(tempPay);
  };

  const getButtonLabel = () => {
      if (processStatus === 'idle') {
          if (activeTab === 'swap') return 'Swap';
          if (activeTab === 'limit') return 'Place Limit Order';
          if (activeTab === 'bridge') return 'Bridge Assets';
      }
      if (processStatus === 'approving') return 'Approving...';
      if (processStatus === 'processing') {
          if (activeTab === 'swap') return 'Swapping...';
          if (activeTab === 'limit') return 'Creating Order...';
          if (activeTab === 'bridge') return 'Bridging...';
      }
      return 'Success!';
  };

  const dapps = [
      { name: 'Uniswap', category: 'DeFi', icon: '🦄', url: 'https://app.uniswap.org' },
      { name: 'OpenSea', category: 'NFT', icon: '🌊', url: 'https://opensea.io' },
      { name: 'Aave', category: 'Lending', icon: '👻', url: 'https://app.aave.com' },
      { name: 'Compound', category: 'Finance', icon: '🟢', url: 'https://compound.finance' }
  ];

  const TokenSelectModal = () => {
    if (!isModalOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up" onClick={() => setIsModalOpen(false)}>
            <div className="bg-slate-900 p-4 rounded-2xl w-full max-w-sm border border-slate-800" onClick={e => e.stopPropagation()}>
                <h3 className="text-white font-bold mb-4 px-2">Select a token</h3>
                <div className="space-y-1">
                    {TOKENS.map(token => (
                        <button
                            key={token.symbol}
                            onClick={() => handleSelectToken(token)}
                            className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
                        >
                            <div className="w-8 h-8 flex items-center justify-center">{token.icon}</div>
                            <div>
                                <div className="text-white font-bold">{token.symbol}</div>
                                <div className="text-slate-400 text-sm">{token.name}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <TokenSelectModal />
      
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Decentralized Exchange</span>
        <h1 className="text-5xl font-extrabold text-white mt-2 mb-4">Fluid DEX</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Trade instantly with zero slippage. Connect to any DApp via WalletConnect.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
            
            {/* Left Column: Interactive Interface */}
            <div className="relative z-10">
                 <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300">
                    {/* Background Glow based on Mode */}
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 transition-colors duration-500 ${
                        activeTab === 'swap' ? 'bg-cyan-500/5' : activeTab === 'limit' ? 'bg-purple-500/5' : 'bg-emerald-500/5'
                    }`}></div>

                    {/* Tabs */}
                    <div className="flex justify-between items-center mb-6">
                       <div className="flex gap-1 p-1 bg-slate-950 rounded-xl w-full sm:w-auto">
                          {['Swap', 'Limit', 'Bridge'].map((tab) => (
                              <button 
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                    activeTab === tab.toLowerCase() 
                                    ? 'bg-slate-800 text-white shadow-sm' 
                                    : 'text-slate-500 hover:text-white'
                                }`}
                              >
                                {tab}
                              </button>
                          ))}
                       </div>
                       <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors"><Settings size={20} /></button>
                    </div>

                    {/* --- Input Section: Pay --- */}
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-2 relative group focus-within:border-slate-600 transition-colors">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>{activeTab === 'bridge' ? 'From Network' : 'You pay'}</span>
                          <span>Balance: {payToken.balance.toLocaleString()} {payToken.symbol}</span>
                       </div>
                       
                       {activeTab === 'bridge' && (
                           <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">🌐</div>
                                <span className="text-white font-bold">Ethereum Mainnet</span>
                                <ChevronDown size={14} className="text-slate-500 ml-auto" />
                           </div>
                       )}

                       <div className="flex justify-between items-center">
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            className="bg-transparent text-3xl font-bold text-white outline-none w-1/2 placeholder-slate-700"
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            disabled={isProcessing}
                          />
                          <button onClick={() => { setModalFor('pay'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700">
                             <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                {payToken.icon}
                             </div>
                             <span className="font-bold text-white text-lg">{payToken.symbol}</span>
                             <ChevronDown size={16} className="text-slate-400" />
                          </button>
                       </div>
                    </div>

                    {/* --- Middle Section: Limit Price or Arrow --- */}
                    {activeTab === 'limit' && (
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-2 mt-2 relative animate-fade-in-up">
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                <span>Sell {payToken.symbol} at rate</span>
                                <span className="text-cyan-500 cursor-pointer">Set to Market</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <input 
                                    type="number" 
                                    value={limitPrice}
                                    onChange={(e) => setLimitPrice(e.target.value)}
                                    className="bg-transparent text-xl font-bold text-white outline-none w-full placeholder-slate-700"
                                />
                                <span className="text-xs font-bold text-slate-500">{receiveToken.symbol}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center -my-3 relative z-10">
                       <button onClick={handleSwapTokens} className="bg-slate-900 border-4 border-slate-900 p-2 rounded-xl text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800 transition-all shadow-lg disabled:cursor-not-allowed" disabled={activeTab === 'bridge'}>
                          {activeTab === 'bridge' ? <ArrowRight size={20} className="rotate-90" /> : <ArrowDownUp size={20} />}
                       </button>
                    </div>

                    {/* --- Input Section: Receive --- */}
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-4 pt-6">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>{activeTab === 'bridge' ? 'To Network' : 'You receive'}</span>
                          <span>Balance: {receiveToken.balance.toLocaleString()} {receiveToken.symbol}</span>
                       </div>

                       {activeTab === 'bridge' && (
                           <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
                                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center text-xs">⚡</div>
                                <span className="text-white font-bold">Fluid Chain</span>
                                <ChevronDown size={14} className="text-slate-500 ml-auto" />
                           </div>
                       )}

                       <div className="flex justify-between items-center">
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            className={`bg-transparent text-3xl font-bold outline-none w-1/2 placeholder-slate-700 ${activeTab === 'limit' ? 'text-purple-400' : 'text-emerald-400'}`}
                            value={receiveAmount}
                            readOnly
                          />
                          <button onClick={() => { setModalFor('receive'); setIsModalOpen(true); }} disabled={activeTab === 'bridge'} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700 disabled:cursor-not-allowed">
                             <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                {activeTab === 'bridge' ? payToken.icon : receiveToken.icon}
                             </div>
                             <span className="font-bold text-white text-lg">{activeTab === 'bridge' ? payToken.symbol : receiveToken.symbol}</span>
                             <ChevronDown size={16} className="text-slate-400" />
                          </button>
                       </div>
                    </div>

                    {/* Info Footer */}
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 mb-6 space-y-2">
                        {activeTab === 'bridge' ? (
                             <>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Bridge Time</span>
                                    <span className="text-slate-300">~2 mins</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Cross-chain Fee</span>
                                    <span className="text-slate-300">0.1%</span>
                                </div>
                             </>
                        ) : (
                            <>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500 flex items-center gap-1">Rate <RefreshCw size={10}/></span>
                                    <span className="text-slate-300">1 {payToken.symbol} = {(payToken.price / receiveToken.price).toLocaleString(undefined, {maximumFractionDigits: 4})} {receiveToken.symbol}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500 flex items-center gap-1">Network Cost <Zap size={10}/></span>
                                    <span className="text-slate-300">~$2.45</span>
                                </div>
                                {activeTab === 'limit' && (
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Expiry</span>
                                        <span className="text-slate-300">Never</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <button 
                        onClick={handleAction}
                        disabled={isProcessing || !payAmount}
                        className={`w-full font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                            isProcessing 
                            ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                            : activeTab === 'limit'
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-purple-500/20'
                              : activeTab === 'bridge'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/20'
                                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
                        }`}
                    >
                       {processStatus !== 'idle' && processStatus !== 'success' && <Loader2 className="animate-spin" />}
                       {processStatus === 'success' && <CheckCircle className="text-white" />}
                       {getButtonLabel()}
                    </button>
                 </div>
            </div>

            {/* Right Column: Chart & DApps */}
            <div className="space-y-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-[300px] flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6">{payToken.icon}</div>
                                <h3 className="text-xl font-bold text-white">{payToken.name}</h3>
                            </div>
                            <div className="text-xs text-slate-500">{payToken.symbol}/{receiveToken.symbol}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-xl font-bold text-white">${payToken.price.toLocaleString()}</div>
                           <div className="text-xs text-emerald-500 font-bold">+2.1%</div>
                        </div>
                    </div>
                    <div className="flex-1 -mx-6 -mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                </linearGradient>
                               </defs>
                              <Tooltip 
                                 contentStyle={{ 
                                     background: 'rgba(2, 6, 23, 0.8)', 
                                     border: '1px solid #334155', 
                                     borderRadius: '0.5rem',
                                     color: '#fff'
                                 }}
                                 itemStyle={{ color: '#fff' }}
                                 labelStyle={{ color: '#94a3b8' }}
                              />
                              <Area type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                           </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <Globe size={20} className="text-purple-400" /> DApp Browser
                        </h3>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full">
                           Connected
                        </span>
                    </div>

                    <div className="space-y-3">
                        {dapps.map((dapp, i) => (
                           <div 
                                key={i}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                                    activeDapp === dapp.name ? 'bg-slate-800' : 'bg-slate-950/50 hover:bg-slate-800/50'
                                }`}
                                onClick={() => setActiveDapp(dapp.name)}
                            >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg">{dapp.icon}</div>
                                 <div>
                                    <div className="font-bold text-white">{dapp.name}</div>
                                    <div className="text-xs text-slate-500">{dapp.category}</div>
                                 </div>
                              </div>
                              {activeDapp === dapp.name ? (
                                <button className="text-sm font-bold text-red-500 hover:text-red-400">Disconnect</button>
                              ) : (
                                <button className="text-sm font-bold text-cyan-500 hover:text-cyan-400">Connect</button>
                              )}
                           </div>
                        ))}
                    </div>

                    {activeDapp && (
                        <div className="mt-6 p-4 bg-black/30 rounded-xl border border-slate-800 animate-fade-in-up">
                           <h4 className="text-sm font-bold text-white mb-2">Connection Details</h4>
                           <div className="text-xs text-slate-400 space-y-1">
                              <p><strong>App:</strong> {activeDapp}</p>
                              <p><strong>Permissions:</strong> View Address, Request Transactions</p>
                              <a href={dapps.find(d => d.name === activeDapp)?.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                                 Visit Site <ExternalLink size={12}/>
                              </a>
                           </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Recent Activity</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center"><ArrowRightLeft size={18} /></div>
                        <div>
                           <div className="font-bold text-white">Limit Sell ETH</div>
                           <div className="text-xs text-slate-500 flex items-center gap-1">Order Placed <Clock size={10}/></div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="font-bold text-white">-0.5 ETH</div>
                        <div className="text-xs text-slate-500">+$950.00 USDC</div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center"><Wallet size={18} /></div>
                        <div>
                           <div className="font-bold text-white">Received USDC</div>
                           <div className="text-xs text-slate-500 flex items-center gap-1">From 0x123...abc <CheckCircle size={10}/></div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="font-bold text-emerald-400">+2,000 USDC</div>
                        <div className="text-xs text-slate-500">~$2,000.00</div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DexPage;
