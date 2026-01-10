import React from 'react';
import Tokenomics from '../components/Tokenomics';

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const TokenPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
       <div className="text-center mb-16 px-4 flex flex-col items-center">
         <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-emerald-400">{FLUID_LOGO_SVG}</div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">Token Economy under Development</span>
         </div>
         <h1 className="text-5xl font-extrabold text-white mt-2 mb-4">Fluid Token</h1>
         <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The fuel for the entire ecosystem. Governance, Staking, and Utility.
         </p>
      </div>
      <Tokenomics />
    </div>
  );
};

export default TokenPage;