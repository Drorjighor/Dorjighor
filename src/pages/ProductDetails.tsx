import { useState, useMemo, useEffect, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, Review } from '../data/products';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Minus, Plus, ChevronLeft, ChevronRight, Star, User, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const isFabricProduct = product?.productType === 'Fabric';
  const customOrderGarmentType = product?.fabricDetails?.usage?.[0] || 'Panjabi';
  const customOrderUrl = product
    ? `/custom-tailoring?fabric=${encodeURIComponent(product.name)}&garmentType=${encodeURIComponent(customOrderGarmentType)}`
    : '/custom-tailoring';
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Local state for reviews initialized from product data
  const [reviews, setReviews] = useState<Review[]>(product?.reviews || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const generatedImages = [1, 2, 3, 4].map(
      (i) => `https://picsum.photos/seed/${product.id}-${i}/800/1000`
    );

    return Array.from(new Set([product.image, ...generatedImages]));
  }, [product]);

  const currentImage = galleryImages[selectedImageIndex] || product?.image || '';
  const requiresSizeSelection =
    product?.productType === 'ReadyMade' &&
    Boolean(product?.sizes && product.sizes.length > 0) &&
    product?.sizes?.[0] !== 'Free Size' &&
    product?.sizes?.[0] !== 'One Size';

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  useEffect(() => {
    if (selectedImageIndex >= galleryImages.length) {
      setSelectedImageIndex(0);
    }
  }, [galleryImages.length, selectedImageIndex]);

  useEffect(() => {
    setAddedToBag(false);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-4xl font-serif mb-6">Product not found</h1>
        <Link to="/products" className="bg-fab-black text-white px-8 py-3 uppercase tracking-widest text-xs font-bold transition-all hover:bg-fab-yellow hover:text-fab-black">Back to Collections</Link>
      </div>
    );
  }

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const review: Review = {
        id: `r${Date.now()}`,
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };

      setReviews([review, ...reviews]);
      setNewReview({ userName: '', rating: 5, comment: '' });
      setIsSubmitting(false);
    }, 800);
  };

  const handleAddToBag = () => {
    if (!product) return;
    const chosenSize = selectedSize || product.sizes?.[0];
    addToCart(product, quantity, chosenSize);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1400);
  };

  return (
    <div className="bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-bold text-fab-text-muted mb-10">
          <Link to="/" className="hover:text-fab-yellow transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to={`/products?category=${product.category}`} className="hover:text-fab-yellow transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-fab-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
          {/* Left: Image Gallery */}
          <div className="space-y-5 lg:max-w-[560px] xl:max-w-[600px] lg:mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-fab-gray-light rounded-2xl overflow-hidden ratio-portrait max-h-[520px] border border-fab-gray-medium"
            >
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== product.image) {
                    e.currentTarget.src = product.image;
                  }
                }}
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-fab-black flex items-center justify-center border border-fab-gray-medium hover:bg-fab-yellow transition-colors"
                    aria-label="Show previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-fab-black flex items-center justify-center border border-fab-gray-medium hover:bg-fab-yellow transition-colors"
                    aria-label="Show next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((image, i) => (
                <button
                  key={`${product.id}-thumb-${i}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`ratio-square bg-fab-gray-light rounded-xl overflow-hidden cursor-pointer border transition-all group ${
                    selectedImageIndex === i
                      ? 'border-fab-yellow ring-2 ring-fab-yellow/40'
                      : 'border-fab-gray-medium hover:border-fab-yellow'
                  }`}
                  aria-label={`Show product image ${i + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (e.currentTarget.src !== product.image) {
                        e.currentTarget.src = product.image;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <div className="mb-8 pb-8 border-b border-fab-gray-medium">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-fab-yellow/15 text-fab-black">{product.productType === 'Fabric' ? 'Fabric' : 'Ready-Made'}</span>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-fab-gray-light text-fab-text-muted border border-fab-gray-medium">{product.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-2 text-fab-black leading-none">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-fab-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(Number(averageRating)) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-fab-text-muted uppercase">({reviews.length} Customer Reviews)</span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline space-x-3 mb-1">
                  <p className="text-3xl font-black text-fab-black italic">৳ {product.price.toLocaleString()}</p>
                  {product.originalPrice && (
                    <p className="text-lg text-fab-text-muted line-through font-bold opacity-60">৳ {product.originalPrice.toLocaleString()}</p>
                  )}
                </div>
                {product.discountPercentage && (
                  <span className="inline-block bg-fab-yellow text-fab-black text-[10px] font-black px-2 py-0.5 rounded italic uppercase tracking-widest">
                    {product.discountPercentage}% Discount Applied
                  </span>
                )}
              </div>
              
              <p className="text-fab-text-muted text-sm leading-relaxed max-w-lg mb-0">
                {product.description}
              </p>
            </div>

            {/* Sizes */}
            {/* Sizes or Fabric Details */}
            {product.productType === 'ReadyMade' && product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-fab-black">Select Size</span>
                  <button
                    type="button"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[10px] uppercase font-black tracking-widest text-fab-yellow hover:underline"
                  >
                    View Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-[48px] flex items-center justify-center border-2 text-xs font-black transition-all rounded-lg ${
                        selectedSize === size
                          ? 'bg-fab-black text-white border-fab-black'
                          : 'bg-white border-fab-gray-medium hover:border-fab-yellow text-fab-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.productType === 'Fabric' && product.fabricDetails && (
              <div className="mb-8 space-y-4">
                <h4 className="text-[10px] uppercase font-black tracking-widest text-fab-black italic opacity-60">Fabric Details</h4>
                <div className="grid grid-cols-1 gap-y-3 p-5 bg-fab-gray-light rounded-xl border border-fab-gray-medium">
                  <div className="flex justify-between items-center border-b border-white pb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-fab-text-muted">Material</span>
                    <span className="text-[10px] font-bold uppercase text-fab-black">{product.fabricDetails.material}</span>
                  </div>
                  {product.fabricDetails.composition && (
                    <div className="flex justify-between items-center border-b border-white pb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-fab-text-muted">Composition</span>
                      <span className="text-[10px] font-bold uppercase text-fab-black">{product.fabricDetails.composition}</span>
                    </div>
                  )}
                  {product.fabricDetails.gsm && (
                    <div className="flex justify-between items-center border-b border-white pb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-fab-text-muted">GSM</span>
                      <span className="text-[10px] font-bold uppercase text-fab-black">{product.fabricDetails.gsm}</span>
                    </div>
                  )}
                  {product.fabricDetails.width && (
                    <div className="flex justify-between items-center border-b border-white pb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-fab-text-muted">Width</span>
                      <span className="text-[10px] font-bold uppercase text-fab-black">{product.fabricDetails.width}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-white pb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-fab-text-muted">Sold As</span>
                    <span className="text-[10px] font-bold uppercase text-fab-black">Per Yard</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-fab-gray-light rounded-xl border border-fab-gray-medium">
                    <p className="text-[10px] uppercase font-black tracking-widest text-fab-black mb-1">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {product.fabricDetails.usage.map((item) => (
                        <span key={item} className="px-2 py-1 rounded-md bg-white border border-fab-gray-medium text-[10px] font-black uppercase tracking-widest text-fab-black">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  {product.fabricDetails.availableColors && (
                    <div className="p-4 bg-fab-gray-light rounded-xl border border-fab-gray-medium">
                      <p className="text-[10px] uppercase font-black tracking-widest text-fab-black mb-1">Available Colors</p>
                      <div className="flex flex-wrap gap-2">
                        {product.fabricDetails.availableColors.map((item) => (
                          <span key={item} className="px-2 py-1 rounded-md bg-white border border-fab-gray-medium text-[10px] font-black uppercase tracking-widest text-fab-text-muted">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {product.fabricDetails.careInstructions && (
                  <div className="p-4 bg-fab-gray-light rounded-xl border border-fab-gray-medium">
                    <p className="text-[10px] uppercase font-black tracking-widest text-fab-black mb-2">Care Instructions</p>
                    <ul className="space-y-1 text-xs text-fab-text-muted">
                      {product.fabricDetails.careInstructions.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <span className="text-[10px] uppercase font-black tracking-widest text-fab-black block mb-4">
                {isFabricProduct ? 'Yards' : 'Quantity'}
              </span>
              <div className="flex items-center w-32 border-2 border-fab-gray-medium rounded-lg px-2 h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-fab-yellow transition-colors"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-grow text-center font-black italic text-sm">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-fab-yellow transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-12">
              {isFabricProduct ? (
                <>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button 
                        onClick={handleAddToBag}
                        className="w-full bg-fab-black text-white px-8 py-5 text-sm uppercase font-black italic tracking-widest rounded-xl hover:bg-fab-yellow hover:text-fab-black transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-fab-yellow/20"
                      >
                        <ShoppingCart size={20} />
                        <span>{addedToBag ? 'Added to Bag' : 'Order Fabric'}</span>
                      </button>
                      <Link
                        to={customOrderUrl}
                        className="w-full bg-fab-yellow text-fab-black px-8 py-5 text-sm uppercase font-black italic tracking-widest rounded-xl hover:bg-fab-black hover:text-white transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-fab-black/20"
                      >
                        <span>Custom Order</span>
                      </Link>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-fab-text-muted">
                      Choose custom order to open tailoring page with this fabric pre-selected.
                    </p>
                  </div>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-16 h-16 flex items-center justify-center rounded-xl border-2 transition-all group ${
                      isInWishlist(product.id)
                        ? 'bg-fab-yellow border-fab-yellow text-fab-black shadow-lg shadow-fab-yellow/20'
                        : 'bg-white border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow shadow-md'
                    }`}
                  >
                    <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} className="group-hover:scale-110 transition-transform" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleAddToBag}
                    className={`flex-grow bg-fab-black text-white px-8 py-5 text-sm uppercase font-black italic tracking-widest rounded-xl hover:bg-fab-yellow hover:text-fab-black transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-fab-yellow/20 ${!selectedSize && product.sizes && product.sizes.length > 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={Boolean(requiresSizeSelection && !selectedSize)}
                  >
                    <ShoppingCart size={20} />
                    <span>{addedToBag ? 'Added to Bag' : 'Add to Shopping Bag'}</span>
                  </button>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-16 h-16 flex items-center justify-center rounded-xl border-2 transition-all group ${
                      isInWishlist(product.id)
                        ? 'bg-fab-yellow border-fab-yellow text-fab-black shadow-lg shadow-fab-yellow/20'
                        : 'bg-white border-fab-gray-medium text-fab-text-muted hover:border-fab-yellow hover:text-fab-yellow shadow-md'
                    }`}
                  >
                    <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} className="group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Delivery/Payment Info (Grid) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-fab-gray-light rounded-xl border border-fab-gray-medium transition-colors hover:border-fab-yellow">
                <p className="text-[10px] font-black uppercase text-fab-black mb-1">Standard Delivery</p>
                <p className="text-[9px] text-fab-text-muted font-bold uppercase tracking-wider">Ships within 24-48 hours</p>
              </div>
              <div className="p-4 bg-fab-gray-light rounded-xl border border-fab-gray-medium transition-colors hover:border-fab-yellow">
                <p className="text-[10px] font-black uppercase text-fab-black mb-1">Return & Refund</p>
                <p className="text-[9px] text-fab-text-muted font-bold uppercase tracking-wider">7 Days Easy Return Policy</p>
              </div>
            </div>

            {/* Easy Returns Section */}
            <div className="mb-10 p-5 bg-fab-black text-white rounded-xl">
               <h4 className="text-[10px] uppercase font-black tracking-widest mb-3 flex items-center text-fab-yellow">
                 <CheckCircle2 size={12} className="mr-2" />
                 Easy Returns & Exchange
               </h4>
               <ul className="space-y-2 text-[9px] font-bold uppercase tracking-wider opacity-80">
                 <li>• Tell us within 7 days</li>
                 <li>• Free return shipping*</li>
                 <li>• Instant refund on receipt</li>
               </ul>
            </div>
            
            {product.details && (
              <div className="mb-10 space-y-4">
                <h4 className="text-[10px] uppercase font-black tracking-widest text-fab-black italic opacity-60">Fabric & Composition</h4>
                <div className="grid grid-cols-1 gap-y-3 p-5 bg-fab-gray-light rounded-xl border border-fab-gray-medium">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-white pb-2 last:border-0 last:pb-0">
                      <span className="text-[9px] font-black uppercase tracking-widest text-fab-text-muted">{key}</span>
                      <span className="text-[10px] font-bold uppercase text-fab-black">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-fab-black italic opacity-60">Specifications & Features</h4>
              <div className="grid grid-cols-2 gap-y-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-fab-black">
                    <CheckCircle2 size={12} className="text-fab-yellow" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Modern & Clean */}
        <div className="max-w-5xl">
          <div className="flex items-center justify-between mb-16 border-b border-fab-gray-medium pb-8">
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Customer <span className="text-fab-yellow">Opinions</span></h2>
              <div className="flex items-center space-x-4">
                <div className="flex text-fab-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(Number(averageRating)) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-xs font-bold text-fab-text-muted uppercase tracking-widest">{averageRating} / 5.0 Rating</span>
              </div>
            </div>
            <button 
              onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-fab-gray-light border-2 border-fab-black text-xs font-black uppercase italic tracking-widest hover:bg-fab-black hover:text-white transition-all rounded"
            >
              Write A Review
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-10">
              {reviews.length === 0 ? (
                <div className="p-12 bg-fab-gray-light rounded-3xl text-center border-2 border-dashed border-fab-gray-medium">
                  <p className="text-fab-text-muted font-bold uppercase tracking-widest text-[10px]">Be the first to share your thoughts on this masterpiece.</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={review.id} 
                    className="border-b border-fab-gray-medium pb-10 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-fab-black text-fab-yellow rounded-full flex items-center justify-center font-black italic">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-xs uppercase tracking-widest">{review.userName}</p>
                          <p className="text-[10px] text-fab-text-muted uppercase font-bold">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-fab-yellow">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-fab-black font-medium text-sm italic leading-relaxed pl-13">
                      "{review.comment}"
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            <div id="review-form" className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border-2 border-fab-black shadow-xl shadow-fab-black/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Leave your <span className="text-fab-yellow">Feedback</span></h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black tracking-widest text-fab-text-muted">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.userName}
                      onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                      placeholder="Your name" 
                      className="w-full bg-fab-gray-light border border-fab-gray-medium rounded-xl px-4 py-3 text-sm focus:border-fab-yellow outline-none transition-all placeholder:text-[10px] uppercase font-bold tracking-widest"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black tracking-widest text-fab-text-muted">Rating</label>
                    <div className="flex space-x-2 bg-fab-gray-light p-2 rounded-xl border border-fab-gray-medium justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="transition-transform hover:scale-110"
                        >
                          <Star 
                            size={20} 
                            className={newReview.rating >= star ? 'text-fab-yellow fill-fab-yellow' : 'text-fab-gray-medium'} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black tracking-widest text-fab-text-muted">Your Opinion</label>
                    <textarea 
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      placeholder="Tell us about the fit..." 
                      rows={4}
                      className="w-full bg-fab-gray-light border border-fab-gray-medium rounded-xl px-4 py-3 text-sm focus:border-fab-yellow outline-none transition-all resize-none placeholder:text-[10px] uppercase font-bold tracking-widest"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-fab-black text-white font-black italic uppercase text-[10px] tracking-widest py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-fab-yellow hover:text-fab-black transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Submit Opinions</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <SizeChartModal 
          isOpen={isSizeChartOpen} 
          onClose={() => setIsSizeChartOpen(false)} 
          productName={product.name}
        />
      </div>
    </div>
  );
}

function SizeChartModal({ isOpen, onClose, productName }: { isOpen: boolean, onClose: () => void, productName: string }) {
  if (!isOpen) return null;

  const chartData = [
    { size: '36', chest: '36', waist: '33', length: '42', sleeve: '17' },
    { size: '38', chest: '38', waist: '35', length: '42', sleeve: '17' },
    { size: '40', chest: '40', waist: '37', length: '43', sleeve: '17.5' },
    { size: '42', chest: '42', waist: '39', length: '44', sleeve: '18' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-fab-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-2 border-fab-black"
      >
        <div className="p-6 sm:p-8">
           <div className="flex justify-between items-start mb-8">
             <div>
               <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-1">Size <span className="text-fab-yellow">Chart</span></h2>
               <p className="text-[10px] font-bold text-fab-text-muted uppercase tracking-widest">{productName}</p>
             </div>
             <button onClick={onClose} className="text-fab-black hover:text-fab-yellow transition-colors">
               <Plus size={24} className="rotate-45" />
             </button>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b-2 border-fab-black">
                   <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-fab-text-muted italic">Size</th>
                   <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-fab-text-muted italic">Chest (round)</th>
                   <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-fab-text-muted italic">Waist</th>
                   <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-fab-text-muted italic">Length</th>
                   <th className="py-3 px-2 text-[10px] font-black uppercase tracking-widest text-fab-text-muted italic">Sleeve</th>
                 </tr>
               </thead>
               <tbody>
                 {chartData.map((row, idx) => (
                   <tr key={idx} className="border-b border-fab-gray-medium hover:bg-fab-gray-light transition-colors">
                     <td className="py-4 px-2 text-sm font-black italic text-fab-black">{row.size}</td>
                     <td className="py-4 px-2 text-sm font-bold text-fab-text-muted">{row.chest}"</td>
                     <td className="py-4 px-2 text-sm font-bold text-fab-text-muted">{row.waist}"</td>
                     <td className="py-4 px-2 text-sm font-bold text-fab-text-muted">{row.length}"</td>
                     <td className="py-4 px-2 text-sm font-bold text-fab-text-muted">{row.sleeve}"</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="mt-8 p-4 bg-fab-gray-light rounded-xl border border-fab-gray-medium">
             <p className="text-[9px] font-bold text-fab-text-muted uppercase leading-relaxed tracking-widest">
               * Measurements are in inches. Expected deviation is less than 3%. For the best fit, we recommend measuring a similar garment you currently own.
             </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
