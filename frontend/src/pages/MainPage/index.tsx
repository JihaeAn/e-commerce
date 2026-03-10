import { useState, useMemo } from 'react';
import type { Category } from '../../constants/categories';
import { mockItems } from '../../constants/mockItems';
import HeroSection from './HeroSection';
import CategoryTabs from './CategoryTabs';
import WeeklyCuration from './WeeklyCuration';
import CollectionBanner from './CollectionBanner';
import ProductGrid from '../../components/product/ProductGrid';

export default function MainPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return mockItems;
    return mockItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <HeroSection />

      {/* Category + product grid */}
      <section className="py-16">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div className="max-w-screen-xl mx-auto px-6 pt-12">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-sm tracking-widest uppercase">
              No items in this category yet
            </p>
          ) : (
            <ProductGrid items={filteredItems} />
          )}
        </div>
      </section>

      <WeeklyCuration items={mockItems} />

      <CollectionBanner />
    </>
  );
}
