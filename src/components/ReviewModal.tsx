import React, { useState } from 'react';
import { Product, Review, TradeProfession } from '../types';
import { X, Star, Check, Sparkles, AlertCircle } from 'lucide-react';

interface ReviewModalProps {
  products: Product[];
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'verifiedBuyer' | 'avatarText'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  products,
  onClose,
  onSubmitReview,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'the-reset');
  const [author, setAuthor] = useState('');
  const [profession, setProfession] = useState<TradeProfession>('Mechanic / Automotive');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [gritRating, setGritRating] = useState(5);
  const [latherRating, setLatherRating] = useState(5);
  const [longevityRating, setLongevityRating] = useState(5);
  const [errorMsg, setErrorMsg] = useState('');

  const professions: TradeProfession[] = [
    'Mechanic / Automotive',
    'Welder / Metal Fabricator',
    'Carpenter / Woodworker',
    'Landscaper / Forestry',
    'Construction / Drywaller',
    'Plumber / Pipefitter',
    'Painter / Finisher',
    'Weekend DIY / Garage'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setErrorMsg('Please enter your name or trade handle.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please enter a brief headline for your review.');
      return;
    }
    if (!content.trim() || content.trim().length < 15) {
      setErrorMsg('Please share at least a sentence about how the soap held up on your shift.');
      return;
    }

    const selectedProduct = products.find(p => p.id === selectedProductId);

    onSubmitReview({
      productId: selectedProductId,
      productName: selectedProduct?.name || 'UNDA Soap',
      author: author.trim(),
      profession,
      rating,
      title: title.trim(),
      content: content.trim(),
      gritRating,
      latherRating,
      longevityRating,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white border-4 border-black w-full max-w-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(198,154,95,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a0a0a] text-white px-6 py-4 flex items-center justify-between border-b-3 border-black">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm uppercase tracking-wider">
              Submit Shift Review
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#c69a5f] p-1 cursor-pointer"
            aria-label="Close review form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Product Select */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Which Bar Did You Put To Work? *
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-white border-2 border-black px-3 py-2.5 text-xs sm:text-sm font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.weight})
                </option>
              ))}
            </select>
          </div>

          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Overall Shift Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-neutral-300 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-[#c69a5f] text-[#c69a5f]'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-neutral-600 ml-2">
                {rating === 5 ? '5/5 — Excellent / Shift Tested' : `${rating}/5 Stars`}
              </span>
            </div>
          </div>

          {/* Name and Trade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                Your Name / Handle *
              </label>
              <input
                type="text"
                placeholder="e.g. Mike D. or Big Rig Bob"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                Your Primary Trade *
              </label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value as TradeProfession)}
                className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
              >
                {professions.map((prof) => (
                  <option key={prof} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Review Headline *
            </label>
            <input
              type="text"
              placeholder="e.g. Cuts hydraulic oil in 30 seconds"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border-2 border-black px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
            />
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Detailed Experience on the Job *
            </label>
            <textarea
              rows={4}
              placeholder="Describe what kind of dirt, grease, or chemicals you were washing off, how the lather and grit felt, and whether your skin stayed crack-free..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border-2 border-black p-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c69a5f]"
            />
          </div>

          {/* Sub-Ratings (Grit, Lather, Bar Longevity) */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                Grit Strength:
              </label>
              <select
                value={gritRating}
                onChange={(e) => setGritRating(Number(e.target.value))}
                className="w-full bg-white border border-black p-1.5 text-xs font-bold"
              >
                <option value={5}>5/5 (Heavy)</option>
                <option value={4}>4/5 (Firm)</option>
                <option value={3}>3/5 (Medium)</option>
                <option value={2}>2/5 (Mild)</option>
                <option value={1}>1/5 (Zero Grit)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                Lather Density:
              </label>
              <select
                value={latherRating}
                onChange={(e) => setLatherRating(Number(e.target.value))}
                className="w-full bg-white border border-black p-1.5 text-xs font-bold"
              >
                <option value={5}>5/5 (Dense Foam)</option>
                <option value={4}>4/5 (Rich)</option>
                <option value={3}>3/5 (Good)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                Bar Life:
              </label>
              <select
                value={longevityRating}
                onChange={(e) => setLongevityRating(Number(e.target.value))}
                className="w-full bg-white border border-black p-1.5 text-xs font-bold"
              >
                <option value={5}>5/5 (Long lasting)</option>
                <option value={4}>4/5 (Average)</option>
                <option value={3}>3/5 (Quick cure)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 text-xs font-bold uppercase text-neutral-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-8 py-3 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Publish Trade Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
