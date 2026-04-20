import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { ArrowRight, Star, ShieldCheck, Scissors, UploadCloud, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 'hero-1',
    title: 'FRESH',
    highlight: 'STYLE.',
    description: 'Experience the new standard of premium lifestyle wear. Bold designs, perfect fit, and unmatched comfort.',
    cta: 'Shop New Arrivals',
    ctaTo: '/products',
    image: 'https://picsum.photos/seed/retail-hero-1/1920/1080',
  },
  {
    id: 'hero-2',
    title: 'CRAFTED',
    highlight: 'LUXURY.',
    description: 'From premium fabrics to refined finishes, every piece is designed to look bold and feel effortless.',
    cta: 'Explore Collections',
    ctaTo: '/products',
    image: 'https://picsum.photos/seed/retail-hero-2/1920/1080',
  },
  {
    id: 'hero-3',
    title: 'CUSTOM',
    highlight: 'TAILORING.',
    description: 'Upload your design, select fabric, and get your personalized fit with an easy guided process.',
    cta: 'Start Custom Order',
    ctaTo: '/custom-tailoring',
    image: 'https://picsum.photos/seed/retail-hero-3/1920/1080',
  },
];

interface StoredOrder {
  items?: Array<{
    productId: string;
    quantity: number;
  }>;
}

function loadStoredOrders(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem('dorjighor-orders') || '[]');
  } catch {
    return [];
  }
}

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const newProducts = [...products].slice(-4).reverse();
  const limitedOfferProducts = useMemo(() => {
    const discounted = products.filter((item) => item.discountPercentage || item.originalPrice);
    if (discounted.length > 0) {
      return discounted.slice(0, 4);
    }
    return [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 4);
  }, []);
  const bestSellingProducts = useMemo(() => {
    const orders = loadStoredOrders();
    const fallback = products.slice(0, 4);

    if (orders.length === 0) {
      return fallback;
    }

    const soldQtyByProduct = new Map<string, number>();

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const prevQty = soldQtyByProduct.get(item.productId) || 0;
        soldQtyByProduct.set(item.productId, prevQty + (Number(item.quantity) || 0));
      });
    });

    const rankedIds = [...soldQtyByProduct.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([productId]) => productId);

    const rankedProducts: Product[] = [];

    rankedIds.forEach((productId) => {
      if (rankedProducts.length >= 4) return;
      const matched = products.find((item) => item.id === productId);
      if (matched && !rankedProducts.some((item) => item.id === matched.id)) {
        rankedProducts.push(matched);
      }
    });

    if (rankedProducts.length < 4) {
      products.forEach((item) => {
        if (rankedProducts.length >= 4) return;
        if (!rankedProducts.some((product) => product.id === item.id)) {
          rankedProducts.push(item);
        }
      });
    }

    return rankedProducts;
  }, []);
  const offerEndsAt = useMemo(() => Date.now() + 36 * 60 * 60 * 1000, []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingOfferMs, setRemainingOfferMs] = useState(() => Math.max(0, offerEndsAt - Date.now()));

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingOfferMs(Math.max(0, offerEndsAt - Date.now()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [offerEndsAt]);

  const offerHours = String(Math.floor(remainingOfferMs / (1000 * 60 * 60))).padStart(2, '0');
  const offerMinutes = String(Math.floor((remainingOfferMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const offerSeconds = String(Math.floor((remainingOfferMs % (1000 * 60)) / 1000)).padStart(2, '0');

  const goToSlide = (index: number) => setActiveSlide(index);
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="pt-24 min-h-screen bg-fab-gray-light">
      <section className="content-wrap py-6">
        <div
          className="relative ratio-hero rounded-3xl overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-fab-black/75 via-fab-black/35 to-transparent" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">
            <motion.div
              key={heroSlides[activeSlide].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter mb-3 sm:mb-4 leading-[0.9]">
                {heroSlides[activeSlide].title}
                <br />
                <span className="text-fab-yellow">{heroSlides[activeSlide].highlight}</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium mb-8 sm:mb-10 opacity-90 max-w-xl">
                {heroSlides[activeSlide].description}
              </p>
              <Link to={heroSlides[activeSlide].ctaTo} className="fab-button-primary">{heroSlides[activeSlide].cta}</Link>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm hover:bg-fab-yellow hover:text-fab-black hover:border-fab-yellow transition-all"
            aria-label="Previous hero slide"
          >
            <ChevronLeft size={18} className="mx-auto" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm hover:bg-fab-yellow hover:text-fab-black hover:border-fab-yellow transition-all"
            aria-label="Next hero slide"
          >
            <ChevronRight size={18} className="mx-auto" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-fab-yellow' : 'w-2.5 bg-white/60 hover:bg-white'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tailoring Highlight */}
      <section className="content-wrap py-6">
        <div className="bg-fab-black text-white rounded-3xl overflow-hidden border border-fab-gray-medium">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Unique Feature</p>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Custom <span className="text-fab-yellow">Tailoring</span></h2>
              <p className="text-sm text-white/70 max-w-xl mb-8">
                Upload your design & get custom stitching with exact measurements, fabric selection, and personal instructions.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 text-[10px] uppercase tracking-widest font-black">
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full"><Scissors size={14} />Measurement Form</span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full"><UploadCloud size={14} />Design Upload</span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full"><Star size={14} />Fabric Select</span>
              </div>
              <Link to="/custom-tailoring" className="fab-button-primary w-fit">Start Custom Order</Link>
            </div>
            <div className="relative min-h-[280px] lg:min-h-full bg-gradient-to-br from-fab-yellow/20 via-transparent to-white/10">
              <img
                src="https://picsum.photos/seed/custom-tailoring/1200/900"
                alt="Custom tailoring"
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fab-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="content-wrap py-10 bg-white shadow-sm border-y border-fab-gray-medium overflow-x-auto rounded-2xl">
        <div className="flex justify-center space-x-12 min-w-max">
           {['New Arrivals', 'Mens', 'Womens', 'Winter', 'Accessories'].map((cat) => (
             <Link key={cat} to="/products" className="flex flex-col items-center group">
               <div className="w-16 h-16 rounded-full bg-fab-gray-light mb-3 flex items-center justify-center border border-fab-gray-medium group-hover:bg-fab-yellow group-hover:border-fab-yellow transition-all duration-300">
                  <Star size={24} className="group-hover:text-fab-black text-fab-text-muted" />
               </div>
               <span className="text-[10px] uppercase font-bold tracking-widest text-fab-black/70 group-hover:text-fab-black transition-colors">{cat}</span>
             </Link>
           ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="content-wrap py-20 lg:py-28">
        <div className="flex justify-between items-center mb-16 px-4">
          <h2 className="section-title">New Products</h2>
          <Link to="/products?sort=latest" className="text-xs uppercase font-bold tracking-widest text-fab-text-muted hover:text-fab-yellow flex items-center space-x-2">
            <span>See New Drops</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 mb-20">
          {newProducts.map((product) => (
            <div key={`new-${product.id}`} className="relative">
              <span className="absolute top-2 left-2 z-30 bg-fab-yellow text-fab-black text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">
                New
              </span>
              <ProductCard
                product={product}
                onQuickView={(p) => {
                  setSelectedProduct(p);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-16 px-4">
          <h2 className="section-title">Best Sellers</h2>
          <Link to="/products?sort=popular" className="text-xs uppercase font-bold tracking-widest text-fab-text-muted hover:text-fab-yellow flex items-center space-x-2">
            <span>Shop Popular</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 mb-20">
          {bestSellingProducts.map((product) => (
            <div key={`best-${product.id}`} className="relative">
              <span className="absolute top-2 left-2 z-30 bg-fab-black text-fab-yellow text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">
                Best Seller
              </span>
              <ProductCard
                product={product}
                onQuickView={(p) => {
                  setSelectedProduct(p);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-3xl overflow-hidden border border-fab-gray-medium bg-fab-black text-white">
          <div className="p-6 sm:p-8 md:p-10 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Limited Offer</p>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                Flash <span className="text-fab-yellow">Deals</span>
              </h2>
              <p className="text-sm text-white/70 mt-3 max-w-2xl">
                সময় শেষ হওয়ার আগে best discount picks তুলে নিন।
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center min-w-[210px]">
              <div className="bg-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-2xl sm:text-3xl font-black leading-none">{offerHours}</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mt-1">Hours</p>
              </div>
              <div className="bg-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-2xl sm:text-3xl font-black leading-none">{offerMinutes}</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mt-1">Minutes</p>
              </div>
              <div className="bg-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-2xl sm:text-3xl font-black leading-none">{offerSeconds}</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mt-1">Seconds</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {limitedOfferProducts.map((product) => (
                <div key={`offer-${product.id}`} className="relative">
                  <span className="absolute top-2 left-2 z-30 bg-fab-yellow text-fab-black text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">
                    {product.discountPercentage ? `${product.discountPercentage}% Off` : 'Hot Deal'}
                  </span>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => {
                      setSelectedProduct(p);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-16 px-4">
          <h2 className="section-title">Trending Now</h2>
          <Link to="/products" className="text-xs uppercase font-bold tracking-widest text-fab-text-muted hover:text-fab-yellow flex items-center space-x-2">
            <span>Explore All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={(p) => {
                setSelectedProduct(p);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        <QuickViewModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-y border-fab-gray-medium py-16">
        <div className="content-wrap grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck size={40} className="text-fab-yellow mb-4" />
            <h4 className="font-black italic uppercase tracking-tighter mb-2">Authentic Quality</h4>
            <p className="text-xs text-fab-text-muted">Directly shipped from our factory floor to ensure premium quality control.</p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight size={40} className="text-fab-yellow mb-4 rotate-[-45deg]" />
            <h4 className="font-black italic uppercase tracking-tighter mb-2">Fast Delivery</h4>
            <p className="text-xs text-fab-text-muted">48-hour delivery within Dhaka and nationwide coverage in record time.</p>
          </div>
          <div className="flex flex-col items-center">
             <Star size={40} className="text-fab-yellow mb-4" />
            <h4 className="font-black italic uppercase tracking-tighter mb-2">300k+ Fans</h4>
            <p className="text-xs text-fab-text-muted">Join our community of over 300,000 satisfied customers across the nation.</p>
          </div>
        </div>
      </section>

      {/* Newsletter - Retail style */}
      <section className="py-24 bg-fab-black text-white">
        <div className="content-wrap max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="text-center md:text-left">
             <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Don't Miss Out</h2>
             <p className="text-sm font-light text-white/60">Subscribe for early access, style tips and drop announcements.</p>
           </div>
           <form className="flex w-full md:w-auto">
             <input
               type="email"
               placeholder="Your active email"
               className="bg-white/10 border border-white/20 px-6 py-3 rounded-l text-sm outline-none w-full md:w-64 focus:border-fab-yellow"
             />
             <button className="bg-fab-yellow text-fab-black px-8 py-3 rounded-r font-bold uppercase text-sm tracking-widest hover:bg-white transition-all">Join</button>
           </form>
        </div>
      </section>
    </div>
  );
}
