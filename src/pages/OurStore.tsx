import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function OurStore() {
  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Company</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Our <span className="text-fab-yellow">Store</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl">
            Visit DORJIGHOR flagship experience center for premium fabrics, tailoring consultation, and latest collections.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 luxury-panel p-6 sm:p-8">
            <h2 className="text-lg font-black uppercase tracking-widest mb-4">Flagship Location</h2>
            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3"><MapPin size={16} className="text-fab-yellow mt-0.5" />House 11, Road 12, Gulshan 1, Dhaka 1212</p>
              <p className="flex items-start gap-3"><Clock size={16} className="text-fab-yellow mt-0.5" />Open Daily: 10:00 AM - 10:00 PM</p>
              <p className="flex items-start gap-3"><Phone size={16} className="text-fab-yellow mt-0.5" />+880 1704019902</p>
            </div>

            <div className="mt-6 aspect-video w-full rounded-2xl overflow-hidden border border-fab-gray-medium">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.011666873587!2d90.41014131500!3d23.7820623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70b80907d73%3A0xe67c050019ea81d!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1625484800000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Our Store Map"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="luxury-panel p-6">
              <h3 className="text-xs uppercase font-black tracking-widest mb-3">Store Services</h3>
              <ul className="space-y-2 text-sm text-fab-text-muted">
                <li>In-store trial and style consultation</li>
                <li>Custom tailoring measurement support</li>
                <li>Premium fabric swatch review</li>
                <li>Priority alteration desk</li>
              </ul>
            </div>

            <div className="bg-fab-black text-white rounded-2xl p-6">
              <h3 className="text-xs uppercase font-black tracking-widest mb-2">Need help before visiting?</h3>
              <p className="text-xs text-white/70 mb-4">Our team can book your fitting slot in advance.</p>
              <Link to="/contact" className="fab-button-primary inline-flex">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
