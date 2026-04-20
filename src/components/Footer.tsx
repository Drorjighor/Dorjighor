import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Youtube, Linkedin, Music2, Ghost, AtSign, Pin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { companyLinks, serviceLinks, socialLinks } from '../data/footer';
import type { ReactNode } from 'react';

export default function Footer() {
  return (
    <footer className="bg-white/90 text-fab-black border-t border-fab-gray-medium pt-20 pb-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-8">
            <img src={logo} alt="Dorjighor" className="h-10 w-auto md:h-11" />
          </div>
          <p className="text-xs text-fab-text-muted leading-relaxed mb-10 font-medium">
            DORJIGHOR is more than just a brand; it's a lifestyle. We are dedicated to providing the ultimate fashion experience with our signature quality and bold designs.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const iconMap: Record<string, ReactNode> = {
                Facebook: <Facebook size={16} />,
                Instagram: <Instagram size={16} />,
                X: <Twitter size={16} />,
                YouTube: <Youtube size={16} />,
                LinkedIn: <Linkedin size={16} />,
                TikTok: <Music2 size={16} />,
                Threads: <AtSign size={16} />,
                Pinterest: <Pin size={16} />,
                Snapchat: <Ghost size={16} />,
              };

              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-fab-gray-light border border-fab-gray-medium flex items-center justify-center text-fab-black hover:bg-fab-yellow transition-all">
                  {iconMap[social.label]}
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-black mb-8 italic">Company</h4>
          <ul className="space-y-4 text-xs font-bold text-fab-text-muted uppercase tracking-wider">
            {companyLinks.map((link) => (
              <li key={link.to}><Link to={link.to} className="hover:text-fab-yellow transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="text-xs uppercase tracking-widest font-black mb-8 italic">Customer Service</h4>
          <ul className="space-y-4 text-xs font-bold text-fab-text-muted uppercase tracking-wider">
            {serviceLinks.map((link) => (
              <li key={link.to}><Link to={link.to} className="hover:text-fab-yellow transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-6 italic">Support Line</h4>
            <div className="flex items-center space-x-3 text-fab-black">
              <Phone size={18} className="text-fab-yellow" />
              <a href="tel:+8801704019902" className="text-xl font-black italic hover:text-fab-yellow transition-colors">+880 1704019902</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-6 italic">Email Us</h4>
            <div className="flex items-center space-x-3 text-fab-black">
              <Mail size={18} className="text-fab-yellow" />
              <a href="mailto:support@dorjighor.com.bd" className="text-sm font-bold truncate hover:text-fab-yellow transition-colors">support@dorjighor.com.bd</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 pt-8 border-t border-fab-gray-medium flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-fab-text-muted">
        <p>© 2026 DORJIGHOR LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-fab-yellow transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-fab-yellow transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
