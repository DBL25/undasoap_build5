import React, { useState } from 'react';
import { CheckCircle2, RefreshCw } from 'lucide-react';

export const ShiftSupplySection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    const formData = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, String(value)));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('Unable to submit');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-white py-20 sm:py-24 border-b-4 border-black" id="shift-supply">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 text-[#8a642f] text-xs font-black uppercase tracking-[0.24em] mb-3">
            <RefreshCw className="w-4 h-4" /> Subscription In Development
          </div>
          <h2 className="text-4xl sm:text-6xl font-display uppercase leading-none mb-5">Shift Supply.</h2>
          <p className="text-sm text-neutral-700 font-semibold leading-relaxed max-w-lg">
            Recurring delivery is part of the UNDA plan, but the product, cadence, savings, billing, and cancellation terms will be locked before enrollment opens. Join this separate list to help shape it.
          </p>
        </div>

        <div className="bg-[#c69a5f] border-3 border-black p-6 sm:p-8 shadow-[6px_6px_0_#0a0a0a]">
          {status === 'success' ? (
            <div className="bg-white border-2 border-black p-5 flex items-center gap-3" role="status">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              <div><div className="text-xs font-black uppercase">Shift Supply interest saved.</div><div className="text-[11px] font-semibold text-neutral-600">We’ll contact you before enrollment opens.</div></div>
            </div>
          ) : (
            <form name="unda-shift-supply" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="form-name" value="unda-shift-supply" />
              <input name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />
              <label className="block text-[10px] font-black uppercase tracking-widest">Email
                <input name="email" type="email" required autoComplete="email" className="mt-1.5 w-full bg-white text-black border-2 border-black px-4 py-3.5 text-xs" placeholder="YOU@EMAIL.COM" />
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-[10px] font-black uppercase tracking-widest">What should repeat?
                  <select name="product" required className="mt-1.5 w-full bg-white text-black border-2 border-black px-3 py-3.5 text-xs">
                    <option value="">Choose one</option>
                    <option>The Reset</option><option>The Recharge</option><option>The Graveyard</option><option>The Cycle</option><option>The Rotation</option><option>The Full Shift</option>
                  </select>
                </label>
                <label className="block text-[10px] font-black uppercase tracking-widest">Preferred cadence
                  <select name="cadence" required className="mt-1.5 w-full bg-white text-black border-2 border-black px-3 py-3.5 text-xs">
                    <option value="">Choose one</option>
                    <option>Every 4 weeks</option><option>Every 6 weeks</option><option>Every 8 weeks</option><option>I’m not sure yet</option>
                  </select>
                </label>
              </div>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-black text-[#c69a5f] border-2 border-black py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-60">
                {status === 'sending' ? 'Saving…' : 'Join Shift Supply List'}
              </button>
              <p className="text-[10px] font-mono font-bold text-black/70">Interest only. No subscription or payment is created.</p>
              {status === 'error' && <p className="text-xs text-red-900 font-bold" role="alert">Couldn’t submit. Please email crew@undasoap.com.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
