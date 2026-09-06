import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const BrandBanner: React.FC = () => {
  return (
    <div
      id="unda-brand-banner"
      className="w-full max-w-[1920px] mx-auto mb-12 sm:mb-16 overflow-hidden bg-[#111] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none"
    >
      <div className="relative w-full aspect-[1920/400] min-h-[140px] sm:min-h-[200px] md:min-h-[260px] lg:min-h-[320px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#181818] via-[#0f0f0f] to-[#141414] border border-white/10 text-neutral-400">
        
        {/* Dimension guide lines */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Diagonal corner alignment markers */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#c69a5f]/60" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#c69a5f]/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#c69a5f]/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#c69a5f]/60" />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-none bg-black border border-[#c69a5f]/60 flex items-center justify-center text-[#c69a5f]">
            <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div className="text-sm sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-wider">
            1920 × 400 Banner Placeholder
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 border border-white/15 text-[10px] sm:text-xs font-mono font-bold text-[#c69a5f] uppercase tracking-widest">
            <span>Aspect Ratio 24:5 • 1920px W × 400px H</span>
          </div>
        </div>
      </div>
    </div>
  );
};

