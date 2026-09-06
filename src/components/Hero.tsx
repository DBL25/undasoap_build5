import React, { useEffect, useState } from 'react';
import { HERO_WORDS } from '../data/products';
import { ShieldCheck, Sparkles, Flame, Droplets, CheckCircle2 } from 'lucide-react';
import { UndaLogo } from './UndaLogo';
import fallbackHeroBg from '../assets/images/hero_background_1787506779381.jpg';

interface HeroProps {
  onShopClick: () => void;
  onQuizClick: () => void;
}

const UPLOADED_HERO_IMAGE = '/hf_20260829_133814_9513ed18-4db9-49c3-88a1-675bf20ed8f1.png';

export const Hero: React.FC<HeroProps> = ({ onShopClick, onQuizClick }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);
  const [heroImageSrc, setHeroImageSrc] = useState(UPLOADED_HERO_IMAGE);

  // Fisher-Yates shuffled list of words with 'something' first
  const [words] = useState(() => {
    const list = [...HERO_WORDS];
    for (let i = list.length - 1; i > 1; i--) {
      const j = 1 + Math.floor(Math.random() * i);
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setFadeState(true);
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end bg-[#0a0a0a] overflow-hidden border-b-4 border-black">
      {/* Background Graphic & Texture using uploaded asset image without alteration */}
      <img
        src={heroImageSrc}
        alt="UNDA Workshop Washup with Activated Charcoal Bar"
        className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_35%] opacity-80 photo-grit scale-105 transition-transform duration-10000 block"
        referrerPolicy="no-referrer"
        onError={() => {
          if (heroImageSrc !== fallbackHeroBg) {
            setHeroImageSrc(fallbackHeroBg);
          }
        }}
      />

      {/* Industrial Gradients for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 to-transparent pointer-events-none" />

      {/* Floating Stamped Badge with Official UNDA Mark */}
      <div className="absolute top-8 right-6 sm:top-12 sm:right-12 z-10 bg-[#c69a5f] text-black px-4 py-3 sm:px-5 sm:py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3 hidden sm:flex items-center gap-3">
        <div className="w-10 h-10 bg-black border-2 border-black p-1 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <UndaLogo className="w-full h-full text-white" variant="light" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-black/80">Batch No. 84</div>
          <div className="text-sm sm:text-base font-black tracking-tight font-display">UNDA • SMALL BATCH</div>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-20 w-full">
        <div className="max-w-3xl">
          
          {/* Eyebrow marker */}
          <div className="inline-flex items-center gap-2.5 text-[#c69a5f] text-xs font-black tracking-[0.25em] uppercase mb-6">
            <span className="w-8 h-0.5 bg-[#c69a5f]" />
            <span>01 — The Daily Grind</span>
          </div>

          {/* Main Headline with Dynamic Rotating Word */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-display leading-[0.92] tracking-tight mb-6 uppercase">
            Every day the world puts{' '}
            <span 
              className={`text-[#c69a5f] underline decoration-4 decoration-black inline-block whitespace-nowrap transition-opacity duration-200 ${
                fadeState ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {words[wordIndex]}
            </span>{' '}
            on you.
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#e8e4dc] font-extrabold tracking-tight mb-8 leading-snug max-w-xl">
            We clock in. Dirt clocks out.
          </p>

          <p className="text-sm sm:text-base text-neutral-300 font-medium max-w-lg mb-10 leading-relaxed">
            More than a hand bar — built for full-body post-shift showers. Cuts grease without stripping skin.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onShopClick}
              id="hero-shop-btn"
              className="bg-[#c69a5f] hover:bg-white text-black px-8 py-5 text-sm sm:text-base font-black uppercase tracking-widest border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Shop The Full Shift — $44
            </button>

            <button
              onClick={onQuizClick}
              id="hero-quiz-btn"
              className="bg-transparent hover:bg-white/10 text-white px-6 py-4.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest border-3 border-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#c69a5f]" />
              Find My Routine
            </button>
          </div>

          {/* Key Value Trust Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15">
            <div className="flex items-center gap-2.5 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-[#c69a5f] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Raw Goat Milk Base</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90">
              <Flame className="w-4 h-4 text-[#c69a5f] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Activated Charcoal</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90">
              <Droplets className="w-4 h-4 text-[#c69a5f] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Zero Sulfates & Goop</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90">
              <ShieldCheck className="w-4 h-4 text-[#c69a5f] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">100% Grime Guarantee</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
