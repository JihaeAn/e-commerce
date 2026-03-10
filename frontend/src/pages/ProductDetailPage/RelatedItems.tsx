import type { Item } from '../../types/item';
import { mockItems } from '../../constants/mockItems';
import ProductCard from '../../components/product/ProductCard';

interface RelatedItemsProps {
  current: Item;
}

export default function RelatedItems({ current }: RelatedItemsProps) {
  const related = mockItems
    .filter((item) => item.id !== current.id && item.category === current.category)
    .slice(0, 4);

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
