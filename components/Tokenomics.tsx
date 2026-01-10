import React from 'react';
import { Lock, Clock, Coins, Users, Landmark, Wallet, Rocket, Zap, Activity } from 'lucide-react';

const genesisData = [
  { 
    name: 'Presale', 
    value: 30, 
    color: '#10b981', 
    amount: '3,000,000', 
    icon: Rocket,
    desc: 'Public sale allocation',
    vesting: null
  },
  { 
    name: 'Incentives', 
    value: 40, 
    color: '#06b6d4', 
    amount: '4,000,000', 
    icon: Users,
    desc: 'Rewards & Airdrops',
    vesting: '10 Year Vesting'
  },
  { 
    name: 'Liquidity', 
    value: 10, 
    color: '#3b82f6', 
    amount: '1,000,000', 
    icon: Wallet,
    desc: 'CEX/DEX Liquidity',
    vesting: null 
  },
  { 
    name: 'Team', 
    value: 10, 
    color: '#a855f7', 
    amount: '1,000,000', 
    icon: Lock,
    desc: 'Core Developers',
    vesting: '10 Year Vesting' 
  },
  { 
    name: 'Treasury', 
    value: 10, 
    color: '#f97316', 
    amount: '1,000,000', 
    icon: Landmark,
    desc: 'Ecosystem Growth',
    vesting: '10 Year Vesting' 
  },
];

const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-8 bg-transparent relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tighter italic">Tokenomics</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium tracking-tight">
            A sustainable dual-phase supply model designed for centuries of digital permanence.
          </p>
        </div>

        {/* High Level Supply Split */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Activity size={100} /></div>
                <div className="relative z-10">
                    <span className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-widest block mb-2">Phase 1</span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase italic">Genesis Supply (10%)</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">10,000,000 tokens minted for presale and ecosystem bootstrapping. These facilitate initial liquidity and public ownership.</p>
                    <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">10,000,000 <span className="text-sm font-bold text-slate-400">FLD</span></div>
                </div>
            </div>

            <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform text-cyan-500"><Zap size={100} /></div>
                <div className="relative z-10">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-2">Phase 2</span>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase italic">Protocol Emission (90%)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">90,000,000 tokens emitted programmatically to nodes over a 200-year cycle to ensure eternal network security.</p>
                    <div className="text-4xl font-black text-cyan-400 tracking-tighter">90,000,000 <span className="text-sm font-bold text-slate-500">FLD</span></div>
                </div>
            </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h4 className="text-center text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-10">Detailed Genesis Allocation (Phase 1)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {genesisData.map((item, index) => (
                  <div 
                    key={item.name} 
                    className={`scroll-card bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 hover:border-opacity-50 transition-all hover:-translate-y-1 duration-300 group shadow-sm dark:shadow-none ${index < 2 ? 'sm:col-span-1' : ''}`}
                    style={{ borderColor: `${item.color}40` }}
                  >
                      <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                              <div className="p-3 rounded-2xl bg-opacity-20 text-white shadow-inner" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                                  <item.icon size={22} />
                              </div>
                              <div>
                                  <h4 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-tight italic">{item.name}</h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                              </div>
                          </div>
                          <span className="text-2xl font-black tracking-tighter" style={{ color: item.color }}>{item.value}%</span>
                      </div>
                      
                      <div className="space-y-3">
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                          </div>
                          <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-slate-700 dark:text-slate-200 tracking-tight">{item.amount} FLD</span>
                              {item.vesting && (
                                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100 dark:border-white/5">
                                      <Clock size={12} /> {item.vesting}
                                  </span>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          
          <div className="mt-16 p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.03]"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Final Sustainability Note</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed italic max-w-2xl mx-auto">
              "By emitting 90% of the supply over 200 years, Fluid achieves the highest degree of long-term decentralization. This 'Infinite Emission' curve mirrors hardware cost deflation, ensuring node operators are incentivized eternally."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;