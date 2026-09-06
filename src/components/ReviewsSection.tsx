import React, { useState, useMemo } from 'react';
import { Review, TradeProfession } from '../types';
import { Star, ThumbsUp, ShieldCheck, Plus, Search, Filter, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenReviewModal: () => void;
  onHelpfulClick: (reviewId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenReviewModal,
  onHelpfulClick,
}) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [reviewSearch, setReviewSearch] = useState('');
  const [starFilter, setStarFilter] = useState<number | null>(null);

  const trades: { id: string; label: string }[] = [
    { id: 'all', label: 'All Trades' },
    { id: 'Mechanic / Automotive', label: 'Mechanics' },
    { id: 'Welder / Metal Fabricator', label: 'Welders' },
    { id: 'Carpenter / Woodworker', label: 'Carpenters' },
    { id: 'Construction / Drywaller', label: 'Construction' },
    { id: 'Landscaper / Forestry', label: 'Landscapers' },
    { id: 'Plumber / Pipefitter', label: 'Plumbers' },
    { id: 'Weekend DIY / Garage', label: 'Garage & DIY' },
  ];

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(2);

  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      if (selectedTrade !== 'all' && rev.profession !== selectedTrade) {
        return false;
      }
      if (starFilter && rev.rating !== starFilter) {
        return false;
      }
      if (reviewSearch.trim()) {
        const q = reviewSearch.toLowerCase();
        const matchesTitle = rev.title.toLowerCase().includes(q);
        const matchesContent = rev.content.toLowerCase().includes(q);
        const matchesAuthor = rev.author.toLowerCase().includes(q);
        const matchesProduct = rev.productName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesProduct) {
          return false;
        }
      }
      return true;
    });
  }, [reviews, selectedTrade, starFilter, reviewSearch]);

  return (
    <section className="py-20 sm:py-28 bg-[#ffffff] border-b-4 border-black" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b-3 border-black gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 text-[#a97e45] text-xs font-black tracking-[0.25em] uppercase mb-2">
              <span className="w-8 h-0.5 bg-[#a97e45]" />
              <span>04 — Job Site Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display text-black uppercase tracking-tight">
              Real Grinders. Real Results.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-semibold max-w-xl mt-2">
              From diesel bays to timber frames and weld shops — unvarnished feedback from the crew who puts these bars to work every single shift.
            </p>
          </div>

          <button
            onClick={onOpenReviewModal}
            id="write-review-btn"
            className="bg-[#c69a5f] hover:bg-black hover:text-[#c69a5f] text-black px-6 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] self-start lg:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write A Trade Review</span>
          </button>
        </div>

        {/* Aggregate Ratings & Breakdown Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-neutral-50 border-3 border-black p-6 sm:p-8 mb-12">
          
          {/* Big Score Block */}
          <div className="lg:col-span-4 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-200 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black font-display text-black">
                {averageRating}
              </span>
              <span className="text-sm font-bold text-neutral-500 uppercase">out of 5.0</span>
            </div>

            <div className="flex text-[#c69a5f] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <div className="text-xs font-black text-black uppercase tracking-wider mt-1">
              Based on {reviews.length} verified trade reviews
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mt-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>98.6% of tradesmen recommend UNDA to crew</span>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-2 lg:pl-4">
            {[
              { stars: 5, percent: 92, count: reviews.filter(r => r.rating === 5).length },
              { stars: 4, percent: 8, count: reviews.filter(r => r.rating === 4).length },
              { stars: 3, percent: 0, count: 0 },
              { stars: 2, percent: 0, count: 0 },
              { stars: 1, percent: 0, count: 0 },
            ].map((row) => (
              <button
                key={row.stars}
                onClick={() => setStarFilter(starFilter === row.stars ? null : row.stars)}
                className={`flex items-center gap-3 w-full text-left text-xs font-bold hover:opacity-80 transition-opacity ${
                  starFilter === row.stars ? 'opacity-100 font-black' : 'text-neutral-700'
                }`}
              >
                <span className="w-12">{row.stars} Star</span>
                <div className="flex-1 h-3.5 bg-neutral-200 border border-black overflow-hidden">
                  <div 
                    className="h-full bg-[#c69a5f]" 
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-[11px] text-neutral-500">{row.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Trade & Keyword Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8">
          
          {/* Trade Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Trade:</span>
            </span>
            {trades.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrade(t.id)}
                className={`text-[11px] font-bold uppercase px-3 py-1.5 whitespace-nowrap border transition-all cursor-pointer ${
                  selectedTrade === t.id
                    ? 'bg-black text-white border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Reviews Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search reviews (e.g. grease, weld, winter)..."
              value={reviewSearch}
              onChange={(e) => setReviewSearch(e.target.value)}
              className="w-full bg-neutral-50 border-2 border-black pl-9 pr-3 py-1.5 text-xs font-bold focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white border-3 border-black p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
            >
              <div>
                {/* Review Header: Stars, Verified Tag, & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#c69a5f]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Tradesman</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="text-base sm:text-lg font-black text-black mb-2 leading-snug font-display">
                  "{rev.title}"
                </h4>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                  {rev.content}
                </p>

                {/* Sub-rating indicators if available */}
                {(rev.gritRating || rev.latherRating) && (
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-neutral-500 mb-4 pb-4 border-b border-neutral-100">
                    {rev.gritRating && <span>• Grit: {rev.gritRating}/5</span>}
                    {rev.latherRating && <span>• Lather: {rev.latherRating}/5</span>}
                    {rev.longevityRating && <span>• Bar Life: {rev.longevityRating}/5</span>}
                  </div>
                )}
              </div>

              {/* Review Footer: Author, Trade Badge, Product & Helpful button */}
              <div className="pt-4 border-t-2 border-neutral-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-black text-[#c69a5f] font-mono font-black text-xs flex items-center justify-center border border-black">
                    {rev.avatarText || rev.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-black text-black leading-none">{rev.author}</div>
                    <div className="text-[10px] font-mono uppercase text-[#a97e45] font-bold mt-0.5">
                      {rev.profession} • <span className="text-neutral-500">{rev.productName}</span>
                    </div>
                  </div>
                </div>

                {/* Helpful Button */}
                <button
                  onClick={() => onHelpfulClick(rev.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black border border-neutral-200 hover:border-black px-2.5 py-1 transition-colors cursor-pointer"
                  title="Mark as helpful review"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.helpfulCount}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
