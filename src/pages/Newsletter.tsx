import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, BellRing, Gift, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'dorjighor-newsletter';

interface NewsletterRecord {
  email: string;
  preferences: string[];
  createdAt: string;
}

function loadSubscription() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as NewsletterRecord | null;
  } catch {
    return null;
  }
}

function saveSubscription(record: NewsletterRecord) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function clearSubscription() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState<string[]>(['New arrivals', 'Offers']);
  const [subscribed, setSubscribed] = useState(loadSubscription());
  const [message, setMessage] = useState('');

  const togglePreference = (value: string) => {
    setPreferences((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const nextRecord: NewsletterRecord = {
        email: normalizedEmail,
        preferences,
        createdAt: new Date().toISOString().split('T')[0],
      };

      saveSubscription(nextRecord);
      setSubscribed(nextRecord);
      setMessage('Subscription submitted successfully.');
      setEmail('');
    } catch {
      setMessage('Subscription failed. Please try again.');
    }
  };

  const loadFromCurrent = () => {
    if (!subscribed) return;
    setEmail(subscribed.email);
    setPreferences(subscribed.preferences);
    setMessage('Loaded current subscription in the form.');
  };

  const unsubscribe = () => {
    clearSubscription();
    setSubscribed(null);
    setMessage('Subscription removed successfully.');
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Newsletter</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Offers & <span className="text-fab-yellow">Updates</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
            Subscribe for new arrivals, exclusive offers, and seasonal drops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <MailCheck className="text-fab-yellow" size={20} />
              <h2 className="text-lg font-black uppercase tracking-widest">Subscribe</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <p className="text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Preferences</p>
                <div className="flex flex-wrap gap-3">
                  {['New arrivals', 'Offers', 'Restocks', 'Style tips'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => togglePreference(item)}
                      className={`h-10 px-4 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.includes(item) ? 'bg-fab-yellow border-fab-yellow text-fab-black' : 'bg-white border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {message && <p className="text-xs font-bold text-green-700 uppercase tracking-widest">{message}</p>}

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all inline-flex items-center gap-2">
                  <Sparkles size={14} />
                  Subscribe Now
                </button>
                {subscribed && (
                  <button type="button" onClick={loadFromCurrent} className="h-11 px-5 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest hover:border-fab-yellow transition-all">
                    Load Current
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-fab-black text-white rounded-2xl p-6">
              <Gift size={22} className="text-fab-yellow mb-4" />
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">Exclusive <span className="text-fab-yellow">Drops</span></h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Be the first to know about premium collections and limited-time offers.
              </p>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BellRing size={18} className="text-fab-yellow" />
                <h3 className="text-sm font-black uppercase tracking-widest">Current Subscription</h3>
              </div>
              {subscribed ? (
                <div className="space-y-2 text-sm text-fab-text-muted leading-relaxed">
                  <p className="font-bold text-fab-black">{subscribed.email}</p>
                  <p>Preferences: {subscribed.preferences.join(', ')}</p>
                  <p>Saved on {subscribed.createdAt}</p>
                  <button
                    type="button"
                    onClick={unsubscribe}
                    className="mt-2 h-9 px-4 rounded-lg border border-fab-gray-medium bg-white text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-600 transition-all"
                  >
                    Unsubscribe
                  </button>
                </div>
              ) : (
                <p className="text-sm text-fab-text-muted">No subscription saved yet.</p>
              )}
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-text-muted mb-2">Manage inbox</p>
              <p className="text-sm text-fab-text-muted leading-relaxed mb-4">
                You can unsubscribe anytime from product and offer mailers.
              </p>
              <Link to="/contact" className="inline-flex h-11 items-center justify-center rounded-lg bg-fab-black px-5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-fab-yellow hover:text-fab-black">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
