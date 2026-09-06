import React from 'react';

export const LargeMarqueeBanner: React.FC = () => {
  const phrase = "GRIND. RESET. RECHARGE. REPEAT.";
  const repetitions = Array.from({ length: 8 });

  return (
    <div className="bg-[#c69a5f] border-y-4 sm:border-y-6 border-black overflow-hidden select-none py-6 sm:py-10 relative z-20 shadow-[0_4px_25px_rgba(0,0,0,0.2)]">
      <div className="flex animate-marquee-slow">
        {/* Set 1 */}
        {repetitions.map((_, index) => (
          <div key={`lg-marquee-1-${index}`} className="flex items-center whitespace-nowrap">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight sm:tracking-normal uppercase text-black px-8 sm:px-16 leading-none">
              {phrase}
            </span>
          </div>
        ))}

        {/* Set 2 for seamless infinite scroll */}
        {repetitions.map((_, index) => (
          <div key={`lg-marquee-2-${index}`} className="flex items-center whitespace-nowrap">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight sm:tracking-normal uppercase text-black px-8 sm:px-16 leading-none">
              {phrase}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
