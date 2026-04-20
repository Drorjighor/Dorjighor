import { Link } from 'react-router-dom';

export default function TermsOfUse() {
  return (
    <div className="page-shell bg-fab-gray-light min-h-screen">
      <div className="max-w-4xl mx-auto bg-white border border-fab-gray-medium rounded-2xl p-8 sm:p-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-3">
          Terms of <span className="text-fab-yellow">Use</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">
          Effective Date: April 19, 2026
        </p>

        <div className="space-y-7 text-sm leading-relaxed text-fab-black">
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">1. Acceptance</h2>
            <p>
              By using this website, you agree to follow these Terms of Use and all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">2. Account Responsibility</h2>
            <p>
              You are responsible for keeping your account credentials secure and for activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">3. Orders and Payments</h2>
            <p>
              Product availability, pricing, delivery timelines, and order acceptance may change. We reserve the right to cancel or
              refuse orders when necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">4. Returns and Refunds</h2>
            <p>
              Returns and refunds are handled according to our return policy. Eligibility may depend on product condition and request
              timing.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">5. Prohibited Use</h2>
            <p>
              You may not misuse the site, attempt unauthorized access, distribute harmful code, or violate any user or intellectual
              property rights.
            </p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-black mb-2">6. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the site after changes means you accept the updated terms.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium text-xs font-bold uppercase tracking-widest text-fab-text-muted flex flex-wrap gap-4">
          <Link to="/privacy" className="hover:text-fab-yellow transition-colors">Read Privacy Policy</Link>
          <Link to="/contact" className="hover:text-fab-yellow transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
