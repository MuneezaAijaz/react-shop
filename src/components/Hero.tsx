import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onExploreCollection: () => void;
  onReadAtelier: () => void;
}

const PROVENANCE_HIGHLIGHTS = [
  {
    title: 'Small-Batch Stoneware',
    detail: 'Thrown by hand & fired at 1,220°C in soft mineral ash glazes',
  },
  {
    title: 'Rain-Washed European Flax',
    detail: 'OEKO-TEX certified Normandy linen softened with natural enzymes',
  },
  {
    title: 'Thoughtful Studio Parcels',
    detail: 'Plastic-free honeycomb wrap & handwritten cotton-rag gift cards',
  },
];

export function Hero({ onExploreCollection, onReadAtelier }: HeroProps) {
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-6 pt-8 pb-12 lg:px-10 lg:pt-10 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 items-stretch overflow-hidden rounded-2xl border border-[#E6E0DC] bg-[#EFF3F0] lg:grid-cols-12"
      >
        {/* Left Editorial Column */}
        <div className="flex flex-col justify-between p-8 sm:p-11 lg:col-span-5 lg:p-12">
          <div>
            <p className="text-xs text-[#685F63]">
              Autumn — Winter Studio Edition <span aria-hidden="true">·</span> Portland Atelier
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,3.4vw,3.35rem)] font-normal leading-[1.12] tracking-tight text-[#2A2527] text-balance">
              Quiet pastel objects shaped by hand for slow mornings.
            </h1>

            <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.68] text-[#5D5458]">
              Each vessel, washed linen throw, and beeswax taper is crafted in calm, tactile batches—bringing gentle color and unhurried warmth to your daily table.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 pt-2">
            <button
              type="button"
              onClick={onExploreCollection}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#4A6356] px-5 py-2.5 text-sm font-medium text-[#FAF8F6] whitespace-nowrap shrink-0 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#3D5347] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356]"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onReadAtelier}
              className="py-2 text-sm font-medium text-[#4A4347] underline decoration-[#C5BDBE] underline-offset-6 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#2A2527] hover:decoration-[#4A6356] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A6356]"
            >
              Read Our Studio Story
            </button>
          </div>
        </div>

        {/* Right Photography Column */}
        <div className="min-h-[280px] sm:min-h-[360px] lg:col-span-7 lg:min-h-[460px]">
          <SmartImage
            src={HERO_IMAGE}
            alt="Handcrafted pastel celadon ceramic pitcher with dried chamomile stems, dusty rose tea bowls, and buttercream beeswax tapers on washed linen"
            fallbackToneClass="from-[#E1EBE4] via-[#F2ECE9] to-[#EDE5E7]"
            fallbackTitle="Ciel & Clay Autumn Table"
            className="h-full w-full lg:h-full"
          />
        </div>
      </motion.div>

      {/* Full-Width 3-Column Provenance Strip Below Split Hero */}
      <div className="mt-6 grid grid-cols-1 divide-y divide-[#E6E0DC] rounded-xl border border-[#E6E0DC] bg-[#FAF8F6] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {PROVENANCE_HIGHLIGHTS.map((item) => (
          <div key={item.title} className="px-6 py-4">
            <p className="font-display text-sm font-medium text-[#2A2527]">{item.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#685F63]">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
