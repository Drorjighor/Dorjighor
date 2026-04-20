import { FormEvent, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Home, Plus, MapPin, Star, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SavedAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  isDefault: boolean;
}

const STORAGE_KEY = 'dorjighor-address-book';

function loadAddresses(): SavedAddress[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAddresses(addresses: SavedAddress[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

export default function Addresses() {
  const { isAuthenticated, user } = useAuth();
  const [addresses, setAddresses] = useState<SavedAddress[]>(loadAddresses);
  const [label, setLabel] = useState('Home');
  const [recipient, setRecipient] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [line1, setLine1] = useState(user?.address || '');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('Dhaka');

  const defaultAddress = useMemo(() => addresses.find((item) => item.isDefault) || null, [addresses]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();

    if (!label.trim() || !recipient.trim() || !phone.trim() || !line1.trim() || !city.trim()) {
      return;
    }

    const nextAddress: SavedAddress = {
      id: crypto.randomUUID(),
      label: label.trim(),
      recipient: recipient.trim(),
      phone: phone.trim(),
      line1: line1.trim(),
      line2: line2.trim(),
      city: city.trim(),
      isDefault: addresses.length === 0,
    };

    const nextAddresses = [...addresses, nextAddress];
    setAddresses(nextAddresses);
    saveAddresses(nextAddresses);
  };

  const setDefault = (id: string) => {
    const nextAddresses = addresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));
    setAddresses(nextAddresses);
    saveAddresses(nextAddresses);
  };

  const removeAddress = (id: string) => {
    const nextAddresses = addresses.filter((item) => item.id !== id);
    if (nextAddresses.length > 0 && !nextAddresses.some((item) => item.isDefault)) {
      nextAddresses[0].isDefault = true;
    }
    setAddresses(nextAddresses);
    saveAddresses(nextAddresses);
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Account Settings</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Saved <span className="text-fab-yellow">Addresses</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
            Keep multiple delivery addresses ready for faster checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-fab-yellow" size={20} />
              <h2 className="text-lg font-black uppercase tracking-widest">Add New Address</h2>
            </div>

            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Label</label>
                <input value={label} onChange={(e) => setLabel(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" placeholder="Home / Office / Other" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Recipient Name</label>
                <input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Address Line 1</label>
                <input value={line1} onChange={(e) => setLine1(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" placeholder="House, road, area" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Address Line 2</label>
                <input value={line2} onChange={(e) => setLine2(e.target.value)} className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow" placeholder="Apartment, floor, landmark" />
              </div>
              <div className="md:col-span-2 flex items-center gap-4">
                <button className="h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all inline-flex items-center gap-2">
                  <Home size={14} />
                  Save Address
                </button>
                {defaultAddress && (
                  <span className="text-xs font-bold text-fab-text-muted uppercase tracking-widest">
                    Default: {defaultAddress.label}
                  </span>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {addresses.map((address) => (
              <div key={address.id} className={`bg-white border rounded-2xl p-5 ${address.isDefault ? 'border-fab-yellow' : 'border-fab-gray-medium'}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-fab-text-muted mb-1">{address.label}</p>
                    <h3 className="text-lg font-black uppercase tracking-wide">{address.recipient}</h3>
                  </div>
                  {address.isDefault && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-fab-yellow px-3 py-1 text-[10px] font-black uppercase tracking-widest text-fab-black">
                      <Star size={12} />
                      Default
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm text-fab-text-muted leading-relaxed">
                  <p className="flex items-start gap-2"><MapPin size={14} className="mt-1 text-fab-yellow" />{address.line1}</p>
                  {address.line2 && <p className="pl-6">{address.line2}</p>}
                  <p className="pl-6">{address.city}</p>
                  <p className="pl-6">{address.phone}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefault(address.id)}
                      className="h-10 px-4 rounded-lg border border-fab-gray-medium bg-white text-[10px] uppercase font-black tracking-widest hover:border-fab-yellow transition-all"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAddress(address.id)}
                    className="h-10 px-4 rounded-lg border border-fab-gray-medium bg-white text-[10px] uppercase font-black tracking-widest hover:border-red-500 hover:text-red-600 transition-all inline-flex items-center gap-2"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {addresses.length === 0 && (
              <div className="bg-white border border-fab-gray-medium rounded-2xl p-8 text-center">
                <MapPin size={28} className="mx-auto mb-3 text-fab-text-muted" />
                <p className="text-sm font-bold text-fab-text-muted">No saved addresses yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
