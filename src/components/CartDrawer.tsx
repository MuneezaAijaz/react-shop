import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  CartItem,
  CheckoutStep,
  CustomerDetails,
  OrderReceipt,
  PaymentMethod,
  Product,
} from '../types/shop';
import {
  FREE_SHIPPING_THRESHOLD,
  GIFT_WRAP_FEE,
  STANDARD_SHIPPING_FEE,
} from '../data/products';
import { SmartImage } from './SmartImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  products: Product[];
  giftWrap: boolean;
  lastOrder: OrderReceipt | null;
  onClose: () => void;
  onToggleGiftWrap: (enabled: boolean) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onOpenProduct: (product: Product, variantId: string) => void;
  onCompleteOrder: (customer: CustomerDetails) => OrderReceipt;
}

export function CartDrawer({
  isOpen,
  items,
  products,
  giftWrap,
  lastOrder,
  onClose,
  onToggleGiftWrap,
  onUpdateQuantity,
  onRemoveItem,
  onOpenProduct,
  onCompleteOrder,
}: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.Bag);
  const [activeReceipt, setActiveReceipt] = useState<OrderReceipt | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Card
  );
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  useEffect(() => {
    if (!isOpen && step === CheckoutStep.Confirmed) {
      setStep(CheckoutStep.Bag);
    }
  }, [isOpen, step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const enrichedItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      const variant =
        product.variants.find((v) => v.id === item.variantId) ?? product.variants[0];
      return {
        ...item,
        product,
        variant,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const subtotal = enrichedItems.reduce((sum, entry) => sum + entry.lineTotal, 0);
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee =
    enrichedItems.length === 0 || qualifiesFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const wrapFee = enrichedItems.length > 0 && giftWrap ? GIFT_WRAP_FEE : 0;
  const total = subtotal + shippingFee + wrapFee;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      setFormError('Please complete all delivery contact and address fields.');
      return;
    }

    if (
      paymentMethod === PaymentMethod.Card &&
      (cardNumber.replace(/\s+/g, '').length < 12 || !cardExpiry.trim())
    ) {
      setFormError(
        'Please enter a valid card number and expiry date, or choose Cash on Delivery.'
      );
      return;
    }

    setFormError(null);
    const receipt = onCompleteOrder({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
    });
    setActiveReceipt(receipt);
    setStep(CheckoutStep.Confirmed);
  };

  const displayedReceipt = activeReceipt ?? lastOrder;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag and studio checkout"
        >
          {/* Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2A2527]/35 backdrop-blur-[2px]"
          />

          {/* Slide-Over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#E6E0DC] bg-[#FAF8F6] shadow-xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#E6E0DC] px-6 py-4">
              <div className="flex items-center gap-2.5">
                {step === CheckoutStep.Details && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormError(null);
                      setStep(CheckoutStep.Bag);
                    }}
                    aria-label="Return to shopping bag"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5D5458] hover:bg-[#EFECE8] hover:text-[#2A2527]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <h2 className="font-display text-lg font-medium text-[#2A2527]">
                  {step === CheckoutStep.Bag && 'Your Shopping Bag'}
                  {step === CheckoutStep.Details && 'Delivery & Payment'}
                  {step === CheckoutStep.Confirmed && 'Studio Order Receipt'}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close shopping bag"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5D5458] transition-colors hover:bg-[#EFECE8] hover:text-[#2A2527] focus-visible:outline-2 focus-visible:outline-[#4A6356]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* STEP 1: SHOPPING BAG */}
            {step === CheckoutStep.Bag && (
              <>
                {enrichedItems.length > 0 ? (
                  <>
                    {/* Complimentary Shipping Progress */}
                    <div className="border-b border-[#E6E0DC] bg-[#EFF3F0] px-6 py-3.5">
                      <p className="text-xs text-[#3D5347] tabular-nums">
                        {qualifiesFreeShipping ? (
                          <span>
                            Complimentary carbon-neutral studio shipping unlocked.
                          </span>
                        ) : (
                          <span>
                            Add <strong>${remainingForFreeShipping}</strong> more for complimentary carbon-neutral delivery.
                          </span>
                        )}
                      </p>
                      <svg
                        viewBox="0 0 100 3"
                        preserveAspectRatio="none"
                        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#DCE5DE]"
                        aria-hidden="true"
                      >
                        <rect
                          x="0"
                          y="0"
                          width={shippingProgressPercent}
                          height="3"
                          rx="1.5"
                          className="fill-[#4A6356] transition-all duration-300"
                        />
                      </svg>
                    </div>

                    {/* Itemized List */}
                    <div className="flex-1 divide-y divide-[#ECE7E3] overflow-y-auto px-6">
                      {enrichedItems.map((entry) => (
                        <div key={entry.cartKey} className="flex gap-4 py-5">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenProduct(entry.product, entry.variant.id);
                            }}
                            className="h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-[#E6E0DC] bg-[#F3EFEA]"
                          >
                            <SmartImage
                              src={entry.product.image}
                              alt={entry.product.imageAlt}
                              fallbackToneClass={entry.product.fallbackToneClass}
                              className="h-full w-full"
                            />
                          </button>

                          <div className="flex flex-1 flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onOpenProduct(entry.product, entry.variant.id);
                                  }}
                                  className="font-display text-sm font-medium text-left text-[#2A2527] hover:text-[#4A6356]"
                                >
                                  {entry.product.name}
                                </button>
                                <span className="text-sm font-medium text-[#2A2527] tabular-nums shrink-0">
                                  ${entry.lineTotal}
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-[#685F63]">
                                {entry.variant.name}
                              </p>
                              {entry.giftNote && (
                                <p className="mt-1.5 rounded-md bg-[#F6F0F1] px-2.5 py-1 text-[11px] text-[#5D5458]">
                                  Gift card: “{entry.giftNote}”
                                </p>
                              )}
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="inline-flex items-center rounded-md border border-[#E6E0DC] bg-[#FAF8F6]">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(entry.cartKey, -1)}
                                  aria-label={`Decrease quantity of ${entry.product.name}`}
                                  className="flex h-7 w-7 items-center justify-center text-[#5D5458] hover:text-[#2A2527]"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-6 text-center text-xs font-medium text-[#2A2527] tabular-nums">
                                  {entry.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(entry.cartKey, 1)}
                                  aria-label={`Increase quantity of ${entry.product.name}`}
                                  className="flex h-7 w-7 items-center justify-center text-[#5D5458] hover:text-[#2A2527]"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => onRemoveItem(entry.cartKey)}
                                aria-label={`Remove ${entry.product.name} from bag`}
                                className="inline-flex items-center gap-1 text-xs text-[#685F63] hover:text-[#2A2527]"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bag Footer & Totals */}
                    <div className="border-t border-[#E6E0DC] bg-[#F4F1EE]/75 px-6 py-5">
                      <label className="mb-4 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3.5 py-2.5">
                        <span className="text-xs text-[#2A2527]">
                          Botanical tissue &amp; linen-twine gift wrap
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[#5D5458] tabular-nums">
                            +${GIFT_WRAP_FEE}
                          </span>
                          <input
                            type="checkbox"
                            checked={giftWrap}
                            onChange={(e) => onToggleGiftWrap(e.target.checked)}
                            className="h-4 w-4 accent-[#4A6356]"
                          />
                        </span>
                      </label>

                      <div className="space-y-1.5 text-xs text-[#5D5458]">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="tabular-nums">${subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbon-neutral delivery</span>
                          <span className="tabular-nums">
                            {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                          </span>
                        </div>
                        {wrapFee > 0 && (
                          <div className="flex justify-between">
                            <span>Botanical gift wrap</span>
                            <span className="tabular-nums">${wrapFee}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-[#E6E0DC] pt-2.5 text-sm font-medium text-[#2A2527]">
                          <span>Total</span>
                          <span className="tabular-nums">${total}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(CheckoutStep.Details)}
                        className="mt-4 flex min-h-11 w-full items-center justify-center rounded-lg bg-[#4A6356] px-5 py-2.5 text-sm font-medium text-[#FAF8F6] transition-colors duration-150 hover:bg-[#3D5347]"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF3F0] text-[#4A6356]">
                      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-[#2A2527]">
                      Your shopping bag is empty
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#685F63]">
                      Explore wheel-thrown celadon vessels, washed Normandy flax throws, and beeswax tapers crafted in small studio batches.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#4A6356] px-5 py-2 text-xs font-medium text-[#FAF8F6] transition-colors hover:bg-[#3D5347]"
                    >
                      Browse Studio Pieces
                    </button>

                    {lastOrder && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReceipt(lastOrder);
                          setStep(CheckoutStep.Confirmed);
                        }}
                        className="mt-4 text-xs font-medium text-[#5D5458] underline underline-offset-4 hover:text-[#2A2527]"
                      >
                        View recent Order #{lastOrder.orderNumber} receipt
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: DELIVERY & PAYMENT FORM */}
            {step === CheckoutStep.Details && (
              <form
                onSubmit={handlePlaceOrder}
                className="flex flex-1 flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-5 p-6">
                  {formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-[#DFC6CA] bg-[#F8EDEF] p-3.5 text-xs text-[#6E3F4A]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <p className="font-display text-sm font-medium text-[#2A2527]">
                      Recipient &amp; Shipping Address
                    </p>
                    <div className="mt-3 space-y-3">
                      <div>
                        <label htmlFor="checkout-name" className="block text-xs text-[#5D5458]">
                          Full Name
                        </label>
                        <input
                          id="checkout-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Elena Vance"
                          className="mt-1 min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] focus:border-[#4A6356] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="checkout-email" className="block text-xs text-[#5D5458]">
                            Email Address
                          </label>
                          <input
                            id="checkout-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="elena@example.com"
                            className="mt-1 min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] focus:border-[#4A6356] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="checkout-phone" className="block text-xs text-[#5D5458]">
                            Phone Number
                          </label>
                          <input
                            id="checkout-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(503) 555-0148"
                            className="mt-1 min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] focus:border-[#4A6356] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="checkout-address" className="block text-xs text-[#5D5458]">
                          Street Address
                        </label>
                        <input
                          id="checkout-address"
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="742 Alder Meadow Lane, Apt 3B"
                          className="mt-1 min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] focus:border-[#4A6356] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="checkout-city" className="block text-xs text-[#5D5458]">
                            City
                          </label>
                          <input
                            id="checkout-city"
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Portland"
                            className="mt-1 min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] focus:border-[#4A6356] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="checkout-postal" className="block text-xs text-[#5D5458]">
                            Postal Code
                          </label>
                          <input
                            id="checkout-postal"
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="97205"
                            className="mt-1 min-h-10 w-full rounded-lg border border-[#E6E0DC] bg-[#FAF8F6] px-3 py-2 text-xs text-[#2A2527] tabular-nums focus:border-[#4A6356] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Terms */}
                  <div className="border-t border-[#ECE7E3] pt-5">
                    <p className="font-display text-sm font-medium text-[#2A2527]">
                      Payment Method
                    </p>
                    <div className="mt-3 grid grid-cols-1 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod(PaymentMethod.Card)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-xs transition-colors ${
                          paymentMethod === PaymentMethod.Card
                            ? 'border-[#4A6356] bg-[#EFF3F0] font-medium text-[#2A2527]'
                            : 'border-[#E6E0DC] bg-[#FAF8F6] text-[#5D5458]'
                        }`}
                      >
                        <span>Credit or Debit Card</span>
                        <span>Instant confirmation</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod(PaymentMethod.CashOnDelivery)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-xs transition-colors ${
                          paymentMethod === PaymentMethod.CashOnDelivery
                            ? 'border-[#4A6356] bg-[#EFF3F0] font-medium text-[#2A2527]'
                            : 'border-[#E6E0DC] bg-[#FAF8F6] text-[#5D5458]'
                        }`}
                      >
                        <span>Cash on Delivery (COD)</span>
                        <span className="tabular-nums">Pay ${total} at doorstep</span>
                      </button>
                    </div>

                    {paymentMethod === PaymentMethod.Card ? (
                      <div className="mt-3 grid grid-cols-3 gap-2.5 rounded-xl border border-[#E6E0DC] bg-[#F4F1EE]/60 p-3.5">
                        <div className="col-span-2">
                          <label htmlFor="card-number" className="block text-[11px] text-[#5D5458]">
                            Card Number
                          </label>
                          <input
                            id="card-number"
                            type="text"
                            inputMode="numeric"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4242 4242 4242 4242"
                            className="mt-1 min-h-9 w-full rounded-md border border-[#E6E0DC] bg-[#FAF8F6] px-2.5 py-1.5 text-xs text-[#2A2527] tabular-nums focus:border-[#4A6356] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="card-expiry" className="block text-[11px] text-[#5D5458]">
                            MM / YY
                          </label>
                          <input
                            id="card-expiry"
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="09/29"
                            className="mt-1 min-h-9 w-full rounded-md border border-[#E6E0DC] bg-[#FAF8F6] px-2.5 py-1.5 text-xs text-[#2A2527] tabular-nums focus:border-[#4A6356] focus:outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="mt-3 rounded-xl border border-[#E6E0DC] bg-[#F6F0F1]/70 p-3.5 text-xs leading-relaxed text-[#5D5458]">
                        Total due upon parcel arrival: <strong className="text-[#2A2527] tabular-nums">${total}</strong> (includes {shippingFee === 0 ? 'complimentary shipping over $120' : `$${shippingFee} courier delivery`}). Our courier sends an SMS morning window on dispatch day.
                      </p>
                    )}
                  </div>
                </div>

                {/* Sticky Submit Area */}
                <div className="border-t border-[#E6E0DC] bg-[#F4F1EE]/80 px-6 py-4">
                  <div className="mb-3 flex items-baseline justify-between text-sm font-medium text-[#2A2527]">
                    <span>Order Total ({enrichedItems.length} {enrichedItems.length === 1 ? 'item' : 'items'})</span>
                    <span className="tabular-nums">${total}</span>
                  </div>
                  <button
                    type="submit"
                    className="flex min-h-11 w-full items-center justify-center rounded-lg bg-[#4A6356] px-5 py-2.5 text-sm font-medium text-[#FAF8F6] transition-colors hover:bg-[#3D5347]"
                  >
                    <span className="tabular-nums">Place Studio Order — ${total}</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER CONFIRMED RECEIPT */}
            {step === CheckoutStep.Confirmed && displayedReceipt && (
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6">
                <div>
                  <div className="rounded-2xl border border-[#D4E0D8] bg-[#EFF3F0] p-5">
                    <div className="flex items-center gap-2.5 text-[#2F473B]">
                      <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <p className="text-xs font-medium">
                        Order #{displayedReceipt.orderNumber} Confirmed — Preparing Shipment
                      </p>
                    </div>
                    <h3 className="mt-2 font-display text-xl text-[#2A2527]">
                      Thank you, {displayedReceipt.customer.fullName.split(' ')[0]}.
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#5D5458]">
                      Our studio team is wrapping your pieces in kraft honeycomb paper. Estimated dispatch:{' '}
                      <strong className="font-medium text-[#2A2527]">
                        {displayedReceipt.estimatedDispatch}
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Receipt Item Summary */}
                  <div className="mt-6">
                    <p className="text-xs font-medium text-[#685F63]">Receipt Summary</p>
                    <div className="mt-2 divide-y divide-[#ECE7E3] rounded-xl border border-[#E6E0DC] bg-[#FAF8F6] px-4">
                      {displayedReceipt.items.map((line, index) => (
                        <div
                          key={`${line.productName}-${index}`}
                          className="flex items-baseline justify-between gap-3 py-3 text-xs"
                        >
                          <div>
                            <p className="font-medium text-[#2A2527]">
                              <span className="tabular-nums">{line.quantity}×</span> {line.productName}
                            </p>
                            <p className="text-[#685F63]">{line.variantName}</p>
                            {line.giftNote && (
                              <p className="mt-1 text-[11px] italic text-[#5D5458]">
                                Note: “{line.giftNote}”
                              </p>
                            )}
                          </div>
                          <span className="font-medium text-[#2A2527] tabular-nums shrink-0">
                            ${line.unitPrice * line.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-1.5 text-xs text-[#5D5458]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="tabular-nums">${displayedReceipt.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span className="tabular-nums">
                          {displayedReceipt.shipping === 0
                            ? 'Complimentary'
                            : `$${displayedReceipt.shipping}`}
                        </span>
                      </div>
                      {displayedReceipt.giftWrap && (
                        <div className="flex justify-between">
                          <span>Botanical gift wrap</span>
                          <span className="tabular-nums">${displayedReceipt.giftWrapFee}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-[#E6E0DC] pt-2 text-sm font-medium text-[#2A2527]">
                        <span>
                          {displayedReceipt.customer.paymentMethod === PaymentMethod.CashOnDelivery
                            ? 'Total Due on Delivery'
                            : 'Total Paid'}
                        </span>
                        <span className="tabular-nums">${displayedReceipt.total}</span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#E6E0DC] bg-[#F4F1EE]/60 p-4 text-xs text-[#5D5458]">
                      <p className="font-medium text-[#2A2527]">Shipping Destination</p>
                      <p className="mt-1">
                        {displayedReceipt.customer.fullName} · {displayedReceipt.customer.phone}
                      </p>
                      <p>
                        {displayedReceipt.customer.address}, {displayedReceipt.customer.city}{' '}
                        {displayedReceipt.customer.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-[#4A6356] px-5 py-2.5 text-sm font-medium text-[#FAF8F6] transition-colors hover:bg-[#3D5347]"
                >
                  Continue Browsing Boutique
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
