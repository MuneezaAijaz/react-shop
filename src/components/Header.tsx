import { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { CategoryFilter, ProductCategory } from '../types/shop';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';

interface HeaderProps {
  activeCategory: CategoryFilter;
  isDetailView: boolean;
  cartCount: number;
  onSelectCategory: (category: CategoryFilter) => void;
  onGoHome: () => void;
  onScrollToAtelier: () => void;
  onOpenCart: () => void;
}

const NAV_ITEMS: Array<{
  label: string;
  filter?: CategoryFilter;
  isAtelier?: boolean;
}> = [
  { label: 'All Pieces', filter: CategoryFilter.All },
  { label: ProductCategory.Ceramics, filter: CategoryFilter.Ceramics },
  { label: ProductCategory.Textiles, filter: CategoryFilter.Textiles },
  { label: ProductCategory.Botanicals, filter: CategoryFilter.Botanicals },
  { label: 'Our Atelier', isAtelier: true },
];

export function Header({
  activeCategory,
  isDetailView,
  cartCount,
  onSelectCategory,
  onGoHome,
  onScrollToAtelier,
  onOpenCart,
}: HeaderProps) {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <>
      {!bannerDismissed && (
        <div className="border-b border-[#E6E0DC] bg-[#F1EFF5] px-4 py-2 text-xs text-[#4A4347]">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
            <p className="mx-auto truncate text-center">
              Complimentary cotton-paper gift notes &amp; carbon-neutral delivery on orders over $
              <span className="tabular-nums">{FREE_SHIPPING_THRESHOLD}</span>
            </p>
            <button
              type="button"
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss studio shipping note"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#685F63] transition-colors duration-150 hover:bg-[#E5E0EC] hover:text-[#2A2527] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-[#E6E0DC] bg-[#FAF8F6]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-8 px-6 lg:px-10">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            className="font-display text-xl font-medium tracking-tight text-[#2A2527] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A6356]"
          >
            Ciel &amp; Clay
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary boutique navigation"
            className="hidden md:flex items-center gap-7 text-sm text-[#685F63]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                !isDetailView && item.filter !== undefined && activeCategory === item.filter;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.isAtelier) {
                      onScrollToAtelier();
                    } else if (item.filter) {
                      onSelectCategory(item.filter);
                    }
                  }}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#2A2527] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A6356] after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-[#4A6356] after:transition-transform after:duration-200 ${
                    isActive
                      ? 'font-medium text-[#2A2527] after:scale-x-100'
                      : 'after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag with ${cartCount} items`}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#4A6356] px-4 py-2 text-xs font-medium text-[#FAF8F6] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#3D5347] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356]"
            >
              <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                Shopping Bag (<span className="tabular-nums">{cartCount}</span>)
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
