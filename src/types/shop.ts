export enum ProductCategory {
  Ceramics = 'Ceramics',
  Textiles = 'Textiles',
  Botanicals = 'Botanicals',
}

export enum CategoryFilter {
  All = 'All Pieces',
  Ceramics = 'Ceramics',
  Textiles = 'Textiles',
  Botanicals = 'Botanicals',
  Saved = 'Saved',
}

export enum SortOption {
  Featured = 'featured',
  PriceAsc = 'price-asc',
  PriceDesc = 'price-desc',
}

export enum CheckoutStep {
  Bag = 'bag',
  Details = 'details',
  Confirmed = 'confirmed',
}

export enum PaymentMethod {
  Card = 'card',
  CashOnDelivery = 'cod',
}

export interface ProductVariant {
  id: string;
  name: string;
  swatchClass: string;
  note: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  availability: string;
  image: string;
  imageAlt: string;
  fallbackToneClass: string;
  shortNote: string;
  description: string;
  dimensions: string;
  materials: string;
  origin: string;
  careInstructions: string;
  batchNote: string;
  variants: ProductVariant[];
}

export interface CartItem {
  cartKey: string;
  productId: string;
  variantId: string;
  quantity: number;
  giftNote?: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
}

export interface OrderReceipt {
  orderNumber: string;
  placedAt: string;
  estimatedDispatch: string;
  items: Array<{
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    giftNote?: string;
  }>;
  giftWrap: boolean;
  subtotal: number;
  shipping: number;
  giftWrapFee: number;
  total: number;
  customer: CustomerDetails;
}

export interface StudioMaterial {
  id: string;
  title: string;
  subtitle: string;
  swatchClass: string;
  surfaceTintClass: string;
  origin: string;
  specification: string;
  story: string;
  careRitual: string;
}

export interface CustomerTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  pieceOwned: string;
}
