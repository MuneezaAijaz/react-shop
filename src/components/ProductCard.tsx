import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Heart, Plus } from 'lucide-react';
import { Product } from '../types/shop';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
  onOpenProduct: (product: Product, initialVariantId: string) => void;
  onQuickAdd: (product: Product, variantId: string) => void;
}

export function ProductCard({
  product,
  isSaved,
  onToggleSave,
  onOpenProduct,
  onQuickAdd,
}: ProductCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const handleAdd = () => {
    onQuickAdd(product, activeVariant.id);
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
    }, 1300);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#E6E0DC] bg-[#FAF8F6] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
    >
      {/* 4:3 Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFEA]">
        <button
          type="button"
          onClick={() => onOpenProduct(product, activeVariant.id)}
          aria-label={`View details for ${product.name}`}
          className="block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4A6356]"
        >
          <div className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <SmartImage
              src={product.image}
              alt={product.imageAlt}
              fallbackToneClass={product.fallbackToneClass}
              fallbackTitle={product.name}
              className="h-full w-full"
            />
          </div>
        </button>

        {/* Save / Wishlist Affordance (Icon + Label State for Accessibility) */}
        <button
          type="button"
          onClick={() => onToggleSave(product.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${product.name} from saved pieces` : `Save ${product.name}`}
          className={`absolute top-3 right-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium backdrop-blur-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356] ${
            isSaved
              ? 'bg-[#EFE4E7]/95 text-[#6E4752]'
              : 'bg-[#FAF8F6]/88 text-[#5D5458] hover:bg-[#FAF8F6] hover:text-[#2A2527]'
          }`}
        >
          <Heart
            className={`h-3.5 w-3.5 shrink-0 ${isSaved ? 'fill-[#8E5D6B] text-[#8E5D6B]' : ''}`}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Card Body with Uniform Field Order */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-[#685F63]">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.availability}</span>
          </div>

          {/* Product Name & Tabular Price */}
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[17px] font-medium leading-snug text-[#2A2527]">
              <button
                type="button"
                onClick={() => onOpenProduct(product, activeVariant.id)}
                className="text-left transition-colors duration-150 hover:text-[#4A6356] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356]"
              >
                {product.name}
              </button>
            </h3>
            <span className="text-[15px] font-medium text-[#2A2527] tabular-nums shrink-0">
              ${product.price}
            </span>
          </div>

          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#685F63]">{product.shortNote}</p>
        </div>

        {/* Variant Selector & Quick Add Row */}
        <div className="mt-5 border-t border-[#ECE7E3] pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2" role="radiogroup" aria-label={`Select tone for ${product.name}`}>
                {product.variants.map((variant) => {
                  const isSelected = variant.id === activeVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={variant.name}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`h-6 w-6 rounded-full border transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356] ${
                        variant.swatchClass
                      } ${
                        isSelected
                          ? 'scale-110 border-[#2A2527] ring-2 ring-[#2A2527]/15'
                          : 'border-[#CFC7C1] hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
              <p className="mt-1.5 truncate text-xs text-[#685F63]">
                Tone: <span className="text-[#4A4347]">{activeVariant.name}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356] ${
                justAdded
                  ? 'bg-[#DCE8E0] text-[#2F473B]'
                  : 'bg-[#EFF3F0] text-[#2F473B] hover:bg-[#4A6356] hover:text-[#FAF8F6]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
