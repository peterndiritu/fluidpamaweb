import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Settings, ChevronDown, RefreshCw, Zap, TrendingUp, Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight, Wallet, Clock, ArrowRightLeft } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

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
  
  // Process State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<'idle' | 'approving' | 'processing' | 'success'>('idle');
  
  // DApp Connectivity State
  const [activeDapp, setActiveDapp] = useState<string | null>(null);

  // Auto-calculate receive amount based on mode
  useEffect(() => {
    if (!payAmount) {
        setReceiveAmount('');
        return;
    }
    const val = parseFloat(payAmount);
    if (isNaN(val)) return;

    if (activeTab === 'swap') {
        // Market Price: 1840
        setReceiveAmount((val * 1840).toFixed(2));
    } else if (activeTab === 'limit') {
        // Limit Price
        const price = parseFloat(limitPrice) || 0;
        setReceiveAmount((val * price).toFixed(2));
    } else if (activeTab === 'bridge') {
        // 1:1 Peg minus fees
        setReceiveAmount((val * 0.999).toFixed(4));
    }
  }, [payAmount, activeTab, limitPrice]);

  const handleAction = () => {
    setIsProcessing(true);
    setProcessStatus('approving');
    
    // Simulate steps
    setTimeout(() => setProcessStatus('processing'), 1500);
    setTimeout(() => setProcessStatus('success'), 3500);
    setTimeout(() => {
        setIsProcessing(false);
        setProcessStatus('idle');
        setPayAmount(''); 
    }, 5500);
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

  return (
    <div className="min-h-screen pt-28 pb-16">
      
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
                          <span>Balance: 4.20 ETH</span>
                       </div>
                       
                       {/* Bridge Network Selector or Standard Token Selector */}
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
                          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700">
                             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                 <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-4 h-4" alt="ETH" />
                             </div>
                             <span className="font-bold text-white text-lg">ETH</span>
                             <ChevronDown size={16} className="text-slate-400" />
                          </button>
                       </div>
                    </div>

                    {/* --- Middle Section: Limit Price or Arrow --- */}
                    {activeTab === 'limit' && (
                        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-2 mt-2 relative animate-fade-in-up">
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                <span>Sell ETH at rate</span>
                                <span className="text-cyan-500 cursor-pointer">Set to Market</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <input 
                                    type="number" 
                                    value={limitPrice}
                                    onChange={(e) => setLimitPrice(e.target.value)}
                                    className="bg-transparent text-xl font-bold text-white outline-none w-full placeholder-slate-700"
                                />
                                <span className="text-xs font-bold text-slate-500">USDC</span>
                            </div>
                        </div>
                    )}

                    {/* Spacer / Direction Arrow */}
                    <div className="flex justify-center -my-3 relative z-10">
                       <div className="bg-slate-900 border-4 border-slate-900 p-2 rounded-xl text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800 transition-all shadow-lg">
                          {activeTab === 'bridge' ? <ArrowRight size={20} className="rotate-90" /> : <ArrowDownUp size={20} />}
                       </div>
                    </div>

                    {/* --- Input Section: Receive --- */}
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-4 pt-6">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>{activeTab === 'bridge' ? 'To Network' : 'You receive'}</span>
                          <span>Balance: 0.00</span>
                       </div>

                       {/* Bridge Network Selector */}
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
                          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700">
                             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                {activeTab === 'bridge' ? (
                                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-4 h-4" alt="ETH" />
                                ) : (
                                    <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-4 h-4" alt="USDC" />
                                )}
                             </div>
                             <span className="font-bold text-white text-lg">{activeTab === 'bridge' ? 'ETH' : 'USDC'}</span>
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
                                    <span className="text-slate-300">1 ETH = 1,840 USDC</span>
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

                    {/* Action Button */}
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
                
                {/* Chart Mockup */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-[300px] flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-6 h-6" alt="ETH"/>
                                <h3 className="text-xl font-bold text-white">Ethereum</h3>