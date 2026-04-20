import { Link, useSearchParams } from 'react-router-dom';
import { BadgeCheck, PackageCheck, Truck } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'Pending';

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white border border-fab-gray-medium rounded-3xl p-8 sm:p-10 text-center">
        <BadgeCheck size={40} className="mx-auto mb-4 text-green-600" />
        <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-text-muted mb-3">Order Completed</p>
        <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter mb-3">
          Order <span className="text-fab-yellow">Confirmed</span>
        </h1>
        <p className="text-sm text-fab-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
          Your order has been placed successfully. We will verify payment if required and prepare it for dispatch.
        </p>

        <div className="max-w-md mx-auto rounded-2xl border border-fab-gray-medium bg-fab-gray-light p-5 mb-8 text-left">
          <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Order Reference</p>
          <p className="text-2xl font-black italic text-fab-black">{orderId}</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-fab-text-muted">Keep this ID for tracking and support.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
          <div className="rounded-2xl border border-fab-gray-medium p-4">
            <Truck size={18} className="text-fab-yellow mb-3" />
            <p className="text-xs font-black uppercase tracking-widest mb-1">Track Status</p>
            <p className="text-xs text-fab-text-muted leading-relaxed">Check your order progress from Track Order.</p>
          </div>
          <div className="rounded-2xl border border-fab-gray-medium p-4">
            <PackageCheck size={18} className="text-fab-yellow mb-3" />
            <p className="text-xs font-black uppercase tracking-widest mb-1">Account History</p>
            <p className="text-xs text-fab-text-muted leading-relaxed">The order is saved in your account history.</p>
          </div>
          <div className="rounded-2xl border border-fab-gray-medium p-4">
            <BadgeCheck size={18} className="text-fab-yellow mb-3" />
            <p className="text-xs font-black uppercase tracking-widest mb-1">Need Help?</p>
            <p className="text-xs text-fab-text-muted leading-relaxed">Contact support if you need changes or questions.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/track-order" className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all">
            Track Order
          </Link>
          <Link to="/account/orders" className="h-11 px-6 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:border-fab-yellow transition-all">
            View Orders
          </Link>
          <Link to="/products" className="h-11 px-6 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:border-fab-yellow transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
