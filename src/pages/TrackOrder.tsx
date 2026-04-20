import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, Search, BadgeCheck, Truck, CircleSlash2, Clock3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface StoredOrder {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: string;
  shippingAddress: string;
  items: Array<{
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
  }>;
  total: number;
}

const statusMeta = {
  Processing: {
    icon: Clock3,
    color: 'text-amber-600',
    label: 'Processing',
    helper: 'Your order is being prepared by our team.',
  },
  Shipped: {
    icon: Truck,
    color: 'text-blue-600',
    label: 'Shipped',
    helper: 'Your order is on the way to your address.',
  },
  Delivered: {
    icon: BadgeCheck,
    color: 'text-green-600',
    label: 'Delivered',
    helper: 'Your order has been delivered successfully.',
  },
} as const;

function loadOrders(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem('dorjighor-orders') || '[]');
  } catch {
    return [];
  }
}

export default function TrackOrder() {
  const { user, isAuthenticated } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [result, setResult] = useState<StoredOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const orders = useMemo(() => loadOrders(), []);

  const handleSearch = () => {
    const normalizedOrderId = orderId.trim().toUpperCase();

    if (!normalizedOrderId) {
      setResult(null);
      setSearched(true);
      return;
    }

    const matchedOrder = orders.find((item) => item.id.toUpperCase() === normalizedOrderId) || null;

    setResult(matchedOrder);
    setSearched(true);
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Order Status</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Track Your <span className="text-fab-yellow">Order</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
            Search by order ID to check the latest status, shipping details, and payment method.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <PackageSearch className="text-fab-yellow" size={20} />
              <h2 className="text-lg font-black uppercase tracking-widest">Search Order</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Order ID</label>
                <input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="DG-123456"
                  className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Email or phone</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
                />
                <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                  Optional. Keep it here for support reference.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-fab-black px-5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-fab-yellow hover:text-fab-black"
            >
              <Search size={14} />
              Track Order
            </button>

            {searched && !result && (
              <div className="mt-6 rounded-xl border border-dashed border-fab-gray-medium bg-fab-gray-light p-5">
                <div className="flex items-center gap-2 text-fab-text-muted">
                  <CircleSlash2 size={16} />
                  <p className="text-xs font-bold uppercase tracking-widest">No matching order found.</p>
                </div>
                <p className="mt-2 text-sm text-fab-text-muted">
                  Check the order ID from your confirmation message or visit your account order history if you are signed in.
                </p>
              </div>
            )}

            {result && (
              <div className="mt-6 rounded-2xl border border-fab-yellow bg-fab-yellow/10 p-5 sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted">Order ID</p>
                    <h3 className="text-2xl font-black italic tracking-tighter text-fab-black">{result.id}</h3>
                    <p className="mt-1 text-sm text-fab-text-muted">Placed on {result.date}</p>
                  </div>
                  <div className="rounded-xl bg-white px-4 py-3 border border-fab-gray-medium">
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${statusMeta[result.status].color}`}>
                      {(() => {
                        const Icon = statusMeta[result.status].icon;
                        return <Icon size={14} />;
                      })()}
                      <span>{statusMeta[result.status].label}</span>
                    </div>
                    <p className="mt-2 text-xs text-fab-text-muted">{statusMeta[result.status].helper}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl bg-white border border-fab-gray-medium p-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Shipping Address</p>
                    <p className="font-bold text-fab-black">{result.shippingAddress}</p>
                  </div>
                  <div className="rounded-xl bg-white border border-fab-gray-medium p-4">
                    <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Payment Method</p>
                    <p className="font-bold text-fab-black">{result.paymentMethod}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white border border-fab-gray-medium p-4">
                  <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-3">Items</p>
                  <div className="space-y-3">
                    {result.items.map((item) => (
                      <div key={`${result.id}-${item.productId}`} className="flex items-center gap-3 border border-fab-gray-medium rounded-xl p-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black uppercase tracking-wide truncate">{item.name}</p>
                          <p className="text-[10px] uppercase tracking-widest text-fab-text-muted font-bold">
                            Qty: {item.quantity}{item.size ? ` • Size: ${item.size}` : ''}
                          </p>
                        </div>
                        <p className="text-sm font-black">৳ {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-fab-gray-medium pt-4">
                  <p className="text-xs uppercase tracking-widest font-black text-fab-text-muted">Total</p>
                  <p className="text-lg font-black">৳ {result.total.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-3">Tips</h3>
              <ul className="space-y-2 text-sm text-fab-text-muted leading-relaxed">
                <li>• Use the order ID from checkout or account history.</li>
                <li>• Signed-in users can check the Orders page faster.</li>
                <li>• For support, use the Contact page or WhatsApp button.</li>
              </ul>
            </div>

            <div className="bg-fab-black text-white rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-2">Signed in already?</p>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                You can review your latest orders from your account dashboard.
              </p>
              <Link to={isAuthenticated ? '/account/orders' : '/login'} className="inline-flex h-11 items-center justify-center rounded-lg bg-fab-yellow px-5 text-xs font-black uppercase tracking-widest text-fab-black transition-all hover:bg-white">
                {isAuthenticated ? 'View Orders' : 'Login First'}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
