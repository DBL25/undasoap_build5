import React, { useState, useEffect } from 'react';
import { Product, ProductPackOption, CartItem, Review, Order } from './types';
import { PRODUCTS } from './data/products';
import { INITIAL_REVIEWS } from './data/reviews';

import { Header } from './components/Header';
import { MarqueeBanner } from './components/MarqueeBanner';
import { LargeMarqueeBanner } from './components/LargeMarqueeBanner';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { CycleSection } from './components/CycleSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { RoutineBuilderModal } from './components/RoutineBuilderModal';
import { ReviewModal } from './components/ReviewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderLookupModal } from './components/OrderLookupModal';

import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('unda_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial starter item for great first impression
    const defaultProduct = PRODUCTS.find(p => p.id === 'the-full-shift-kit') || PRODUCTS[0];
    return [
      {
        id: `${defaultProduct.id}-single-kit`,
        product: defaultProduct,
        selectedPack: defaultProduct.packOptions[0],
        quantity: 1,
      }
    ];
  });

  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('unda_reviews_v2');
      if (saved) {
        const parsed: Review[] = JSON.parse(saved);
        return parsed.filter(r => !['Dale K.', 'Elena S.', 'Anthony R.'].includes(r.author));
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  // Orders state with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('unda_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // UI Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Active checkout discount passing
  const [checkoutPromo, setCheckoutPromo] = useState<string | undefined>(undefined);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);

  // Toast alert notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unda_cart_v1', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Save reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unda_reviews_v2', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unda_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, pack: ProductPackOption, isSubscription?: boolean) => {
    const itemKey = `${product.id}-${pack.id}${isSubscription ? '-sub' : ''}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: itemKey,
            product,
            selectedPack: pack,
            quantity: 1,
            isSubscription: Boolean(isSubscription),
            subscriptionFrequencyWeeks: isSubscription ? 6 : undefined,
          },
        ];
      }
    });

    triggerToast(`Added ${pack.name.split('(')[0]} of ${product.name} to cart!`);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    triggerToast('Item removed from workshop cart.');
  };

  const handleProceedToCheckout = (promo?: string, discount: number = 0) => {
    setCheckoutPromo(promo);
    setCheckoutDiscount(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart on successful order
    setCartItems([]);
    triggerToast(`Order ${newOrder.orderId} placed successfully! Tracking email dispatched.`);
  };

  // Review submission
  const handleSubmitReview = (
    newReviewData: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'verifiedBuyer' | 'avatarText'>
  ) => {
    const newRev: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedBuyer: true,
      helpfulCount: 1,
      avatarText: newReviewData.author.slice(0, 2).toUpperCase(),
    };

    setReviews((prev) => [newRev, ...prev]);
    triggerToast('Your trade review has been verified and published.');
  };

  const handleHelpfulClick = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    triggerToast('Marked as helpful review.');
  };

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#c69a5f] selection:text-black">
      
      {/* Top Announcements Marquee */}
      <MarqueeBanner />

      {/* Main Sticky Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        activeSection="shop"
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={scrollToShop}
          onQuizClick={() => setIsQuizOpen(true)}
        />

        {/* Large Brand Transition Marquee */}
        <LargeMarqueeBanner />

        {/* Product Catalog Section */}
        <ProductSection
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setSelectedProductForModal(prod)}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 4-Step Cycle Industrial Method */}
        <CycleSection onShopKit={scrollToShop} />

        {/* Real Tradesmen Customer Reviews */}
        <ReviewsSection
          reviews={reviews}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
          onHelpfulClick={handleHelpfulClick}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
      />

      {/* SLIDE-OUT CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        products={PRODUCTS}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* SECURE MULTI-STEP CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={checkoutPromo}
        discountAmount={checkoutDiscount}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* QUICK VIEW / PRODUCT SPECS MODAL */}
      <ProductDetailModal
        product={selectedProductForModal}
        reviews={reviews}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* UNDA FIND MY ROUTINE MODAL */}
      {isQuizOpen && (
        <RoutineBuilderModal
          products={PRODUCTS}
          onClose={() => setIsQuizOpen(false)}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => {
            setIsQuizOpen(false);
            setSelectedProductForModal(prod);
          }}
        />
      )}

      {/* SUBMIT REVIEW MODAL */}
      {isReviewModalOpen && (
        <ReviewModal
          products={PRODUCTS}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* ORDER LOOKUP & TRACKING MODAL */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
      />

      {/* FLOATING ACTION NOTIFICATION TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a] text-white border-2 border-[#c69a5f] px-5 py-3.5 shadow-2xl flex items-center gap-3 animate-bounce-short">
          <CheckCircle2 className="w-5 h-5 text-[#c69a5f] flex-shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
