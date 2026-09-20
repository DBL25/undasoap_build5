import React, { useState } from 'react';
import { CheckCircle2, ClipboardCheck, Send } from 'lucide-react';

export const FieldTestedSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, String(value)));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmitted(true);
      form.reset();
    } catch {
      setError(true);
    }
  };

  return (
    <section className="bg-[#ece8df] py-20 sm:py-24 border-b-4 border-black" id="field-tested">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-[#8a642f] text-xs font-black uppercase tracking-[0.24em] mb-3">
            <ClipboardCheck className="w-4 h-4" /> Field Tested
          </div>
          <h2 className="text-4xl sm:text-6xl font-display uppercase leading-none mb-4">Proof Has To Be Earned.</h2>
          <p className="text-sm font-semibold text-neutral-700 leading-relaxed">
            UNDA is collecting its first three verified field reports. Quotes will only appear here after a tester has used the product and approved their words for publication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            ['REPORT 01', 'Automotive / Diesel', 'Scent • grime removal • skin feel'],
            ['REPORT 02', 'Construction / Landscape', 'Lather • grit • post-shift feel'],
            ['REPORT 03', 'HVAC / Sheet Metal', 'Daily use • comfort • repurchase intent'],
          ].map(([num, trade, focus]) => (
            <article key={num} className="bg-white border-3 border-black p-6 min-h-48 shadow-[4px_4px_0_#c69a5f]">
              <div className="text-[10px] font-mono font-black tracking-widest text-[#8a642f] mb-8">{num}</div>
              <h3 className="font-display text-xl uppercase mb-2">{trade}</h3>
              <p className="text-xs text-neutral-600 font-semibold">{focus}</p>
              <div className="mt-6 pt-4 border-t-2 border-black text-[10px] font-black uppercase tracking-widest text-neutral-500">Tester feedback pending</div>
            </article>
          ))}
        </div>

        <div className="bg-black text-white border-3 border-black p-6 sm:p-8 grid lg:grid-cols-[0.75fr_1.25fr] gap-8 items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display uppercase text-[#c69a5f] mb-3">Submit A Field Report</h3>
            <p className="text-xs text-neutral-300 font-semibold leading-relaxed">
              For invited product testers. UNDA may follow up before publishing and will never change the meaning of your feedback.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white text-black p-5 border-2 border-[#c69a5f] flex items-center gap-3" role="status">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              <div><div className="text-xs font-black uppercase">Field report received.</div><div className="text-[11px] text-neutral-600 font-semibold">Thank you for putting UNDA to work.</div></div>
            </div>
          ) : (
            <form name="unda-tester-feedback" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
              <input type="hidden" name="form-name" value="unda-tester-feedback" />
              <input name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />
              <label className="text-[10px] font-black uppercase tracking-wider">Name
                <input name="name" required className="mt-1.5 w-full bg-white text-black border-2 border-white px-3 py-3 text-xs" />
              </label>
              <label className="text-[10px] font-black uppercase tracking-wider">Trade / Job
                <input name="trade" required className="mt-1.5 w-full bg-white text-black border-2 border-white px-3 py-3 text-xs" />
              </label>
              <label className="sm:col-span-2 text-[10px] font-black uppercase tracking-wider">Product Tested
                <select name="product" required className="mt-1.5 w-full bg-white text-black border-2 border-white px-3 py-3 text-xs">
                  <option value="">Select a product</option>
                  <option>The Reset</option><option>The Recharge</option><option>The Graveyard</option><option>The Cycle</option><option>The Rotation</option><option>The Full Shift</option>
                </select>
              </label>
              <label className="sm:col-span-2 text-[10px] font-black uppercase tracking-wider">Your Honest Feedback
                <textarea name="feedback" required rows={4} className="mt-1.5 w-full bg-white text-black border-2 border-white px-3 py-3 text-xs" placeholder="What did you notice about the scent, lather, cleaning, grit, and skin feel?" />
              </label>
              <label className="sm:col-span-2 flex gap-2 text-[10px] text-neutral-300 font-semibold leading-relaxed">
                <input type="checkbox" name="permission" value="yes" required className="mt-0.5" />
                I approve UNDA publishing my feedback with my trade and first name or initials.
              </label>
              <button type="submit" className="sm:col-span-2 bg-[#c69a5f] text-black border-2 border-[#c69a5f] py-3.5 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:border-white">
                Send Field Report <Send className="w-4 h-4" />
              </button>
              {error && <p className="sm:col-span-2 text-xs text-red-300 font-bold" role="alert">Couldn’t submit. Please email crew@undasoap.com.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
