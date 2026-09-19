import React, { useEffect, useRef } from 'react';
import { UndaLogo } from './UndaLogo';

const DESKTOP_BANNER_VIDEO = '/videos/unda-brand-desktop.mp4';
const MOBILE_BANNER_VIDEO = '/videos/unda-brand-mobile.mp4';

export const BrandBanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // The graphite fallback remains visible if autoplay is blocked.
    });
  }, []);

  return (
    <section
      id="unda-brand-banner"
      aria-label="UNDA brand statement"
      className="unda-brand-banner relative w-full max-w-[1920px] mx-auto mb-12 sm:mb-16 overflow-hidden bg-[#070707] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none"
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/7] lg:aspect-[24/5] min-h-[360px] sm:min-h-[300px] lg:min-h-[320px]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src={MOBILE_BANNER_VIDEO} media="(max-width: 639px)" type="video/mp4" />
          <source src={DESKTOP_BANNER_VIDEO} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/35" />
        <div className="unda-banner-water absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/55" />

        <div className="relative z-10 h-full px-6 py-10 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8">
          <div className="unda-banner-headline text-center sm:text-left max-w-4xl">
            <div className="text-[10px] sm:text-xs font-mono font-black tracking-[0.3em] uppercase text-[#c69a5f] mb-3">
              UNDA • Same Underneath
            </div>
            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.92] tracking-tight">
              <span className="block">Dirt Goes</span>
              <span className="block">Deeper Than</span>
              <span className="block">You Think.</span>
            </h3>
          </div>

          <div className="unda-banner-logo flex flex-col items-center gap-3 shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-black/65 border border-white/25 p-2 shadow-[0_12px_45px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <UndaLogo className="w-full h-full" variant="light" alt="UNDA" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-black tracking-[0.28em] uppercase text-white/80">
              Built for the Shift
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c69a5f]/80 to-transparent" />
      </div>
    </section>
  );
};
