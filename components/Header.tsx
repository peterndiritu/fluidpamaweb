import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../client";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: string, id?: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    if (page === 'home' && !id) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id) {
       setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navStructure = [
    {
      label: 'Products',
      children: [
        { label: 'Fluid Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid DEX', action: () => handleLinkClick('wallet') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
      ]
    },
    { label: 'Hosting', action: () => handleLinkClick('host') },
    {
      label: 'Resources',
      children: [
        { label: 'About Fluid', action: () => handleLinkClick('about') },
        { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
        { label: 'FAQs', action: () => handleLinkClick('faq') },
      ]
    },
    { label: 'Docs', action: () => handleLinkClick('docs') },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 py-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isMenuOpen ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between h-16 rounded-xl px-6 transition-all duration-300 ${
            isScrolled || isMenuOpen
              ? 'backdrop-blur-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-lg' 
              : 'bg-transparent border-transparent'
          }`}
        >
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-slate-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
                <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
                <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
            </svg>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Fluid</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navStructure.map(item => (
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center space-x-1 px-4 py-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase">
                    <span>{item.label}</span>
                    <ChevronDown size={10} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-lg shadow-2xl p-2 min-w-[200px]">
                      {item.children.map(child => (
                        <a key={child.label} onClick={child.action} className="block px-4 py-2 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white rounded cursor-pointer font-bold transition-colors">
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={item.label} onClick={item.action} className="px-4 py-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer uppercase">
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <ConnectButton 
                client={client}
                wallets={wallets}
                theme={theme === 'dark' ? "dark" : "light"}
                connectButton={{
                  className: "!py-2 !px-4 !rounded-lg !text-[10px] !font-bold !bg-slate-900 dark:!bg-white/5 !border !border-slate-800 dark:!border-white/10 !text-white hover:!bg-slate-800 dark:hover:!bg-white/10 !transition-all"
                }}
              />
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;