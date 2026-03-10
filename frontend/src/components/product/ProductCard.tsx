import { Link } from 'react-router-dom';
import type { ProductCardData } from '../../types/item';

interface ProductCardProps {
  item: ProductCardData;
  className?: string;
}

export default function ProductCard({ item, className = '' }: ProductCardProps) {
  return (
    <Link to={`/product/${item.id}`} className={`group block ${className}`}>
      <div className="overflow-hidden bg-gray-50 aspect-[3/4]">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[10px] tracking-widest uppercase text-gray-400">{item.brandName}</p>
        <p className="text-sm text-black">{item.name}</p>
        <p className="text-sm font-medium text-black">
          {item.price.toLocaleString('ko-KR')}원
        </p>
      </div>
    </Link>
  );
}
