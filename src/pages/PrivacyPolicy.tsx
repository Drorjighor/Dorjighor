import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="page-shell bg-fab-gray-light min-h-screen">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          Privacy <span className="text-fab-yellow">Policy</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">
          Effective Date: April 19, 2026
        </p>

        <div className="space-y-7 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">1. Information We Collect</h2>
            <p>
              We may collect your name, email address, phone number, shipping address, and order details when you create an account,
              place an order, or contact support.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">2. How We Use Information</h2>
            <p>
              We use your information to process orders, provide customer support, improve our services, and send important updates
              related to your account and purchases.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">3. Data Storage and Security</h2>
            <p>
              We apply reasonable security measures to protect user data. Please note that no online system can guarantee 100%
              security.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">4. Sharing of Information</h2>
            <p>
              We do not sell personal information. We may share required information with trusted delivery or payment partners solely
              to complete your order and provide service.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">5. Your Rights</h2>
            <p>
              You can request updates or corrections to your profile details by contacting us. You may also request account data
              deletion, subject to legal or operational requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">6. Contact</h2>
            <p>
              For privacy concerns, contact us at support@dorjighor.com.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs font-bold uppercase tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/terms" className="hover:text-fab-yellow transition-colors">Read Terms of Use</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
