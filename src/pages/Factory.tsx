import { Link } from 'react-router-dom';

export default function Factory() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-5xl mx-auto luxury-panel p-8 sm:p-10">
        <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Company</p>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
          Our <span className="text-fab-yellow">Factory</span>
        </h1>
        <p className="text-sm text-fab-text-muted mb-8 max-w-3xl">
          Dorjighor factory combines modern production workflow with handcrafted tailoring standards to ensure each piece keeps our premium finish.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4">
            <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">Production Capacity</p>
            <p className="text-lg font-black italic">1200+ Units/Day</p>
          </div>
          <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4">
            <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">Quality Check Stages</p>
            <p className="text-lg font-black italic">7 Step QC</p>
          </div>
          <div className="rounded-xl border border-fab-gray-medium bg-fab-gray-light p-4">
            <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">Special Unit</p>
            <p className="text-lg font-black italic">Custom Tailoring</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-fab-text-muted leading-relaxed">
          <p>Each order follows structured cutting, stitching, finishing, and final inspection stages.</p>
          <p>For business partnerships and factory visits, contact our operations team in advance.</p>
        </div>

        <div className="mt-10 pt-6 border-t border-fab-gray-medium flex flex-wrap gap-3">
          <Link to="/contact" className="fab-button-primary inline-flex">Factory Visit Request</Link>
          <Link to="/about" className="fab-button inline-flex">Learn About Brand</Link>
        </div>
      </div>
    </div>
  );
}
