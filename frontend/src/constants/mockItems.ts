import type { Item } from '../types/item';

export const mockItems: Item[] = [
  {
    id: 1,
    name: 'Oversized Linen Blazer',
    brandName: 'MUSINSA',
    price: 289000,
    description:
      'Relaxed-fit linen blazer with a clean minimal silhouette. Unlined for a lightweight feel.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-1/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-1/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'OUTER',
    optionGroups: [
      { id: 1, name: 'COLOR', options: ['Ivory', 'Beige', 'Black'] },
      { id: 2, name: 'SIZE', options: ['XS', 'S', 'M', 'L', 'XL'] },
    ],
  },
  {
    id: 2,
    name: 'Wide-Leg Trousers',
    brandName: 'MUSINSA',
    price: 179000,
    description:
      'High-rise wide-leg trousers crafted from a crisp cotton-blend fabric.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-2/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-2/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'BOTTOMS',
    optionGroups: [
      { id: 3, name: 'COLOR', options: ['Charcoal', 'Ecru', 'Navy'] },
      { id: 4, name: 'SIZE', options: ['XS', 'S', 'M', 'L'] },
    ],
  },
  {
    id: 3,
    name: 'Ribbed Knit Turtleneck',
    brandName: 'MUSINSA',
    price: 129000,
    description:
      'Slim-fit turtleneck in a fine-gauge rib-knit. Versatile everyday essential.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-3/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-3/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'TOPS',
    optionGroups: [
      { id: 5, name: 'COLOR', options: ['Black', 'Cream', 'Slate'] },
      { id: 6, name: 'SIZE', options: ['XS', 'S', 'M', 'L', 'XL'] },
    ],
  },
  {
    id: 4,
    name: 'Minimalist Canvas Tote',
    brandName: 'MUSINSA',
    price: 89000,
    description: 'Sturdy canvas tote with a debossed logo. Daily-use companion.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-4/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-4/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'BAGS',
    optionGroups: [
      { id: 7, name: 'COLOR', options: ['Natural', 'Black'] },
    ],
  },
  {
    id: 5,
    name: 'Straight-Fit Denim',
    brandName: 'MUSINSA',
    price: 199000,
    description:
      'Classic straight-fit jeans in a rigid indigo denim. Made to last.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-5/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-5/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'BOTTOMS',
    optionGroups: [
      { id: 8, name: 'COLOR', options: ['Indigo', 'Washed Black'] },
      { id: 9, name: 'SIZE', options: ['28', '30', '32', '34', '36'] },
    ],
  },
  {
    id: 6,
    name: 'Cocoon-Shape Coat',
    brandName: 'MUSINSA',
    price: 489000,
    description:
      'Oversized cocoon coat in a soft wool-cashmere blend. Statement outer piece.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-6/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-6/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'OUTER',
    optionGroups: [
      { id: 10, name: 'COLOR', options: ['Camel', 'Charcoal', 'White'] },
      { id: 11, name: 'SIZE', options: ['S', 'M', 'L'] },
    ],
  },
  {
    id: 7,
    name: 'Slip Dress',
    brandName: 'MUSINSA',
    price: 159000,
    description:
      'Fluid satin-finish slip dress. Minimalist cut with adjustable straps.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-7/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-7/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'DRESSES',
    optionGroups: [
      { id: 12, name: 'COLOR', options: ['Ivory', 'Onyx', 'Blush'] },
      { id: 13, name: 'SIZE', options: ['XS', 'S', 'M', 'L'] },
    ],
  },
  {
    id: 8,
    name: 'Leather Belt',
    brandName: 'MUSINSA',
    price: 69000,
    description:
      'Full-grain leather belt with a matte rectangular buckle.',
    status: 'AVAILABLE',
    imageUrl: 'https://picsum.photos/seed/item-8/600/800',
    images: [{ fileUrl: 'https://picsum.photos/seed/item-8/600/800', imageType: 'MAIN', sortOrder: 1 }],
    category: 'ACCESSORIES',
    optionGroups: [
      { id: 14, name: 'COLOR', options: ['Black', 'Tan'] },
      { id: 15, name: 'SIZE', options: ['S', 'M', 'L'] },
    ],
  },
];
