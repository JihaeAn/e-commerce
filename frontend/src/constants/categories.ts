export const CATEGORIES = [
  'ALL',
  'OUTER',
  'TOPS',
  'BOTTOMS',
  'DRESSES',
  'BAGS',
  'ACCESSORIES',
] as const;

export type Category = (typeof CATEGORIES)[number];
