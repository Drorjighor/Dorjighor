import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Package, CalendarDays, CircleDollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { isAuthenticated, orders } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Order <span className="text-fab-yellow">History</span></h1>
            <p className="text-sm text-fab-text-muted mt-2">Track all your past and current purchases.</p>
          </div>
          <Link
            to="/account"
            className="inline-flex items-center space-x-2 h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow"
          >
            <ArrowLeft size={14} />
            <span>Back to Account</span>
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-fab-gray-medium mb-5">
                <div>
                  <p className="text-xs uppercase font-black tracking-widest text-fab-text-muted">Order ID</p>
                  <p className="text-lg font-black italic">{order.id}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                  <span className="inline-flex items-center space-x-1 text-fab-text-muted">
                    <CalendarDays size={14} />
                    <span>{order.date}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 text-fab-text-muted">
                    <CircleDollarSign size={14} />
                    <span>{order.paymentMethod}</span>
                  </span>
                  <span className="px-3 py-1 rounded bg-fab-yellow text-fab-black text-[10px] font-black tracking-widest">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.productId}`} className="flex items-center gap-4 border border-fab-gray-medium rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-grow">
                      <p className="text-sm font-black uppercase tracking-wide">{item.name}</p>
                      <p className="text-[10px] uppercase text-fab-text-muted font-bold tracking-widest">
                        Qty: {item.quantity}{item.size ? ` • Size: ${item.size}` : ''}
                      </p>
                    </div>
                    <p className="text-sm font-black">৳ {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-fab-gray-medium flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
                <p className="font-bold text-fab-text-muted uppercase tracking-wider">Shipping: {order.shippingAddress}</p>
                <p className="text-base font-black">Total: ৳ {order.total.toLocaleString()}</p>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="bg-white border border-fab-gray-medium rounded-2xl p-10 text-center">
              <Package size={28} className="mx-auto mb-3 text-fab-text-muted" />
              <p className="text-sm font-bold text-fab-text-muted">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
