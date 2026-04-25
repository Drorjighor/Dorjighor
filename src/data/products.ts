export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductSizeStock {
  size: string;
  stock: number;
}

export interface ProductColorVariant {
  name: string;
  colorCode: string;
  images: string[];
  sizes: ProductSizeStock[];
}

export interface ProductMaterial {
  name: string;
  percentage?: number;
}

export type ProductType = 'ReadyMade' | 'Fabric';

export interface FabricDetail {
  material: string;
  composition?: string;
  gsm?: string;
  width?: string;
  printType?: string;
  usage: string[];
  careInstructions?: string[];
  availableColors?: string[];
}

export interface Product {
  id: string;
  name: string;
  productCode?: string;
  productType: ProductType;
  price: number;
  discountPrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: 'Men' | 'Women' | 'Accessories' | 'Panjabi';
  description: string;
  image: string;
  mainImage?: string;
  galleryImages?: string[];
  videoUrl?: string;
  variants?: ProductColorVariant[];
  shortDescription?: string;
  fullDescription?: string;
  features: string[];
  sizes?: string[];
  color?: string | string[];
  material?: string;
  materials?: ProductMaterial[];
  careInstructions?: string[];
  fabricDetails?: FabricDetail;
  details?: {
    [key: string]: string;
  };
  detailItems?: Record<string, string>;
  brand?: string;
  originCountry?: string;
  deliveryTime?: string;
  returnPolicy?: string;
  reviews?: Review[];
}

const baseProducts: Product[] = [
  {
    id: '1',
    name: 'Executive Silk Panjabi',
    productType: 'ReadyMade',
    price: 4500,
    category: 'Men',
    description: 'A premium silk Panjabi designed for special occasions. Features intricate embroidery on the collar and cuffs.',
    image: 'https://picsum.photos/seed/panjabi1/800/1000',
    features: ['100% Raw Silk', 'Tailor Fit', 'Intricate Embroidery', 'Breathable Fabric'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'White',
    material: 'Silk',
    reviews: [
      { id: 'r1', userName: 'Arif Ahmed', rating: 5, comment: 'The fitting is absolutely perfect. The silk feels very premium.', date: '2024-03-15' },
      { id: 'r2', userName: 'Sabbir Hossain', rating: 4, comment: 'Very nice embroidery. Recommended for weddings.', date: '2024-03-10' },
    ],
  },
  {
    id: '2',
    name: 'Royal Blue Sherwani',
    productType: 'ReadyMade',
    price: 12500,
    category: 'Men',
    description: 'Make a statement with this handcrafted royal blue Sherwani. Perfect for weddings and formal celebrations.',
    image: 'https://picsum.photos/seed/sherwani1/800/1000',
    features: ['Hand-stitched', 'Velvet Accents', 'Custom Lining', 'Premium Buttons'],
    sizes: ['M', 'L', 'XL'],
    color: 'Royal Blue',
    material: 'Velvet',
    reviews: [
      { id: 'r3', userName: 'Tanvir Rahman', rating: 5, comment: 'Wore this on my wedding day. Received so many compliments!', date: '2024-02-28' },
    ],
  },
  {
    id: '3',
    name: 'Designer Cotton Kamiz',
    productType: 'ReadyMade',
    price: 3200,
    category: 'Women',
    description: 'A comfortable yet stylish cotton Kamiz with modern patterns. Ideal for daily wear and formal office settings.',
    image: 'https://picsum.photos/seed/kamiz1/800/1000',
    features: ['Egyptian Cotton', 'Modern Silhouette', 'Durable Print', 'Easy Care'],
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Peach',
    material: 'Cotton',
    reviews: [
      { id: 'r4', userName: 'Nusrat Jahan', rating: 5, comment: 'The fabric is so breathable. Perfect for summer office wear.', date: '2024-03-20' },
      { id: 'r5', userName: 'Farhana Islam', rating: 4, comment: 'Love the pattern, though the color is slightly darker than the photo.', date: '2024-03-18' },
    ],
  },
  {
    id: '4',
    name: 'Embroidered Silk Saree',
    productType: 'ReadyMade',
    price: 8500,
    category: 'Women',
    description: 'Traditional elegance meets modern craftsmanship in this beautiful embroidered silk Saree.',
    image: 'https://picsum.photos/seed/saree1/800/1000',
    features: ['Soft Silk', 'Heavily Embroidered Border', 'Lightweight', 'Includes Blouse Piece'],
    sizes: ['Free Size'],
    color: 'Crimson',
    material: 'Silk',
    reviews: [],
  },
  {
    id: '5',
    name: 'Leather Oxford Shoes',
    productType: 'ReadyMade',
    price: 5500,
    category: 'Accessories',
    description: 'Premium genuine leather Oxford shoes, handcrafted to perfection for the modern gentleman.',
    image: 'https://picsum.photos/seed/shoes1/800/1000',
    features: ['Full Grain Leather', 'Hand-polished', 'Durable Sole', 'Comfort Insole'],
    sizes: ['40', '41', '42', '43', '44'],
    color: 'Brown',
    material: 'Leather',
    reviews: [
      { id: 'r6', userName: 'Kamrul Hasan', rating: 5, comment: 'Very comfortable leather. Use it daily at work.', date: '2024-03-05' },
    ],
  },
  {
    id: '6',
    name: 'Silk Pocket Square',
    productType: 'ReadyMade',
    price: 800,
    category: 'Accessories',
    description: 'Add a touch of sophistication to your suit with our hand-rolled silk pocket squares.',
    image: 'https://picsum.photos/seed/accessory1/800/1000',
    features: ['Pure Silk', 'Hand-rolled Edges', 'Unique Patterns', '12x12 inches'],
    sizes: ['One Size'],
    color: 'Gold',
    material: 'Silk',
    reviews: [],
  },
  {
    id: '7',
    name: 'Vibrant Fusion T-Shirt',
    productType: 'ReadyMade',
    price: 1200,
    category: 'Men',
    description: 'A high-performance luxury cotton t-shirt featuring a vibrant Fusion print. Essential for the modern streetwear enthusiast.',
    image: 'https://picsum.photos/seed/tshirt1/800/1000',
    features: ['100% Organic Cotton', 'High-Density Print', 'Anti-Pilling', 'Modern Oversized Fit'],
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Black',
    material: 'Cotton',
    reviews: [
      { id: 'r7', userName: 'Zubair Hossain', rating: 5, comment: 'The print quality is amazing. Best t-shirt in this budget.', date: '2024-04-01' },
    ],
  },
  {
    id: '8',
    name: 'Womens Premium Kurti - Nazar',
    productType: 'ReadyMade',
    price: 1690,
    originalPrice: 2600,
    discountPercentage: 35,
    category: 'Women',
    description: 'The Nazar Premium Kurti is designed for women who appreciate graceful patterns with refined everyday elegance. Crafted from lightweight georgette fabric with delicate lace detailing, this kurti offers a smooth drape, breathable feel, and comfortable movement—perfect for casual outings, small gatherings, or effortless daily style.',
    image: 'https://picsum.photos/seed/kurti-nazar/800/1000',
    features: [
      'Premium Georgette Body Fabric',
      'Elegant Lace Detailing',
      'Lightweight with flowing drape',
      'Breathable all-day wear',
      'Minimalist refined silhouette',
      '90 GSM High Quality',
    ],
    sizes: ['38', '40', '42'],
    color: 'Red Wine',
    material: 'Georgette',
    details: {
      'Body Fabric': 'Premium Georgette',
      'Fabric Composition': '100% Polyester',
      'Fabric GSM': '90 GSM',
      'Feel': 'Lightweight with a soft and flowing drape',
      'Movement': 'Breathable structure for all-day wear',
      'Finishing': 'Minimalist silhouette with refined details',
    },
    reviews: [],
  },
  {
    id: '9',
    name: 'Cotton Premium Fabric',
    productType: 'Fabric',
    price: 620,
    category: 'Men',
    description: 'A breathable premium cotton fabric suitable for panjabi, shirt and casual tailoring. Sold by yard and ideal for bulk tailoring or custom orders.',
    image: 'https://picsum.photos/seed/fabric-cotton-premium/800/1000',
    features: ['Soft Handfeel', 'Breathable', 'Daily Wear Friendly', 'Tailoring Friendly'],
    material: 'Cotton',
    color: ['Off White', 'Cream', 'Sky Blue'],
    fabricDetails: {
      material: 'Cotton',
      composition: '100% Cotton',
      gsm: '120 GSM',
      width: '58 inches',
      usage: ['Panjabi', 'Shirt', 'Kurti'],
      careInstructions: ['Gentle wash', 'Medium iron', 'Do not bleach'],
      availableColors: ['Off White', 'Cream', 'Sky Blue'],
    },
    reviews: [],
  },
  {
    id: '10',
    name: 'Silk Brocade Fabric',
    productType: 'Fabric',
    price: 1400,
    category: 'Men',
    description: 'A festive silk brocade fabric for sherwani, panjabi and luxury tailoring. Rich texture, premium shine and formal occasion feel.',
    image: 'https://picsum.photos/seed/fabric-silk-brocade/800/1000',
    features: ['Rich Texture', 'Festive Finish', 'Premium Shine', 'Occasion Wear'],
    material: 'Silk Brocade',
    color: ['Maroon', 'Gold', 'Royal Blue'],
    fabricDetails: {
      material: 'Silk Brocade',
      composition: 'Silk blend with woven pattern',
      gsm: '220 GSM',
      width: '54 inches',
      usage: ['Sherwani', 'Panjabi', 'Blazer'],
      careInstructions: ['Dry clean preferred', 'Low heat iron'],
      availableColors: ['Maroon', 'Gold', 'Royal Blue'],
    },
    reviews: [],
  },
  {
    id: '11',
    name: 'Premium Black Panjabi',
    productCode: 'DRJ-PAN-001',
    productType: 'ReadyMade',
    price: 2450,
    category: 'Panjabi',
    description: 'প্রিমিয়াম ব্ল্যাক পাঞ্জাবি, এলিগেন্ট ডিজাইন ও পারফেক্ট ফিট।',
    shortDescription: 'প্রিমিয়াম ব্ল্যাক পাঞ্জাবি, এলিগেন্ট ডিজাইন ও পারফেক্ট ফিট।',
    fullDescription:
      'Dorjighor-এর এই প্রিমিয়াম ব্ল্যাক পাঞ্জাবিটি আধুনিকতা ও ঐতিহ্যের এক অনন্য সমন্বয়। সূক্ষ্ম এমব্রয়ডারি ও হাই-কোয়ালিটি ফেব্রিক দিয়ে তৈরি, যা আপনাকে দিবে একটি স্টাইলিশ ও আরামদায়ক অভিজ্ঞতা। পারফেক্ট ফিট নিশ্চিত করতে কাস্টম অর্ডার সুবিধাও রয়েছে।',
    image: 'https://github.com/Drorjighor/images/blob/main/Panjabi/Premium%20Panjabi.png?raw=true',
    mainImage: 'https://github.com/Drorjighor/images/blob/main/Panjabi/Premium%20Panjabi.png?raw=true',
    galleryImages: ['https://github.com/Drorjighor/images/blob/main/Panjabi/Premium%20Panjabi.png?raw=true'],
    variants: [
      {
        name: 'Black',
        colorCode: '#000000',
        images: [
          'https://github.com/Drorjighor/images/blob/main/Panjabi/Premium%20Panjabi.png?raw=true',
        ],
        sizes: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 15 },
          { size: 'L', stock: 12 },
          { size: 'XL', stock: 8 },
        ],
      },
    ],
    features: [
      'Premium cotton blend',
      'Regular fit with custom fit option',
      'Traditional style with modern embroidery',
      'Designed for comfortable premium wear',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Black',
    material: 'Cotton Blend',
    materials: [
      { name: 'Cotton', percentage: 80 },
      { name: 'Polyester', percentage: 20 },
    ],
    careInstructions: [
      'Hand wash recommended',
      'Do not bleach',
      'Iron at low heat',
      'Dry in shade',
    ],
    detailItems: {
      'Fabric Type': 'Premium Cotton Blend',
      'Fit Type': 'Regular Fit / Custom Fit',
      'Design Style': 'Traditional with Modern Embroidery',
    },
    brand: 'Dorjighor',
    originCountry: 'Bangladesh',
    deliveryTime: '3-5 days',
    returnPolicy: '7 days return available',
    reviews: [],
  },
];

const colorCodeMap: Record<string, string> = {
  Black: '#000000',
  White: '#ffffff',
  'Off White': '#f7f2e8',
  Cream: '#f6edd9',
  'Sky Blue': '#7ec8e3',
  'Royal Blue': '#4169e1',
  Maroon: '#800000',
  Gold: '#d4af37',
  Crimson: '#dc143c',
  Peach: '#ffcba4',
  Brown: '#8b4513',
  'Red Wine': '#722f37',
};

function categoryPrefix(category: Product['category']): string {
  if (category === 'Men') return 'MN';
  if (category === 'Women') return 'WM';
  if (category === 'Panjabi') return 'PAN';
  return 'AC';
}

function normalizeCareInstructions(product: Product): string[] {
  if (product.careInstructions && product.careInstructions.length > 0) {
    return product.careInstructions;
  }
  if (product.fabricDetails?.careInstructions && product.fabricDetails.careInstructions.length > 0) {
    return product.fabricDetails.careInstructions;
  }
  return ['Hand wash', 'Do not bleach', 'Iron low heat'];
}

function normalizeMaterials(product: Product): ProductMaterial[] {
  if (product.materials && product.materials.length > 0) {
    return product.materials;
  }

  if (product.fabricDetails?.composition) {
    return [{ name: product.fabricDetails.composition }];
  }

  if (product.material) {
    return [{ name: product.material, percentage: 100 }];
  }

  return [{ name: 'Mixed Fabric' }];
}

function normalizeVariants(product: Product): ProductColorVariant[] {
  const sizeList = (product.sizes && product.sizes.length > 0 ? product.sizes : ['One Size']).map((size) => ({
    size,
    stock: 15,
  }));

  const colors = Array.isArray(product.color)
    ? product.color
    : product.color
      ? [product.color]
      : product.fabricDetails?.availableColors && product.fabricDetails.availableColors.length > 0
        ? product.fabricDetails.availableColors
        : ['Default'];

  return colors.map((colorName, index) => ({
    name: colorName,
    colorCode: colorCodeMap[colorName] || '#373a3c',
    images: [
      product.image,
      `https://picsum.photos/seed/${product.id}-color-${index + 1}/800/1000`,
    ],
    sizes: sizeList,
  }));
}

export const products: Product[] = baseProducts.map((product, index) => {
  const variantList = normalizeVariants(product);
  const hasOffer = Boolean(product.originalPrice && product.originalPrice > product.price);
  const detailsFromLegacy = product.details || {};
  const defaultDetailItems: Record<string, string> = {
    'Fabric Type': product.fabricDetails?.material || product.material || 'Premium Blend',
    'Fit Type': product.productType === 'Fabric' ? 'Custom Tailoring Compatible' : 'Regular Fit',
    'Design Style': product.productType === 'Fabric' ? 'Tailoring Fabric' : 'Contemporary',
    ...detailsFromLegacy,
  };

  return {
    ...product,
    productCode: product.productCode || `DRJ-${categoryPrefix(product.category)}-${String(index + 1).padStart(3, '0')}`,
    discountPrice: hasOffer ? product.price : undefined,
    mainImage: product.mainImage || product.image,
    galleryImages: product.galleryImages || [
      product.image,
      `https://picsum.photos/seed/${product.id}-g1/800/1000`,
      `https://picsum.photos/seed/${product.id}-g2/800/1000`,
      `https://picsum.photos/seed/${product.id}-g3/800/1000`,
    ],
    variants: product.variants && product.variants.length > 0 ? product.variants : variantList,
    shortDescription: product.shortDescription || product.description.split('.').slice(0, 1).join('.').trim(),
    fullDescription: product.fullDescription || product.description,
    detailItems: product.detailItems || defaultDetailItems,
    materials: normalizeMaterials(product),
    careInstructions: normalizeCareInstructions(product),
    brand: product.brand || 'Dorjighor',
    originCountry: product.originCountry || 'Bangladesh',
    deliveryTime: product.deliveryTime || '3-5 days',
    returnPolicy: product.returnPolicy || '7 days return',
  };
});