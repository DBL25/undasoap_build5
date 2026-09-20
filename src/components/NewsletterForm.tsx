import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface NewsletterFormProps {
  source: string;
  compact?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ source, compact = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const body = new URLSearchParams({
      'form-name': 'unda-launch-list',
      email,
      source,
      'bot-field': '',
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error('Unable to join right now.');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border-2 border-black bg-white text-black p-4 flex items-center gap-3" role="status">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
        <div>
          <div className="text-xs font-black uppercase tracking-wider">You’re on the roster.</div>
          <div className="text-[11px] font-semibold text-neutral-600">We’ll send first-batch news—zero fluff.</div>
        </div>
      </div>
    );
  }

  return (
    <form
      name="unda-launch-list"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={compact ? 'space-y-2' : 'space-y-3'}
    >
      <input type="hidden" name="form-name" value="unda-launch-list" />
      <input type="hidden" name="source" value={source} />
      <p className="absolute overflow-hidden w-px h-px -m-px p-0 border-0" aria-hidden="true">
        <label>Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <label htmlFor={`launch-email-${source}`} className="sr-only">Email address</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id={`launch-email-${source}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="YOUR EMAIL ADDRESS"
          className="min-w-0 flex-1 bg-white text-black border-2 border-black px-4 py-3.5 text-xs font-bold placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-black/20"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-black text-[#c69a5f] border-2 border-black px-5 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === 'sending' ? 'Joining…' : 'Get The Drop'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[10px] font-mono font-bold text-black/70">
        Launch news, field tests, and first-batch access. Unsubscribe anytime.
      </p>
      {status === 'error' && (
        <p className="text-xs font-bold text-red-900" role="alert">
          We couldn’t add you just now. Email crew@undasoap.com and we’ll add you manually.
        </p>
      )}
    </form>
  );
};
