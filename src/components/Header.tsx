/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert, Cpu, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/images/zyphorexa_logo_1782990352956.jpg';

interface HeaderProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'My Project' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="zyphorexa-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/70 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <div
          id="brand-logo-container"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative h-11 md:h-13 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
            <img
              src={logoImg}
              alt="ZYPHOREXA Logo"
              className="h-full w-auto object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-2 font-sans font-medium text-sm tracking-wide transition-all duration-300 rounded-lg ${
                  isActive
                    ? 'text-white bg-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/3'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#0072FF] to-[#FF007A]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <button
            id="header-cta-btn"
            onClick={() => handleNavClick('contact')}
            className="relative overflow-hidden group px-6 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 bg-gradient-to-r from-[#0072FF] to-[#FF007A] p-[1px]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch <Cpu className="w-3.5 h-3.5 animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF007A] to-[#0072FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 glass-panel border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-3 px-5 text-left font-sans text-base font-semibold tracking-wide rounded-xl flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0072FF]/20 to-[#FF007A]/20 text-white border-l-2 border-[#0072FF]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#FF007A]' : 'bg-transparent'}`} />
                  </button>
                );
              })}

              <button
                id="mobile-cta-btn"
                onClick={() => handleNavClick('contact')}
                className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#0072FF] to-[#FF007A] text-white rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-primary-blue/20"
              >
                Inquire Now <Cpu className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
