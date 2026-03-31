export type ItemStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';

export interface ItemImage {
  fileUrl: string;
  imageType: 'MAIN' | 'DETAIL';
  sortOrder: number;
}

export interface ItemOptionGroup {
  id: number;
  name: string; // e.g. "COLOR", "SIZE"
  options: string[];
}

export interface Item {
  id: number;
  name: string;
  brandName: string;
  price: number;
  salePrice: number | null;
  discountRate: number | null;
  description: string;
  status: ItemStatus;
  imageUrl: string;
  images: ItemImage[];
  optionGroups: ItemOptionGroup[];
  category: string;
}

export interface ProductCardData {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageUrl: string;
  category: string;
}
