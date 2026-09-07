import React, { useState, useMemo } from 'react';
import { Product, ProductPackOption } from '../types';
import {
  X, Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw,
  Layers, Package, ShieldCheck, Plus
} from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface RoutineBuilderModalProps {
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, pack: ProductPackOption, isSubscription?: boolean) => void;
  onQuickView?: (product: Product) => void;
}

// Every subscription resupplies on a fixed 6 week cadence
const RESUPPLY_WEEKS = 6;

// --- Question 1: What does the shift leave on you? ---
interface GrimeOption {
  id: string;
  label: string;
  who: string;
  isHeavyGrime: boolean;
}

const GRIME_OPTIONS: GrimeOption[] = [
  {
    id: 'grease',
    label: 'Grease, Oil & Fuel',
    who: 'Mechanics, techs, fleet, oil field, heavy equipment',
    isHeavyGrime: true
  },
  {
    id: 'metal',
    label: 'Metal Dust, Flux & Carbon',
    who: 'Welders, fabricators, machinists, ironwork, foundry',
    isHeavyGrime: true
  },
  {
    id: 'chemicals',
    label: 'Paint, Glue & Chemicals',
    who: 'Painters, finishers, HVAC, pest control, epoxy work',
    isHeavyGrime: true
  },
  {
    id: 'sawdust',
    label: 'Sawdust, Dirt & Debris',
    who: 'Carpenters, construction, demo, farm & ranch, roofing',
    isHeavyGrime: false
  },
  {
    id: 'untouchable',
    label: 'The Stuff Nobody Else Will Touch',
    who: 'Plumbing, sanitation, kitchens, cleanup crews — the work that has to get done',
    isHeavyGrime: true
  },
  {
    id: 'sweat',
    label: 'Sweat, Grit & Long Days',
    who: 'Landscaping, warehouse, delivery, moving — the daily grind',
    isHeavyGrime: false
  }
];

// --- Question 2: How many days hit heavy? ---
interface IntensityOption {
  id: string;
  label: string;
  heavyDays: number;
}

const INTENSITY_OPTIONS: IntensityOption[] = [
  {
    id: 'couple',
    label: 'A Couple Days a Week',
    heavyDays: 2
  },
  {
    id: 'most',
    label: 'Most of the Week',
    heavyDays: 4
  },
  {
    id: 'every',
    label: 'Every Damn Day',
    heavyDays: 7
  }
];

// --- Question 3: When do you clock out? ---
interface TimingOption {
  id: string;
  label: string;
  desc?: string;
}

const TIMING_OPTIONS: TimingOption[] = [
  {
    id: 'daylight',
    label: 'Daylight',
    desc: 'Clocking out before dusk'
  },
  {
    id: 'second-half',
    label: 'Second Half & Doubles',
    desc: 'Afternoon through midnight shifts'
  },
  {
    id: 'graveyard',
    label: 'The Graveyard (clocking out when the sun comes up)',
    desc: 'Night shifts running until dawn'
  },
  {
    id: 'rotating',
    label: 'It Changes (rotating shifts)',
    desc: 'Unpredictable shift schedule'
  }
];

interface BarItem {
  product: Product;
  qty: number;
  roleNote: string;
}

interface RoutineResult {
  name: string;
  mixShort: string;
  tagline: string;
  description: string;
  bars: BarItem[];
  packOption: ProductPackOption;
  washesPerWeek: number;
}

function calculateRoutine(
  products: Product[],
  grimeId: string,
  intensityId: string,
  timingId: string
): RoutineResult {
  const resetBar = products.find(p => p.id === 'the-reset') || products[0];
  const rechargeBar = products.find(p => p.id === 'the-recharge') || products[1] || products[0];
  const graveyardBar = products.find(p => p.id === 'the-graveyard') || products[0];

  const selectedGrime = GRIME_OPTIONS.find(g => g.id === grimeId) || GRIME_OPTIONS[0];
  const isHeavyGrime = selectedGrime.isHeavyGrime;
  const isEveryDamnDay = intensityId === 'every';
  const isNights = timingId === 'graveyard';
  const isRotating = timingId === 'rotating';
  const isDayOrSecond = timingId === 'daylight' || timingId === 'second-half';

  // Wash load estimate: 7 base washes/week plus 1 extra per heavy day
  const intensityObj = INTENSITY_OPTIONS.find(i => i.id === intensityId) || INTENSITY_OPTIONS[0];
  const extraWashes = intensityObj.heavyDays;
  const washesPerWeek = 7 + extraWashes;

  // 1. Nights + (heavy grime or Every Damn Day): 2x Graveyard + 1x Recharge — "The Graveyard Rotation"
  if (isNights && (isHeavyGrime || isEveryDamnDay)) {
    const bars: BarItem[] = [
      { product: graveyardBar, qty: 2, roleNote: 'Solid activated charcoal top to bottom — cuts heavy oil, soot, and carbon.' },
      { product: rechargeBar, qty: 1, roleNote: 'Goat milk and sea salt recovery so your hands and arms don’t crack raw.' }
    ];
    return {
      name: 'The Graveyard Rotation',
      mixShort: '2x Graveyard + 1x Recharge',
      tagline: 'Two full-charcoal bars for night shifts and heavy grime, one recharge bar for skin recovery.',
      description: 'Engineered for night runs, diesel rebuilds, and shifts ending when the sun comes up. Concentrated charcoal cuts stubborn petroleum and soot, backed by goat’s milk so your skin barrier stays intact.',
      bars,
      packOption: {
        id: 'custom-graveyard-2x-1x',
        name: 'The Rotation (The Graveyard Rotation: 2x Graveyard + 1x Recharge)',
        count: 3,
        price: 28,
        unitPrice: 9.33,
        badge: 'Custom Mix'
      },
      washesPerWeek
    };
  }

  // 2. Nights otherwise: 1x Graveyard + 1x Reset + 1x Recharge — "The Graveyard Rotation"
  if (isNights) {
    const bars: BarItem[] = [
      { product: graveyardBar, qty: 1, roleNote: 'Full activated charcoal for the darkest shift grime.' },
      { product: resetBar, qty: 1, roleNote: 'Dual charcoal and goat milk bar for standard shift grit.' },
      { product: rechargeBar, qty: 1, roleNote: 'Nourishing goat milk and sea salt to rebuild the skin barrier.' }
    ];
    return {
      name: 'The Graveyard Rotation',
      mixShort: '1x Graveyard + 1x Reset + 1x Recharge',
      tagline: 'Night shift charcoal power, workshop grit cutter, and daily skin restorer.',
      description: 'One bar of each formulation dialed for overnight shifts: heavy charcoal on standby, daily grit cutting, and gentle restorative goat milk.',
      bars,
      packOption: {
        id: 'custom-graveyard-balanced',
        name: 'The Rotation (The Graveyard Rotation: 1x Graveyard + 1x Reset + 1x Recharge)',
        count: 3,
        price: 28,
        unitPrice: 9.33,
        badge: 'Custom Mix'
      },
      washesPerWeek
    };
  }

  // 3. It Changes: 1x each bar — "The Mixed Shift Rotation"
  if (isRotating) {
    const bars: BarItem[] = [
      { product: resetBar, qty: 1, roleNote: 'For regular day shifts and heavy particulate grit.' },
      { product: rechargeBar, qty: 1, roleNote: 'For morning recovery and everyday wash-downs.' },
      { product: graveyardBar, qty: 1, roleNote: 'Full charcoal power when you get stuck on dirty midnight runs.' }
    ];
    return {
      name: 'The Mixed Shift Rotation',
      mixShort: '1x Reset + 1x Recharge + 1x Graveyard',
      tagline: 'One bar of each signature formula for unpredictable hours and changing shift hazards.',
      description: 'Rotating shifts throw different grime at you every week. Keep all three signature bars in your locker: heavy grit, rich skin restore, and full charcoal cut.',
      bars,
      packOption: {
        id: 'custom-mixed-shift-rotation',
        name: 'The Rotation (The Mixed Shift Rotation: 1x Reset + 1x Recharge + 1x Graveyard)',
        count: 3,
        price: 28,
        unitPrice: 9.33,
        badge: 'Custom Mix'
      },
      washesPerWeek
    };
  }

  // 4. Day/Second + heavy grime or Every Damn Day: 2x Reset + 1x Recharge — "The Heavy Week Rotation"
  if (isDayOrSecond && (isHeavyGrime || isEveryDamnDay)) {
    const bars: BarItem[] = [
      { product: resetBar, qty: 2, roleNote: 'Heavy abrasive sea salt and charcoal to strip stubborn grime without mercy.' },
      { product: rechargeBar, qty: 1, roleNote: 'Pure goat milk hydration to prevent dried-out, raw knuckles.' }
    ];
    return {
      name: 'The Heavy Week Rotation',
      mixShort: '2x Reset + 1x Recharge',
      tagline: 'Maximum scrub friction and charcoal cut for brutal work weeks, backed by goat milk restoration.',
      description: 'Double down on heavy grit. Two Reset bars pack coarse sea salt and activated charcoal to pull deep grease, carbon, and dust out of skin, backed by one Recharge bar for restorative lather.',
      bars,
      packOption: {
        id: 'custom-heavy-week-rotation',
        name: 'The Rotation (The Heavy Week Rotation: 2x Reset + 1x Recharge)',
        count: 3,
        price: 28,
        unitPrice: 9.33,
        badge: 'Custom Mix'
      },
      washesPerWeek
    };
  }

  // 5. Otherwise: 1x Reset + 2x Recharge — "The Steady Rotation"
  const bars: BarItem[] = [
    { product: rechargeBar, qty: 2, roleNote: 'Rich goat milk and sea salt lather for daily post-shift comfort.' },
    { product: resetBar, qty: 1, roleNote: 'Heavy grit bar ready in the locker for tough demo days.' }
  ];
  return {
    name: 'The Steady Rotation',
    mixShort: '1x Reset + 2x Recharge',
    tagline: 'Daily skin restoration with a heavy scrub bar on standby when things get dirty.',
    description: 'Two Recharge bars soothe skin battered by dust, sawdust, and sweat, paired with one Reset bar when you tackle heavy demo or engine bay work.',
    bars,
    packOption: {
      id: 'custom-steady-rotation',
      name: 'The Rotation (The Steady Rotation: 1x Reset + 2x Recharge)',
      count: 3,
      price: 28,
      unitPrice: 9.33,
      badge: 'Custom Mix'
    },
    washesPerWeek
  };
}

export const RoutineBuilderModal: React.FC<RoutineBuilderModalProps> = ({
  products,
  onClose,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [grimeId, setGrimeId] = useState<string>('grease');
  const [intensityId, setIntensityId] = useState<string>('most');
  const [timingId, setTimingId] = useState<string>('daylight');
  const [isSubscription, setIsSubscription] = useState<boolean>(true);
  const [result, setResult] = useState<RoutineResult | null>(null);

  const rotationProduct = products.find(p => p.id === 'the-rotation') || products[0];
  const fullShiftProduct = products.find(p => p.id === 'the-full-shift-kit');

  const handleCalculate = () => {
    const computed = calculateRoutine(products, grimeId, intensityId, timingId);
    setResult(computed);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  // Add the custom rotation to cart
  const handleAddRotation = () => {
    if (!result) return;
    onAddToCart(rotationProduct, result.packOption, isSubscription);
    onClose();
  };

  // Add The Full Shift flagship kit to cart (from upsell row)
  const handleAddFullShift = () => {
    if (fullShiftProduct) {
      onAddToCart(fullShiftProduct, fullShiftProduct.packOptions[0], false);
      onClose();
    }
  };

  const optionBtn = (selected: boolean) =>
    `p-4 text-left border-3 transition-all cursor-pointer ${
      selected
        ? 'border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(198,154,95,1)] translate-x-[-1px] translate-y-[-1px]'
        : 'border-neutral-300 bg-neutral-50 text-black hover:border-black hover:bg-white'
    }`;

  const finalSubPrice = 23.80; // 15% off $28
  const oneTimePrice = 28.00;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white border-4 border-black w-full max-w-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(198,154,95,1)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#0a0a0a] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black border border-white/30 p-0.5 flex items-center justify-center">
              <UndaLogo className="w-full h-full text-white" variant="light" />
            </div>
            <div>
              <span className="font-display text-base sm:text-lg uppercase tracking-wider text-white block leading-tight">
                FIND MY ROUTINE
              </span>
              <span className="text-[11px] font-mono text-[#c69a5f] uppercase tracking-widest block font-bold">
                3 Questions. Your Bars. Your Pace.
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-routine-modal-btn"
            className="bg-[#c69a5f] hover:bg-white text-black p-1.5 border-2 border-black cursor-pointer transition-colors flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            aria-label="Close routine builder"
            title="Close"
          >
            <X className="w-5 h-5 font-black" />
          </button>
        </div>

        {/* Progress Step Meter */}
        {step <= 3 && (
          <div className="bg-[#c69a5f] text-black px-6 py-2.5 border-b-2 border-black flex items-center justify-between text-xs font-black uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black" />
              <span>
                Question {step} of 3:{' '}
                {step === 1 ? 'Shift Grime' : step === 2 ? 'Heavy Days' : 'Clock-Out Timing'}
              </span>
            </div>
            <span className="font-mono text-xs font-bold">{Math.round((step / 3) * 100)}%</span>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Question 1: What does the shift leave on you? */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#a97e45] uppercase tracking-widest">
                  Question 1 of 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-black uppercase mt-1">
                  What does the shift leave on you?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-semibold mt-1">
                  Select the primary grime or hazard you wash off when you clock out.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {GRIME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGrimeId(opt.id)}
                    className={optionBtn(grimeId === opt.id)}
                  >
                    <div className="text-xs sm:text-sm font-black uppercase tracking-wide">
                      {opt.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${grimeId === opt.id ? 'text-[#c69a5f]' : 'text-neutral-500'}`}>
                      {opt.who}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-neutral-200">
                <button
                  onClick={onClose}
                  className="text-xs font-bold uppercase text-neutral-500 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-6 py-3.5 text-xs font-black uppercase tracking-wider border-2 border-black flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span>Next: Heavy Days</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Question 2: How many days hit heavy? */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#a97e45] uppercase tracking-widest">
                  Question 2 of 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-black uppercase mt-1">
                  How many days hit heavy?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-semibold mt-1">
                  How often do you face maximum-grime shifts during your work week?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {INTENSITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setIntensityId(opt.id)}
                    className={optionBtn(intensityId === opt.id)}
                  >
                    <div className="text-xs sm:text-sm font-black uppercase tracking-wide">
                      {opt.label}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-neutral-200">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold uppercase text-neutral-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-6 py-3.5 text-xs font-black uppercase tracking-wider border-2 border-black flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span>Next: Clock-Out Timing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Question 3: When do you clock out? */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#a97e45] uppercase tracking-widest">
                  Question 3 of 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-black uppercase mt-1">
                  When do you clock out?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-semibold mt-1">
                  Match your shift hours to your soap lineup.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {TIMING_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTimingId(opt.id)}
                    className={optionBtn(timingId === opt.id)}
                  >
                    <div className="text-xs sm:text-sm font-black uppercase tracking-wide">
                      {opt.label}
                    </div>
                    {opt.desc && (
                      <div className={`text-xs mt-0.5 ${timingId === opt.id ? 'text-[#c69a5f]' : 'text-neutral-500'}`}>
                        {opt.desc}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-neutral-200">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold uppercase text-neutral-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleCalculate}
                  id="build-my-rotation-btn"
                  className="bg-black hover:bg-[#c69a5f] hover:text-black text-[#c69a5f] px-8 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(198,154,95,1)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build My Rotation</span>
                </button>
              </div>
            </div>
          )}

          {/* Result Screen: YOU BUILT THIS */}
          {step === 4 && result && (
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="bg-[#0a0a0a] text-white p-5 border-3 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-[#c69a5f] block">
                    YOU BUILT THIS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-white uppercase leading-tight mt-0.5">
                    {result.name}
                  </h3>
                  <div className="text-xs font-mono text-[#c69a5f] font-bold mt-1">
                    {result.mixShort}
                  </div>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
                  <div className="text-3xl font-black font-display text-[#c69a5f]">$28</div>
                  <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Your Rotation</div>
                  <div className="text-[10px] font-mono text-[#c69a5f] mt-1">$7 away from free shipping</div>
                </div>
              </div>

              {/* Tagline & Plain-spoken Description */}
              <div className="bg-neutral-50 border-2 border-black p-4 space-y-1">
                <p className="text-sm font-black text-black">“{result.tagline}”</p>
                <p className="text-xs text-neutral-700 font-medium leading-relaxed">{result.description}</p>
              </div>

              {/* 3 Bars Breakdown with images, counts, and one plain-spoken line each explaining its role */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-black">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#a97e45]" />
                    <span>Your 3 Bars (Always includes at least 1 Recharge):</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.bars.map((barItem, idx) => (
                    <div
                      key={idx}
                      className={`p-3 border-2 flex flex-col justify-between ${
                        barItem.product.isDarkCard || barItem.product.id === 'the-graveyard'
                          ? 'bg-[#0a0a0a] text-white border-black'
                          : 'bg-white text-black border-black'
                      }`}
                    >
                      <div>
                        <div className="relative aspect-square mb-2 bg-[#121212] border border-neutral-700 overflow-hidden">
                          <img
                            src={barItem.product.image}
                            alt={barItem.product.name}
                            className="w-full h-full object-cover photo-grit"
                          />
                          <span className="absolute top-1.5 left-1.5 bg-[#c69a5f] text-black font-mono text-[10px] font-black px-1.5 py-0.5">
                            {barItem.qty}x
                          </span>
                        </div>
                        <h4 className="font-display text-sm uppercase leading-tight">{barItem.product.name}</h4>
                        <div className="text-[10px] font-mono text-[#c69a5f] font-bold mt-0.5">
                          {barItem.product.categoryLabel}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-neutral-700 mt-2 text-[11px] leading-snug font-medium text-neutral-300">
                        {barItem.roleNote}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Options: Subscribe & Save 15% vs One-Time */}
              <div className="border-2 border-black bg-neutral-50 p-4 space-y-3">
                {/* Subscribe Option */}
                <label
                  onClick={() => setIsSubscription(true)}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 border-2 cursor-pointer transition-all gap-2 ${
                    isSubscription
                      ? 'bg-[#c69a5f]/15 border-black shadow-sm font-bold'
                      : 'bg-white border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="purchaseMode"
                      checked={isSubscription}
                      onChange={() => setIsSubscription(true)}
                      className="accent-[#c69a5f] mt-1"
                    />
                    <div>
                      <div className="text-xs uppercase font-black text-black flex items-center gap-2">
                        <span>Subscribe & Save 15% — ${finalSubPrice.toFixed(2)}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 border border-emerald-300 font-bold uppercase">
                          Save $4.80
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-600 mt-0.5 font-medium">
                        Resupply ships <strong>every {RESUPPLY_WEEKS} weeks</strong> (45 total washes per 3 bars). Cancel anytime.
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right font-black text-sm text-emerald-800 pl-7 sm:pl-0">
                    ${finalSubPrice.toFixed(2)}
                  </div>
                </label>

                {/* One-Time Purchase */}
                <label
                  onClick={() => setIsSubscription(false)}
                  className={`flex items-center justify-between p-3 border-2 cursor-pointer transition-all ${
                    !isSubscription
                      ? 'bg-white border-black shadow-sm font-bold text-black'
                      : 'bg-white border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="purchaseMode"
                      checked={!isSubscription}
                      onChange={() => setIsSubscription(false)}
                      className="accent-black"
                    />
                    <div>
                      <div className="text-xs uppercase font-black text-black">
                        One-Time ($28)
                      </div>
                      <div className="text-[10px] text-neutral-500 font-medium">
                        Single shipment of your 3-bar rotation.
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-black font-display">
                    ${oneTimePrice.toFixed(2)}
                  </div>
                </label>
              </div>

              {/* Action Button: Start My Rotation / One-Time ($28) */}
              <div className="space-y-3">
                <button
                  onClick={handleAddRotation}
                  id="add-custom-rotation-cta"
                  className="w-full bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black py-4 px-6 text-sm font-black uppercase tracking-widest border-3 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isSubscription ? (
                    <span>Start My Rotation • Save 15% — ${finalSubPrice.toFixed(2)}</span>
                  ) : (
                    <span>One-Time ($28) — Add To Cart</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={handleReset}
                    id="rebuild-it-btn"
                    className="font-bold text-neutral-500 hover:text-black uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Rebuild It</span>
                  </button>

                  <span className="text-[11px] font-bold text-neutral-500">
                    Free shipping on orders $35+
                  </span>
                </div>
              </div>

              {/* Upsell Row: Run It Fully Equipped — The Full Shift $44 */}
              <div className="p-4 bg-[#0a0a0a] text-white border-3 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black border border-neutral-700 flex-shrink-0 overflow-hidden">
                    {fullShiftProduct && (
                      <img
                        src={fullShiftProduct.image}
                        alt="The Full Shift"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-white">
                      Run It Fully Equipped — The Full Shift $44
                    </div>
                    <div className="text-[11px] text-neutral-300 font-medium leading-snug">
                      Your three bars + mesh scrub pouch + manifesto card, boxed.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddFullShift}
                  id="upsell-full-shift-btn"
                  className="w-full sm:w-auto bg-[#c69a5f] hover:bg-white text-black px-4 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-black transition-colors cursor-pointer whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                >
                  Get The Full Shift — $44
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
