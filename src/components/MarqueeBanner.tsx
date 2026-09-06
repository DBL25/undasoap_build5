import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    "NATURE'S ANSWER TO DIRTY WORK",
    "FREE SHIPPING ON ORDERS $35+",
    "HANDMADE IN SMALL BATCHES",
    "FARM-FRESH RAW GOAT'S MILK",
    "ACTIVATED BAMBOO CHARCOAL",
    "GRIND. RESET. RECHARGE. REPEAT.",
    "ZERO SULFATES • ZERO PARABENS",
    "TRUSTED BY MECHANICS, WELDERS & BUILDERS"
  ];

  return (
    <div className="bg-[#c69a5f] border-b-2 border-black overflow-hidden select-none py-2.5">
      <div className="flex animate-marquee">
        {/* First repetition */}
        {items.map((item, index) => (
          <React.Fragment key={`marquee-1-${index}`}>
            <span className="inline-block px-6 text-xs font-black tracking-widest uppercase text-black whitespace-nowrap">
              {item}
            </span>
            <span className="text-black font-black text-xs opacity-70">★</span>
          </React.Fragment>
        ))}

        {/* Second repetition for smooth infinite looping */}
        {items.map((item, index) => (
          <React.Fragment key={`marquee-2-${index}`}>
            <span className="inline-block px-6 text-xs font-black tracking-widest uppercase text-black whitespace-nowrap">
              {item}
            </span>
            <span className="text-black font-black text-xs opacity-70">★</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
