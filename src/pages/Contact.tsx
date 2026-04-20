import { FormEvent, useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Support');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !details.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('Order Support');
      setDetails('');
    }, 600);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-fab-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <header className="mb-14 sm:mb-20">
          <p className="text-[10px] uppercase font-black tracking-[4px] text-fab-yellow mb-3">Support Desk</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4 sm:mb-6 text-fab-black leading-[0.95]">Contact <span className="text-fab-yellow">Center</span></h1>
          <p className="text-fab-text-muted max-w-2xl text-sm sm:text-base font-bold uppercase tracking-widest leading-relaxed">
            Need help with an order? We're on it.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg border border-fab-gray-medium"
          >
            <div className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter uppercase">Submit A <span className="text-fab-yellow">Ticket</span></h2>
                <p className="text-xs text-fab-text-muted uppercase tracking-widest font-bold mt-2">Average response: within 1 hour</p>
              </div>
              <a
                href="https://wa.me/8801704019902"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-fab-gray-medium text-[10px] uppercase tracking-widest font-black hover:border-fab-yellow hover:text-fab-yellow transition-all"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>

            <form className="space-y-6 sm:space-y-7" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted ml-2">Customer Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-fab-gray-light px-4 sm:px-5 py-3.5 rounded-xl outline-none border border-transparent focus:border-fab-yellow transition-all font-bold"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted ml-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-fab-gray-light px-4 sm:px-5 py-3.5 rounded-xl outline-none border border-transparent focus:border-fab-yellow transition-all font-bold"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted ml-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-fab-gray-light px-4 sm:px-5 py-3.5 rounded-xl outline-none border border-transparent focus:border-fab-yellow transition-all font-bold appearance-none"
                >
                  <option>Order Support</option>
                  <option>Exchange/Return</option>
                  <option>Custom Tailoring</option>
                  <option>Business Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted ml-2">Incident Details</label>
                <textarea
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-fab-gray-light px-4 sm:px-5 py-3.5 rounded-xl outline-none border border-transparent focus:border-fab-yellow transition-all resize-none font-medium"
                  placeholder="Describe your issue or inquiry..."
                  required
                ></textarea>
              </div>

              {isSubmitted && (
                <p className="text-xs font-black text-green-600 uppercase tracking-widest">Ticket submitted successfully. Our team will contact you soon.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full fab-button-primary flex items-center justify-center space-x-3 py-3.5 sm:py-4 text-sm sm:text-base disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Ticket'}</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-10 sm:space-y-12 lg:space-y-14">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-black mb-6 italic text-fab-black">Direct Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-5 sm:p-6 bg-white rounded-2xl border border-fab-gray-medium hover:border-fab-yellow transition-colors">
                  <div className="p-3 bg-fab-yellow text-fab-black rounded-lg shadow-sm"><Phone size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">Hotline</p>
                    <a href="tel:+8801704019902" className="text-lg sm:text-xl font-black italic text-fab-black hover:text-fab-yellow transition-colors break-all">
                      +880 1704019902
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-5 sm:p-6 bg-white rounded-2xl border border-fab-gray-medium hover:border-fab-yellow transition-colors">
                  <div className="p-3 bg-fab-yellow text-fab-black rounded-lg shadow-sm"><Mail size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">Email</p>
                    <a
                      href="mailto:support@dorjighor.com.bd"
                      className="text-sm sm:text-lg font-black italic text-fab-black hover:text-fab-yellow transition-colors break-all"
                    >
                      support@dorjighor.com.bd
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-5 sm:p-6 bg-white rounded-2xl border border-fab-gray-medium hover:border-fab-yellow transition-colors">
                  <div className="p-3 bg-fab-yellow text-fab-black rounded-lg shadow-sm"><MapPin size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">HQ</p>
                    <p className="text-base sm:text-lg font-black italic text-fab-black break-words">Gulshan, Dhaka</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-5 sm:p-6 bg-white rounded-2xl border border-fab-gray-medium hover:border-fab-yellow transition-colors">
                  <div className="p-3 bg-fab-yellow text-fab-black rounded-lg shadow-sm"><Clock size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted mb-1">Support Hours</p>
                    <p className="text-base sm:text-lg font-black italic text-fab-black break-words">24/7 Priority</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-fab-black text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase mb-2">Join the <span className="text-fab-yellow">Community</span></h3>
                 <p className="text-white/60 mb-8 max-w-xs font-medium text-sm">Follow us for weekly drops and lifestyle inspiration.</p>
                 <div className="flex space-x-5">
                    <a href="https://www.instagram.com/dorjighorbd/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all"><Instagram /></a>
                    <a href="https://www.facebook.com/Dorjighor.com.bd/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all"><Facebook /></a>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-48 h-48 bg-fab-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="aspect-video w-full rounded-3xl overflow-hidden border-2 border-fab-gray-medium shadow-inner grayscale contrast-125 bg-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.011666873587!2d90.41014131500!3d23.7820623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70b80907d73%3A0xe67c050019ea81d!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1625484800000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
