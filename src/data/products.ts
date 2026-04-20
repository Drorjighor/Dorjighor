export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
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
  productType: ProductType;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: 'Men' | 'Women' | 'Accessories';
  description: string;
  image: string;
  features: string[];
  sizes?: string[];
  color?: string | string[];
  material?: string;
  fabricDetails?: FabricDetail;
  details?: {
    [key: string]: string;
  };
  reviews?: Review[];
}

export const products: Product[] = [
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
];