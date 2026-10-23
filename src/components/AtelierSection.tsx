import { useState } from 'react';
import { motion } from 'motion/react';
import { STUDIO_MATERIALS, TESTIMONIALS } from '../data/products';

export function AtelierSection() {
  const [activeMaterialId, setActiveMaterialId] = useState(STUDIO_MATERIALS[0].id);

  const activeMaterial =
    STUDIO_MATERIALS.find((m) => m.id === activeMaterialId) ?? STUDIO_MATERIALS[0];

  return (
    <section
      id="atelier"
      className="scroll-mt-20 border-t border-[#E6E0DC] bg-[#F4F1EE]/65 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {/* Interactive Studio Material & Pastel Glaze Explorer */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs text-[#685F63]">
                Our Atelier <span aria-hidden="true">·</span> Material Honesty
              </p>
              <h2 className="mt-2 font-display text-2xl font-normal leading-tight text-[#2A2527] sm:text-3xl text-balance">
                Soft mineral color drawn from ash, quartz, and rain-washed flax.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.68] text-[#5D5458]">
                We avoid synthetic neon pigments and high-gloss industrial lacquers. Select any studio material below to explore how our muted pastel palette comes to life in small kiln and loom batches.
              </p>
            </div>

            <div
              className="mt-7 flex flex-col gap-2"
              role="tablist"
              aria-label="Studio materials and pastel glazes"
            >
              {STUDIO_MATERIALS.map((material) => {
                const isSelected = material.id === activeMaterial.id;
                return (
                  <button
                    key={material.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveMaterialId(material.id)}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A6356] ${
                      isSelected
                        ? 'border-[#4A6356] bg-[#FAF8F6]'
                        : 'border-[#E6E0DC] bg-transparent hover:bg-[#FAF8F6]/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`h-5 w-5 shrink-0 rounded-full border border-[#C5BDBE] ${material.swatchClass}`}
                        aria-hidden="true"
                      />
                      <span className="truncate font-display text-sm font-medium text-[#2A2527]">
                        {material.title}
                      </span>
                    </div>
                    <span className="text-xs text-[#685F63] whitespace-nowrap shrink-0">
                      {material.subtitle.split('·')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Material Detail Panel */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeMaterial.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`flex h-full flex-col justify-between rounded-2xl border border-[#E6E0DC] p-8 sm:p-10 ${activeMaterial.surfaceTintClass}`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#685F63]">
                  <span>{activeMaterial.subtitle}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeMaterial.origin}</span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <span
                    className={`h-11 w-11 shrink-0 rounded-full border border-[#BFB6B0] ${activeMaterial.swatchClass}`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-normal text-[#2A2527]">
                      {activeMaterial.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#5D5458]">{activeMaterial.specification}</p>
                  </div>
                </div>

                <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.72] text-[#3F383B]">
                  {activeMaterial.story}
                </p>
              </div>

              <div className="mt-8 border-t border-[#DCD5D0] pt-5">
                <p className="text-xs font-medium text-[#2A2527]">Home Care Ritual</p>
                <p className="mt-1 text-sm leading-relaxed text-[#5D5458]">
                  {activeMaterial.careRitual}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Studio Fulfilment Metrics + Attributable Customer Notes */}
        <div className="mt-16 border-t border-[#E6E0DC] pt-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="text-xs text-[#685F63]">
                Studio Care &amp; Provenance <span aria-hidden="true">·</span> Verified Parcels
              </p>
              <h3 className="mt-2 font-display text-2xl font-normal text-[#2A2527] text-balance">
                Packed by the hands that glazed them
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-6">
              <div>
                <p className="font-display text-2xl font-normal text-[#2A2527] tabular-nums">
                  99.4%
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#685F63]">
                  Intact ceramic arrival across 4,200+ parcels in 18 months
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-normal text-[#2A2527] tabular-nums">
                  1,220°C
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#685F63]">
                  28-hour kiln reduction cycle for lifelong stoneware durability
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-display text-2xl font-normal text-[#2A2527] tabular-nums">
                  100%
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#685F63]">
                  Biodegradable kraft honeycomb &amp; recycled paper tape
                </p>
              </div>
            </div>
          </div>

          {/* Attributable Testimonials */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E6E0DC] bg-[#FAF8F6] p-7"
              >
                <p className="text-[14.5px] leading-[1.7] text-[#3F383B]">
                  “{item.quote}”
                </p>
                <footer className="mt-6 border-t border-[#ECE7E3] pt-4">
                  <p className="font-display text-sm font-medium text-[#2A2527]">{item.author}</p>
                  <p className="mt-0.5 text-xs text-[#685F63]">
                    {item.role}, {item.organization} <span aria-hidden="true">·</span>{' '}
                    <span>{item.pieceOwned}</span>
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
