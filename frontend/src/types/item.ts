export type ItemStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';

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
  description: string;
  status: ItemStatus;
  imageUrl: string;
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
