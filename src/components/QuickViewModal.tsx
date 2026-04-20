import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-fab-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white z-[101] rounded-2xl shadow-2xl"
          >
            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 bg-fab-black text-white p-2 rounded-full hover:bg-fab-yellow hover:text-fab-black transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="aspect-[4/5] md:aspect-auto h-full bg-fab-gray-light">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-fab-yellow px-2 py-1 bg-fab-yellow/10 rounded">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-fab-black px-2 py-1 bg-fab-gray-light border border-fab-gray-medium rounded">
                    {product.productType === 'Fabric' ? 'Fabric' : 'Ready-Made'}
                  </span>
                  <div className="flex text-fab-yellow">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-2 text-fab-black">
                  {product.name}
                </h2>
                <p className="text-2xl font-black mb-6 text-fab-black">৳ {product.price.toLocaleString()}</p>

                <p className="text-fab-text-muted text-sm font-medium leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="space-y-3 mb-8">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-fab-black">
                      <CheckCircle2 size={14} className="text-fab-yellow" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex-1 bg-fab-black text-white text-center py-4 rounded font-black italic uppercase tracking-tighter text-xs hover:bg-fab-yellow hover:text-fab-black transition-all"
                  >
                    View Full Details
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product, 1, product.sizes?.[0]);
                      onClose();
                    }}
                    className="flex-1 bg-fab-yellow text-fab-black py-4 rounded font-black italic uppercase tracking-tighter text-xs flex items-center justify-center space-x-2 hover:bg-fab-black hover:text-white transition-all shadow-lg shadow-fab-yellow/20"
                  >
                    <ShoppingCart size={16} />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
