import React, { useState } from 'react';
import { Order } from '../types';
import { X, Search, Truck, CheckCircle2, PackageCheck, Clock, MapPin } from 'lucide-react';
import { UndaLogo } from './UndaLogo';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);
    const found = orders.find(
      (o) => o.orderId.toUpperCase() === query || o.address.email.toLowerCase() === searchId.trim().toLowerCase()
    );
    setSearchedOrder(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm">
      <div 
        className="relative bg-white border-4 border-black w-full max-w-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(198,154,95,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a0a0a] text-white px-6 py-4 flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black border border-white/40 p-0.5 flex items-center justify-center">
              <UndaLogo className="w-full h-full text-white" variant="light" />
            </div>
            <div>
              <span className="font-display text-sm uppercase tracking-wider block leading-tight">
                UNDA Order Dispatch Tracker
              </span>
              <span className="text-[10px] font-mono text-[#c69a5f] uppercase tracking-widest block">
                Official Status
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#c69a5f] p-1 cursor-pointer"
            aria-label="Close order lookup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs text-neutral-600 font-semibold leading-relaxed">
            Enter your Order Number (e.g. <strong>UNDA-84729</strong>) or the email address used during checkout to view dispatch progress.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Order ID (e.g. UNDA-84729) or email..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-white border-2 border-black pl-10 pr-3 py-2.5 text-xs sm:text-sm font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-6 py-2.5 text-xs font-black uppercase tracking-widest border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Lookup
            </button>
          </form>

          {/* Search Result Display */}
          {hasSearched && (
            <div>
              {searchedOrder ? (
                <div className="p-5 bg-neutral-50 border-3 border-black space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">Order ID</span>
                      <span className="font-display text-base text-black font-black">{searchedOrder.orderId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">Current Status</span>
                      <span className="inline-block bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 border border-emerald-300">
                        {searchedOrder.status}
                      </span>
                    </div>
                  </div>

                  {/* Dispatch timeline */}
                  <div className="space-y-2 py-2">
                    <div className="flex items-center gap-2 text-black font-bold">
                      <PackageCheck className="w-4 h-4 text-[#a97e45]" />
                      <span>Tracking Number: <strong className="font-mono">{searchedOrder.trackingNumber}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Clock className="w-4 h-4 text-[#a97e45]" />
                      <span>Estimated Arrival: {searchedOrder.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-4 h-4 text-[#a97e45]" />
                      <span>Destination: {searchedOrder.address.city}, {searchedOrder.address.state}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="font-black text-black mb-1.5 uppercase">Items in this dispatch:</div>
                    <div className="space-y-1 text-neutral-700">
                      {searchedOrder.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>• {i.product.name} ({i.selectedPack.name.split('(')[0]}) x {i.quantity}</span>
                          <span className="font-bold">${(i.selectedPack.price * i.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-red-50 border-2 border-red-400 text-center space-y-2">
                  <div className="text-xs font-black text-red-700 uppercase">No Order Found</div>
                  <p className="text-xs text-red-600 font-medium">
                    We couldn't find an order matching "{searchId}". Please check your receipt email for the exact Order ID.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Mock Pre-populated Orders helper if user just placed an order */}
          {orders.length > 0 && !hasSearched && (
            <div className="pt-2 border-t border-neutral-200">
              <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase block mb-2">
                Recent Orders in this Session ({orders.length}):
              </span>
              <div className="space-y-1.5">
                {orders.map((o) => (
                  <button
                    key={o.orderId}
                    onClick={() => {
                      setSearchId(o.orderId);
                      setSearchedOrder(o);
                      setHasSearched(true);
                    }}
                    className="w-full text-left p-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex justify-between items-center text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>{o.orderId} • {o.orderDate}</span>
                    <span className="text-[#a97e45]">{o.status} →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
