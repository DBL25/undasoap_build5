import React, { useState } from 'react';
import { Product, ProductPackOption, Review } from '../types';
import { X, Star, Check, Plus, ShieldCheck, Flame, Droplets, Wrench, Sparkles, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (product: Product, pack: ProductPackOption, isSubscription?: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  reviews,
  onClose,
  onAddToCart,
}) => {
  const [selectedPackIdx, setSelectedPackIdx] = useState(0);
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'reviews'>('overview');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  React.useEffect(() => { setActiveImageIdx(0); }, [product?.id]);

  if (!product) return null;

  const currentPack = product.packOptions[selectedPackIdx] || product.packOptions[0];
  const finalPrice = isSubscription ? Number((currentPack.price * 0.85).toFixed(2)) : currentPack.price;

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAdd = () => {
    onAddToCart(product, currentPack, isSubscription);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white border-4 border-black w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-[8px_8px_0px_0px_rgba(198,154,95,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#0a0a0a] text-white px-6 py-4 flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-3">
            <span className="bg-[#c69a5f] text-black text-[10px] font-black uppercase px-2 py-0.5 tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              SKU: UNDA-{product.id.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#c69a5f] p-1 cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Image Gallery & Grit Badge */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-[#111111] border-3 border-black overflow-hidden">
                <img
                  src={(product.gallery && product.gallery[activeImageIdx]) || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover photo-grit transition-opacity duration-300"
                />
                {product.ribbon && (
                  <div className="absolute top-3 left-3 bg-black text-[#c69a5f] text-xs font-black uppercase px-3 py-1 border border-[#c69a5f]">
                    {product.ribbon}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip — only shows if gallery exists */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-square border-2 overflow-hidden transition-all duration-150 ${
                        activeImageIdx === idx
                          ? 'border-[#c69a5f] shadow-[2px_2px_0px_0px_rgba(198,154,95,1)]'
                          : 'border-black hover:border-[#c69a5f]/60'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Grit Level Meter Card */}
              <div className="bg-neutral-100 p-4 border-2 border-black space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-600" />
                    <span>Abrasive Grit Rating</span>
                  </span>
                  <span className="font-mono text-xs font-bold">{product.gritLevel} of 5</span>
                </div>
                {/* 5-segment meter */}
                <div className="grid grid-cols-5 gap-1.5 h-3">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-full border border-black ${
                        lvl <= product.gritLevel
                          ? product.gritLevel >= 4
                            ? 'bg-orange-600'
                            : 'bg-[#c69a5f]'
                          : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-neutral-600 font-semibold">{product.gritDescription}</p>
              </div>
            </div>

            {/* Right Column: Title, Reviews, Pack Selection, & Purchase */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-[#c69a5f]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-black">{product.rating.toFixed(2)}</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs font-bold text-[#a97e45] underline hover:text-black"
                  >
                    ({product.reviewCount} trade reviews)
                  </button>
                </div>

                <h2 className="text-3xl sm:text-4xl font-display text-black mb-2 leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-bold text-neutral-700">{product.tagline}</p>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 pb-4 border-b-2 border-neutral-200">
                <div className="text-3xl sm:text-4xl font-black font-display text-black">
                  ${finalPrice}
                </div>
                {isSubscription && (
                  <div className="text-sm font-bold text-neutral-400 line-through">
                    ${currentPack.price}
                  </div>
                )}
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                  / {product.weight}
                </span>
                {isSubscription && (
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2 py-0.5 border border-emerald-300 uppercase">
                    15% Auto-Ship Savings
                  </span>
                )}
              </div>

              {/* Pack Selection Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-black block">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {product.packOptions.map((pack, idx) => (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPackIdx(idx)}
                      className={`p-3 text-left border-2 transition-all cursor-pointer ${
                        selectedPackIdx === idx
                          ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(198,154,95,1)]'
                          : 'border-neutral-300 bg-white text-black hover:border-black'
                      }`}
                    >
                      <div className="text-xs font-black">{pack.name.split('(')[0]}</div>
                      <div className={`text-xs font-mono mt-0.5 ${selectedPackIdx === idx ? 'text-[#c69a5f]' : 'text-neutral-600'}`}>
                        ${pack.price}
                      </div>
                      {pack.savingsPercent && (
                        <div className="text-[10px] text-emerald-500 font-bold uppercase mt-1">
                          Save {pack.savingsPercent}%
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Mode Toggle: One-Time vs Subscribe & Save */}
              <div className="border-2 border-black bg-neutral-50 p-4 space-y-3">
                <label 
                  onClick={() => setIsSubscription(false)}
                  className={`flex items-center justify-between p-2.5 border cursor-pointer transition-colors ${
                    !isSubscription ? 'bg-white border-black shadow-sm font-bold' : 'border-transparent text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="purchaseMode"
                      checked={!isSubscription}
                      onChange={() => setIsSubscription(false)}
                      className="accent-black"
                    />
                    <span className="text-xs uppercase font-extrabold">One-Time Workshop Order</span>
                  </div>
                  <span className="text-xs font-black">${currentPack.price}</span>
                </label>

                <label 
                  onClick={() => setIsSubscription(true)}
                  className={`flex items-center justify-between p-2.5 border cursor-pointer transition-colors ${
                    isSubscription ? 'bg-[#c69a5f]/15 border-black shadow-sm font-bold' : 'border-transparent text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="purchaseMode"
                      checked={isSubscription}
                      onChange={() => setIsSubscription(true)}
                      className="accent-[#c69a5f]"
                    />
                    <div>
                      <span className="text-xs uppercase font-extrabold">Subscribe & Save 15%</span>
                      <div className="text-[10px] text-neutral-500">Delivered every 6 weeks. Cancel anytime.</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-800">
                    ${(currentPack.price * 0.85).toFixed(2)}
                  </span>
                </label>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-4 text-sm font-black uppercase tracking-widest border-3 border-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add {currentPack.name.split('(')[0]} To Cart — ${finalPrice}</span>
                  </>
                )}
              </button>

              {/* Trust markers */}
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 pt-2 border-t border-neutral-200">
                <span>✓ Free Ship Over $35</span>
                <span>✓ 30-Day Grime Guarantee</span>
                <span>✓ Small Batch USA</span>
              </div>
            </div>
          </div>

          {/* Tabbed Specs, Ingredients, and Reviews Navigation */}
          <div className="border-t-3 border-black pt-6">
            <div className="flex border-b-2 border-black gap-2 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-4 font-display text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-b-4 border-[#c69a5f] text-black font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Overview & Trade Specs
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-3 px-4 font-display text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-b-4 border-[#c69a5f] text-black font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Raw Ingredients ({product.ingredients.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-4 font-display text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-4 border-[#c69a5f] text-black font-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Reviews ({productReviews.length})
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-display text-base text-black mb-2 uppercase">The Shift Formula</h4>
                  <p className="text-neutral-700 leading-relaxed font-medium">{product.fullDetails}</p>
                </div>

                {/* Key Benefits Grid */}
                <div>
                  <h4 className="font-display text-base text-black mb-3 uppercase">Performance Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.keyBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 bg-neutral-50 p-3 border border-neutral-200">
                        <Check className="w-4 h-4 text-[#a97e45] flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-neutral-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to use & Trades list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black text-white p-5 border-2 border-black">
                  <div>
                    <h5 className="text-xs font-black uppercase text-[#c69a5f] mb-1.5 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Best Suited For Trades:</span>
                    </h5>
                    <ul className="text-xs space-y-1 text-neutral-300 font-semibold">
                      {product.tradeSuitability.map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-[#c69a5f] mb-1.5">How To Use On Shift:</h5>
                    <p className="text-xs text-neutral-300 leading-relaxed font-medium">{product.howToUse}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Ingredients */}
            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 font-medium">
                  We disclose 100% of our small-batch cold-processed ingredients. Zero hidden fragrances, synthetic preservatives, or artificial dyes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="p-3 bg-neutral-50 border-2 border-black flex items-center gap-2.5">
                      <Droplets className="w-4 h-4 text-[#a97e45]" />
                      <span className="text-xs font-extrabold text-black">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-neutral-50 border-2 border-black space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm">{rev.author}</span>
                          <span className="text-[10px] bg-black text-[#c69a5f] font-mono px-2 py-0.5 font-bold uppercase">
                            {rev.profession}
                          </span>
                        </div>
                        <div className="flex text-[#c69a5f]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h5 className="font-black text-xs text-black">{rev.title}</h5>
                      <p className="text-xs text-neutral-700 leading-relaxed font-medium">{rev.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 font-bold py-6 text-center">
                    No verified reviews yet for this specific batch. Be the first to leave one below!
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
