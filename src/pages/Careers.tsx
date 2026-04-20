import { Link } from 'react-router-dom';

export default function Careers() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-4xl mx-auto luxury-panel p-8 sm:p-10">
        <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Company</p>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
          Join Our <span className="text-fab-yellow">Careers</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8">
          We are building Bangladesh's most premium tailoring and lifestyle fashion experience.
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">Open Roles</h2>
            <ul className="space-y-2 text-fab-text-muted">
              <li>Senior Fashion Consultant</li>
              <li>Tailoring Quality Supervisor</li>
              <li>Customer Success Executive</li>
              <li>Digital Marketing Specialist</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs uppercase font-black tracking-widest mb-2">How to Apply</h2>
            <p className="text-fab-text-muted">Send your CV and portfolio (if available) to careers@dorjighor.com.bd with the subject line: Role Name - Your Name.</p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium flex flex-wrap gap-3">
          <a href="mailto:careers@dorjighor.com.bd" className="fab-button-primary inline-flex">Apply Now</a>
          <Link to="/contact" className="fab-button inline-flex">Ask HR Team</Link>
        </div>
      </div>
    </div>
  );
}
