import React from 'react';
import { CartItem, Product, ProductPackOption } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Eye } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  products: Product[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (product: Product, pack: ProductPackOption) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 35;

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
  const subtotal = Number(items.reduce((sum, item) => sum + item.selectedPack.price * item.quantity, 0).toFixed(2));
  const amountToFreeShipping = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)));
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
  const estimatedTotal = Number((subtotal + shipping).toFixed(2));

  // Full Shift is suggested only after a visitor has intentionally added another product.
  const fullShiftSuggestion = products.find((product) => product.id === 'the-full-shift-kit');
  const showFullShiftSuggestion = Boolean(
    items.length > 0 &&
    fullShiftSuggestion &&
    !items.some((item) => item.product.id === 'the-full-shift-kit')
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-xs" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0a] text-white border-l-4 border-black flex flex-col shadow-2xl">
          <div className="p-5 sm:p-6 border-b-2 border-white/20 flex items-center justify-between bg-[#141414]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black border border-white/30 p-0.5 flex items-center justify-center">
                <UndaLogo className="w-full h-full" variant="light" />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg tracking-wider uppercase text-white leading-tight">
                  Cart ({items.reduce((sum, item) => sum + item.quantity * item.selectedPack.count, 0)})
                </h3>
                <span className="text-[9px] font-mono text-[#c69a5f] uppercase tracking-widest block">
                  UNDA Dirty Work Care
                </span>
              </div>
            </div>
            <button onClick={onClose} id="cartClose" className="text-white hover:text-[#c69a5f] p-1 text-xs font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer">
              <span>Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#1c1c1c] p-4 border-b border-white/10">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Truck className="w-4 h-4 text-[#c69a5f]" />
                <span>
                  {amountToFreeShipping === 0 ? (
                    <strong className="text-emerald-400 font-extrabold uppercase">Free standard shipping unlocked</strong>
                  ) : (
                    <>Add <strong className="text-[#c69a5f]">${amountToFreeShipping}</strong> more for free shipping</>
                  )}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 border border-black overflow-hidden">
              <div className="h-full bg-[#c69a5f] transition-all duration-300" style={{ width: `${freeShippingProgress}%` }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 bg-white/5 border border-white/20 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-[#c69a5f]/70" />
                </div>
                <h4 className="text-xl font-display text-white uppercase">Your Cart Is Empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Start with a single bar or build the complete shift system.
                </p>
                <button onClick={onClose} className="bg-[#c69a5f] text-black font-extrabold uppercase text-xs px-6 py-3.5 border-2 border-black tracking-wider cursor-pointer">
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const lineTotal = Number((item.selectedPack.price * item.quantity).toFixed(2));
                return (
                  <div key={item.id} className="p-4 bg-[#141414] border-2 border-white/20 flex gap-4 items-start">
                    <img src={item.product.image} alt={item.product.name} className="w-18 h-18 object-cover border border-white/20 photo-grit flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-display text-sm text-white uppercase leading-tight truncate">{item.product.name}</h5>
                        <button onClick={() => onRemoveItem(item.id)} className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer" aria-label="Remove item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#c69a5f] font-bold">{item.selectedPack.name.split('(')[0]}</div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/30 bg-black">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-neutral-400 hover:text-white" aria-label="Decrease quantity"><Minus className="w-3 h-3" /></button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-neutral-400 hover:text-white" aria-label="Increase quantity"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="font-display text-sm text-white">${lineTotal}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {showFullShiftSuggestion && fullShiftSuggestion && (
              <div className="p-3.5 bg-neutral-900 border border-[#c69a5f]/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={fullShiftSuggestion.image} alt={fullShiftSuggestion.name} className="w-12 h-12 object-cover border border-white/20 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#c69a5f] font-mono uppercase font-bold">Complete the system</div>
                    <div className="text-xs font-bold text-white truncate">The Full Shift</div>
                    <div className="text-xs font-black text-white">${fullShiftSuggestion.price}</div>
                  </div>
                </div>
                <button onClick={() => onAddToCart(fullShiftSuggestion, fullShiftSuggestion.packOptions[0])} className="bg-[#c69a5f] text-black text-[10px] font-black uppercase px-3 py-2 border border-black hover:bg-white flex-shrink-0 cursor-pointer">
                  + Add (${fullShiftSuggestion.price})
                </button>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-[#141414] border-t-2 border-white/20 space-y-4">
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between"><span>Cart Subtotal</span><span className="text-white font-mono font-bold">${subtotal}</span></div>
                <div className="flex justify-between"><span>Estimated Shipping</span><span className="text-white font-mono font-bold">{shipping === 0 ? <span className="text-emerald-400 uppercase font-black">Free</span> : '$4.99'}</span></div>
                <div className="flex justify-between text-sm text-white font-black pt-2 border-t border-white/15"><span className="uppercase">Estimated Total</span><span className="font-display text-lg text-[#c69a5f]">${estimatedTotal}</span></div>
              </div>

              <button onClick={onProceedToCheckout} id="proceed-checkout-btn" className="w-full bg-[#c69a5f] hover:bg-white text-black py-4 font-black uppercase text-xs sm:text-sm tracking-widest border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                <span>Explore Checkout Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 font-bold">
                <Eye className="w-3.5 h-3.5 text-[#c69a5f]" />
                <span>Coming soon — no payment will be processed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
