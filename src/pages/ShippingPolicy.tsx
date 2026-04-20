import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          Shipping <span className="text-fab-yellow">Policy</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">Last Updated: April 19, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Delivery Coverage</h2>
            <p>
              We deliver nationwide in Bangladesh, including major cities and district areas.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Delivery Time</h2>
            <p>
              Dhaka: 1-2 business days. Outside Dhaka: 2-5 business days. Delivery timing may vary during campaign periods.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Shipping Charge</h2>
            <p>
              Shipping charge is auto-calculated at checkout. Orders above ৳2000 qualify for free standard delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Order Tracking</h2>
            <p>
              Once your order is confirmed, status updates are available in your account order history.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs uppercase font-black tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/return-exchange" className="hover:text-fab-yellow transition-colors">Return & Exchange</Link>
          <Link to="/payment-methods" className="hover:text-fab-yellow transition-colors">Payment Methods</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
