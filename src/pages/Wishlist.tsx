import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Saved Items</p>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
              My <span className="text-fab-yellow">Wishlist</span>
            </h1>
            <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
              Keep favorite products in one place and move them to cart when ready.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all"
          >
            <ShoppingBag size={14} />
            Continue Shopping
          </Link>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 left-4 z-30 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[10px] font-black uppercase tracking-widest text-fab-black shadow-xl hover:bg-fab-yellow transition-all"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white border border-fab-gray-medium rounded-3xl p-8 sm:p-10 text-center">
            <Heart size={34} className="mx-auto mb-4 text-fab-text-muted" />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-3">Wishlist is <span className="text-fab-yellow">Empty</span></h2>
            <p className="text-sm text-fab-text-muted mb-8">Tap the heart icon on products to save them here.</p>
            <Link to="/products" className="h-11 px-6 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest inline-flex items-center justify-center hover:bg-fab-yellow hover:text-fab-black transition-all">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
