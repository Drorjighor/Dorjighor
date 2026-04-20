import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, Package, Truck, BadgeCheck, Megaphone, Settings2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'support' | 'system';
  createdAt: string;
  read: boolean;
}

const STORAGE_KEY = 'dorjighor-notifications';
const PREFS_KEY = 'dorjighor-notification-prefs';

function loadNotifications(): NotificationItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveNotifications(items: NotificationItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{"orderUpdates":true,"promos":true,"support":true}');
  } catch {
    return { orderUpdates: true, promos: true, support: true };
  }
}

function savePrefs(prefs: { orderUpdates: boolean; promos: boolean; support: boolean }) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

const seedNotifications = [
  {
    id: 'N-1001',
    title: 'Order confirmed',
    message: 'Your latest order has been placed successfully and is now under review.',
    type: 'order' as const,
    createdAt: '2026-04-19',
    read: false,
  },
  {
    id: 'N-1002',
    title: 'Shipping update',
    message: 'A shipped order is on the way. Delivery usually takes 1-2 business days in Dhaka.',
    type: 'order' as const,
    createdAt: '2026-04-18',
    read: true,
  },
  {
    id: 'N-1003',
    title: 'Weekend offer',
    message: 'Get early access to new fabric arrivals and seasonal offers.',
    type: 'promo' as const,
    createdAt: '2026-04-17',
    read: false,
  },
];

export default function NotificationCenter() {
  const { isAuthenticated, orders } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'order' | 'promo'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const stored = loadNotifications();
    if (stored.length > 0) return stored;

    const generatedFromOrders = orders.slice(0, 2).map((order, index) => ({
      id: `NO-${order.id}`,
      title: order.status === 'Delivered' ? 'Order delivered' : order.status === 'Shipped' ? 'Order shipped' : 'Order processing',
      message: `Order ${order.id} is currently ${order.status.toLowerCase()} and total is ৳ ${order.total.toLocaleString()}.`,
      type: 'order' as const,
      createdAt: order.date,
      read: index > 0,
    }));

    const initial = [...seedNotifications, ...generatedFromOrders];
    saveNotifications(initial);
    return initial;
  });
  const [prefs, setPrefs] = useState(() => loadPrefs());

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter((item) => !item.read);
    return notifications.filter((item) => item.type === activeFilter);
  }, [activeFilter, notifications]);

  if (!isAuthenticated) {
    return (
      <div className="page-shell min-h-screen bg-fab-gray-light flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-fab-gray-medium rounded-2xl p-8 text-center">
          <BellRing size={34} className="mx-auto mb-4 text-fab-text-muted" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Login Required</h1>
          <p className="text-sm text-fab-text-muted mb-6">Sign in to view your order notifications and offers.</p>
          <Link to="/login" className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const markAllRead = () => {
    const next = notifications.map((item) => ({ ...item, read: true }));
    setNotifications(next);
    saveNotifications(next);
  };

  const toggleRead = (id: string) => {
    const next = notifications.map((item) => (item.id === id ? { ...item, read: !item.read } : item));
    setNotifications(next);
    saveNotifications(next);
  };

  const clearAll = () => {
    setNotifications([]);
    saveNotifications([]);
  };

  const addTestNotification = () => {
    const next: NotificationItem = {
      id: `N-${Date.now()}`,
      title: 'Test notification',
      message: 'This is a sample alert generated from Notification Center.',
      type: 'system',
      createdAt: new Date().toISOString().split('T')[0],
      read: false,
    };

    const updated = [next, ...notifications];
    setNotifications(updated);
    saveNotifications(updated);
  };

  const updatePrefs = (key: keyof typeof prefs) => {
    const nextPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(nextPrefs);
    savePrefs(nextPrefs);
  };

  const iconFor = (type: NotificationItem['type']) => {
    if (type === 'order') return Package;
    if (type === 'promo') return Megaphone;
    if (type === 'support') return Settings2;
    return BadgeCheck;
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Stay Updated</p>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
              Notification <span className="text-fab-yellow">Center</span>
            </h1>
            <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
              Track order alerts, support messages, and promotional updates in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={markAllRead} className="h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all">
              Mark All Read
            </button>
            <button onClick={addTestNotification} className="h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow transition-all">
              Add Test Alert
            </button>
            <button onClick={clearAll} className="h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow transition-all">
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <BellRing className="text-fab-yellow" size={20} />
                <h2 className="text-lg font-black uppercase tracking-widest">Notifications</h2>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-fab-yellow">{unreadCount} unread</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {([
                ['all', 'All'],
                ['unread', 'Unread'],
                ['order', 'Order'],
                ['promo', 'Promo'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`h-9 px-4 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === key ? 'bg-fab-yellow border-fab-yellow text-fab-black' : 'bg-white border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((item) => {
                const Icon = iconFor(item.type);
                return (
                  <div key={item.id} className={`rounded-2xl border p-4 transition-all ${item.read ? 'border-fab-gray-medium bg-white' : 'border-fab-yellow bg-fab-yellow/10'}`}>
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-fab-black p-3 text-white shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="text-sm font-black uppercase tracking-wide">{item.title}</p>
                            <p className="text-[10px] uppercase tracking-widest text-fab-text-muted font-bold mt-1">{item.createdAt}</p>
                          </div>
                          <button type="button" onClick={() => toggleRead(item.id)} className="text-[10px] uppercase tracking-widest font-black text-fab-yellow hover:underline text-left sm:text-right">
                            {item.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                        </div>
                        <p className="mt-3 text-sm text-fab-text-muted leading-relaxed">{item.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredNotifications.length === 0 && (
                <div className="rounded-2xl border border-dashed border-fab-gray-medium bg-fab-gray-light p-8 text-center">
                  <BellRing size={28} className="mx-auto mb-3 text-fab-text-muted" />
                  <p className="text-sm font-bold text-fab-text-muted">No notifications for this filter.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Preferences</h3>
              <div className="space-y-3">
                {([
                  ['orderUpdates', 'Order Updates'],
                  ['promos', 'Promotions'],
                  ['support', 'Support Replies'],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updatePrefs(key)}
                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold transition-all ${prefs[key] ? 'border-fab-yellow bg-fab-yellow/10' : 'border-fab-gray-medium bg-white'}`}
                  >
                    <span>{label}</span>
                    <span className="text-[10px] uppercase tracking-widest text-fab-text-muted">{prefs[key] ? 'On' : 'Off'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-fab-black text-white rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-2">Use it well</p>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Keep order updates enabled so you never miss shipping or support messages.
              </p>
              <Link to="/account/orders" className="inline-flex h-11 items-center justify-center rounded-lg bg-fab-yellow px-5 text-xs font-black uppercase tracking-widest text-fab-black transition-all hover:bg-white">
                Go to Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
