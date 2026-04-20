import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, MessageCircle, Package, Truck, RotateCcw } from 'lucide-react';

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Use the Track Order page with your order ID, or check Account > Orders after login.',
  },
  {
    question: 'What is the delivery time?',
    answer: 'Dhaka deliveries usually take 1-2 business days, and outside Dhaka may take 2-5 business days.',
  },
  {
    question: 'Can I return or exchange products?',
    answer: 'Yes, eligible products can be requested within 7 days of delivery. Custom items have limited return rules.',
  },
  {
    question: 'Do you support custom tailoring?',
    answer: 'Yes, you can place custom tailoring requests from the Custom Tailoring page.',
  },
  {
    question: 'Which payment methods are available?',
    answer: 'We support Cash on Delivery, bKash, Nagad, and Card Payment.',
  },
  {
    question: 'How can I contact support?',
    answer: 'Use the Contact page or WhatsApp support button for quick assistance.',
  },
];

const steps = [
  {
    icon: Package,
    title: 'Order status',
    text: 'Confirmed orders move through processing, shipping, and delivery stages.',
  },
  {
    icon: Truck,
    title: 'Delivery updates',
    text: 'Shipping info and ETA guidance are shown in your account and order history.',
  },
  {
    icon: RotateCcw,
    title: 'Returns',
    text: 'Return and exchange requests should go through the return policy flow.',
  },
];

export default function FAQ() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Customer Help</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Frequently Asked <span className="text-fab-yellow">Questions</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
            Quick answers for shopping, delivery, returns, and support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="text-fab-yellow" size={20} />
              <h2 className="text-lg font-black uppercase tracking-widest">Top Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4 open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black uppercase tracking-widest text-fab-black">
                    <span>{faq.question}</span>
                    <ChevronDown size={16} className="shrink-0 text-fab-text-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-fab-text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-fab-black text-white rounded-2xl p-6 sm:p-7">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Need faster help?</p>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-3">Contact <span className="text-fab-yellow">Support</span></h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                For order issues, exchange support, or custom tailoring help, contact us directly.
              </p>
              <Link to="/contact" className="inline-flex h-11 items-center justify-center rounded-lg bg-fab-yellow px-5 text-xs font-black uppercase tracking-widest text-fab-black transition-all hover:bg-white">
                Go to Contact
              </Link>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Support Topics</h3>
              <div className="space-y-3">
                {steps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3 rounded-xl border border-fab-gray-medium p-3">
                      <div className="rounded-lg bg-fab-yellow p-2 text-fab-black">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-fab-text-muted">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3 text-fab-yellow">
                <MessageCircle size={18} />
                <h3 className="text-sm font-black uppercase tracking-widest text-fab-black">Quick Links</h3>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest font-black">
                <Link to="/track-order" className="rounded-full border border-fab-gray-medium px-3 py-2 text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow transition-colors">
                  Track Order
                </Link>
                <Link to="/return-exchange" className="rounded-full border border-fab-gray-medium px-3 py-2 text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow transition-colors">
                  Return & Exchange
                </Link>
                <Link to="/payment-methods" className="rounded-full border border-fab-gray-medium px-3 py-2 text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow transition-colors">
                  Payment Methods
                </Link>
                <Link to="/addresses" className="rounded-full border border-fab-gray-medium px-3 py-2 text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow transition-colors">
                  Saved Addresses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
