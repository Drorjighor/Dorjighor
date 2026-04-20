import { Link } from 'react-router-dom';

export default function PaymentMethods() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          Payment <span className="text-fab-yellow">Methods</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">Last Updated: April 19, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Supported Payments</h2>
            <p>
              We currently support Cash on Delivery, bKash, Nagad, and Card payment in checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Mobile Banking</h2>
            <p>
              For bKash and Nagad, complete the transfer first and provide transaction details in checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Card Security</h2>
            <p>
              Card payments should only be completed through trusted gateways. Never share OTP or card PIN with anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Payment Verification</h2>
            <p>
              Orders are confirmed after successful payment verification or COD confirmation.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs uppercase font-black tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/return-exchange" className="hover:text-fab-yellow transition-colors">Return & Exchange</Link>
          <Link to="/shipping-policy" className="hover:text-fab-yellow transition-colors">Shipping Policy</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
