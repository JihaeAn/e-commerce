import { useState, useEffect } from 'react';
import type { Category } from '../../constants/categories';
import type { ProductCardData } from '../../types/item';
import apiClient from '../../api/client';
import HeroSection from './HeroSection';
import CategoryTabs from './CategoryTabs';
import WeeklyCuration from './WeeklyCuration';
import CollectionBanner from './CollectionBanner';
import ProductGrid from '../../components/product/ProductGrid';

const PLACEHOLDER = 'https://placehold.co/400x533/f3f4f6/9ca3af?text=No+Image';

interface ApiItemCard {
  itemId: number;
  itemName: string;
  categoryName: string | null;
  price: number;
  imageUrl: string | null;
}

interface PageResponse {
  content: ApiItemCard[];
}

function toProductCardData(item: ApiItemCard): ProductCardData {
  return {
    id: item.itemId,
    name: item.itemName,
    brandName: item.categoryName ?? '',
    price: item.price,
    imageUrl: item.imageUrl ?? PLACEHOLDER,
    category: item.categoryName ?? '',
  };
}

export default function MainPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [items, setItems] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string | number> = { size: 20 };
    if (activeCategory !== 'ALL') params.categoryName = activeCategory;

    apiClient
      .get<PageResponse>('/api/v1/items', { params })
      .then((res) => setItems(res.data.content.map(toProductCardData)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <>
      <HeroSection />

      <section className="py-16">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div className="max-w-screen-xl mx-auto px-6 pt-12">
          {loading ? (
            <p className="text-center text-gray-400 py-20 text-sm tracking-widest uppercase">
              Loading...
            </p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-sm tracking-widest uppercase">
              No items in this category yet
            </p>
          ) : (
            <ProductGrid items={items} />
          )}
        </div>
      </section>

      <WeeklyCuration items={items} />

      <CollectionBanner />
    </>
  );
}