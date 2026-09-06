import React, { useState, useMemo } from 'react';
import { Product, ProductPackOption } from '../types';
import { ProductCard } from './ProductCard';
import { BrandBanner } from './BrandBanner';
import { Sparkles, Plus, Check, Eye, Star, Layers } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  onAddToCart: (product: Product, pack: ProductPackOption) => void;
  onQuickView: (product: Product) => void;
  onOpenQuiz: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onOpenQuiz
}) => {
  const [flagshipAdded, setFlagshipAdded] = useState(false);

  const flagshipProduct = products.find(p => p.id === 'the-full-shift-kit') || products.find(p => p.id === 'the-rotation');

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [products]);

  const handleAddFlagship = () => {
    if (!flagshipProduct) return;
    onAddToCart(flagshipProduct, flagshipProduct.packOptions[0]);
    setFlagshipAdded(true);
    setTimeout(() => setFlagshipAdded(false), 1400);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#ffffff]" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b-3 border-black">
          <div>
            <div className="inline-flex items-center gap-2.5 text-[#a97e45] text-xs font-black tracking-[0.25em] uppercase mb-2">
              <span className="w-8 h-0.5 bg-[#a97e45]" />
              <span>02 — Small Batch Hardware</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display text-black uppercase tracking-tight">
              Pick Your Bar & Gear
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-semibold max-w-xl mt-2">
              Every bar is cold-processed for 6 weeks and formulated around specific shift hazards.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={onOpenQuiz}
              className="bg-[#c69a5f]/15 hover:bg-[#c69a5f]/30 border-2 border-black text-black font-black uppercase text-xs px-4 py-3 flex items-center gap-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Sparkles className="w-4 h-4 text-[#a97e45]" />
              <span>Find My Routine</span>
            </button>
          </div>
        </div>

        {/* FEATURED FLAGSHIP BUNDLE SPOTLIGHT: THE FULL SHIFT */}
        {flagshipProduct && (
          <div className="mb-12 bg-[#0a0a0a] text-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(198,154,95,1)] relative overflow-hidden">
            {/* Background Texture & Accent Glow */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#c69a5f]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Product Image Column */}
              <div className="lg:col-span-5">
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-[#151515] border-3 border-[#c69a5f]/40 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <img
                    src={flagshipProduct.image}
                    alt={flagshipProduct.name}
                    className="w-full h-full object-cover photo-grit hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#c69a5f] text-black font-mono text-xs font-black uppercase tracking-widest px-3 py-1 border border-black shadow-sm">
                    {flagshipProduct.ribbon || 'Flagship Boxed Kit'}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 text-white px-3 py-1 text-xs font-bold flex items-center gap-1.5 border border-white/20">
                    <Layers className="w-3.5 h-3.5 text-[#c69a5f]" />
                    <span>3 Bars + Pouch + Box</span>
                  </div>
                </div>
              </div>

              {/* Product Details & Purchase Action Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="bg-[#c69a5f]/20 text-[#c69a5f] border border-[#c69a5f]/40 text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-0.5 tracking-wider">
                      Flagship Complete Setup
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#c69a5f]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-black text-white">{flagshipProduct.rating.toFixed(2)}</span>
                      <span className="text-neutral-400">({flagshipProduct.reviewCount} verified reviews)</span>
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white mb-2 leading-none uppercase">
                    {flagshipProduct.name}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-[#c69a5f] mb-3">
                    “{flagshipProduct.tagline}”
                  </p>

                  <p className="text-sm text-neutral-300 font-medium leading-relaxed mb-6">
                    {flagshipProduct.description}
                  </p>

                  {/* 4 Contents Breakdown Box */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-black/60 border-2 border-neutral-800 mb-6">
                    <div className="p-2.5 bg-[#121212] border border-neutral-800 flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#c69a5f] font-black uppercase">1. The Reset</div>
                      <div className="text-xs font-bold text-white mt-1">Charcoal & Goat Milk</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Grime Cutter Bar</div>
                    </div>
                    <div className="p-2.5 bg-[#121212] border border-neutral-800 flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#c69a5f] font-black uppercase">2. The Recharge</div>
                      <div className="text-xs font-bold text-white mt-1">Goat Milk & Sea Salt</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Daily Skin Restorer</div>
                    </div>
                    <div className="p-2.5 bg-[#121212] border border-neutral-800 flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#c69a5f] font-black uppercase">3. The Graveyard</div>
                      <div className="text-xs font-bold text-white mt-1">Full Solid Charcoal</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Midnight Heavy Bar</div>
                    </div>
                    <div className="p-2.5 bg-[#121212] border border-neutral-800 flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-[#c69a5f] font-black uppercase">4. Pouch & Box</div>
                      <div className="text-xs font-bold text-white mt-1">Black Mesh + Box</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Lather & Manifesto</div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Add To Cart Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t-2 border-neutral-800">
                  <div className="flex items-baseline gap-3">
                    <div className="text-3xl sm:text-4xl font-display font-black text-white">
                      ${flagshipProduct.price}.00
                    </div>
                    <div className="text-sm font-bold text-neutral-500 line-through">
                      $50.00
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 uppercase tracking-wide">
                      Flagship Value
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onQuickView(flagshipProduct)}
                      className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-700 hover:border-white transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4 text-[#c69a5f]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={handleAddFlagship}
                      id="add-to-cart-featured-flagship"
                      className={`flex-1 sm:flex-initial px-6 py-3.5 text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        flagshipAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#c69a5f] hover:bg-white hover:text-black text-black shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                      }`}
                    >
                      {flagshipAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add The Full Shift — ${flagshipProduct.price}.00</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* BRAND BANNER: RIGHT AFTER THE FLAGSHIP KIT */}
        <BrandBanner />

        {/* Catalog Subheader */}
        <div className="mb-6 flex items-center justify-between pb-3 border-b-2 border-neutral-200">
          <div>
            <span className="text-[11px] font-mono font-black uppercase text-[#a97e45] tracking-widest block">
              Individual Cold-Processed Bars & Gear
            </span>
            <h3 className="text-lg sm:text-xl font-display font-black text-black uppercase">
              Full Workshop Lineup ({sortedProducts.length} Items)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-neutral-500 hidden sm:inline">
            Free Shipping on Orders $35+
          </span>
        </div>

        {/* Products Grid — Clean catalog with no category nav tabs or sort controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
