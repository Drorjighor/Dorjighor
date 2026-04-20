import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white border border-fab-gray-medium rounded-3xl p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-fab-yellow/15 text-fab-yellow mb-5">
          <ShieldAlert size={30} />
        </div>
        <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-text-muted mb-3">Page not found</p>
        <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter mb-3">
          404 <span className="text-fab-yellow">Error</span>
        </h1>
        <p className="text-sm text-fab-text-muted max-w-lg mx-auto leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Use the links below to continue shopping.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all">
            Go Home
          </Link>
          <Link to="/products" className="h-11 px-6 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:border-fab-yellow transition-all">
            Browse Products
          </Link>
          <Link to="/contact" className="h-11 px-6 rounded-lg border border-fab-gray-medium bg-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:border-fab-yellow transition-all">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
