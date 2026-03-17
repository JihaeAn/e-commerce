import { useEffect, useState } from 'react';
import type { ProductCardData } from '../../types/item';
import apiClient from '../../api/client';
import ProductCard from '../../components/product/ProductCard';

const PLACEHOLDER = 'https://placehold.co/400x533/f3f4f6/9ca3af?text=No+Image';

interface RelatedItemsProps {
  currentItemId: number;
  categoryName: string;
}

interface ApiItemCard {
  itemId: number;
  itemName: string;
  categoryName: string | null;
  price: number;
  imageUrl: string | null;
}

export default function RelatedItems({ currentItemId, categoryName }: RelatedItemsProps) {
  const [related, setRelated] = useState<ProductCardData[]>([]);

  useEffect(() => {
    if (!categoryName) return;

    apiClient
      .get<{ content: ApiItemCard[] }>('/api/v1/items', {
        params: { categoryName, size: 5 },
      })
      .then((res) => {
        const items = res.data.content
          .filter((item) => item.itemId !== currentItemId)
          .slice(0, 4)
          .map((item) => ({
            id: item.itemId,
            name: item.itemName,
            brandName: item.categoryName ?? '',
            price: item.price,
            imageUrl: item.imageUrl ?? PLACEHOLDER,
            category: item.categoryName ?? '',
          }));
        setRelated(items);
      })
      .catch(() => setRelated([]));
  }, [currentItemId, categoryName]);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-gray-200 pt-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">You may also like</p>
          <h2 className="text-2xl font-bold tracking-tight">Related Items</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
        {related.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}