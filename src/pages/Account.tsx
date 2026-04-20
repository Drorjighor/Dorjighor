import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, LogOut, Package, Truck, Home, BellRing, MailCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, isAuthenticated, updateUserInfo, logout, orders } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateUserInfo({ name: name.trim(), phone: phone.trim(), address: address.trim() });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  return (
    <div className="page-shell bg-fab-gray-light min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">My <span className="text-fab-yellow">Account</span></h1>
            <p className="text-sm text-fab-text-muted mt-2">Manage your user info and review your latest order updates.</p>
          </div>
          <button
            onClick={logout}
            className="h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow transition-all inline-flex items-center justify-center space-x-2"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-black uppercase tracking-widest mb-6">User Information</h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fab-text-muted" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 rounded-lg border border-fab-gray-medium pl-9 pr-3 text-sm outline-none focus:border-fab-yellow"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fab-text-muted" />
                  <input
                    value={user.email}
                    disabled
                    className="w-full h-11 rounded-lg border border-fab-gray-medium bg-fab-gray-light pl-9 pr-3 text-sm text-fab-text-muted"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Phone</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fab-text-muted" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 rounded-lg border border-fab-gray-medium pl-9 pr-3 text-sm outline-none focus:border-fab-yellow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-2">Address</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-3 text-fab-text-muted" />
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-fab-gray-medium pl-9 pr-3 py-2 text-sm outline-none focus:border-fab-yellow resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all">
                  Save Changes
                </button>
                {isSaved && <span className="text-xs font-bold text-green-600">Saved</span>}
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-fab-text-muted mb-3">Account Since</h3>
              <p className="text-sm font-bold">{user.joinedAt}</p>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-fab-text-muted mb-2">Total Orders</h3>
              <p className="text-3xl font-black italic">{orders.length}</p>
              <Link
                to="/account/orders"
                className="mt-4 inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-black text-fab-black hover:text-fab-yellow"
              >
                <Package size={14} />
                <span>View Order History</span>
              </Link>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-fab-text-muted mb-4">Latest Orders</h3>
              <div className="space-y-3">
                {orders.slice(0, 2).map((order) => (
                  <div key={order.id} className="border border-fab-gray-medium rounded-lg p-3">
                    <p className="text-xs font-black">{order.id}</p>
                    <p className="text-[10px] text-fab-text-muted uppercase font-bold">{order.status} • ৳ {order.total.toLocaleString()}</p>
                  </div>
                ))}
                {orders.length === 0 && <p className="text-xs text-fab-text-muted">No orders yet.</p>}
              </div>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6 space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-fab-text-muted">Quick Actions</h3>
              <Link
                to="/track-order"
                className="flex items-center justify-between rounded-xl border border-fab-gray-medium px-4 py-3 text-sm font-bold hover:border-fab-yellow transition-all"
              >
                <span className="inline-flex items-center gap-2"><Truck size={14} /> Track Order</span>
                <span className="text-[10px] uppercase tracking-widest text-fab-text-muted">Open</span>
              </Link>
              <Link
                to="/addresses"
                className="flex items-center justify-between rounded-xl border border-fab-gray-medium px-4 py-3 text-sm font-bold hover:border-fab-yellow transition-all"
              >
                <span className="inline-flex items-center gap-2"><Home size={14} /> Saved Addresses</span>
                <span className="text-[10px] uppercase tracking-widest text-fab-text-muted">Manage</span>
              </Link>
              <Link
                to="/notifications"
                className="flex items-center justify-between rounded-xl border border-fab-gray-medium px-4 py-3 text-sm font-bold hover:border-fab-yellow transition-all"
              >
                <span className="inline-flex items-center gap-2"><BellRing size={14} /> Notifications</span>
                <span className="text-[10px] uppercase tracking-widest text-fab-text-muted">View</span>
              </Link>
              <Link
                to="/newsletter"
                className="flex items-center justify-between rounded-xl border border-fab-gray-medium px-4 py-3 text-sm font-bold hover:border-fab-yellow transition-all"
              >
                <span className="inline-flex items-center gap-2"><MailCheck size={14} /> Newsletter</span>
                <span className="text-[10px] uppercase tracking-widest text-fab-text-muted">Join</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
