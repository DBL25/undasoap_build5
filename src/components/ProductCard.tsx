import React, { useState } from 'react';
import { Product, ProductPackOption } from '../types';
import { Star, Plus, Eye, Check, ShieldCheck, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, pack: ProductPackOption) => void;
  onQuickView: (product: Product) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPack = product.packOptions[selectedPackIndex] || product.packOptions[0];
  const isDark = Boolean(product.isDarkCard || product.id === 'the-graveyard');
  const amountToFreeShipping = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - currentPack.price).toFixed(2)));

  const handleAdd = () => {
    onAddToCart(product, currentPack);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div 
      className={`border-3 border-black flex flex-col justify-between group relative transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] ${
        isDark 
          ? 'bg-[#0a0a0a] text-white shadow-[4px_4px_0px_0px_rgba(198,154,95,0.75)] hover:shadow-[6px_6px_0px_0px_rgba(198,154,95,1)]' 
          : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
      }`}
      id={`product-card-${product.id}`}
    >
      {/* Ribbon Tag */}
      {product.ribbon && (
        <div className={`absolute top-3 left-3 z-10 font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 border ${
          isDark
            ? 'bg-[#c69a5f] text-black border-black shadow-sm'
            : 'bg-black text-[#c69a5f] border-[#c69a5f]/40'
        }`}>
          {product.ribbon}
        </div>
      )}

      {/* Image & Quick View Trigger */}
      <div className={`relative aspect-square bg-[#111111] overflow-hidden border-b-3 ${
        isDark ? 'border-neutral-900' : 'border-black'
      }`}>
        {/* Main image */}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover photo-grit transition-opacity duration-500 ${product.secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
          loading="lazy"
        />
        {/* Lifestyle image on hover */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} lifestyle`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
            loading="lazy"
          />
        )}
        
        {/* Quick View Hover Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-extrabold uppercase tracking-widest cursor-pointer backdrop-blur-[2px]"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-4 h-4 text-[#c69a5f]" />
          <span>Quick View & Specs</span>
        </button>

        {/* Grit level indicator pill */}
        <div className="absolute bottom-3 right-3 bg-black/95 text-white px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
          <Flame className={`w-3 h-3 ${product.gritLevel >= 4 ? 'text-orange-500' : 'text-[#c69a5f]'}`} />
          <span>Grit {product.gritLevel}/5</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#a97e45]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-[#c69a5f] text-[#c69a5f]" />
              <span className={`font-black ${isDark ? 'text-white' : 'text-black'}`}>{product.rating.toFixed(2)}</span>
              <span className={`${isDark ? 'text-neutral-400' : 'text-neutral-500'} text-[11px]`}>({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className={`text-xl sm:text-2xl font-display mb-2 group-hover:text-[#c69a5f] transition-colors cursor-pointer leading-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className={`text-xs font-medium mb-4 line-clamp-2 ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            {product.description}
          </p>
        </div>

        {/* Pack Selector & Add To Cart Actions */}
        <div className={`pt-4 border-t-2 space-y-3 ${
          isDark ? 'border-neutral-800' : 'border-neutral-100'
        }`}>
          {/* Pack Option Radio / Select */}
          {product.packOptions.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {product.packOptions.map((pack, idx) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPackIndex(idx)}
                  className={`px-2 py-1.5 text-left border text-[11px] font-bold transition-all cursor-pointer ${
                    selectedPackIndex === idx
                      ? isDark
                        ? 'border-[#c69a5f] bg-[#1c1c1c] text-white shadow-[1px_1px_0px_0px_rgba(198,154,95,0.6)]'
                        : 'border-black bg-[#0a0a0a] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                      : isDark
                        ? 'border-neutral-800 bg-[#121212] text-neutral-300 hover:border-neutral-600'
                        : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500'
                  }`}
                >
                  <div className="truncate">{pack.name.split('(')[0]}</div>
                  <div className={`text-[10px] ${selectedPackIndex === idx ? 'text-[#c69a5f]' : isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    ${pack.price}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Price and Add Button */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div>
              <div className={`text-2xl font-black font-display ${isDark ? 'text-white' : 'text-black'}`}>
                ${currentPack.price}
              </div>
              <div className={`text-[10px] font-mono uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {product.weight}
              </div>
              {amountToFreeShipping > 0 && (
                <div className={`text-[10px] font-mono mt-1 ${isDark ? 'text-[#c69a5f]' : 'text-[#a97e45]'}`}>
                  ${amountToFreeShipping} away from free shipping
                </div>
              )}
            </div>

            <button
              onClick={handleAdd}
              id={`add-to-cart-${product.id}`}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                addedAnimation 
                  ? 'bg-emerald-600 text-white border-emerald-800'
                  : 'bg-[#c69a5f] hover:bg-white hover:text-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add To Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
