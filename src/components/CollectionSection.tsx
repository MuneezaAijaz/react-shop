import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { CategoryFilter, Product, SortOption } from '../types/shop';
import { ProductCard } from './ProductCard';

interface CollectionSectionProps {
  products: Product[];
  activeCategory: CategoryFilter;
  searchQuery: string;
  sortBy: SortOption;
  savedIds: string[];
  onCategoryChange: (category: CategoryFilter) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onToggleSave: (productId: string) => void;
  onOpenProduct: (product: Product, initialVariantId: string) => void;
  onQuickAdd: (product: Product, variantId: string) => void;
  onResetFilters: () => void;
}

const FILTER_TABS: CategoryFilter[] = [
  CategoryFilter.All,
  CategoryFilter.Ceramics,
  CategoryFilter.Textiles,
  CategoryFilter.Botanicals,
  CategoryFilter.Saved,
];

export function CollectionSection({
  products,
  activeCategory,
  searchQuery,
  sortBy,
  savedIds,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onToggleSave,
  onOpenProduct,
  onQuickAdd,
  onResetFilters,
}: CollectionSectionProps) {
  return (
    <section
      id="collection"
      className="scroll-mt-20 mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-16"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E6E0DC] pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs text-[#685F63]">
            Curated Studio Catalogue <span aria-hidden="true">·</span> Small-Batch Releases
          </p>
          <h2 className="mt-2 font-display text-2xl font-normal tracking-tight text-[#2A2527] sm:text-3xl text-balance">
            Gathered for the quiet home
          </h2>
        </div>
        <p className="max-w-[46ch] text-sm leading-relaxed text-[#685F63]">
          Select a pastel glaze or linen colorway directly on any piece, or open a vessel to include a complimentary cotton-paper gift card.
        </p>
      </div>

      {/* Interactive Filter, Search & Sort Toolbar */}
      <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* Segmented Category Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter collection by category"
          className="flex items-center gap-1 overflow-x-auto rounded-xl border border-[#E6E0DC] bg-[#F3EFEA] p-1"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            const label =
              tab === CategoryFilter.Saved ? `Saved (${savedIds.length})` : tab;

            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(tab)}
                className={`relative min-h-9 rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356] ${
                  isActive ? 'text-[#2A2527]' : 'text-[#685F63] hover:text-[#2A2527]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryBackground"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 rounded-lg bg-[#FAF8F6] shadow-xs"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 tabular-nums">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:w-64">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#685F63]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search glazes, linens, scents..."
              aria-label="Search boutique pieces"
              className="min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] py-2 pr-9 pl-9 text-xs text-[#2A2527] placeholder:text-[#847A7E] transition-colors duration-150 focus:border-[#4A6356] focus:outline-none"
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute top-1/2 right-2.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-[#685F63] hover:text-[#2A2527]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-[#685F63] whitespace-nowrap">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="min-h-10 rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] transition-colors duration-150 focus:border-[#4A6356] focus:outline-none"
            >
              <option value={SortOption.Featured}>Studio Curated</option>
              <option value={SortOption.PriceAsc}>Price: Low to High</option>
              <option value={SortOption.PriceDesc}>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-5 flex items-center justify-between text-xs text-[#685F63]">
        <p className="tabular-nums">
          Showing {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          {activeCategory !== CategoryFilter.All ? ` in ${activeCategory}` : ''}
        </p>
        {(activeCategory !== CategoryFilter.All || searchQuery.trim() !== '') && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-medium text-[#4A6356] underline underline-offset-4 hover:text-[#3D5347]"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* 3-Column Product Grid or Empty State */}
      {products.length > 0 ? (
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={savedIds.includes(product.id)}
                onToggleSave={onToggleSave}
                onOpenProduct={onOpenProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-8 rounded-2xl border border-[#E6E0DC] bg-[#F6F0F1] px-6 py-14 text-center"
        >
          <h3 className="font-display text-xl text-[#2A2527]">
            {activeCategory === CategoryFilter.Saved
              ? 'Your saved list is resting quietly'
              : 'No studio pieces matched your search'}
          </h3>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm text-[#685F63]">
            {activeCategory === CategoryFilter.Saved
              ? 'Tap Save on any ceramic vessel, washed linen throw, or botanical taper to gather favorites here.'
              : 'Try clearing your search words or browsing our full small-batch studio catalogue.'}
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#4A6356] px-5 py-2 text-xs font-medium text-[#FAF8F6] transition-colors duration-150 hover:bg-[#3D5347]"
          >
            View All Pieces
          </button>
        </motion.div>
      )}
    </section>
  );
}
