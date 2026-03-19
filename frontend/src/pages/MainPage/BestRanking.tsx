import { Link } from 'react-router-dom';
import type { ProductCardData } from '../../types/item';

interface BestRankingProps {
  items: ProductCardData[];
}

export default function BestRanking({ items }: BestRankingProps) {
  const topItems = items.slice(0, 10);

  if (topItems.length === 0) return null;

  return (
    <section className="py-10 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-red-500 tracking-widest uppercase">BEST</span>
            <h2 className="text-xl font-black tracking-tight">랭킹</h2>
          </div>
          <a
            href="#"
            className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
          >
            전체보기 →
          </a>
        </div>

        {/* Horizontal scroll */}
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {topItems.map((item, idx) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group flex-shrink-0 w-36 md:w-44"
            >
              <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rank badge */}
                <div
                  className={[
                    'absolute top-0 left-0 w-8 h-8 flex items-center justify-center text-sm font-black',
                    idx < 3 ? 'bg-black text-white' : 'bg-white/90 text-black',
                  ].join(' ')}
                >
                  {idx + 1}
                </div>
              </div>
              <div className="mt-2 space-y-0.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider truncate">
                  {item.brandName || item.category}
                </p>
                <p className="text-xs font-medium text-black line-clamp-2 leading-snug">{item.name}</p>
                <p className="text-sm font-black text-black">{item.price.toLocaleString('ko-KR')}원</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}