import { useState, useMemo, useEffect } from 'react';
import { products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Men' | 'Women' | 'Accessories' | 'Panjabi'>('All');
  const [activeProductType, setActiveProductType] = useState<'All' | 'ReadyMade' | 'Fabric'>('All');
  const [activeMaterial, setActiveMaterial] = useState<string>('All');
  const [activeSort, setActiveSort] = useState<'default' | 'latest' | 'popular' | 'price-asc' | 'price-desc'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const q = params.get('q');
    const sort = params.get('sort');

    if (cat && ['Men', 'Women', 'Accessories', 'Panjabi'].includes(cat)) {
      setActiveCategory(cat as any);
    }

    if (typeof q === 'string') {
      setSearchQuery(q);
    }

    if (sort && ['latest', 'popular', 'price-asc', 'price-desc'].includes(sort)) {
      setActiveSort(sort as 'latest' | 'popular' | 'price-asc' | 'price-desc');
    }
  }, [location.search]);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 1) return [];
    return products
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={index} className="text-fab-yellow font-black">{part}</span> 
        : part
    );
  };

  const materials = useMemo(() => {
    const allMaterials = new Set<string>();
    products.forEach(p => {
      if (p.material) allMaterials.add(p.material);
    });
    return ['All', ...Array.from(allMaterials).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const matchesType = activeProductType === 'All' || p.productType === activeProductType;
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMaterial = activeMaterial === 'All' || p.material === activeMaterial;
      return matchesType && matchesCategory && matchesSearch && matchesMaterial;
    });

    const sorted = [...filtered];

    switch (activeSort) {
      case 'latest':
        sorted.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case 'popular':
        sorted.sort((a, b) => {
          const aScore = (a.reviews?.length || 0) + ((a.discountPercentage || 0) / 100);
          const bScore = (b.reviews?.length || 0) + ((b.discountPercentage || 0) / 100);
          return bScore - aScore;
        });
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  }, [activeProductType, activeCategory, searchQuery, activeMaterial, activeSort]);

  const categories = ['All', 'Men', 'Women', 'Accessories', 'Panjabi'];

  return (
    <div className="page-shell">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-left">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Shop <span className="text-fab-yellow">Collections</span></h1>
          <p className="text-fab-text-muted text-sm font-medium tracking-wide">
            Browse through our wide range of premium apparel and accessories crafted for the bold.
          </p>
        </header>

        {/* Filters and Search - Shop style */}
        <div className="space-y-6 mb-10 pb-6 border-b border-fab-gray-medium">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted w-full md:w-auto mb-2 md:mb-0 flex items-center">Type:</span>
              {(['All', 'ReadyMade', 'Fabric'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveProductType(type)}
                  className={`px-5 py-2 rounded text-[10px] uppercase font-black tracking-widest transition-all duration-300 border ${
                    activeProductType === type
                      ? 'bg-fab-black text-white border-fab-black'
                      : 'bg-white text-fab-text-muted border-fab-gray-medium hover:border-fab-yellow hover:text-fab-yellow'
                  }`}
                >
                  {type === 'ReadyMade' ? 'Ready-Made' : type}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted w-full md:w-auto mb-2 md:mb-0 flex items-center">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-5 py-2 rounded text-[10px] uppercase font-black tracking-widest transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-fab-black text-white border-fab-black'
                      : 'bg-white text-fab-text-muted border-fab-gray-medium hover:border-fab-yellow hover:text-fab-yellow'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search in shop..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full bg-fab-gray-light border border-fab-gray-medium px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider outline-none focus:border-fab-yellow"
              />
              <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-fab-text-muted" />

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-fab-black rounded-lg shadow-2xl z-50 overflow-hidden"
                >
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSearchQuery(p.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center p-3 hover:bg-fab-gray-light transition-colors text-left border-b border-fab-gray-medium last:border-0"
                    >
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-10 h-10 object-cover rounded mr-3 border border-fab-gray-medium" 
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-[10px] font-black uppercase italic tracking-tighter">
                          {highlightMatch(p.name, searchQuery)}
                        </p>
                        <p className="text-[9px] text-fab-yellow font-black uppercase tracking-widest mt-0.5">৳ {p.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-6 items-start">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted w-full md:w-auto mb-2 md:mb-0 flex items-center">Material:</span>
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setActiveMaterial(mat)}
                  className={`px-4 py-1.5 rounded text-[10px] font-black tracking-widest transition-all duration-300 border ${
                    activeMaterial === mat
                      ? 'bg-fab-yellow text-fab-black border-fab-yellow'
                      : 'bg-white text-fab-text-muted border-fab-gray-medium hover:border-fab-yellow hover:text-fab-yellow'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-fab-text-muted w-full md:w-auto mb-2 md:mb-0 flex items-center">Sort:</span>
              {([
                { key: 'default', label: 'Default' },
                { key: 'latest', label: 'Latest' },
                { key: 'popular', label: 'Popular' },
                { key: 'price-asc', label: 'Price Low' },
                { key: 'price-desc', label: 'Price High' },
              ] as const).map((option) => (
                <button
                  key={option.key}
                  onClick={() => setActiveSort(option.key)}
                  className={`px-4 py-1.5 rounded text-[10px] font-black tracking-widest transition-all duration-300 border ${
                    activeSort === option.key
                      ? 'bg-fab-black text-white border-fab-black'
                      : 'bg-white text-fab-text-muted border-fab-gray-medium hover:border-fab-yellow hover:text-fab-yellow'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-fab-text-muted italic">No products found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
