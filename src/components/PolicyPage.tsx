import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

type Policy = { title: string; intro: string; sections: { heading: string; body: string }[] };

const POLICIES: Record<string, Policy> = {
  shipping: {
    title: 'Shipping Policy',
    intro: 'Draft prelaunch policy — effective September 20, 2026. Final fulfillment timing will be posted before paid ordering opens.',
    sections: [
      { heading: 'Current status', body: 'UNDA is in prelaunch. Newsletter and demo submissions do not create an order, charge a card, or reserve inventory.' },
      { heading: 'Processing', body: 'When ordering opens, each product page and checkout will show the current processing estimate. Small-batch or preorder items may require additional production time, which will be disclosed before purchase.' },
      { heading: 'Delivery', body: 'Proposed standard delivery is 3–5 business days after dispatch within the contiguous United States. Carrier delays and address errors may affect delivery. Tracking will be emailed when available.' },
      { heading: 'Shipping charges', body: 'The current storefront preview proposes free standard shipping on orders of $35 or more. Final rates and eligible locations will be confirmed before launch.' },
      { heading: 'Lost or damaged packages', body: 'Contact crew@undasoap.com with your order number and photos of damaged packaging or products. UNDA will review carrier loss and transit-damage reports individually.' },
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    intro: 'Draft prelaunch policy — effective September 20, 2026. This policy will be finalized before paid ordering opens.',
    sections: [
      { heading: 'Personal-care products', body: 'For hygiene and safety, opened or used soap and personal-care products are generally not returnable unless they arrived damaged, defective, or incorrect.' },
      { heading: 'Unopened returns', body: 'Unopened, unused items in original condition may be eligible for return within 14 days of confirmed delivery. Contact UNDA before sending anything back so the return can be authorized.' },
      { heading: 'Problems with an order', body: 'Report damaged, defective, missing, or incorrect items within 7 days of delivery at crew@undasoap.com. Include the order number and clear photos when applicable.' },
      { heading: 'Refund timing', body: 'Approved refunds will be issued to the original payment method. Bank processing time may vary. Original shipping charges are not refundable unless UNDA made the error.' },
      { heading: 'Preorders', body: 'Any paid preorder will display its estimated fulfillment window and cancellation terms before payment. Those product-specific terms will control if they differ from this general draft.' },
    ],
  },
  privacy: {
    title: 'Privacy Notice',
    intro: 'Draft prelaunch notice — effective September 20, 2026.',
    sections: [
      { heading: 'Information collected', body: 'UNDA may collect information you submit, including email address, tester feedback, name, trade, and—after commerce launches—order and delivery details. The prelaunch demo does not submit or store sample checkout information.' },
      { heading: 'How information is used', body: 'Information may be used to send requested launch updates, respond to support requests, evaluate product feedback, operate the storefront, and fulfill orders once sales open.' },
      { heading: 'Service providers', body: 'UNDA may use hosting, form-processing, email, analytics, payment, and shipping providers only as needed to operate the site and business. Their own privacy terms may also apply.' },
      { heading: 'Email choices', body: 'You may unsubscribe from marketing email at any time using an unsubscribe link or by contacting crew@undasoap.com.' },
      { heading: 'Contact', body: 'Questions or requests about personal information may be sent to crew@undasoap.com. Additional rights and disclosures will be added as services, markets, and legal requirements are finalized.' },
    ],
  },
  terms: {
    title: 'Website Terms',
    intro: 'Draft prelaunch terms — effective September 20, 2026.',
    sections: [
      { heading: 'Prelaunch site', body: 'The public site and private storefront are previews while UNDA completes product development. Product details, availability, packaging, policies, and launch timing may change before paid ordering opens.' },
      { heading: 'No order in the demo', body: 'Adding demo products to the workshop cart or completing the payment preview does not create an order, reserve inventory, process payment, or form a sales contract.' },
      { heading: 'Product information', body: 'Formula highlights are provided for planning and brand review. Final ingredient declarations, net weight, directions, warnings, and manufacturing details will appear on the finished product and live sales page.' },
      { heading: 'Acceptable use', body: 'You may use the site for personal evaluation and legitimate business interaction. You may not interfere with the site, misuse forms, attempt unauthorized access, or copy UNDA branding and product photography for commercial use.' },
      { heading: 'Contact', body: 'Questions about these terms may be sent to crew@undasoap.com. Final purchase terms will be presented before checkout when sales open.' },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    intro: 'Straight answers for the prelaunch workshop.',
    sections: [
      { heading: 'Can I order UNDA now?', body: 'Not yet. The public site is collecting launch-list signups and the password-protected storefront is an early demo. No payment is processed in the demo.' },
      { heading: 'When will the first batch launch?', body: 'The date will be announced after final formulas, labels, production timing, and field testing are confirmed. Launch-list members will hear first.' },
      { heading: 'Are the ingredients final?', body: 'No. The site currently shows confirmed formula highlights, not a final legal ingredient declaration. The complete declaration will publish before sales open.' },
      { heading: 'Will subscriptions be available?', body: 'UNDA is planning Shift Supply recurring delivery. Frequency, savings, eligible products, and cancellation terms will be announced before enrollment opens.' },
      { heading: 'How do I become a tester?', body: 'Email crew@undasoap.com with your trade, typical grime exposure, and location. Tester spots are limited and participation does not guarantee publication.' },
    ],
  },
};

export const PolicyPage: React.FC<{ slug: string }> = ({ slug }) => {
  const policy = POLICIES[slug] || POLICIES.faq;
  return (
    <div className="min-h-screen bg-[#ece8df] text-black">
      <header className="bg-[#0a0a0a] text-white border-b-4 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3"><UndaLogo className="w-10 h-10 text-white" variant="light" /><span className="font-display text-2xl tracking-wider">UNDA</span></a>
          <a href="/" className="text-[10px] font-black uppercase tracking-widest text-[#c69a5f] flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Prelaunch Home</a>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-[10px] font-mono font-black uppercase tracking-[0.24em] text-[#8a642f] mb-3">Workshop Policies</div>
        <h1 className="text-4xl sm:text-6xl font-display uppercase leading-none mb-5">{policy.title}</h1>
        <p className="text-sm font-bold text-neutral-600 leading-relaxed pb-8 border-b-3 border-black">{policy.intro}</p>
        <div className="divide-y-2 divide-black">
          {policy.sections.map((section) => (
            <section key={section.heading} className="py-7 grid sm:grid-cols-[0.38fr_0.62fr] gap-4 sm:gap-8">
              <h2 className="font-display text-lg uppercase">{section.heading}</h2>
              <p className="text-sm text-neutral-700 font-semibold leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-10 p-5 bg-[#c69a5f] border-3 border-black text-xs font-bold">
          These are working prelaunch drafts, not legal advice. UNDA will review and update them before accepting payment.
        </div>
      </main>
    </div>
  );
};
