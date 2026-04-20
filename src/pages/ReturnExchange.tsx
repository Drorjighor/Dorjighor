import { Link } from 'react-router-dom';

export default function ReturnExchange() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          Return <span className="text-fab-yellow">& Exchange</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">Last Updated: April 19, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Eligibility</h2>
            <p>
              You may request return or exchange within 7 days of receiving your product. Items must be unused, unwashed, and with original tags.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Non-Returnable Items</h2>
            <p>
              Customized items, intimate wear, and clearance products are not eligible unless the item is damaged or incorrect.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">How To Request</h2>
            <p>
              Contact our support team with your order ID, reason for return/exchange, and product images if needed.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Refund Timeline</h2>
            <p>
              Refunds are processed after quality inspection and may take 3-7 business days depending on your payment method.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs uppercase font-black tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/shipping-policy" className="hover:text-fab-yellow transition-colors">Shipping Policy</Link>
          <Link to="/payment-methods" className="hover:text-fab-yellow transition-colors">Payment Methods</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
