import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  key?: string | number;
}

const iconVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  })
};

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const wishlisted = isInWishlist(product.id);
  const isFabric = product.productType === 'Fabric';
  const customOrderGarment = isFabric ? product.fabricDetails?.usage[0] || 'Panjabi' : 'Panjabi';

  const handleCustomOrder = () => {
    if (!isFabric) return;

    const params = new URLSearchParams({
      fabric: product.name,
      garmentType: customOrderGarment,
    });

    navigate(`/custom-tailoring?${params.toString()}`);
  };

  const handleFabricOnlyOrder = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial="hidden"
      whileHover="visible"
      className="group fab-card relative"
    >
      <div className="block relative overflow-hidden ratio-portrait">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-md border-t border-fab-gray-medium hidden md:block z-10">
          {isFabric ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFabricOnlyOrder();
                }}
                className="w-full bg-fab-black text-white py-3 text-[10px] font-black uppercase tracking-widest rounded shadow-xl hover:bg-fab-yellow hover:text-fab-black transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={14} />
                <span>Order Fabric</span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCustomOrder();
                }}
                className="w-full bg-fab-yellow text-fab-black py-3 text-[10px] font-black uppercase tracking-widest rounded shadow-xl hover:bg-fab-black hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Eye size={14} />
                <span>Custom Order</span>
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1, product.sizes?.[0]);
              }}
              className="w-full bg-fab-black text-white py-3 text-[10px] font-black uppercase tracking-widest rounded shadow-xl hover:bg-fab-yellow hover:text-fab-black transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={14} />
              <span>Quick Add</span>
            </button>
          )}
        </div>

        {/* Hover Actions (Staggered) */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3 z-20">
           <motion.div 
             custom={0}
             variants={iconVariants}
             className="relative group/tooltip"
           >
             <button 
               onClick={(e) => {
                 e.preventDefault();
                 toggleWishlist(product);
               }}
               className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 ${
                 wishlisted 
                   ? 'bg-fab-yellow text-fab-black' 
                   : 'bg-white text-fab-black hover:bg-fab-black hover:text-white'
               }`}
             >
               <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
             </button>
             <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-fab-black text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-sm whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none italic shadow-2xl">
               {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
             </span>
           </motion.div>

           <motion.div 
             custom={1}
             variants={iconVariants}
             className="relative group/tooltip"
           >
             <button 
               onClick={(e) => {
                 e.preventDefault();
                 onQuickView?.(product);
               }}
               className="w-11 h-11 bg-white text-fab-black rounded-full flex items-center justify-center shadow-2xl hover:bg-fab-black hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
             >
               <Eye size={20} />
             </button>
             <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-fab-black text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-sm whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none italic shadow-2xl">
               Quick Look
             </span>
           </motion.div>
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
           <Link to={`/product/${product.id}`}>
             <h3 className="text-sm font-bold text-fab-black group-hover:text-fab-yellow transition-colors truncate max-w-[150px]">
               {product.name}
             </h3>
           </Link>
          <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] uppercase font-black text-fab-yellow">
               {product.category}
             </span>
             <span className="text-[9px] uppercase font-black px-2 py-1 rounded bg-fab-gray-light border border-fab-gray-medium text-fab-text-muted">
               {product.productType === 'Fabric' ? 'Fabric' : 'Ready-Made'}
             </span>
           </div>
        </div>
        <div className="flex items-center justify-between">
           <div className="flex items-baseline space-x-2">
             <p className="text-sm font-black text-fab-black">৳ {product.price.toLocaleString()}</p>
             {product.originalPrice && (
               <p className="text-[10px] text-fab-text-muted line-through font-bold">
                 ৳ {product.originalPrice.toLocaleString()}
               </p>
             )}
           </div>
           {product.discountPercentage ? (
             <span className="bg-fab-black text-fab-yellow text-[8px] font-black px-1.5 py-0.5 rounded italic">
               -{product.discountPercentage}%
             </span>
           ) : (
             <div className="flex space-x-1">
                <div className="w-2.5 h-2.5 rounded-full bg-fab-black border border-fab-gray-medium"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-fab-yellow border border-fab-gray-medium"></div>
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}
