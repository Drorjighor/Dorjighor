export interface FabricDetail {
  name: string;
  ratePerYard: number;
  requiredYard: number;
  thumbnail: string;
  tone: string;
}

export interface DesignTemplate {
  id: string;
  name: string;
  garmentTypes: string[];
  image: string;
}

export interface MeasurementFieldConfig {
  key: 'bust' | 'topWaist' | 'hip' | 'shoulder' | 'topLength' | 'sleeveLength' | 'bottomWaist' | 'bottomHip' | 'bottomLength';
  label: string;
  helper: string;
  placeholder: string;
}

export const garmentFabricCatalog: Record<string, FabricDetail[]> = {
  Panjabi: [
    { name: 'Cotton Premium', ratePerYard: 620, requiredYard: 2.8, thumbnail: 'https://picsum.photos/seed/fabric-cotton-premium/420/320', tone: '#e9e1cf' },
    { name: 'Cotton Slub', ratePerYard: 700, requiredYard: 2.8, thumbnail: 'https://picsum.photos/seed/fabric-cotton-slub/420/320', tone: '#d4c5aa' },
    { name: 'Silk Blend', ratePerYard: 980, requiredYard: 2.9, thumbnail: 'https://picsum.photos/seed/fabric-silk-blend/420/320', tone: '#b78758' },
    { name: 'Linen Fine', ratePerYard: 860, requiredYard: 2.8, thumbnail: 'https://picsum.photos/seed/fabric-linen-fine/420/320', tone: '#a8c3a1' },
    { name: 'Jacquard Festive', ratePerYard: 1100, requiredYard: 3.0, thumbnail: 'https://picsum.photos/seed/fabric-jacquard-festive/420/320', tone: '#5e3b2e' },
  ],
  Sherwani: [
    { name: 'Silk Brocade', ratePerYard: 1400, requiredYard: 3.4, thumbnail: 'https://picsum.photos/seed/fabric-silk-brocade/420/320', tone: '#8a4f3f' },
    { name: 'Velvet Royal', ratePerYard: 1550, requiredYard: 3.5, thumbnail: 'https://picsum.photos/seed/fabric-velvet-royal/420/320', tone: '#23364f' },
  ],
  Kurti: [
    { name: 'Cotton', ratePerYard: 540, requiredYard: 2.6, thumbnail: 'https://picsum.photos/seed/fabric-kurti-cotton/420/320', tone: '#f2d8da' },
    { name: 'Georgette', ratePerYard: 680, requiredYard: 2.7, thumbnail: 'https://picsum.photos/seed/fabric-kurti-georgette/420/320', tone: '#e8b8c4' },
  ],
  'Saree Blouse': [{ name: 'Silk', ratePerYard: 950, requiredYard: 1.2, thumbnail: 'https://picsum.photos/seed/fabric-blouse-silk/420/320', tone: '#af5b7c' }],
  Shirt: [
    { name: 'Cotton', ratePerYard: 580, requiredYard: 2.2, thumbnail: 'https://picsum.photos/seed/fabric-shirt-cotton/420/320', tone: '#ccd9e7' },
    { name: 'Linen', ratePerYard: 760, requiredYard: 2.3, thumbnail: 'https://picsum.photos/seed/fabric-shirt-linen/420/320', tone: '#c7cfbf' },
  ],
  Blazer: [
    { name: 'Suiting Wool Blend', ratePerYard: 1200, requiredYard: 3.2, thumbnail: 'https://picsum.photos/seed/fabric-wool-blend/420/320', tone: '#5d6570' },
    { name: 'Textured Suiting', ratePerYard: 1050, requiredYard: 3.2, thumbnail: 'https://picsum.photos/seed/fabric-textured-suiting/420/320', tone: '#4a4742' },
  ],
};

export const tailoringLaborCharge: Record<string, number> = {
  Panjabi: 950,
  Sherwani: 1800,
  Kurti: 780,
  'Saree Blouse': 600,
  Shirt: 700,
  Blazer: 1600,
};

export const designTemplates: DesignTemplate[] = [
  {
    id: 'pnj-classic-black',
    name: 'Classic Panjabi Black Embroidery',
    garmentTypes: ['Panjabi'],
    image: 'https://picsum.photos/seed/panjabi-template-1/900/1100',
  },
  {
    id: 'pnj-white-gold',
    name: 'White Gold Festive Panjabi',
    garmentTypes: ['Panjabi'],
    image: 'https://picsum.photos/seed/panjabi-template-2/900/1100',
  },
  {
    id: 'shw-regal-maroon',
    name: 'Regal Maroon Sherwani',
    garmentTypes: ['Sherwani'],
    image: 'https://picsum.photos/seed/sherwani-template-1/900/1100',
  },
  {
    id: 'kurti-elegant-red',
    name: 'Elegant Red Kurti Set',
    garmentTypes: ['Kurti', 'Saree Blouse'],
    image: 'https://picsum.photos/seed/kurti-template-1/900/1100',
  },
  {
    id: 'shirt-modern-slim',
    name: 'Modern Slim Shirt Pattern',
    garmentTypes: ['Shirt', 'Blazer'],
    image: 'https://picsum.photos/seed/shirt-template-1/900/1100',
  },
  {
    id: 'blazer-luxury-cut',
    name: 'Luxury Blazer Structured Cut',
    garmentTypes: ['Blazer', 'Sherwani'],
    image: 'https://picsum.photos/seed/blazer-template-1/900/1100',
  },
];

export const topMeasurementFields: MeasurementFieldConfig[] = [
  {
    key: 'bust',
    label: 'Bust (বুকের চারপাশ)',
    helper: 'বুকের সবচেয়ে ভরা অংশে টেপ ঘুরিয়ে মাপুন।',
    placeholder: 'যেমন: 36',
  },
  {
    key: 'topWaist',
    label: 'Waist (কোমর)',
    helper: 'কোমরের সরু অংশে সোজা হয়ে দাঁড়িয়ে মাপুন।',
    placeholder: 'যেমন: 32',
  },
  {
    key: 'hip',
    label: 'Hip (হিপ)',
    helper: 'হিপের সবচেয়ে চওড়া অংশে টেপ ঘুরিয়ে নিন।',
    placeholder: 'যেমন: 40',
  },
  {
    key: 'shoulder',
    label: 'Shoulder (কাঁধ)',
    helper: 'এক কাঁধের হাড় থেকে অন্য কাঁধের হাড় পর্যন্ত।',
    placeholder: 'যেমন: 15',
  },
  {
    key: 'topLength',
    label: 'Top Length',
    helper: 'কাঁধের উপর থেকে নিচে যত লম্বা চান।',
    placeholder: 'যেমন: 44',
  },
  {
    key: 'sleeveLength',
    label: 'Sleeve Length',
    helper: 'কাঁধ থেকে হাতার শেষ পর্যন্ত মাপুন।',
    placeholder: 'যেমন: 21',
  },
];

export const bottomMeasurementFields: MeasurementFieldConfig[] = [
  {
    key: 'bottomWaist',
    label: 'Bottom Waist',
    helper: 'প্যান্ট/বটম কোমরের লাইনে টেপ দিন।',
    placeholder: 'যেমন: 30',
  },
  {
    key: 'bottomHip',
    label: 'Bottom Hip',
    helper: 'হিপের চওড়া অংশে টেপ ঘুরিয়ে নিন।',
    placeholder: 'যেমন: 40',
  },
  {
    key: 'bottomLength',
    label: 'Bottom Length',
    helper: 'কোমর থেকে নিচে গোড়ালি/পছন্দের দৈর্ঘ্য।',
    placeholder: 'যেমন: 38',
  },
];

export const stepTips = [
  'Step 1: আগে garment type বাছাই করুন',
  'Step 2: body-fit tape দিয়ে মাপ নিন (tight বা loose নয়)',
  'Step 3: design template select করুন বা নিজের design upload দিন',
  'Step 4: fit preference লিখে submit করুন',
];

export const fabricOptionsByGarment = Object.entries(garmentFabricCatalog).reduce<Record<string, string[]>>((acc, [garmentType, fabrics]) => {
  fabrics.forEach((fabric) => {
    acc[fabric.name] = acc[fabric.name] || [];
    if (!acc[fabric.name].includes(garmentType)) {
      acc[fabric.name].push(garmentType);
    }
  });
  return acc;
}, {});