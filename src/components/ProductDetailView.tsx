import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Heart, Minus, Plus } from 'lucide-react';
import { Product } from '../types/shop';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';
import { SmartImage } from './SmartImage';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  initialVariantId?: string;
  allProducts: Product[];
  savedIds: string[];
  onBack: () => void;
  onToggleSave: (productId: string) => void;
  onAddToBag: (
    product: Product,
    variantId: string,
    quantity: number,
    giftNote?: string
  ) => void;
  onOpenProduct: (product: Product, initialVariantId: string) => void;
  onQuickAdd: (product: Product, variantId: string) => void;
}

enum DetailTab {
  Craft = 'craft',
  Care = 'care',
  Shipping = 'shipping',
}

export function ProductDetailView({
  product,
  initialVariantId,
  allProducts,
  savedIds,
  onBack,
  onToggleSave,
  onAddToBag,
  onOpenProduct,
  onQuickAdd,
}: ProductDetailViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    initialVariantId ?? product.variants[0].id
  );
  const [quantity, setQuantity] = useState(1);
  const [includeGiftNote, setIncludeGiftNote] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [activeTab, setActiveTab] = useState<DetailTab>(DetailTab.Craft);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setSelectedVariantId(initialVariantId ?? product.variants[0].id);
    setQuantity(1);
    setIncludeGiftNote(false);
    setGiftNote('');
    setActiveTab(DetailTab.Craft);
  }, [product.id, initialVariantId, product.variants]);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const isSaved = savedIds.includes(product.id);

  const complementaryProducts = allProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const handlePrimaryAdd = () => {
    const trimmedNote = includeGiftNote && giftNote.trim() ? giftNote.trim() : undefined;
    onAddToBag(product, activeVariant.id, quantity, trimmedNote);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-[1240px] px-6 py-8 lg:px-10 lg:py-12"
    >
      {/* Back Navigation */}
      <div className="mb-8 flex items-center justify-between border-b border-[#E6E0DC] pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#5D5458] transition-colors duration-150 hover:text-[#2A2527] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A6356]"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Back to Collection</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#685F63]">
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#2A2527]">{product.name}</span>
        </div>
      </div>

      {/* Contiguous Purchase Module: Sticky Gallery Left + Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Sticky Gallery Column */}
        <div className="lg:sticky lg:top-24 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-[#E6E0DC] bg-[#F3EFEA]">
            <div className="aspect-[4/3] w-full">
              <SmartImage
                src={product.image}
                alt={product.imageAlt}
                fallbackToneClass={product.fallbackToneClass}
                fallbackTitle={product.name}
                className="h-full w-full"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E6E0DC] bg-[#FAF8F6] px-6 py-3.5 text-xs text-[#685F63]">
              <span>{product.batchNote}</span>
              <span>
                Selected finish: <strong className="font-medium text-[#2A2527]">{activeVariant.name}</strong>
              </span>
            </div>
          </div>

          {/* Quiet Tactile Specification Strip */}
          <div className="mt-5 grid grid-cols-1 divide-y divide-[#E6E0DC] rounded-xl border border-[#E6E0DC] bg-[#FAF8F6] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-4">
              <p className="text-xs text-[#685F63]">Dimensions</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#2A2527] tabular-nums">
                {product.dimensions}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xs text-[#685F63]">Origin</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#2A2527]">
                {product.origin}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xs text-[#685F63]">Dispatch</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#2A2527]">
                Ships within 2 studio days
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Contiguous Purchase Module */}
        <div className="lg:sticky lg:top-24 lg:col-span-5">
          <div className="rounded-2xl border border-[#E6E0DC] bg-[#FAF8F6] p-6 sm:p-8">
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-[#685F63]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.availability}</span>
            </div>

            {/* Title & Tabular Price */}
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <h1 className="font-display text-2xl font-normal leading-tight text-[#2A2527] sm:text-3xl text-balance">
                {product.name}
              </h1>
              <span className="font-display text-2xl font-normal text-[#2A2527] tabular-nums shrink-0">
                ${product.price}
              </span>
            </div>

            <p className="mt-4 text-[15px] leading-[1.68] text-[#5D5458]">
              {product.description}
            </p>

            {/* Variant Selection */}
            <div className="mt-6 border-t border-[#ECE7E3] pt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-[#2A2527]">Pastel Tone / Edition</span>
                <span className="text-xs text-[#685F63]">{activeVariant.name}</span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = variant.id === activeVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356] ${
                        isSelected
                          ? 'border-[#4A6356] bg-[#EFF3F0]'
                          : 'border-[#E6E0DC] bg-[#FAF8F6] hover:bg-[#F5F2EF]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`h-5 w-5 shrink-0 rounded-full border border-[#BFB6B0] ${variant.swatchClass}`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#2A2527]">{variant.name}</p>
                          <p className="truncate text-xs text-[#685F63]">{variant.note}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-[#4A6356]" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complimentary Handwritten Gift Note */}
            <div className="mt-5 rounded-xl border border-[#E6E0DC] bg-[#F6F0F1]/70 p-4">
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#2A2527]">
                  Include a handwritten cotton-paper gift card (Complimentary)
                </span>
                <input
                  type="checkbox"
                  checked={includeGiftNote}
                  onChange={(e) => setIncludeGiftNote(e.target.checked)}
                  className="h-4 w-4 accent-[#4A6356]"
                />
              </label>

              {includeGiftNote && (
                <div className="mt-3">
                  <label htmlFor="gift-note-input" className="sr-only">
                    Personal gift card message
                  </label>
                  <textarea
                    id="gift-note-input"
                    rows={2}
                    maxLength={140}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write a warm note for the recipient (inscribed by hand in our studio)..."
                    className="w-full rounded-lg border border-[#DFD5D7] bg-[#FAF8F6] p-2.5 text-xs text-[#2A2527] placeholder:text-[#847A7E] focus:border-[#4A6356] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Quantity Stepper + Primary Add CTA + Save */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div
                className="inline-flex min-h-11 items-center rounded-lg border border-[#E6E0DC] bg-[#FAF8F6]"
                aria-label="Quantity selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-10 items-center justify-center text-[#5D5458] transition-colors hover:text-[#2A2527]"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-[#2A2527] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-11 w-10 items-center justify-center text-[#5D5458] transition-colors hover:text-[#2A2527]"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handlePrimaryAdd}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#4A6356] px-5 py-2.5 text-sm font-medium text-[#FAF8F6] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#3D5347] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356]"
              >
                {addedFeedback ? (
                  <>
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <span className="tabular-nums">
                    Add to Bag — ${product.price * quantity}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(product.id)}
                aria-pressed={isSaved}
                aria-label={isSaved ? 'Saved in wishlist' : 'Save piece'}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isSaved
                    ? 'border-[#DFC6CA] bg-[#EFE4E7] text-[#6E4752]'
                    : 'border-[#E6E0DC] bg-[#FAF8F6] text-[#5D5458] hover:bg-[#F3EFEA] hover:text-[#2A2527]'
                }`}
              >
                <Heart
                  className={`h-4 w-4 shrink-0 ${isSaved ? 'fill-[#8E5D6B] text-[#8E5D6B]' : ''}`}
                  aria-hidden="true"
                />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            <p className="mt-3 text-xs text-[#685F63]">
              Complimentary carbon-neutral shipping on studio orders over $
              <span className="tabular-nums">{FREE_SHIPPING_THRESHOLD}</span>. 30-day gentle home trial.
            </p>

            {/* Craft, Care & Parcel Segmented Details */}
            <div className="mt-7 border-t border-[#ECE7E3] pt-5">
              <div className="flex items-center gap-1 rounded-lg bg-[#F3EFEA] p-1">
                {[
                  { id: DetailTab.Craft, label: 'Materials' },
                  { id: DetailTab.Care, label: 'Care Ritual' },
                  { id: DetailTab.Shipping, label: 'Packaging' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                      activeTab === tab.id
                        ? 'bg-[#FAF8F6] text-[#2A2527] shadow-xs'
                        : 'text-[#685F63] hover:text-[#2A2527]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-4 text-xs leading-relaxed text-[#5D5458]"
              >
                {activeTab === DetailTab.Craft && <p>{product.materials}.</p>}
                {activeTab === DetailTab.Care && <p>{product.careInstructions}</p>}
                {activeTab === DetailTab.Shipping && (
                  <p>
                    Cushioned in biodegradable kraft honeycomb paper and tied with unbleached linen twine. Cash on Delivery and card checkout available.
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Pairs Quietly With */}
      <div className="mt-16 border-t border-[#E6E0DC] pt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-normal text-[#2A2527]">
            Pairs quietly on the same table
          </h2>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-medium text-[#4A6356] underline underline-offset-4 hover:text-[#3D5347] whitespace-nowrap"
          >
            View full catalogue
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {complementaryProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isSaved={savedIds.includes(item.id)}
              onToggleSave={onToggleSave}
              onOpenProduct={onOpenProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
