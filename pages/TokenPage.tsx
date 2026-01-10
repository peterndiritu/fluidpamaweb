import React, { useState, useRef } from 'react';
import Tokenomics from '../components/Tokenomics';
import PresaleCard from '../components/PresaleCard';
import WhitepaperDocs from '../components/WhitepaperDocs';
import { Coins, Shield, Zap, Globe, ArrowRight, BarChart3, Lock, Users, Repeat, ChevronDown, ChevronUp, FileText, Download, Loader2 } from 'lucide-react';

interface TokenPageProps {
  onNavigate: (page: string) => void;
  onOpenWhitepaper: () => void;
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const TokenPage: React.FC<TokenPageProps> = ({ onNavigate, onOpenWhitepaper }) => {
  const [isWpVisible, setIsWpVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const whitepaperRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  const toggleWhitepaper = () => {
    setIsWpVisible(!isWpVisible);
    if (!isWpVisible) {
      // Small delay to allow state update before scrolling
      setTimeout(() => {
        whitepaperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleDownloadPDF = async () => {
    if (!downloadRef.current || isDownloading) return;
    
    setIsDownloading(true);
    const element = downloadRef.current;
    const worker = (window as any).html2pdf();
    
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     'Fluid-Protocol-Whitepaper.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await worker.set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation failed:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const utilities = [
    {
      title: "Network Fees",
      desc: "FLUID is the native gas for all transactions, smart contracts, and sharding operations on the Fluid L1.",
      icon: Zap,
      color: "text-yellow-500"
    },
    {
      title: "Staking Rewards",
      desc: "Secure the network by staking FLUID and earn protocol-emitted rewards and a share of transaction fees.",
      icon: Shield,
      color: "text-emerald-500"
    },
    {
      title: "Governance",
      desc: "Token holders can propose and vote on protocol upgrades, endowment strategies, and grant allocations.",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Permanent Hosting",
      desc: "A one-time payment in FLUID funds the endowment that hosts your data eternally on Parmaweb.",
      icon: Globe,
      color: "text-blue-500 dark:text-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 selection:bg-cyan-500/30">
      {/* Hero & Presale Combined Section */}
      <section className="max-w-7xl mx-auto px-4 mb-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 dark:bg-cyan-500/5 rounded-full blur-[140px] -z-10"></div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 mb-8 backdrop-blur-xl shadow-md">
              <div className="w-4 h-4 text-blue-600 dark:text-cyan-400">{FLUID_LOGO_SVG}</div>
              <span className="text-slate-900 dark:text-white text-[10px] font-black tracking-widest uppercase italic leading-none">Genesis Asset Protocol</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase leading-[1.1] italic">
              The Fuel of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-600">Digital Permanence</span>.
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-12 font-medium leading-relaxed tracking-tight">
              FLUID is the native utility token of the Fluid Layer-1. It powers hyper-scalable transactions, decentralised hosting, and institutional-grade sovereign finance.
            </p>

            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Total Supply</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">100,000,000</span>
              </div>
              <div className="w-px h-16 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Initial Price</span>
                <span className="text-3xl font-black text-blue-600 dark:text-cyan-400 tracking-tighter">$0.05 USD</span>
              </div>
              <div className="w-px h-16 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Token Type</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Genesis</span>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden group shadow-lg">
               <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-500/10 dark:bg-cyan-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-sm"><Repeat size={28}/></div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white uppercase mb-1 italic">Native Mainnet Migration</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold leading-relaxed uppercase tracking-widest">Genesis tokens will be swappable 1:1 for native Fluid coins upon mainnet launch.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
             <div className="absolute -inset-10 bg-blue-500/5 dark:bg-cyan-500/10 blur-[100px] rounded-full animate-pulse -z-10"></div>
             <PresaleCard />
          </div>
        </div>
      </section>

      {/* Utility Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-40">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter italic leading-none">Universal Utility</h2>
          <p className="text-slate-400 dark:text-slate-500 font-black text-[10px] tracking-[0.4em] uppercase">The functional core of the sharded economy</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {utilities.map((util, i) => (
            <div key={i} className="scroll-card p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 hover:border-blue-500 dark:hover:border-cyan-500/30 transition-all group shadow-xl">
              <div className={`w-16 h-16 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform ${util.color}`}>
                <util.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight leading-none italic">{util.title}</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-medium leading-relaxed tracking-tight">{util.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tokenomics Integrated Component */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent"></div>
        </div>
        <Tokenomics />
      </div>

      {/* Vesting & Emission Callout */}
      <section className="max-w-5xl mx-auto px-4 mt-20 mb-32">
         <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-[4rem] p-12 md:p-24 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/5 dark:bg-indigo-600/10 rounded-full blur-[100px]"></div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-8 leading-tight">Restrictive <br/> <span className="text-blue-600 dark:text-cyan-400">Institutional</span> Emission.</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-12 text-lg">
                    Fluid implements a highly restrictive emission model. 90% of the native supply is programmatically minted to nodes over a 200-year cycle with 20-year halving intervals.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={toggleWhitepaper} 
                      className={`flex items-center justify-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg ${isWpVisible ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950' : 'bg-blue-600 dark:bg-cyan-50 text-white dark:text-slate-950 hover:opacity-90'}`}
                    >
                      {isWpVisible ? <ChevronUp size={18} /> : <FileText size={18} />}
                      {isWpVisible ? 'Hide Whitepaper' : 'Technical Whitepaper'} 
                    </button>
                    <button onClick={onOpenWhitepaper} className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">
                      Open in New Page <ArrowRight size={14} />
                    </button>
                  </div>
               </div>
               
               <div className="space-y-5">
                  {[
                    { label: 'Core Team Vesting', val: '10 Years', icon: Lock },
                    { label: 'Treasury Lock', val: '10 Years', icon: BarChart3 },
                    { label: 'Ecosystem Incentives', val: 'Decade Cycle', icon: Coins }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-white/5 rounded-[2rem] flex justify-between items-center group-hover:border-blue-500 dark:group-hover:border-cyan-500/20 transition-all shadow-md">
                       <div className="flex items-center gap-5">
                          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-slate-400 dark:text-slate-600 shadow-sm"><stat.icon size={22}/></div>
                          <span className="text-sm font-black text-slate-500 dark:text-slate-300 uppercase tracking-tight">{stat.label}</span>
                       </div>
                       <span className="text-base font-black text-slate-900 dark:text-white">{stat.val}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Embedded Technical Whitepaper Section */}
      {isWpVisible && (
        <section ref={whitepaperRef} className="max-w-7xl mx-auto px-4 pb-40 animate-fade-in-up no-print">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[4rem] p-8 md:p-16 lg:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-blue-500/20">
              <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
              <div className="relative z-10">
                 <div className="flex justify-between items-center mb-16 pb-8 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-600 dark:bg-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          <FileText size={24} />
                       </div>
                       <div>
                          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Technical Specification</h2>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Version 2.4.0-FINAL</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                          onClick={handleDownloadPDF} 
                          disabled={isDownloading}
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all disabled:opacity-50"
                        >
                          {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                          {isDownloading ? 'Processing...' : 'Download PDF'}
                        </button>
                        <button onClick={() => setIsWpVisible(false)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors">
                          <X size={20} />
                        </button>
                    </div>
                 </div>
                 
                 <div ref={downloadRef} className="print:p-8">
                    {/* Only shown during PDF export */}
                    <div className="hidden print:block mb-10 text-center">
                        <h1 className="text-3xl font-black uppercase text-slate-900">Fluid Protocol Specification</h1>
                        <p className="text-[10px] font-bold uppercase text-slate-500 mt-2">V2.4.0-FINAL GENESIS DOCUMENT</p>
                    </div>
                    <WhitepaperDocs />
                 </div>
                 
                 <div className="mt-20 pt-12 border-t border-slate-100 dark:border-white/5 text-center">
                    <button 
                      onClick={() => {
                        setIsWpVisible(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} 
                      className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl text-xs uppercase tracking-[0.2em] shadow-2xl hover:opacity-90 transition-all"
                    >
                      Close & Return to Presale
                    </button>
                 </div>
              </div>
           </div>
        </section>
      )}
    </div>
  );
};

// Simple X icon for close button
const X = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default TokenPage;