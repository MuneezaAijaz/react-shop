/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import {
  CartItem,
  CategoryFilter,
  CustomerDetails,
  OrderReceipt,
  Product,
  SortOption,
} from './types/shop';
import {
  FREE_SHIPPING_THRESHOLD,
  GIFT_WRAP_FEE,
  PRODUCTS,
  STANDARD_SHIPPING_FEE,
} from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionSection } from './components/CollectionSection';
import { ProductDetailView } from './components/ProductDetailView';
import { AtelierSection } from './components/AtelierSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'ciel_clay_bag_v1';
const SAVED_STORAGE_KEY = 'ciel_clay_saved_v1';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    CategoryFilter.All
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Featured);

  const [selectedProductState, setSelectedProductState] = useState<{
    product: Product;
    variantId: string;
  } | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [giftWrap, setGiftWrap] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderReceipt | null>(null);
  const [bagToast, setBagToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota issues in restricted browsing modes
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota issues
    }
  }, [savedIds]);

  const totalBagCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (activeCategory === CategoryFilter.Saved) {
        if (!savedIds.includes(product.id)) return false;
      } else if (
        activeCategory !== CategoryFilter.All &&
        (product.category as unknown as string) !== (activeCategory as unknown as string)
      ) {
        return false;
      }

      if (!query) return true;

      const searchableText = [
        product.name,
        product.category,
        product.shortNote,
        product.materials,
        ...product.variants.map((v) => v.name),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });

    if (sortBy === SortOption.PriceAsc) {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === SortOption.PriceDesc) {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeCategory, searchQuery, sortBy, savedIds]);

  const showToast = (message: string) => {
    setBagToast(message);
  };

  useEffect(() => {
    if (!bagToast) return;
    const timer = window.setTimeout(() => setBagToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [bagToast]);

  const handleAddToBag = (
    product: Product,
    variantId: string,
    quantity = 1,
    giftNote?: string
  ) => {
    const variant =
      product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    const normalizedNote = giftNote?.trim() || '';
    const cartKey = `${product.id}::${variant.id}::${normalizedNote}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: Math.min(20, item.quantity + quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          productId: product.id,
          variantId: variant.id,
          quantity,
          giftNote: normalizedNote || undefined,
        },
      ];
    });

    showToast(`${product.name} (${variant.name}) added to your bag`);
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const scrollToElement = (id: string) => {
    window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleHeaderCategorySelect = (category: CategoryFilter) => {
    setSelectedProductState(null);
    setActiveCategory(category);
    scrollToElement('collection');
  };

  const handleGoHome = () => {
    setSelectedProductState(null);
    setActiveCategory(CategoryFilter.All);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToAtelier = () => {
    setSelectedProductState(null);
    scrollToElement('atelier');
  };

  const handleOpenProduct = (product: Product, variantId: string) => {
    setSelectedProductState({ product, variantId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (customer: CustomerDetails): OrderReceipt => {
    const detailedLines = cartItems
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        const variant =
          product.variants.find((v) => v.id === item.variantId) ??
          product.variants[0];
        return {
          productName: product.name,
          variantName: variant.name,
          quantity: item.quantity,
          unitPrice: product.price,
          giftNote: item.giftNote,
        };
      })
      .filter((line): line is NonNullable<typeof line> => line !== null);

    const subtotal = detailedLines.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0
    );
    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const giftWrapFee = giftWrap ? GIFT_WRAP_FEE : 0;
    const total = subtotal + shipping + giftWrapFee;

    const dispatchDate = new Date();
    dispatchDate.setDate(dispatchDate.getDate() + 2);
    const formattedDispatch = dispatchDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const receipt: OrderReceipt = {
      orderNumber: String(1042 + Math.floor(Math.random() * 50)),
      placedAt: new Date().toISOString(),
      estimatedDispatch: formattedDispatch,
      items: detailedLines,
      giftWrap,
      subtotal,
      shipping,
      giftWrapFee,
      total,
      customer,
    };

    setLastOrder(receipt);
    setCartItems([]);
    setGiftWrap(false);
    return receipt;
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF8F6] text-[#2A2527]">
        <Header
          activeCategory={activeCategory}
          isDetailView={selectedProductState !== null}
          cartCount={totalBagCount}
          onSelectCategory={handleHeaderCategorySelect}
          onGoHome={handleGoHome}
          onScrollToAtelier={handleScrollToAtelier}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main className="flex-1">
          {selectedProductState ? (
            <ProductDetailView
              product={selectedProductState.product}
              initialVariantId={selectedProductState.variantId}
              allProducts={PRODUCTS}
              savedIds={savedIds}
              onBack={() => {
                setSelectedProductState(null);
                scrollToElement('collection');
              }}
              onToggleSave={handleToggleSave}
              onAddToBag={handleAddToBag}
              onOpenProduct={handleOpenProduct}
              onQuickAdd={(product, variantId) =>
                handleAddToBag(product, variantId, 1)
              }
            />
          ) : (
            <>
              <Hero
                onExploreCollection={() => scrollToElement('collection')}
                onReadAtelier={() => scrollToElement('atelier')}
              />

              <CollectionSection
                products={filteredProducts}
                activeCategory={activeCategory}
                searchQuery={searchQuery}
                sortBy={sortBy}
                savedIds={savedIds}
                onCategoryChange={setActiveCategory}
                onSearchChange={setSearchQuery}
                onSortChange={setSortBy}
                onToggleSave={handleToggleSave}
                onOpenProduct={handleOpenProduct}
                onQuickAdd={(product, variantId) =>
                  handleAddToBag(product, variantId, 1)
                }
                onResetFilters={() => {
                  setActiveCategory(CategoryFilter.All);
                  setSearchQuery('');
                  setSortBy(SortOption.Featured);
                }}
              />

              <AtelierSection />
            </>
          )}
        </main>

        <Footer
          onSelectCategory={handleHeaderCategorySelect}
          onScrollToAtelier={handleScrollToAtelier}
        />

        <CartDrawer
          isOpen={isCartOpen}
          items={cartItems}
          products={PRODUCTS}
          giftWrap={giftWrap}
          lastOrder={lastOrder}
          onClose={() => setIsCartOpen(false)}
          onToggleGiftWrap={setGiftWrap}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onOpenProduct={handleOpenProduct}
          onCompleteOrder={handleCompleteOrder}
        />

        {/* Quiet Non-Blocking Bag Notification Toast */}
        <AnimatePresence>
          {bagToast && !isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              role="status"
              aria-live="polite"
              className="fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-xl border border-[#D4E0D8] bg-[#FAF8F6] px-4 py-3 text-xs text-[#2A2527] shadow-md"
            >
              <ShoppingBag className="h-4 w-4 shrink-0 text-[#4A6356]" aria-hidden="true" />
              <span className="max-w-[240px] truncate">{bagToast}</span>
              <button
                type="button"
                onClick={() => {
                  setBagToast(null);
                  setIsCartOpen(true);
                }}
                className="font-medium text-[#4A6356] underline underline-offset-4 hover:text-[#3D5347] whitespace-nowrap"
              >
                View Bag
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
