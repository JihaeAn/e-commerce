import { CATEGORIES } from '../../constants/categories';
import type { Category } from '../../constants/categories';

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div
        className="max-w-screen-xl mx-auto px-6 flex gap-8 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={[
              'flex-shrink-0 py-4 text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px',
              active === cat
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black',
            ].join(' ')}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
