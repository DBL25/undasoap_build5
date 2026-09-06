import React, { useState } from 'react';
import { CartItem, Product, ProductPackOption } from '../types';
import { PROMO_CODES } from '../data/reviews';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Sparkles, Tag, Check, ShoppingBag, Truck } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  products: Product[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (product: Product, pack: ProductPackOption) => void;
  onProceedToCheckout: (appliedPromo?: string, discountAmount?: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  // Free shipping threshold: $35
  const FREE_SHIPPING_THRESHOLD = 35;

  const rawSubtotal = items.reduce((acc, item) => {
    const itemPrice = item.isSubscription 
      ? Number((item.selectedPack.price * 0.85).toFixed(2)) 
      : item.selectedPack.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const subtotal = Number(rawSubtotal.toFixed(2));
  const amountToFreeShipping = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)));
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Calculate promo discount
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discountAmount = Number(((subtotal * promo.discountPercent) / 100).toFixed(2));
    }
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try DIRTYWORK10 or FREESHIP');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  // Workshop quick add-on suggestion (e.g. Sisal Pouch)
  const addOnSuggestion = products.find(p => p.id === 'sisal-soap-saver-pouch');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0a] text-white border-l-4 border-black flex flex-col shadow-2xl">
          
          {/* Drawer Top Header */}
          <div className="p-5 sm:p-6 border-b-2 border-white/20 flex items-center justify-between bg-[#141414]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black border border-white/30 p-0.5 flex items-center justify-center">
                <UndaLogo className="w-full h-full text-white" variant="light" />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg tracking-wider uppercase text-white leading-tight">
                  Cart ({items.reduce((acc, i) => acc + i.quantity * i.selectedPack.count, 0)})
                </h3>
                <span className="text-[9px] font-mono text-[#c69a5f] uppercase tracking-widest block">
                  UNDA DIRTY WORK CARE
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              id="cartClose"
              className="text-white hover:text-[#c69a5f] p-1 font-bold text-xs uppercase tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <span>Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#1c1c1c] p-4 border-b border-white/10">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Truck className="w-4 h-4 text-[#c69a5f]" />
                <span>
                  {amountToFreeShipping === 0 ? (
                    <strong className="text-emerald-400 font-extrabold uppercase">✓ Qualified for Free US Shipping!</strong>
                  ) : (
                    <>Add <strong className="text-[#c69a5f]">${amountToFreeShipping}</strong> more for Free Shipping</>
                  )}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">{freeShippingProgress}%</span>
            </div>

            <div className="w-full h-2 bg-neutral-800 border border-black overflow-hidden">
              <div
                className="h-full bg-[#c69a5f] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 bg-white/5 border border-white/20 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8 text-[#c69a5f]/60" />
                </div>
                <h4 className="text-xl font-display text-white uppercase">Your Cart Is Empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Add a heavy-duty scrub bar or The Full Shift to get your workshop clean.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#c69a5f] text-black font-extrabold uppercase text-xs px-6 py-3.5 border-2 border-black tracking-wider cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemUnitPrice = item.isSubscription
                  ? Number((item.selectedPack.price * 0.85).toFixed(2))
                  : item.selectedPack.price;
                const lineTotal = Number((itemUnitPrice * item.quantity).toFixed(2));

                return (
                  <div 
                    key={item.id}
                    className="p-4 bg-[#141414] border-2 border-white/20 flex gap-4 items-start relative group"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover border border-white/20 photo-grit flex-shrink-0"
                    />

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-display text-sm text-white uppercase leading-tight truncate">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-[#c69a5f] font-bold">
                        {item.selectedPack.name.split('(')[0]}
                      </div>

                      {item.isSubscription && (
                        <div className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 border border-emerald-700 w-fit uppercase font-bold">
                          Auto-Ship 6 Wks (-15%)
                        </div>
                      )}

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/30 bg-black">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-display text-sm text-white">
                            ${lineTotal}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-neutral-500 font-mono">
                              (${itemUnitPrice} ea)
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}

            {/* Workshop Addon Suggestion */}
            {items.length > 0 && addOnSuggestion && !items.some(i => i.product.id === addOnSuggestion.id) && (
              <div className="p-3.5 bg-neutral-900 border border-[#c69a5f]/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={addOnSuggestion.image}
                    alt={addOnSuggestion.name}
                    className="w-12 h-12 object-cover border border-white/20 flex-shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-[10px] text-[#c69a5f] font-mono uppercase font-bold">Addon Recommendation</div>
                    <div className="text-xs font-bold text-white truncate">{addOnSuggestion.name}</div>
                    <div className="text-xs font-black text-white">${addOnSuggestion.price}</div>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(addOnSuggestion, addOnSuggestion.packOptions[0])}
                  className="bg-[#c69a5f] text-black text-[10px] font-black uppercase px-3 py-2 border border-black hover:bg-white flex-shrink-0 cursor-pointer"
                >
                  + Add (${addOnSuggestion.price})
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#141414] border-t-2 border-white/20 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedPromo}</strong> Applied!</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-neutral-400 hover:text-white text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. DIRTYWORK10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-black border border-white/30 px-3 py-2 text-xs uppercase font-bold text-white focus:outline-none focus:border-[#c69a5f]"
                    />
                    <button
                      type="submit"
                      className="bg-white hover:bg-[#c69a5f] text-black font-extrabold text-xs px-4 py-2 uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-red-400 font-bold">{promoError}</div>
                )}
              </form>

              {/* Subtotals breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-white font-mono font-bold">${subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount ({appliedPromo})</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white font-mono font-bold">
                    {subtotal >= FREE_SHIPPING_THRESHOLD || (appliedPromo && PROMO_CODES[appliedPromo]?.freeShipping) ? (
                      <span className="text-emerald-400 uppercase font-black">Free</span>
                    ) : (
                      '$4.99'
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-white font-black pt-2 border-t border-white/15">
                  <span className="uppercase">Estimated Total</span>
                  <span className="font-display text-lg text-[#c69a5f]">
                    ${Math.max(0, Number((subtotal - discountAmount + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99)).toFixed(2)))}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(appliedPromo || undefined, discountAmount)}
                id="proceed-checkout-btn"
                className="w-full bg-[#c69a5f] hover:bg-white text-black py-4 font-black uppercase text-xs sm:text-sm tracking-widest border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-bold pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span>•</span>
                <span>Job Site Guarantee</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
