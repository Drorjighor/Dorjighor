import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftRight, BadgeCheck, Search, ShoppingBag } from 'lucide-react';
import { products, Product } from '../data/products';

const compareFields = [
  { key: 'price', label: 'Price' },
  { key: 'category', label: 'Category' },
  { key: 'productType', label: 'Type' },
  { key: 'material', label: 'Material' },
  { key: 'sizes', label: 'Sizes' },
  { key: 'color', label: 'Color' },
  { key: 'features', label: 'Features' },
] as const;

function formatValue(product: Product, key: (typeof compareFields)[number]['key']) {
  if (key === 'price') return `৳ ${product.price.toLocaleString()}`;
  if (key === 'sizes') return product.sizes?.join(', ') || 'N/A';
  if (key === 'color') return Array.isArray(product.color) ? product.color.join(', ') : product.color || 'N/A';
  if (key === 'features') return product.features.slice(0, 4).join(' • ');
  if (key === 'productType') return product.productType === 'Fabric' ? 'Fabric' : 'Ready-Made';
  return product[key] || 'N/A';
}

export default function CompareProducts() {
  const [leftId, setLeftId] = useState(products[0]?.id || '');
  const [rightId, setRightId] = useState(products[1]?.id || products[0]?.id || '');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const query = search.trim().toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [search]);

  const leftProduct = products.find((product) => product.id === leftId) || products[0];
  const rightProduct = products.find((product) => product.id === rightId) || products[1] || products[0];

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[4px] font-black text-fab-yellow mb-3">Smart Shopping</p>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
            Compare <span className="text-fab-yellow">Products</span>
          </h1>
          <p className="text-sm text-fab-text-muted max-w-2xl font-medium">
            Compare two products side by side before you buy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr] gap-8 mb-8">
          <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Search className="text-fab-yellow" size={18} />
              <h2 className="text-lg font-black uppercase tracking-widest">Find Products</h2>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product to compare"
              className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
            />
            <div className="mt-4 max-h-[280px] overflow-y-auto space-y-2 pr-1">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setLeftId(product.id)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${leftId === product.id ? 'border-fab-yellow bg-fab-yellow/10' : 'border-fab-gray-medium hover:border-fab-yellow'}`}
                >
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-fab-gray-medium" referrerPolicy="no-referrer" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black uppercase tracking-wide truncate">{product.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-fab-text-muted font-bold">{product.productType === 'Fabric' ? 'Fabric' : 'Ready-Made'} • ৳ {product.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ArrowLeftRight className="text-fab-yellow" size={18} />
              <h2 className="text-lg font-black uppercase tracking-widest">Product A</h2>
            </div>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white mb-4"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            {leftProduct && (
              <div className="rounded-2xl border border-fab-gray-medium overflow-hidden">
                <img src={leftProduct.image} alt={leftProduct.name} className="w-full ratio-portrait object-cover" referrerPolicy="no-referrer" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-black uppercase tracking-wide">{leftProduct.name}</h3>
                    <span className="text-[10px] uppercase font-black tracking-widest text-fab-yellow">{leftProduct.productType === 'Fabric' ? 'Fabric' : 'Ready-Made'}</span>
                  </div>
                  <p className="text-sm text-fab-text-muted leading-relaxed">{leftProduct.description}</p>
                  <Link to={`/product/${leftProduct.id}`} className="inline-flex h-10 items-center gap-2 rounded-lg bg-fab-black px-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-fab-yellow hover:text-fab-black">
                    <ShoppingBag size={14} /> View Product
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border border-fab-gray-medium rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <BadgeCheck className="text-fab-yellow" size={18} />
              <h2 className="text-lg font-black uppercase tracking-widest">Product B</h2>
            </div>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full h-11 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow bg-white mb-4"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            {rightProduct && (
              <div className="rounded-2xl border border-fab-gray-medium overflow-hidden">
                <img src={rightProduct.image} alt={rightProduct.name} className="w-full ratio-portrait object-cover" referrerPolicy="no-referrer" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-black uppercase tracking-wide">{rightProduct.name}</h3>
                    <span className="text-[10px] uppercase font-black tracking-widest text-fab-yellow">{rightProduct.productType === 'Fabric' ? 'Fabric' : 'Ready-Made'}</span>
                  </div>
                  <p className="text-sm text-fab-text-muted leading-relaxed">{rightProduct.description}</p>
                  <Link to={`/product/${rightProduct.id}`} className="inline-flex h-10 items-center gap-2 rounded-lg bg-fab-black px-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-fab-yellow hover:text-fab-black">
                    <ShoppingBag size={14} /> View Product
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-fab-gray-medium rounded-2xl p-6 sm:p-8 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-fab-gray-medium text-left">
                <th className="py-3 pr-4 text-[10px] uppercase tracking-widest font-black text-fab-text-muted">Field</th>
                <th className="py-3 pr-4 text-[10px] uppercase tracking-widest font-black text-fab-text-muted">{leftProduct?.name}</th>
                <th className="py-3 pr-4 text-[10px] uppercase tracking-widest font-black text-fab-text-muted">{rightProduct?.name}</th>
              </tr>
            </thead>
            <tbody>
              {compareFields.map((field) => (
                <tr key={field.key} className="border-b border-fab-gray-medium last:border-0 align-top">
                  <td className="py-4 pr-4 text-sm font-black uppercase tracking-widest text-fab-black">{field.label}</td>
                  <td className="py-4 pr-4 text-sm text-fab-text-muted leading-relaxed">{leftProduct ? formatValue(leftProduct, field.key) : 'N/A'}</td>
                  <td className="py-4 pr-4 text-sm text-fab-text-muted leading-relaxed">{rightProduct ? formatValue(rightProduct, field.key) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
