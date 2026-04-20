import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ClipboardCheck, RotateCcw, Truck, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ReturnRequestItem {
  id: string;
  orderId: string;
  email: string;
  itemName: string;
  requestType: 'Return' | 'Exchange' | 'Cancellation';
  reason: string;
  details: string;
  status: 'Submitted' | 'Reviewed' | 'Resolved';
  createdAt: string;
}

const STORAGE_KEY = 'dorjighor-return-requests';

const reasonOptions = [
  'Wrong size',
  'Damaged item',
  'Changed mind',
  'Late delivery',
  'Wrong item received',
  'Other',
];

function loadRequests(): ReturnRequestItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRequests(requests: ReturnRequestItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export default function ReturnRequest() {
  const { isAuthenticated, user, orders } = useAuth();
  const [requests, setRequests] = useState<ReturnRequestItem[]>(loadRequests);
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [itemName, setItemName] = useState('');
  const [requestType, setRequestType] = useState<ReturnRequestItem['requestType']>('Return');
  const [reason, setReason] = useState(reasonOptions[0]);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!orderId.trim() || !email.trim() || !itemName.trim() || !details.trim()) return;

    const nextRequest: ReturnRequestItem = {
      id: `RR-${Date.now().toString().slice(-6)}`,
      orderId: orderId.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      itemName: itemName.trim(),
      requestType,
      reason,
      details: details.trim(),
      status: 'Submitted',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const nextRequests = [nextRequest, ...requests];
    setRequests(nextRequests);
    saveRequests(nextRequests);
    setIsSubmitted(true);
    setOrderId('');
    setItemName('');
    setDetails('');
    setReason(reasonOptions[0]);
    setRequestType('Return');
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">After Sales</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Return & <span className="text-fab-yellow">Cancellation</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
            Request return, exchange, or cancellation for an order and track the submitted request below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="text-fab-yellow" size={20} />
              <h2 className="text-lg font-black uppercase tracking-widest">Submit Request</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Order ID</label>
                  <input value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow uppercase tracking-widest" placeholder="DG-123456" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Request Type</label>
                  <select value={requestType} onChange={(e) => setRequestType(e.target.value as ReturnRequestItem['requestType'])} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white">
                    <option value="Return">Return</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Cancellation">Cancellation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Reason</label>
                  <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white">
                    {reasonOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Item Name</label>
                <input value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" placeholder="Product name from order" required />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Details</label>
                <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={5} className="w-full rounded-lg border border-fab-gray-medium px-4 py-3 text-sm outline-none focus:border-fab-yellow resize-none" placeholder="Describe the issue or request details" required />
              </div>

              {isSubmitted && (
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Request submitted successfully.</p>
              )}

              <button type="submit" className="h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all inline-flex items-center gap-2">
                <ClipboardCheck size={14} />
                Submit Request
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Eligible Order Items</h3>
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {recentOrders.map((order) => (
                  <div key={order.id} className="rounded-xl border border-fab-gray-medium p-3 text-sm">
                    <p className="font-black uppercase tracking-wide">{order.id}</p>
                    <p className="text-[10px] uppercase tracking-widest text-fab-text-muted font-bold mt-1">{order.status} • ৳ {order.total.toLocaleString()}</p>
                    <div className="mt-2 space-y-1 text-xs text-fab-text-muted">
                      {order.items.map((item) => (
                        <button key={`${order.id}-${item.productId}`} type="button" onClick={() => setItemName(item.name)} className="block text-left w-full hover:text-fab-yellow transition-colors">
                          • {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {recentOrders.length === 0 && <p className="text-sm text-fab-text-muted">No recent orders available.</p>}
              </div>
            </div>

            <div className="bg-fab-black text-white rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-2">What happens next</p>
              <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                <p>1. Our support team reviews the request.</p>
                <p>2. You receive confirmation or follow-up instructions.</p>
                <p>3. Approved requests move to return pickup or cancellation processing.</p>
              </div>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Submitted Requests</h3>
              <div className="space-y-3">
                {requests.map((request) => (
                  <div key={request.id} className="rounded-xl border border-fab-gray-medium p-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="text-sm font-black uppercase tracking-wide">{request.id}</p>
                        <p className="text-[10px] uppercase tracking-widest text-fab-text-muted font-bold">{request.requestType}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-black text-fab-yellow">{request.status}</span>
                    </div>
                    <p className="text-xs text-fab-text-muted leading-relaxed">{request.orderId} • {request.itemName}</p>
                  </div>
                ))}
                {requests.length === 0 && <p className="text-sm text-fab-text-muted">No requests submitted yet.</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-widest font-black text-fab-text-muted">
          <Link to="/shipping-policy" className="hover:text-fab-yellow transition-colors">Shipping Policy</Link>
          <Link to="/payment-methods" className="hover:text-fab-yellow transition-colors">Payment Methods</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
