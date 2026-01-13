import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Activity, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../client";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Products', action: () => handleLinkClick('blockchain') },
    { label: 'Vault', action: () => handleLinkClick('wallet') },
    { label: 'Hosting', action: () => handleLinkClick('host') },
    { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
  ];

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 py-6 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Official Fluid Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleLinkClick('home')}>
             <div className="w-10 h-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center mr-3 shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:border-cyan-500/30 group-hover:shadow-cyan-500/20">
                <div className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-500">
                    {FLUID_LOGO_SVG}
                </div>
             </div>
             <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-white uppercase italic leading-none">Fluid</span>
                <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em] leading-none mt-1">Genesis</span>
             </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button 
                key={item.label} 
                onClick={item.action} 
                className="px-5 py-2 text-[11px] font-black text-white/50 hover:text-white transition-all uppercase tracking-[0.2em] rounded-xl hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/5 rounded-xl mr-2">
                <Activity size={12} className="text-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mainnet Live</span>
            </div>
            
            <div className="hidden md:block">
              <ConnectButton 
                client={client}
                wallets={wallets}
                theme="dark"
                connectButton={{
                  className: "!py-3 !px-8 !rounded-2xl !text-[11px] !font-black !bg-white !text-slate-950 hover:!bg-cyan-50 !transition-all !uppercase !tracking-[0.2em] !shadow-2xl active:!scale-95"
                }}
              />
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-slate-900 border border-white/10 rounded-2xl text-white">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 p-6 animate-fade-in-up shadow-2xl backdrop-blur-3xl bg-opacity-95">
           <div className="flex flex-col space-y-2">
              {navItems.map(item => (
                <button 
                  key={item.label} 
                  onClick={item.action} 
                  className="text-left text-sm font-black text-white/60 p-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all uppercase tracking-[0.2em]"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-6 mt-4 border-t border-white/10">
                 <ConnectButton 
                  client={client}
                  wallets={wallets}
                  theme="dark"
                  connectButton={{ 
                    className: "!w-full !py-5 !rounded-2xl !text-sm !font-black !bg-white !text-black !uppercase !tracking-widest",
                    label: "Connect Vault" 
                  }}
                 />
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Header;