import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Truck, ShieldCheck, Menu, X } from 'lucide-react';
import { CartItem } from '../types';
import { UndaLogo } from './UndaLogo';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenOrderLookup: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenQuiz,
  onOpenOrderLookup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity * item.selectedPack.count, 0);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] text-white border-b-2 border-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tag */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-3"
              id="header-logo-btn"
            >
              {/* Official UNDA Vector Logo */}
              <div className="w-11 h-11 bg-black border-2 border-white/80 p-1 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(198,154,95,1)] group-hover:border-[#c69a5f] transition-colors flex-shrink-0">
                <UndaLogo className="w-full h-full text-white group-hover:text-[#c69a5f] transition-colors" variant="light" />
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl tracking-wider text-white group-hover:text-[#c69a5f] transition-colors leading-none">
                  UNDA
                </div>
                <div className="text-[9px] font-mono tracking-[0.25em] text-[#c69a5f] uppercase mt-1 hidden sm:block">
                  Nature's Answer to Dirty Work
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            <button
              onClick={() => scrollToSection('shop')}
              className="text-xs font-extrabold uppercase tracking-widest text-neutral-300 hover:text-[#c69a5f] transition-colors cursor-pointer py-2"
            >
              Shop Bars
            </button>
            <button
              onClick={() => scrollToSection('grind')}
              className="text-xs font-extrabold uppercase tracking-widest text-neutral-300 hover:text-[#c69a5f] transition-colors cursor-pointer py-2"
            >
              The Grind
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-xs font-extrabold uppercase tracking-widest text-neutral-300 hover:text-[#c69a5f] transition-colors cursor-pointer py-2"
            >
              Reviews
            </button>
            <button
              onClick={onOpenQuiz}
              className="text-xs font-extrabold uppercase tracking-widest text-[#c69a5f] hover:text-white flex items-center gap-1.5 bg-[#c69a5f]/15 hover:bg-[#c69a5f]/30 px-3.5 py-2 border border-[#c69a5f]/50 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Find My Routine
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenOrderLookup}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2.5 py-1.5 border border-white/20 hover:border-white/40 cursor-pointer"
              title="Track Existing Order"
              id="track-order-btn"
            >
              <Truck className="w-3.5 h-3.5 text-[#c69a5f]" />
              <span>Track Order</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              id="cartToggle"
              aria-label="Open cart drawer"
              className="relative flex items-center justify-center h-12 px-4 bg-[#c69a5f] hover:bg-white text-black font-extrabold uppercase tracking-wider text-xs border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span className="hidden xs:inline">Cart</span>
              <span className="ml-1.5 bg-black text-[#c69a5f] text-xs font-black px-1.5 py-0.5 rounded-none border border-black min-w-[20px] text-center">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#c69a5f] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b-2 border-[#c69a5f] p-6 space-y-4">
          <button
            onClick={() => scrollToSection('shop')}
            className="block w-full text-left py-2 font-display uppercase text-lg text-white hover:text-[#c69a5f]"
          >
            Shop Bars & Kits
          </button>
          <button
            onClick={() => scrollToSection('grind')}
            className="block w-full text-left py-2 font-display uppercase text-lg text-white hover:text-[#c69a5f]"
          >
            The Grind Method
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="block w-full text-left py-2 font-display uppercase text-lg text-white hover:text-[#c69a5f]"
          >
            Tradesmen Reviews
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuiz();
            }}
            className="w-full bg-[#c69a5f] text-black font-black uppercase text-xs py-3 px-4 flex items-center justify-center gap-2 border-2 border-black"
          >
            <Sparkles className="w-4 h-4" />
            Find My Routine
          </button>
        </div>
      )}
    </header>
  );
};
