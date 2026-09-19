import React, { useState, useEffect } from 'react';
import { Product, ProductPackOption, CartItem } from './types';
import { PRODUCTS } from './data/products';

import { Header } from './components/Header';
import { MarqueeBanner } from './components/MarqueeBanner';
import { LargeMarqueeBanner } from './components/LargeMarqueeBanner';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { CycleSection } from './components/CycleSection';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { RoutineBuilderModal } from './components/RoutineBuilderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('unda_cart_v2');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        const currentProducts = new Map(PRODUCTS.map(product => [product.id, product]));

        return parsed.flatMap((item) => {
          const currentProduct = currentProducts.get(item.product.id);
          if (!currentProduct) return [];

          const currentPack = currentProduct.packOptions.find(pack => pack.id === item.selectedPack.id)
            || currentProduct.packOptions[0];

          return [{ ...item, product: currentProduct, selectedPack: currentPack }];
        });
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // UI Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Toast alert notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unda_cart_v2', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, pack: ProductPackOption) => {
    const itemKey = `${product.id}-${pack.id}`;

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

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
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

      </main>

      {/* Footer */}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />

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
      />

      {/* QUICK VIEW / PRODUCT SPECS MODAL */}
      <ProductDetailModal
        product={selectedProductForModal}
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
