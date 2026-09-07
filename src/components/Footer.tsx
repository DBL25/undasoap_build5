import React, { useState } from 'react';
import { Mail, Check, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenOrderLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onOpenOrderLookup }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter Drop & Value Proposition */}
        <div className="bg-[#c69a5f] text-black p-8 sm:p-12 border-3 border-black mb-16 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-mono font-black uppercase tracking-[0.25em] text-black/80">
              Direct From The Workshop
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display text-black uppercase leading-tight">
              Get The Drop
            </h3>
            <p className="text-xs sm:text-sm text-black font-bold max-w-md mx-auto leading-relaxed">
              New small batch cures, fresh shop restocks, and subscriber-only crew discounts. Zero fluff, just soap.
            </p>

            {subscribed ? (
              <div className="p-4 bg-black text-white border-2 border-black space-y-1">
                <div className="flex items-center justify-center gap-2 text-sm font-black text-[#c69a5f]">
                  <Check className="w-5 h-5" />
                  <span>You’re on the Workshop Roster!</span>
                </div>
                <p className="text-xs font-mono text-neutral-300">
                  Use code <strong className="text-[#c69a5f] underline">UNDAFIRST</strong> at checkout for 10% off your first batch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your trade email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border-3 border-black px-4 py-3 text-xs sm:text-sm font-bold text-black focus:outline-none placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-white hover:text-black text-[#c69a5f] font-black uppercase text-xs px-6 py-3 border-3 border-black tracking-widest transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Join Crew
                </button>
              </form>
            )}

            <div className="pt-2 text-[10px] font-mono font-bold uppercase text-black/70">
              [ PROMO CODE READY: USE <span className="underline">DIRTYWORK10</span> FOR 10% OFF ]
            </div>
          </div>
        </div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/15">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black border-2 border-white/80 p-1.5 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                <UndaLogo className="w-full h-full text-white" variant="light" />
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl tracking-wider text-white">UNDA</div>
                <div className="text-[9px] font-mono tracking-[0.25em] text-[#c69a5f] uppercase">DIRTY WORK CARE</div>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-medium leading-relaxed">
              Nature’s answer to dirty work. Handmade small-batch goat’s milk and activated charcoal soap, crafted in the USA for hard-working tradesmen.
            </p>
            <div className="text-[11px] font-mono text-[#c69a5f] font-bold">
              • Small Batch Cured 6 Weeks<br/>
              • 100% Zero Synthetic Detergents<br/>
              • Biodegradable Packaging
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-widest text-[#c69a5f]">
              Shop Lineup
            </h5>
            <ul className="space-y-2 text-xs font-bold text-neutral-300">
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer text-[#c69a5f]">
                  The Full Shift ($44)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  The Rotation ($32)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  The Cycle ($24)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  The Graveyard ($14)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  The Reset ($12)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  The Recharge ($12)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  Black Fiber Mesh Pouch ($6)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: System & Science */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-widest text-[#c69a5f]">
              The System
            </h5>
            <ul className="space-y-2 text-xs font-bold text-neutral-300">
              <li>
                <button onClick={() => scrollTo('grind')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  The 4-Step Cycle
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reviews')} className="hover:text-[#c69a5f] transition-colors cursor-pointer">
                  Verified Tradesmen Reviews
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-[#c69a5f] transition-colors cursor-pointer flex items-center gap-1 text-[#c69a5f]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Find My Routine</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Order Tracking */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-widest text-[#c69a5f]">
              Workshop Support
            </h5>
            <ul className="space-y-2 text-xs font-bold text-neutral-300">
              <li>
                <button onClick={onOpenOrderLookup} className="hover:text-[#c69a5f] transition-colors cursor-pointer flex items-center gap-1.5 text-white">
                  <Truck className="w-3.5 h-3.5 text-[#c69a5f]" />
                  <span>Track Existing Order</span>
                </button>
              </li>
              <li className="text-neutral-400">
                Free Shipping on Orders $35+
              </li>
              <li className="text-neutral-400">
                Support: crew@undasoap.com
              </li>
            </ul>
          </div>

        </div>

        {/* Giant Monolithic Brand Wordmark & White Logo */}
        <div className="py-12 sm:py-16 text-center select-none overflow-hidden flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
          <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 flex-shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            <UndaLogo className="w-full h-full text-white" variant="light" />
          </div>
          <div className="text-[16vw] sm:text-[14vw] md:text-[15vw] font-display font-black text-white leading-none tracking-tighter hover:text-[#c69a5f] transition-colors duration-500">
            UNDA
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} UNDA Soap Works. All rights reserved. Nature’s Answer to Dirty Work.
          </div>
          <div className="flex items-center gap-4">
            <span>Handmade in Small Batches</span>
            <span>•</span>
            <span className="text-neutral-400">Crafted by Designs by Luck</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
