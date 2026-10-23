import {
  CustomerTestimonial,
  Product,
  ProductCategory,
  StudioMaterial,
} from '../types/shop';

export const HERO_IMAGE = '/src/assets/images/hero_pastel_atelier_1792775828514.jpg';

export const FREE_SHIPPING_THRESHOLD = 120;
export const STANDARD_SHIPPING_FEE = 9;
export const GIFT_WRAP_FEE = 6;

export const PRODUCTS: Product[] = [
  {
    id: 'celadon-mist-carafe',
    name: 'Celadon Mist Table Carafe',
    category: ProductCategory.Ceramics,
    price: 68,
    availability: 'Small Batch · In Stock',
    image: '/src/assets/images/product_celadon_pitcher_1792775828531.jpg',
    imageAlt:
      'Wheel-thrown ceramic water carafe in soft matte pastel celadon sage glaze with subtle mineral speckle on pale limestone',
    fallbackToneClass: 'from-[#E5EDE7] via-[#EFECE7] to-[#DCE6DF]',
    shortNote: 'Wheel-thrown speckled stoneware for water, oat milk, or wild stems.',
    description:
      'Turned slowly by hand on our kick-wheel from iron-flecked buff stoneware, then dipped in a satin-matte celadon ash glaze. A pinched pouring lip prevents drips at the breakfast table while the curved handle rests comfortably in the palm.',
    dimensions: '19.5 cm H × 11.5 cm Ø · Holds 950 ml',
    materials: 'High-fired speckled buff stoneware, lead-free mineral ash glaze',
    origin: 'Thrown & kiln-fired in Portland, Oregon',
    careInstructions:
      'Dishwasher safe on gentle cycle; hand-washing with mild soap preserves the velvety matte glaze patina.',
    batchNote: 'Autumn Kiln Firing No. 14 · 18 pieces shaped',
    variants: [
      {
        id: 'celadon-sage',
        name: 'Celadon Sage',
        swatchClass: 'bg-[#C4D3C8]',
        note: 'Soft mineral sage with fine iron freckles',
      },
      {
        id: 'oatmilk-chalk',
        name: 'Oatmilk Chalk',
        swatchClass: 'bg-[#EAE4DC]',
        note: 'Warm chalk white with raw stoneware foot',
      },
      {
        id: 'blush-quartz',
        name: 'Blush Quartz',
        swatchClass: 'bg-[#E5CFD2]',
        note: 'Powdery rosewater mist over buff clay',
      },
    ],
  },
  {
    id: 'morning-haze-bud-vase',
    name: 'Morning Haze Sculptural Vase',
    category: ProductCategory.Ceramics,
    price: 54,
    availability: 'Limited Run · 6 Remaining',
    image: '/src/assets/images/product_periwinkle_vase_1792775829402.jpg',
    imageAlt:
      'Organic sculptural ceramic bud vase in powdery pastel periwinkle blue matte glaze holding dried lunaria stems',
    fallbackToneClass: 'from-[#E2E6F1] via-[#EFECE9] to-[#D6DDEC]',
    shortNote: 'Hand-dimpled vessel finished in powdery periwinkle mineral glaze.',
    description:
      'Each Morning Haze vessel is gently indented while the clay is still leather-hard, giving every piece its own quiet silhouette under morning window light. Narrow-necked to cradle two or three dried lunaria, chamomile, or eucalyptus stems.',
    dimensions: '16 cm H × 12 cm W · 2.8 cm neck opening',
    materials: 'Porcelain-stoneware blend, matte cobalt-feldspar pastel wash',
    origin: 'Hand-built in Portland, Oregon',
    careInstructions:
      'Watertight interior glaze. Rinse gently with lukewarm water and dry the unglazed foot ring thoroughly.',
    batchNote: 'Studio Edition · Individually signed on base',
    variants: [
      {
        id: 'periwinkle-haze',
        name: 'Periwinkle Haze',
        swatchClass: 'bg-[#B8C4DC]',
        note: 'Soft twilight blue with velvety dry-matte touch',
      },
      {
        id: 'misty-lilac',
        name: 'Misty Lilac',
        swatchClass: 'bg-[#D6CEE0]',
        note: 'Pale heather-lavender mineral wash',
      },
    ],
  },
  {
    id: 'cloud-lavender-flax-throw',
    name: 'Cloud Lavender Flax Throw',
    category: ProductCategory.Textiles,
    price: 118,
    availability: 'In Stock',
    image: '/src/assets/images/product_lavender_throw_1792775830290.jpg',
    imageAlt:
      'Folded washed French flax linen throw blanket in pastel lavender-grey and oatmilk weave with hand-knotted fringe on bleached oak bench',
    fallbackToneClass: 'from-[#EAE6EF] via-[#F3F0EC] to-[#DFD9E7]',
    shortNote: 'Rain-washed Normandy flax woven in dusty lilac and unbleached oat.',
    description:
      'Woven on shuttle looms from long-staple European flax and tumbled with natural enzymes for an airy, lived-in drape from the very first evening. Finished by hand with twisted 7 cm fringe along both ends.',
    dimensions: '140 cm × 200 cm (including 7 cm hand-knotted fringe)',
    materials: '100% OEKO-TEX certified Normandy long-staple flax (245 GSM)',
    origin: 'Flax grown in Normandy · Woven in Lithuania',
    careInstructions:
      'Machine wash cold on delicate cycle with mild liquid detergent. Line dry in shade or tumble dry low for extra loft.',
    batchNote: 'Loom Lot 09 · Pre-washed for zero shrinkage',
    variants: [
      {
        id: 'lavender-oat',
        name: 'Lavender & Oat',
        swatchClass: 'bg-[#D5CEDC]',
        note: 'Yarn-dyed dusty lilac weft with natural oat warp',
      },
      {
        id: 'meadow-celadon',
        name: 'Meadow & Flax',
        swatchClass: 'bg-[#CCD8CE]',
        note: 'Soft sage weft woven with unbleached linen',
      },
      {
        id: 'rosewater-sand',
        name: 'Rosewater & Sand',
        swatchClass: 'bg-[#E4D0D3]',
        note: 'Muted petal blush with warm sand fringe',
      },
    ],
  },
  {
    id: 'rosewater-linen-cushion-duo',
    name: 'Rosewater & Sage Cushion Duo',
    category: ProductCategory.Textiles,
    price: 92,
    availability: 'In Stock',
    image: '/src/assets/images/product_rosewater_cushions_1792775831036.jpg',
    imageAlt:
      'Pair of stonewashed Belgian linen throw cushions in dusty rosewater blush and pale misty sage resting on an alabaster daybed',
    fallbackToneClass: 'from-[#F1E5E7] via-[#F2F0EC] to-[#E2EAE4]',
    shortNote: 'Paired Belgian linen covers with soft frayed Flange edges & feather inserts.',
    description:
      'A harmonious pairing of two stonewashed heavyweight linen cushions—one in dusty rosewater, one in misty celadon—designed to soften reading corners and sun-drenched daybeds. Includes ethically sourced duck-feather and down inner pads.',
    dimensions: 'Set of 2 · Each 50 cm × 50 cm',
    materials: '100% stonewashed Belgian linen (280 GSM), hidden mother-of-pearl buttons',
    origin: 'Woven in Flanders · Sewn in small family workshop',
    careInstructions:
      'Remove inner cushion before laundering. Wash covers at 30°C and reshape gently while damp.',
    batchNote: 'Paired Colorway Set · Includes plush inserts',
    variants: [
      {
        id: 'rosewater-sage-pair',
        name: 'Rosewater + Misty Sage',
        swatchClass: 'bg-[#DFC6CA]',
        note: 'One dusty rosewater & one pale sage cover + inserts',
      },
      {
        id: 'twin-rosewater',
        name: 'Twin Rosewater Pair',
        swatchClass: 'bg-[#E7D3D6]',
        note: 'Two matching dusty rosewater covers + inserts',
      },
    ],
  },
  {
    id: 'buttercream-sage-tapers',
    name: 'Meadow Honey Beeswax Tapers',
    category: ProductCategory.Botanicals,
    price: 36,
    availability: 'In Stock',
    image: '/src/assets/images/product_buttercream_tapers_1792775832460.jpg',
    imageAlt:
      'Hand-dipped pastel buttercream yellow and pale sage green taper candles tied with natural cotton twine on travertine stone',
    fallbackToneClass: 'from-[#F3EEDB] via-[#F2EFE9] to-[#DFE8DF]',
    shortNote: 'Six hand-dipped slow-burning tapers in buttercream & botanical sage.',
    description:
      'Dipped twenty-two times by hand in small copper vats using pure filtered Pacific Northwest beeswax tinted with mineral earth pigments. Burns cleanly for 9 hours per candle with a faint, natural warm-blossom honey aroma—no synthetic fragrance.',
    dimensions: 'Box of 6 tapers (3 Buttercream, 3 Meadow Sage) · 25 cm H × 2.1 cm base',
    materials: '100% pure filtered beeswax, braided unbleached cotton wick, mineral pigment',
    origin: 'Hand-dipped in Willamette Valley, Oregon',
    careInstructions:
      'Trim cotton wick to 6 mm before each lighting and place away from open window drafts for a dripless burn.',
    batchNote: '9-hour burn time per candle · Smokeless flame',
    variants: [
      {
        id: 'buttercream-sage-bundle',
        name: 'Buttercream & Sage (Set of 6)',
        swatchClass: 'bg-[#EDE3BE]',
        note: 'Three pale buttercream + three soft sage tapers',
      },
      {
        id: 'blush-ivory-bundle',
        name: 'Petal Blush & Ivory (Set of 6)',
        swatchClass: 'bg-[#E9D6D7]',
        note: 'Three powdery blush + three raw ivory tapers',
      },
    ],
  },
  {
    id: 'chamomile-sage-botanical-mist',
    name: 'Chamomile & Sage Botanical Mist',
    category: ProductCategory.Botanicals,
    price: 44,
    availability: 'Fresh Distillation · In Stock',
    image: '/src/assets/images/product_chamomile_mist_1792775833461.jpg',
    imageAlt:
      'Frosted pastel blush glass apothecary spray bottle with brushed brass misting cap beside dried chamomile blossoms and sage linen',
    fallbackToneClass: 'from-[#F2E4E4] via-[#F4F1EC] to-[#E1E8E2]',
    shortNote: 'Steam-distilled Roman chamomile, clary sage & neroli for pillows and linens.',
    description:
      'Distilled in copper alembics from organic Roman chamomile blossoms, garden clary sage, and bitter orange petitgrain. Housed in reusable UV-protective frosted blush glass with a fine-mist brushed brass atomizer to settle fresh sheets before sleep.',
    dimensions: '100 ml / 3.4 fl oz · Recyclable frosted glass bottle',
    materials: 'Organic Matricaria recutita hydrosol, Salvia sclarea oil, Citrus aurantium blossom water',
    origin: 'Copper-distilled in small 40-bottle lots',
    careInstructions:
      'Mist 30 cm above pillows, throws, or curtains. Safe for fine washed linen, wool, and silk.',
    batchNote: 'Harvest Distillation No. 07 · Alcohol-free formula',
    variants: [
      {
        id: 'chamomile-sage-100',
        name: 'Chamomile & Clary Sage',
        swatchClass: 'bg-[#EBCFD1]',
        note: 'Herbal apple-blossom calm with soft green sage leaf',
      },
      {
        id: 'lavender-neroli-100',
        name: 'Highland Lavender & Neroli',
        swatchClass: 'bg-[#D7CFE2]',
        note: 'Dewy lavender flower with sunlit orange blossom',
      },
    ],
  },
];

export const STUDIO_MATERIALS: StudioMaterial[] = [
  {
    id: 'celadon-stoneware',
    title: 'Celadon Ash Stoneware',
    subtitle: 'Ceramics · Fired to 1,220°C',
    swatchClass: 'bg-[#C4D3C8]',
    surfaceTintClass: 'bg-[#EFF3F0]',
    origin: 'Willamette Valley Clay & Wood Ash',
    specification: '0.4% water absorption · Satin-matte mineral glaze',
    story:
      'We blend iron-speckled buff clay with washed wood ash and feldspar to achieve quiet pastel glazes that never look glossy or factory-coated. Tiny dark iron flecks bloom gently through the celadon surface during a 28-hour reduction firing.',
    careRitual:
      'Warms gracefully when rinsed in hot water before pouring morning tea or table water.',
  },
  {
    id: 'rosewater-clay',
    title: 'Rosewater & Periwinkle Washes',
    subtitle: 'Ceramics · Hand-Mixed Mineral Oxides',
    swatchClass: 'bg-[#E4CFD3]',
    surfaceTintClass: 'bg-[#F6F0F1]',
    origin: 'Raw Feldspar, Quartz & Trace Cobalt',
    specification: 'Lead-free & food-safe · Tactile dry-velvet exterior',
    story:
      'Rather than bright synthetic stains, our blush and twilight-blue glazes come from minute traces of pink quartz and muted cobalt suspended in matte kaolin slip—yielding powdery tones reminiscent of pressed chalk pastels.',
    careRitual:
      'Exterior unglazed foot rings are hand-sanded with diamond pads so they glide softly over timber tables without scratching.',
  },
  {
    id: 'normandy-flax',
    title: 'Rain-Washed Normandy Flax',
    subtitle: 'Textiles · 245–280 GSM Long-Staple Linen',
    swatchClass: 'bg-[#D5CEDC]',
    surfaceTintClass: 'bg-[#F2EFF5]',
    origin: 'Coastal France & Belgian Looms',
    specification: 'OEKO-TEX Standard 100 · Zero optical brighteners',
    story:
      'Irrigated solely by coastal rainfall, our flax fibers are yarn-dyed in muted botanical baths—dusty lavender, rosewater, and meadow sage—then stone-tumbled so every throw and cushion arrives supple rather than stiff.',
    careRitual:
      'Never requires ironing; natural gentle rumples are part of the weave’s relaxed character.',
  },
  {
    id: 'botanical-wax',
    title: 'Unbleached Beeswax & Hydrosols',
    subtitle: 'Botanicals · Copper-Vat & Alembic Crafted',
    swatchClass: 'bg-[#EDE3BE]',
    surfaceTintClass: 'bg-[#F6F3EA]',
    origin: 'Pacific Northwest Apiaries & Organic Farms',
    specification: '100% phthalate-free · Pure steam-distilled hydrosols',
    story:
      'Our tapers get their soft buttercream and sage hues from raw pollen-rich beeswax blended with earth clays, while our linen mists rely on first-pass floral waters rather than harsh alcohol bases.',
    careRitual:
      'Keep hydrosol bottles out of direct midday sun to preserve delicate chamomile notes for up to 18 months.',
  },
];

export const TESTIMONIALS: CustomerTestimonial[] = [
  {
    id: 'clara-lindqvist',
    quote:
      'Before finding Ciel & Clay, studio props we ordered online arrived looking overly glossy or artificially saturated in daylight. Their Celadon Mist Carafe and Rosewater Cushions brought an immediate, hushed warmth to three residential styling projects this autumn.',
    author: 'Clara Lindqvist',
    role: 'Principal Interior Stylist',
    organization: 'Studio Nordholm, Seattle',
    pieceOwned: 'Celadon Mist Carafe & Rosewater Cushion Duo',
  },
  {
    id: 'julian-vance',
    quote:
      'We switched our tea room tables from clear glass decanters to twelve wheel-thrown Celadon Carafes and Meadow Honey Tapers. Every parcel arrived intact in plastic-free molded pulp, and guests ask almost daily who shaped the stoneware.',
    author: 'Julian Vance',
    role: 'Founder & Proprietor',
    organization: 'Linden Leaf Tea Room, San Francisco',
    pieceOwned: '12× Celadon Mist Carafes & Beeswax Tapers',
  },
];
