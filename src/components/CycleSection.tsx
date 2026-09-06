import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Droplets, RefreshCw } from 'lucide-react';

interface CycleSectionProps {
  onShopKit: () => void;
}

export const CycleSection: React.FC<CycleSectionProps> = ({ onShopKit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Grind',
      subtitle: 'The Shift Begins',
      icon: Flame,
      summary: "The world puts something on you. That's the job.",
      detail: 'Diesel exhaust, hydraulic fluid, wet lime mortar, carbon spatter, and iron filings coat your epidermis. Standard liquid hand soaps contain artificial surfactants that break surface tension but push micro-particles deeper into pore crevices.'
    },
    {
      num: '02',
      title: 'Reset',
      subtitle: 'Deep Toxin Extraction',
      icon: Droplets,
      summary: 'Activated charcoal pulls it out. Clean, actually clean.',
      detail: 'Formulated with food-grade bamboo charcoal with over 1,000 m²/g surface area to bind to heavy petroleum hydrocarbons. Natural goat milk lactic acid gently loosens dead skin bonds without requiring harsh chemical solvents.'
    },
    {
      num: '03',
      title: 'Recharge',
      subtitle: 'Daily Skin Restoration',
      icon: ShieldCheck,
      summary: 'Raw goat milk and sea salt. Leaves you feeling refreshed.',
      detail: 'Rich fresh goat’s milk and sea salt create a thick, comforting full-body shower lather. Leaves your skin feeling clean, calm, and deeply refreshed so you feel ready for whatever comes next.'
    },
    {
      num: '04',
      title: 'Repeat',
      subtitle: 'Zero Downtime',
      icon: RefreshCw,
      summary: 'Tomorrow, same grind. Never run out.',
      detail: 'Keep your supply locked in on subscription and start every shift feeling clean, ready, and dialed in.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] text-white border-b-4 border-black" id="grind">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 pb-6 border-b border-white/20">
          <div className="inline-flex items-center gap-2.5 text-[#c69a5f] text-xs font-black tracking-[0.25em] uppercase mb-2">
            <span className="w-8 h-0.5 bg-[#c69a5f]" />
            <span>03 — The Method</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white mb-3">
            Grind. Reset. Recharge. Repeat.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-semibold max-w-2xl">
            Not a luxury spa routine — a heavy-duty biological maintenance cycle engineered for industrial trades.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-3 border-white">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-8 flex flex-col justify-between border-b-3 lg:border-b-0 lg:border-r-3 border-white transition-all cursor-pointer relative group ${
                  isActive ? 'bg-[#181818]' : 'bg-transparent hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#c69a5f]" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-5xl sm:text-6xl text-[#c69a5f] leading-none">
                      {step.num}
                    </span>
                    <Icon className="w-6 h-6 text-[#c69a5f] opacity-80" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display text-white mb-1 uppercase">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#a97e45] font-bold mb-4">
                    {step.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-bold leading-relaxed mb-4">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Full Shift CTA */}
        <div className="mt-12 p-6 sm:p-8 bg-[#c69a5f] text-black border-3 border-black flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <div>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black/80 block">
              Flagship Complete Boxed Setup
            </span>
            <h4 className="text-2xl sm:text-3xl font-display text-black uppercase">
              Get The Full Shift — $44
            </h4>
            <p className="text-xs sm:text-sm text-black/90 font-bold mt-1">
              Includes 1x Reset + 1x Recharge + 1x Graveyard + black mesh pouch + manifesto card, boxed.
            </p>
          </div>

          <button
            onClick={onShopKit}
            id="cycle-full-shift-btn"
            className="w-full sm:w-auto bg-black hover:bg-white hover:text-black text-[#c69a5f] px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Get The Full Shift — $44</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
