import React from 'react';
import { ArrowRight, Clapperboard, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { UndaLogo } from './UndaLogo';
import { NewsletterForm } from './NewsletterForm';
import fullShiftImage from '../assets/images/full-shift-wet-counter.webp';

export const PrelaunchLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#c69a5f] selection:text-black">
      <div className="bg-[#c69a5f] text-black text-center px-4 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.22em]">
        Prelaunch Workshop • First Batch In Development • Join The Roster
      </div>

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-white/15">
        <a href="/" className="flex items-center gap-3" aria-label="UNDA prelaunch home">
          <div className="w-11 h-11 border-2 border-white p-1.5 shadow-[2px_2px_0_#c69a5f]">
            <UndaLogo className="w-full h-full text-white" variant="light" />
          </div>
          <div>
            <div className="font-display text-2xl tracking-wider">UNDA</div>
            <div className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#c69a5f]">Dirty Work Care</div>
          </div>
        </a>
        <a href="#join" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#c69a5f] hover:text-white transition-colors">
          Join The Launch List
        </a>
      </header>

      <main>
        <section className="relative overflow-hidden border-b-4 border-black">
          <div className="absolute inset-0">
            <img src={fullShiftImage} alt="" className="w-full h-full object-cover opacity-35 scale-105" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 min-h-[680px] flex items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border-2 border-[#c69a5f] bg-black/80 text-[#c69a5f] px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] mb-7">
                <ShieldCheck className="w-4 h-4" />
                First Batch • Field Testing Now
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase leading-[0.9] tracking-tight mb-7">
                Dirt Goes <span className="text-[#c69a5f]">Deeper</span> Than You Think.
              </h1>
              <p className="text-lg sm:text-2xl font-extrabold text-neutral-200 max-w-2xl leading-snug mb-4">
                A post-shift soap system built for the hands—and the people—who keep everything moving.
              </p>
              <p className="text-sm text-neutral-400 font-semibold max-w-xl leading-relaxed mb-9">
                UNDA is finalizing its first production formulas and collecting real field feedback. Join the roster for launch timing, product tests, and early access.
              </p>
              <div className="max-w-xl" id="join">
                <NewsletterForm source="prelaunch-hero" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#c69a5f] text-black py-16 sm:py-20 border-b-4 border-black" id="film">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <div>
              <div className="text-[10px] font-mono font-black uppercase tracking-[0.24em] mb-3">The Next UNDA Film</div>
              <h2 className="text-4xl sm:text-5xl font-display uppercase leading-none mb-5">Something Deeper Is Coming.</h2>
              <p className="text-sm font-bold leading-relaxed max-w-md">
                A new visual introduction to UNDA is in production. The film will return here when the next cut is ready.
              </p>
              <div className="flex items-center gap-2 mt-6 text-xs font-black uppercase tracking-widest">
                <Clapperboard className="w-5 h-5" /> New film in production
              </div>
            </div>
            <div className="relative border-4 border-black bg-[#0a0a0a] shadow-[8px_8px_0_#fff] overflow-hidden aspect-video flex items-center justify-center">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#c69a5f_0,_transparent_62%)]" />
              <div className="relative text-center px-6">
                <UndaLogo className="w-24 h-24 sm:w-32 sm:h-32 text-white mx-auto mb-5" variant="light" />
                <div className="font-display text-2xl sm:text-4xl uppercase tracking-wide text-white">New Film Coming Soon</div>
                <div className="mt-3 text-[10px] sm:text-xs font-mono font-black uppercase tracking-[0.24em] text-[#c69a5f]">The screen stays ready</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 border-3 border-white">
              {[
                ['01', 'FIELD TESTING', 'Real testers. Real post-shift use. No borrowed or fabricated reviews.'],
                ['02', 'FORMULA LOCK', 'Final ingredient declarations and production details publish when the formulas are locked.'],
                ['03', 'FIRST DROP', 'Launch-list members get the first production date and purchase access.'],
              ].map(([num, title, copy]) => (
                <div key={num} className="p-7 sm:p-9 border-b-3 md:border-b-0 md:border-r-3 last:border-0 border-white">
                  <div className="font-display text-5xl text-[#c69a5f] mb-5">{num}</div>
                  <h3 className="font-display text-xl uppercase mb-3">{title}</h3>
                  <p className="text-xs text-neutral-400 font-semibold leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24" id="early-access">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <LockKeyhole className="w-10 h-10 text-[#c69a5f] mx-auto mb-5" />
            <div className="text-[10px] font-mono font-black uppercase tracking-[0.24em] text-[#c69a5f] mb-3">Private Workshop Preview</div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase mb-5">See What We’re Building.</h2>
            <p className="text-sm text-neutral-400 font-semibold max-w-2xl mx-auto leading-relaxed mb-8">
              Testers, collaborators, and early supporters can review the complete demo storefront with the shared workshop password.
            </p>
            <a href="/preview" className="inline-flex items-center gap-2 bg-[#c69a5f] text-black border-2 border-[#c69a5f] px-7 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:border-white transition-colors">
              Enter Early-Access Demo <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#c69a5f]" />
            <a href="mailto:crew@undasoap.com" className="text-xs font-bold text-neutral-300 hover:text-[#c69a5f]">crew@undasoap.com</a>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-black uppercase tracking-wider text-neutral-400">
            <a href="/policies/shipping" className="hover:text-white">Shipping</a>
            <a href="/policies/returns" className="hover:text-white">Returns</a>
            <a href="/policies/privacy" className="hover:text-white">Privacy</a>
            <a href="/policies/terms" className="hover:text-white">Terms</a>
            <a href="/policies/faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="text-[10px] font-mono text-neutral-500">© {new Date().getFullYear()} UNDA Soap Works</div>
        </div>
      </footer>
    </div>
  );
};
