import type { ProductCardData } from '../../types/item';
import ProductCard from '../../components/product/ProductCard';

interface WeeklyCurationProps {
  items: ProductCardData[];
}

export default function WeeklyCuration({ items }: WeeklyCurationProps) {
  const display = items.slice(0, 5);

  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">This Week</p>
          <h2 className="text-2xl font-bold tracking-tight">Weekly Curation</h2>
        </div>
        <a
          href="#"
          className="text-xs tracking-widest uppercase text-gray-500 hover:text-black transition-colors border-b border-gray-300 pb-0.5"
        >
          View All
        </a>
      </div>

      {/* Asymmetric grid: first card spans 2 rows, rest 2×2 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[640px]">
        {display[0] && (
          <div className="col-span-1 row-span-2">
            <ProductCard item={display[0]} className="h-full" />
          </div>
        )}
        {display.slice(1).map((item) => (
          <div key={item.id} className="col-span-1 row-span-1">
            <ProductCard item={item} className="h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
