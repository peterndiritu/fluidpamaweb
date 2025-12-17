import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Download } from 'lucide-react';
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

  // Scroll State for Smart Navbar
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we are at the top (for transparency)
      setIsScrolled(currentScrollY > 20);

      // Determine scroll direction (for visibility)
      // Hide if scrolling down AND we are not at the very top (avoid flickering at top)
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

  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  // --- Navigation Data Structure ---
  const navStructure = [
    {
      label: 'Products',
      children: [
        { label: 'Fluid Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid DEX', action: () => handleLinkClick('dex') },
        { label: 'Fluid Crypto Cards', action: () => handleLinkClick('cards') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
      ]
    },
    { 
      label: 'Hosting', 
      action: () => handleLinkClick('host') 
    },
    {
      label: 'Resources',
      children: [
        { label: 'About Fluid Chain', action: () => handleLinkClick('about') },
        { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
        { label: 'FAQs', action: () => handleLinkClick('faq') },
        { label: 'Terms of Service', action: () => handleLinkClick('terms') },
        { label: 'Privacy Policy', action: () => handleLinkClick('privacy') },
      ]
    },
    { label: 'Support', action: () => handleLinkClick('support') },
    { label: 'Listing', action: () => {} },
    { label: 'Community', action: () => handleLinkClick('home', 'presale') },
    { label: 'Docs', action: () => handleLinkClick('docs') },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 py-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isMenuOpen ? 'bg-slate-950/80 dark:bg-slate-950/95 backdrop-blur-xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between h-16 rounded-2xl px-6 transition-all duration-300 ${
            isScrolled || isMenuOpen
              ? 'backdrop-blur-xl bg-slate-950/50 border border-white/10 shadow-lg' 
              : 'bg-transparent border-transparent'
          }`}
        >
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleLinkClick('home')}>
            {/* New Fluid Logo - Slanted Bars */}
            <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-slate-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
                <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
                <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
            </svg>
            <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">fluid</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navStructure.map(item => (
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center space-x-1 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white rounded-lg transition-colors">
                    <span>{item.label}</span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-2 min-w-[200px]">
                      {item.children.map(child => (
                        <a key={child.label} onClick={child.action} className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer">
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={item.label} onClick={item.action} className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer">
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* Right Section: Wallet + Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <ConnectButton 
                client={client}
                wallets={wallets}
                theme={"dark"}
                connectButton={{
                  className: "!py-2 !px-4 !rounded-xl !text-sm !font-bold !bg-white/10 !border-none !text-white hover:!bg-white/20 !transition-all"
                }}
              />
            </div>
            
            <button onClick={toggleTheme} className="p-2.5 rounded-full text-slate-400 bg-white/5 hover:bg-white/10 transition-colors">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 rounded-full text-slate-400 bg-white/5 hover:bg-white/10 transition-colors">
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`transition-all duration-300 md:hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="pt-4 pb-3 space-y-1 px-4">
          {navStructure.map(item => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button onClick={() => toggleMobileSubmenu(item.label)} className="w-full flex justify-between items-center px-3 py-3 text-base font-bold text-slate-300 rounded-lg hover:bg-white/10">
                    <span>{item.label}</span>
                    <ChevronDown size={16} className={`transition-transform ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`pl-4 transition-all duration-300 ${mobileSubmenu === item.label ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                    {item.children.map(child => (
                      <a key={child.label} onClick={child.action} className="block px-3 py-2 text-base font-medium text-slate-400 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer">
                        {child.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a onClick={item.action} className="block px-3 py-3 text-base font-bold text-slate-300 rounded-lg hover:bg-white/10 cursor-pointer">
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <div className="pt-4 px-3">
             <ConnectButton 
                client={client}
                wallets={wallets}
                theme={"dark"}
                connectButton={{
                    className: "!w-full !py-3 !rounded-xl !text-base !font-bold !bg-white !text-black !border-none hover:!bg-gray-200 transition-all shadow-lg"
                }}
             />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
