import React, { useState } from 'react';
import { CartItem, CheckoutAddress, ShippingMethod, Order } from '../types';
import { SHIPPING_METHODS, PROMO_CODES } from '../data/reviews';
import { X, ShieldCheck, Lock, CheckCircle2, Truck, CreditCard, ArrowRight, ArrowLeft, Printer, Sparkles, Building, AlertCircle } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo?: string;
  discountAmount?: number;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  discountAmount = 0,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<'address' | 'shipping' | 'payment' | 'confirmation'>('address');

  // Form State
  const [address, setAddress] = useState<CheckoutAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    trade: 'Mechanic / Automotive',
    address1: '',
    address2: '',
    city: '',
    state: 'OH',
    zipCode: '',
    country: 'United States',
    deliveryInstructions: 'Leave near workshop side door',
  });

  const [customTrade, setCustomTrade] = useState('');
  const [selectedShippingId, setSelectedShippingId] = useState('standard');
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'shop_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Generated completed order
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Subtotal and calculations
  const rawSubtotal = items.reduce((acc, item) => {
    const unitPrice = item.isSubscription
      ? Number((item.selectedPack.price * 0.85).toFixed(2))
      : item.selectedPack.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const subtotal = Number(rawSubtotal.toFixed(2));
  const isFreeShipping = subtotal >= 35 || (appliedPromo && PROMO_CODES[appliedPromo]?.freeShipping);

  const selectedShipping = SHIPPING_METHODS.find(s => s.id === selectedShippingId) || SHIPPING_METHODS[0];
  const shippingCost = isFreeShipping && selectedShipping.id === 'standard' ? 0 : selectedShipping.price;

  const estimatedTax = Number(((subtotal - discountAmount) * 0.07).toFixed(2));
  const grandTotal = Number(Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax).toFixed(2));

  // Step 1 Validation
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!address.firstName.trim() || !address.lastName.trim()) {
      setErrorMessage('Please enter your full first and last name.');
      return;
    }
    if (!address.email.trim() || !address.email.includes('@')) {
      setErrorMessage('Please provide a valid email address for tracking updates.');
      return;
    }
    if (!address.address1.trim() || !address.city.trim() || !address.zipCode.trim()) {
      setErrorMessage('Please complete your street address, city, and ZIP code.');
      return;
    }
    setCheckoutStep('shipping');
  };

  // Step 2 Validation
  const handleProceedToPayment = () => {
    setCheckoutStep('payment');
  };

  // Step 3: Complete Order
  const handlePlaceOrder = () => {
    setErrorMessage('');
    if (paymentMethod === 'card') {
      if (!cardName.trim() && !address.firstName) {
        setErrorMessage('Please enter the name on your card.');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `UNDA-${Math.floor(10000 + Math.random() * 90000)}`;
      const generatedTracking = `1Z9999999${Math.floor(100000000 + Math.random() * 900000000)}`;

      const order: Order = {
        orderId: generatedOrderId,
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items,
        address,
        shippingMethod: selectedShipping,
        paymentMethod: paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod.replace('_', ' ').toUpperCase(),
        subtotal,
        discount: discountAmount,
        discountCode: appliedPromo,
        shippingCost,
        tax: estimatedTax,
        total: grandTotal,
        status: 'Confirmed',
        estimatedDelivery: '3-4 Business Days',
        trackingNumber: generatedTracking,
      };

      setCompletedOrder(order);
      setCheckoutStep('confirmation');
      onOrderCompleted(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white border-4 border-black w-full max-w-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(198,154,95,1)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0a0a0a] text-white px-6 py-4 flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black border border-white/40 p-0.5 flex items-center justify-center">
              <UndaLogo className="w-full h-full text-white" variant="light" />
            </div>
            <div className="font-display text-xl tracking-wider text-white">UNDA</div>
            <div className="text-neutral-400 text-xs hidden sm:inline">|</div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#c69a5f]">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>
          {checkoutStep !== 'confirmation' && (
            <button
              onClick={onClose}
              className="text-white hover:text-[#c69a5f] p-1 cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Tracker */}
        {checkoutStep !== 'confirmation' && (
          <div className="bg-neutral-100 px-6 py-3 border-b-2 border-black grid grid-cols-3 text-center text-xs font-black uppercase tracking-wider">
            <div className={`flex items-center justify-center gap-1.5 ${checkoutStep === 'address' ? 'text-black font-black' : 'text-neutral-400'}`}>
              <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] flex items-center justify-center">1</span>
              <span>Delivery</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 ${checkoutStep === 'shipping' ? 'text-black font-black' : 'text-neutral-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${checkoutStep === 'shipping' || checkoutStep === 'payment' ? 'bg-black text-white' : 'bg-neutral-300 text-neutral-600'}`}>2</span>
              <span>Shipping</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 ${checkoutStep === 'payment' ? 'text-black font-black' : 'text-neutral-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${checkoutStep === 'payment' ? 'bg-black text-white' : 'bg-neutral-300 text-neutral-600'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Main Content Container */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Delivery Address Form */}
          {checkoutStep === 'address' && (
            <form onSubmit={handleProceedToShipping} className="space-y-6">
              <div>
                <h3 className="text-xl font-display text-black uppercase mb-1">
                  1. Contact & Job Site Destination
                </h3>
                <p className="text-xs text-neutral-600 font-semibold">
                  Where should we dispatch this batch?
                </p>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Email Address (For Tracking & Invoice) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tradesman@workshop.com"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Mobile Phone (For Delivery SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 839-2049"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  />
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mike"
                    value={address.firstName}
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Davidson"
                    value={address.lastName}
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  />
                </div>
              </div>

              {/* Company / Shop & Trade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Company / Workshop Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Diesel & Fabrication"
                    value={address.companyName}
                    onChange={(e) => setAddress({ ...address, companyName: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Primary Trade / Industry
                  </label>
                  <select
                    value={address.trade === 'Other' || !['Mechanic / Automotive', 'Welder / Metal Fabricator', 'Carpenter / Woodworker', 'Construction / Drywaller', 'Landscaper / Forestry', 'Plumber / Pipefitter', 'Weekend DIY / Garage'].includes(address.trade) ? 'Other' : address.trade}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        setAddress({ ...address, trade: customTrade || 'Other' });
                      } else {
                        setAddress({ ...address, trade: val });
                      }
                    }}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  >
                    <option value="Mechanic / Automotive">Mechanic / Automotive</option>
                    <option value="Welder / Metal Fabricator">Welder / Metal Fabricator</option>
                    <option value="Carpenter / Woodworker">Carpenter / Woodworker</option>
                    <option value="Construction / Drywaller">Construction / Drywaller</option>
                    <option value="Landscaper / Forestry">Landscaper / Forestry</option>
                    <option value="Plumber / Pipefitter">Plumber / Pipefitter</option>
                    <option value="Weekend DIY / Garage">Weekend DIY / Garage</option>
                    <option value="Other">Other (Specify Trade)</option>
                  </select>

                  {(address.trade === 'Other' || !['Mechanic / Automotive', 'Welder / Metal Fabricator', 'Carpenter / Woodworker', 'Construction / Drywaller', 'Landscaper / Forestry', 'Plumber / Pipefitter', 'Weekend DIY / Garage'].includes(address.trade)) && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Enter your trade (e.g. Electrician, Blacksmith, Machinist)..."
                        value={customTrade}
                        onChange={(e) => {
                          setCustomTrade(e.target.value);
                          setAddress({ ...address, trade: e.target.value || 'Other' });
                        }}
                        className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Address Lines */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Street Address (Job Site, Shop, or Residence) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="104 Industrial Way, Unit B"
                    value={address.address1}
                    onChange={(e) => setAddress({ ...address, address1: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Columbus"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="OH"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="43215"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                  Delivery Notes / Gate Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave inside shop bay or behind front gate"
                  value={address.deliveryInstructions}
                  onChange={(e) => setAddress({ ...address, deliveryInstructions: e.target.value })}
                  className="w-full bg-white border border-neutral-300 p-2 text-xs font-medium"
                />
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold uppercase text-neutral-600 hover:text-black"
                >
                  Return to Cart
                </button>
                <button
                  type="submit"
                  className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-8 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Method Selector */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display text-black uppercase mb-1">
                  2. Select Shipping Method
                </h3>
                <p className="text-xs text-neutral-600 font-semibold">
                  Dispatched in plastic-free heavy-duty reinforced kraft cartons.
                </p>
              </div>

              {/* Shipping address summary card */}
              <div className="p-4 bg-neutral-50 border-2 border-black text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="uppercase text-neutral-500 font-mono">Shipping To:</span>
                  <button 
                    onClick={() => setCheckoutStep('address')}
                    className="text-[#a97e45] underline font-bold"
                  >
                    Edit
                  </button>
                </div>
                <div className="font-extrabold text-black">
                  {address.firstName} {address.lastName} {address.companyName && `(${address.companyName})`}
                </div>
                <div className="text-neutral-700">
                  {address.address1}, {address.city}, {address.state} {address.zipCode}
                </div>
              </div>

              {/* Shipping options */}
              <div className="space-y-3">
                {SHIPPING_METHODS.map((method) => {
                  const effectivePrice = isFreeShipping && method.id === 'standard' ? 0 : method.price;
                  return (
                    <label
                      key={method.id}
                      onClick={() => setSelectedShippingId(method.id)}
                      className={`p-4 border-2 flex items-center justify-between cursor-pointer transition-all ${
                        selectedShippingId === method.id
                          ? 'border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(198,154,95,1)]'
                          : 'border-neutral-300 bg-white text-black hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingOption"
                          checked={selectedShippingId === method.id}
                          onChange={() => setSelectedShippingId(method.id)}
                          className="accent-[#c69a5f]"
                        />
                        <div>
                          <div className="font-black text-xs uppercase">{method.name}</div>
                          <div className={`text-[11px] ${selectedShippingId === method.id ? 'text-[#c69a5f]' : 'text-neutral-500'}`}>
                            {method.duration} • {method.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-display font-black text-right">
                        {effectivePrice === 0 ? (
                          <span className="text-emerald-400 font-black uppercase">Free</span>
                        ) : (
                          `$${effectivePrice.toFixed(2)}`
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('address')}
                  className="text-xs font-bold uppercase text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-8 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Details */}
          {checkoutStep === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display text-black uppercase mb-1">
                  3. Secure Payment
                </h3>
                <p className="text-xs text-neutral-600 font-semibold">
                  All transactions are encrypted with PCI-compliant bank-grade security.
                </p>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card' as const, label: 'Credit Card', icon: CreditCard },
                  { id: 'apple_pay' as const, label: 'Apple Pay', icon: ShieldCheck },
                  { id: 'shop_pay' as const, label: 'ShopPay', icon: Sparkles },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`py-3 px-2 text-center border-2 text-xs font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === pm.id
                        ? 'border-black bg-black text-[#c69a5f] shadow-[2px_2px_0px_0px_rgba(198,154,95,1)]'
                        : 'border-neutral-300 bg-white text-black hover:border-black'
                    }`}
                  >
                    <pm.icon className="w-4 h-4" />
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' ? (
                <div className="p-5 bg-neutral-50 border-2 border-black space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                      Card Number *
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border-2 border-black pl-10 pr-3 py-2 text-xs sm:text-sm font-mono font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        placeholder={address.firstName ? `${address.firstName} ${address.lastName}` : 'M. Davidson'}
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                        Expires *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-mono font-bold focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                        Security CVC *
                      </label>
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-mono font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-neutral-50 border-2 border-black text-center space-y-3">
                  <div className="text-xs font-bold text-neutral-600">
                    Ready to complete with 1-Click Fast Checkout via {paymentMethod === 'apple_pay' ? 'Apple Pay' : 'ShopPay'}.
                  </div>
                  <div className="text-xs font-mono text-[#a97e45] font-black uppercase">
                    Fingerprint / Face ID Verified
                  </div>
                </div>
              )}

              {/* Order Total Breakdown Box */}
              <div className="p-4 bg-black text-white border-2 border-black space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-bold">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Promo Code ({appliedPromo}):</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-300">
                  <span>Shipping ({selectedShipping.name}):</span>
                  <span className="font-mono font-bold">
                    {shippingCost === 0 ? <span className="text-emerald-400 uppercase">Free</span> : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Estimated State & Local Tax:</span>
                  <span className="font-mono font-bold">${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-base font-black pt-2 border-t border-white/20 text-[#c69a5f]">
                  <span className="uppercase">Total Amount Charged:</span>
                  <span className="font-display text-xl text-white">${grandTotal}</span>
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('shipping')}
                  className="text-xs font-bold uppercase text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Shipping</span>
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Authorizing Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Order (${grandTotal})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Live Order Confirmation & Receipt */}
          {checkoutStep === 'confirmation' && completedOrder && (
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 border-2 border-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-block bg-black text-[#c69a5f] text-xs font-mono font-black uppercase px-3 py-1 mb-2">
                  Order Confirmed • Packing In Workshop
                </div>
                <h3 className="text-2xl sm:text-3xl font-display text-black uppercase">
                  Thank You, {completedOrder.address.firstName}!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-semibold mt-1">
                  We’ve received your order and our soapmakers are hand-packing your batch right now.
                </p>
              </div>

              {/* Order Meta Box */}
              <div className="bg-neutral-50 border-3 border-black p-6 text-left space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b-2 border-neutral-200">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Order Number</span>
                    <span className="font-display text-sm font-black text-black">{completedOrder.orderId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Date</span>
                    <span className="font-bold text-black">{completedOrder.orderDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Tracking #</span>
                    <span className="font-mono font-bold text-black truncate block">{completedOrder.trackingNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Est. Delivery</span>
                    <span className="font-bold text-emerald-700">{completedOrder.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Items in order */}
                <div>
                  <h4 className="font-black uppercase text-black mb-2">Batch Items:</h4>
                  <div className="space-y-2">
                    {completedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white p-2 border border-neutral-200">
                        <div className="flex items-center gap-2">
                          <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover border border-black photo-grit" />
                          <div>
                            <div className="font-extrabold text-black">{item.product.name}</div>
                            <div className="text-[10px] text-neutral-500 font-mono">
                              Qty: {item.quantity} • {item.selectedPack.name.split('(')[0]}
                            </div>
                          </div>
                        </div>
                        <div className="font-black text-black">
                          ${(item.selectedPack.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address & Total summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t-2 border-neutral-200">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Shipping To</span>
                    <div className="font-bold text-black">{completedOrder.address.firstName} {completedOrder.address.lastName}</div>
                    <div className="text-neutral-600">{completedOrder.address.address1}, {completedOrder.address.city}, {completedOrder.address.state} {completedOrder.address.zipCode}</div>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Total Paid ({completedOrder.paymentMethod})</span>
                    <div className="font-display text-2xl font-black text-black">${completedOrder.total}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-white hover:bg-neutral-100 text-black px-6 py-3.5 text-xs font-black uppercase tracking-wider border-2 border-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Shift Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  Return to Workshop
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
