import { Menu, X, ShoppingBag, Search, Heart, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.svg';
import { navLinks } from '../data/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const { cartCount } = useCart();

  const handleSearch = () => {
    const query = searchText.trim();
    if (!query) {
      navigate('/products');
      return;
    }
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-fab-gray-medium">
      {/* Top Bar */}
      {/* <div className="bg-fab-black text-white text-[10px] py-1.5 px-6 text-center uppercase tracking-[2px] font-bold">
        Free Shipping on Orders Over ৳ 2000 | Cash on Delivery Available
      </div> */}
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Dorjighor" className="h-10 w-auto md:h-11" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 hover:text-fab-yellow ${
                location.pathname === link.path ? 'text-fab-yellow' : 'text-fab-black'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-5">
          <div className="hidden md:flex relative group">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="bg-fab-gray-light border border-fab-gray-medium rounded-full py-2 px-6 pl-10 text-xs w-48 focus:w-64 focus:border-fab-yellow transition-all duration-300 outline-none"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-fab-text-muted hover:text-fab-yellow transition-colors"
              aria-label="Search products"
            >
              <Search size={14} />
            </button>
          </div>

          <Link to="/wishlist" className="text-fab-black hover:text-fab-yellow transition-colors relative" aria-label="Wishlist">
            <Heart size={22} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-fab-yellow text-fab-black text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/checkout" className="text-fab-black hover:text-fab-yellow transition-colors relative" aria-label="Cart and checkout">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-fab-yellow text-fab-black text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="text-fab-black hover:text-fab-yellow transition-colors"
            title={isAuthenticated ? `Signed in as ${user?.name || 'User'}` : 'Login'}
          >
            <UserCircle2 size={23} />
          </Link>
          
          <button
            className="lg:hidden text-fab-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-white z-[60] shadow-2xl p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm font-black uppercase tracking-tighter">Menu</span>
              <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col space-y-8">
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-[2px] font-black text-fab-black"
              >
                {isAuthenticated ? 'My Account' : 'Login'}
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-[2px] font-black text-fab-black"
              >
                Wishlist
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs uppercase tracking-[2px] font-black ${
                    location.pathname === link.path ? 'text-fab-yellow' : 'text-fab-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-[55] lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}
