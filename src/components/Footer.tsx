import { FormEvent, useState } from 'react';
import { Check } from 'lucide-react';
import { CategoryFilter, ProductCategory } from '../types/shop';

interface FooterProps {
  onSelectCategory: (category: CategoryFilter) => void;
  onScrollToAtelier: () => void;
}

export function Footer({ onSelectCategory, onScrollToAtelier }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-[#E6E0DC] bg-[#FAF8F6]">
      <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Studio Hours */}
          <div className="md:col-span-5">
            <p className="font-display text-xl font-medium text-[#2A2527]">Ciel &amp; Clay</p>
            <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-[#685F63]">
              Handcrafted pastel stoneware, rain-washed Normandy flax textiles, and pure botanical tapers shaped in small batches for calm daily living.
            </p>
            <p className="mt-4 text-xs text-[#685F63]">
              Portland Studio Showroom <span aria-hidden="true">·</span> Thursday – Sunday, 10:00 – 17:00
            </p>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-3">
            <p className="font-display text-sm font-medium text-[#2A2527]">Catalogue</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[#685F63]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory(CategoryFilter.All)}
                  className="transition-colors hover:text-[#2A2527]"
                >
                  All Studio Pieces
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory(CategoryFilter.Ceramics)}
                  className="transition-colors hover:text-[#2A2527]"
                >
                  {ProductCategory.Ceramics}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory(CategoryFilter.Textiles)}
                  className="transition-colors hover:text-[#2A2527]"
                >
                  {ProductCategory.Textiles}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory(CategoryFilter.Botanicals)}
                  className="transition-colors hover:text-[#2A2527]"
                >
                  {ProductCategory.Botanicals}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToAtelier}
                  className="transition-colors hover:text-[#2A2527]"
                >
                  Material &amp; Glaze Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Quiet Kiln Dispatch Letter */}
          <div className="md:col-span-4">
            <p className="font-display text-sm font-medium text-[#2A2527]">
              Seasonal Kiln Notes
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#685F63]">
              Receive a quiet letter four times a year when fresh stoneware firings and linen weaves leave our studio tables.
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#D4E0D8] bg-[#EFF3F0] px-3.5 py-2.5 text-xs text-[#2F473B]">
                <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Welcome to our seasonal kiln letter.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <label htmlFor="kiln-letter-email" className="sr-only">
                  Email address for seasonal kiln notes
                </label>
                <input
                  id="kiln-letter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-h-10 flex-1 rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] placeholder:text-[#847A7E] focus:border-[#4A6356] focus:outline-none"
                />
                <button
                  type="submit"
                  className="min-h-10 rounded-lg bg-[#4A6356] px-4 py-2 text-xs font-medium text-[#FAF8F6] whitespace-nowrap shrink-0 transition-colors hover:bg-[#3D5347]"
                >
                  Join Letter
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#ECE7E3] pt-6 text-xs text-[#685F63] sm:flex-row">
          <p>© {new Date().getFullYear()} Ciel &amp; Clay Studio. Crafted in small batches.</p>
          <p>
            30-Day Home Trial <span aria-hidden="true">·</span> Plastic-Free Parcels{' '}
            <span aria-hidden="true">·</span> Carbon-Neutral Delivery
          </p>
        </div>
      </div>
    </footer>
  );
}
