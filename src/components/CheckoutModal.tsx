import React, { useState } from 'react';
import { CartItem, CheckoutAddress } from '../types';
import { SHIPPING_METHODS } from '../data/commerce';
import { X, CheckCircle2, Truck, CreditCard, ArrowRight, ArrowLeft, Eye, WalletCards, AlertCircle } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'confirmation';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items }) => {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('address');
  const [selectedShippingId, setSelectedShippingId] = useState('standard');
  const [paymentPreview, setPaymentPreview] = useState<'card' | 'wallet'>('card');
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState<CheckoutAddress>({
    firstName: 'Demo',
    lastName: 'Customer',
    email: 'demo@example.com',
    phone: '(555) 010-2026',
    companyName: '',
    trade: 'Mechanic / Automotive',
    address1: '123 Sample Lane',
    address2: '',
    city: 'Sample City',
    state: 'FL',
    zipCode: '33020',
    country: 'United States',
    deliveryInstructions: '',
  });

  if (!isOpen) return null;

  const subtotal = Number(items.reduce((sum, item) => sum + item.selectedPack.price * item.quantity, 0).toFixed(2));
  const selectedShipping = SHIPPING_METHODS.find((method) => method.id === selectedShippingId) || SHIPPING_METHODS[0];
  const shippingCost = subtotal >= 35 && selectedShipping.id === 'standard' ? 0 : selectedShipping.price;
  const estimatedTax = Number((subtotal * 0.07).toFixed(2));
  const grandTotal = Number((subtotal + shippingCost + estimatedTax).toFixed(2));

  const continueToShipping = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    if (!address.firstName.trim() || !address.lastName.trim() || !address.email.includes('@')) {
      setErrorMessage('Keep the sample contact information or enter valid demonstration details.');
      return;
    }
    if (!address.address1.trim() || !address.city.trim() || !address.state.trim() || !address.zipCode.trim()) {
      setErrorMessage('Complete the sample destination to continue the walkthrough.');
      return;
    }
    setCheckoutStep('shipping');
  };

  const closeDemo = () => {
    setCheckoutStep('address');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white border-4 border-black w-full max-w-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(198,154,95,1)] my-auto">
        <div className="bg-[#0a0a0a] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-black border border-white/40 p-0.5 flex items-center justify-center shrink-0">
              <UndaLogo className="w-full h-full" variant="light" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg sm:text-xl tracking-wider text-white">UNDA</div>
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#c69a5f] truncate">
                Coming Soon — Explore the Checkout Demo
              </div>
            </div>
          </div>
          <button onClick={closeDemo} className="text-white hover:text-[#c69a5f] p-1 cursor-pointer" aria-label="Close checkout demo">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#c69a5f] text-black px-4 py-2 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-wider text-center border-b-2 border-black">
          <Eye className="w-4 h-4 shrink-0" />
          Demonstration only — no payment, order, or personal information is submitted
        </div>

        {checkoutStep !== 'confirmation' && (
          <div className="bg-neutral-100 px-4 sm:px-6 py-3 border-b-2 border-black grid grid-cols-3 text-center text-[10px] sm:text-xs font-black uppercase tracking-wider">
            {(['address', 'shipping', 'payment'] as CheckoutStep[]).map((step, index) => (
              <div key={step} className={`flex items-center justify-center gap-1.5 ${checkoutStep === step ? 'text-black' : 'text-neutral-400'}`}>
                <span className={`w-5 h-5 flex items-center justify-center ${checkoutStep === step ? 'bg-black text-white' : 'bg-neutral-300 text-neutral-600'}`}>{index + 1}</span>
                <span>{step === 'address' ? 'Delivery' : step === 'shipping' ? 'Shipping' : 'Preview'}</span>
              </div>
            ))}
          </div>
        )}

        <div className="p-5 sm:p-8 max-h-[78vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-5 p-3 bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMessage}
            </div>
          )}

          {checkoutStep === 'address' && (
            <form onSubmit={continueToShipping} className="space-y-5">
              <div>
                <h3 className="text-xl font-display text-black uppercase mb-1">1. Sample Delivery Details</h3>
                <p className="text-xs text-neutral-600 font-semibold">Use the prefilled sample information to explore the flow. Nothing is transmitted.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-black uppercase tracking-wider">First Name
                  <input value={address.firstName} onChange={(event) => setAddress({ ...address, firstName: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-3 py-2 text-sm normal-case font-semibold" />
                </label>
                <label className="text-xs font-black uppercase tracking-wider">Last Name
                  <input value={address.lastName} onChange={(event) => setAddress({ ...address, lastName: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-3 py-2 text-sm normal-case font-semibold" />
                </label>
                <label className="text-xs font-black uppercase tracking-wider">Email
                  <input type="email" value={address.email} onChange={(event) => setAddress({ ...address, email: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-3 py-2 text-sm normal-case font-semibold" />
                </label>
                <label className="text-xs font-black uppercase tracking-wider">Phone
                  <input value={address.phone} onChange={(event) => setAddress({ ...address, phone: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-3 py-2 text-sm normal-case font-semibold" />
                </label>
              </div>

              <label className="text-xs font-black uppercase tracking-wider block">Street Address
                <input value={address.address1} onChange={(event) => setAddress({ ...address, address1: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-3 py-2 text-sm normal-case font-semibold" />
              </label>

              <div className="grid grid-cols-3 gap-3">
                <label className="text-xs font-black uppercase tracking-wider">City
                  <input value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-2 py-2 text-xs normal-case font-semibold" />
                </label>
                <label className="text-xs font-black uppercase tracking-wider">State
                  <input value={address.state} onChange={(event) => setAddress({ ...address, state: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-2 py-2 text-xs normal-case font-semibold" />
                </label>
                <label className="text-xs font-black uppercase tracking-wider">ZIP
                  <input value={address.zipCode} onChange={(event) => setAddress({ ...address, zipCode: event.target.value })} className="mt-1 w-full bg-white border-2 border-black px-2 py-2 text-xs normal-case font-semibold" />
                </label>
              </div>

              <div className="pt-4 border-t-2 border-black flex justify-between items-center gap-4">
                <button type="button" onClick={closeDemo} className="text-xs font-bold uppercase text-neutral-600 hover:text-black">Return to Cart</button>
                <button type="submit" className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-5 sm:px-8 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer flex items-center gap-2">
                  Continue to Shipping <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display text-black uppercase mb-1">2. Shipping Preview</h3>
                <p className="text-xs text-neutral-600 font-semibold">Compare the proposed delivery options and totals.</p>
              </div>

              <div className="p-4 bg-neutral-50 border-2 border-black text-xs">
                <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold mb-1">Sample Destination</div>
                <div className="font-extrabold">{address.firstName} {address.lastName}</div>
                <div className="text-neutral-700">{address.address1}, {address.city}, {address.state} {address.zipCode}</div>
              </div>

              <div className="space-y-3">
                {SHIPPING_METHODS.map((method) => {
                  const effectivePrice = subtotal >= 35 && method.id === 'standard' ? 0 : method.price;
                  return (
                    <button key={method.id} type="button" onClick={() => setSelectedShippingId(method.id)} className={`w-full p-4 border-2 flex items-center justify-between text-left transition-all ${selectedShippingId === method.id ? 'border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(198,154,95,1)]' : 'border-neutral-300 bg-white text-black hover:border-black'}`}>
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-[#c69a5f]" />
                        <div><div className="font-black text-xs uppercase">{method.name}</div><div className="text-[11px] opacity-70">{method.duration}</div></div>
                      </div>
                      <div className="font-display text-sm">{effectivePrice === 0 ? 'FREE' : `$${effectivePrice.toFixed(2)}`}</div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                <button type="button" onClick={() => setCheckoutStep('address')} className="text-xs font-bold uppercase text-neutral-600 hover:text-black flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
                <button type="button" onClick={() => setCheckoutStep('payment')} className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-5 sm:px-8 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer flex items-center gap-2">Continue to Preview <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display text-black uppercase mb-1">3. Payment Experience Preview</h3>
                <p className="text-xs text-neutral-600 font-semibold">Choose a display state. No financial information is requested or processed.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setPaymentPreview('card')} className={`p-4 border-2 text-xs font-black uppercase flex items-center justify-center gap-2 ${paymentPreview === 'card' ? 'bg-black text-[#c69a5f] border-black' : 'bg-white text-black border-neutral-300'}`}><CreditCard className="w-5 h-5" /> Card Preview</button>
                <button type="button" onClick={() => setPaymentPreview('wallet')} className={`p-4 border-2 text-xs font-black uppercase flex items-center justify-center gap-2 ${paymentPreview === 'wallet' ? 'bg-black text-[#c69a5f] border-black' : 'bg-white text-black border-neutral-300'}`}><WalletCards className="w-5 h-5" /> Wallet Preview</button>
              </div>

              <div className="p-5 bg-neutral-50 border-2 border-black">
                <div className="text-xs font-black uppercase mb-1">Coming with launch</div>
                <p className="text-xs text-neutral-600 font-semibold">Secure payment fields and supported wallets will appear here after a real payment processor is connected.</p>
              </div>

              <div className="p-4 bg-black text-white border-2 border-black space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300"><span>Items Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-neutral-300"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-neutral-300"><span>Estimated Tax (Demo)</span><span>${estimatedTax.toFixed(2)}</span></div>
                <div className="flex justify-between text-base font-black pt-2 border-t border-white/20 text-[#c69a5f]"><span>Preview Total</span><span className="font-display text-xl text-white">${grandTotal.toFixed(2)}</span></div>
              </div>

              <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                <button type="button" onClick={() => setCheckoutStep('shipping')} className="text-xs font-bold uppercase text-neutral-600 hover:text-black flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
                <button type="button" onClick={() => setCheckoutStep('confirmation')} className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-5 sm:px-8 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer">Complete Demo — ${grandTotal.toFixed(2)}</button>
              </div>
            </div>
          )}

          {checkoutStep === 'confirmation' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 border-2 border-emerald-500 flex items-center justify-center mx-auto"><CheckCircle2 className="w-10 h-10" /></div>
              <div>
                <div className="inline-block bg-black text-[#c69a5f] text-xs font-mono font-black uppercase px-3 py-1 mb-3">Checkout Demo Complete</div>
                <h3 className="text-2xl sm:text-3xl font-display text-black uppercase">No Order Was Placed</h3>
                <p className="text-sm text-neutral-600 font-semibold mt-2 max-w-lg mx-auto">You reached the end of the coming-soon checkout experience. No payment was processed, no order or tracking number was created, and the sample information was not submitted.</p>
              </div>
              <button type="button" onClick={closeDemo} className="w-full bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black py-4 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer">Return to UNDA</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
