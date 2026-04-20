import { FormEvent, useMemo, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, CreditCard, Truck, ShoppingBag, Trash2, Tag, Smartphone, Banknote, ScanLine } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated, isReady, user, createOrder } = useAuth();
  const { cart, cartCount, clearCart, removeFromCart } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [bkashNumber, setBkashNumber] = useState('');
  const [nagadNumber, setNagadNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const promoDetails = useMemo(() => {
    const code = appliedPromoCode.trim().toUpperCase();

    if (!code) {
      return { discount: 0, shippingDiscount: 0, label: '' };
    }

    if (code === 'SAVE10') {
      return { discount: Math.round(subtotal * 0.1), shippingDiscount: 0, label: '10% discount applied' };
    }

    if (code === 'FREESHIP') {
      return { discount: 0, shippingDiscount: 120, label: 'Free shipping applied' };
    }

    if (code === 'PANJURI100') {
      return { discount: 100, shippingDiscount: 0, label: '৳100 off applied' };
    }

    return { discount: 0, shippingDiscount: 0, label: '' };
  }, [appliedPromoCode, subtotal]);

  const shippingFeeBase = subtotal >= 2000 || subtotal === 0 ? 0 : 120;
  const shippingFee = Math.max(0, shippingFeeBase - promoDetails.shippingDiscount);
  const discountAmount = Math.min(subtotal, promoDetails.discount);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const requiresPaymentDetails = paymentMethod !== 'Cash on Delivery';

  const resetPaymentFields = () => {
    setBkashNumber('');
    setNagadNumber('');
    setTransactionId('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
  };

  const applyPromoCode = () => {
    const normalizedCode = promoCodeInput.trim().toUpperCase();

    if (!normalizedCode) {
      setAppliedPromoCode('');
      setPromoFeedback('');
      return;
    }

    if (!['SAVE10', 'FREESHIP', 'PANJURI100'].includes(normalizedCode)) {
      setPromoFeedback('Invalid promo code.');
      return;
    }

    setAppliedPromoCode(normalizedCode);
    setPromoFeedback(promoDetails.label || 'Promo code applied.');
  };

  const placeOrder = () => {
    const orderId = createOrder({
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
      })),
      shippingAddress: address.trim(),
      paymentMethod,
      total,
    });

    clearCart();

    if (orderId) {
      navigate(`/order-success?orderId=${orderId}`, { replace: true });
    }
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!cart.length) return;
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    if (!requiresPaymentDetails) {
      setIsSubmitting(true);
      placeOrder();
      setIsSubmitting(false);
      return;
    }

    if (paymentMethod === 'bKash') {
      if (!bkashNumber.trim() || !transactionId.trim()) return;
    }

    if (paymentMethod === 'Nagad') {
      if (!nagadNumber.trim() || !transactionId.trim()) return;
    }

    if (paymentMethod === 'Card Payment') {
      if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim()) return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder();
      setIsSubmitting(false);
    }, 700);
  };

  if (!isReady) {
    return (
      <div className="page-shell min-h-screen bg-fab-gray-light flex items-center justify-center">
        <p className="text-xs uppercase tracking-widest font-black text-fab-text-muted">Loading checkout...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/checkout' } }} />;
  }

  if (cartCount === 0) {
    return (
      <div className="page-shell min-h-screen bg-fab-gray-light">
        <div className="max-w-3xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 text-center">
          <ShoppingBag size={34} className="mx-auto mb-4 text-fab-text-muted" />
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-3">Your Bag is <span className="text-fab-yellow">Empty</span></h1>
          <p className="text-sm text-fab-text-muted mb-8">Add products to your bag before going to checkout.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all">
              Continue Shopping
            </Link>
            <Link to="/account/orders" className="h-11 px-6 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:border-fab-yellow transition-all">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Checkout <span className="text-fab-yellow">Page</span></h1>
            <p className="text-sm text-fab-text-muted mt-2">Review your bag and complete your purchase.</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <form onSubmit={handleFinalSubmit} className="lg:col-span-3 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" required />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Delivery Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={4} className="w-full rounded-lg border border-fab-gray-medium px-4 py-3 text-sm outline-none focus:border-fab-yellow resize-none" required />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Cash on Delivery', 'bKash', 'Nagad', 'Card Payment'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method);
                      resetPaymentFields();
                    }}
                    className={`h-12 rounded-lg border text-xs uppercase font-black tracking-widest transition-all ${paymentMethod === method ? 'bg-fab-yellow border-fab-yellow text-fab-black' : 'bg-white border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-fab-gray-medium bg-fab-gray-light p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-black uppercase tracking-widest">Payment Section</h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-fab-yellow">{paymentMethod}</span>
              </div>

              {paymentMethod === 'Cash on Delivery' && (
                <div className="flex items-start gap-3 text-sm text-fab-text-muted">
                  <Banknote size={18} className="mt-0.5 text-fab-yellow" />
                  <p>
                    No advance payment is needed. Your order will be confirmed now and paid on delivery.
                  </p>
                </div>
              )}

              {paymentMethod === 'bKash' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-fab-text-muted">
                    <Smartphone size={18} className="mt-0.5 text-fab-yellow" />
                    <p>Send the payment to our bKash number, then enter the sender number and transaction ID below.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input value={bkashNumber} onChange={(e) => setBkashNumber(e.target.value)} placeholder="bKash sender number" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" />
                    <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Transaction ID" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" />
                  </div>
                </div>
              )}

              {paymentMethod === 'Nagad' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-fab-text-muted">
                    <ScanLine size={18} className="mt-0.5 text-fab-yellow" />
                    <p>Complete the payment via Nagad and submit the sender number plus transaction ID.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input value={nagadNumber} onChange={(e) => setNagadNumber(e.target.value)} placeholder="Nagad sender number" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" />
                    <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Transaction ID" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" />
                  </div>
                </div>
              )}

              {paymentMethod === 'Card Payment' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-fab-text-muted">
                    <CreditCard size={18} className="mt-0.5 text-fab-yellow" />
                    <p>Enter your card details to complete secure payment before placing the order.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Card holder name" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" />
                    <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card number" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" />
                    <div className="grid grid-cols-2 gap-4">
                      <input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" />
                      <input value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="CVV" className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" />
                    </div>
                  </div>
                </div>
              )}

              {requiresPaymentDetails && (
                <p className="text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                  Payment must be completed first. After payment, the order will be created automatically.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-4">Order Notes</h2>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Optional delivery instructions" className="w-full rounded-lg border border-fab-gray-medium px-4 py-3 text-sm outline-none focus:border-fab-yellow resize-none" />
            </div>

            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-4">Promo Code</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-fab-text-muted" />
                  <input
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter promo code"
                    className="w-full h-11 rounded-lg border border-fab-gray-medium pl-10 pr-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest"
                  />
                </div>
                <button
                  type="button"
                  onClick={applyPromoCode}
                  className="h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all"
                >
                  Apply
                </button>
              </div>
              {promoFeedback && (
                <p className={`mt-2 text-xs font-bold ${promoFeedback.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
                  {promoFeedback}
                </p>
              )}
              {appliedPromoCode && (
                <p className="mt-2 text-xs font-bold text-fab-text-muted uppercase tracking-widest">
                  Applied: {appliedPromoCode}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full h-12 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all disabled:opacity-60 flex items-center justify-center space-x-2"
            >
              <CreditCard size={14} />
              <span>
                {isSubmitting
                  ? 'Processing Payment...'
                  : requiresPaymentDetails
                    ? `Pay & Place Order • ৳ ${total.toLocaleString()}`
                    : `Place Order • ৳ ${total.toLocaleString()}`}
              </span>
            </button>
          </form>

          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h2 className="text-lg font-black uppercase tracking-widest mb-4">Order Summary</h2>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size || 'default'}`} className="flex items-center gap-4 border border-fab-gray-medium rounded-xl p-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-black uppercase tracking-wide truncate">{item.product.name}</p>
                      <p className="text-[10px] uppercase text-fab-text-muted font-bold tracking-widest">
                        Qty: {item.quantity}{item.size ? ` • Size: ${item.size}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-black">৳ {(item.product.price * item.quantity).toLocaleString()}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="w-8 h-8 rounded-full border border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow transition-all inline-flex items-center justify-center"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-fab-text-muted uppercase tracking-widest">
                <span>Subtotal</span>
                <span>৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-fab-text-muted uppercase tracking-widest">
                <span>Promo Discount</span>
                <span>- ৳ {discountAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-fab-text-muted uppercase tracking-widest">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `৳ ${shippingFee.toLocaleString()}`}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-fab-gray-medium text-base font-black uppercase tracking-widest">
                <span>Total</span>
                <span>৳ {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-fab-black text-white rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2"><Truck size={14} className="text-fab-yellow" />Delivery Info</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Standard delivery is free on orders above ৳ 2000. Your placed order will appear in account history immediately.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
