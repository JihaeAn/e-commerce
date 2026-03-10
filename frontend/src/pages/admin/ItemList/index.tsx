import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockItems } from '../../../constants/mockItems';
import type { Item } from '../../../types/item';

const STATUS_LABEL: Record<Item['status'], { label: string; className: string }> = {
  AVAILABLE: { label: '판매중', className: 'bg-green-50 text-green-700' },
  OUT_OF_STOCK: { label: '품절', className: 'bg-yellow-50 text-yellow-700' },
  DISCONTINUED: { label: '단종', className: 'bg-gray-100 text-gray-500' },
};

export default function ItemList() {
  const [items] = useState(mockItems);
  const [search, setSearch] = useState('');

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">상품 관리</h1>
          <p className="text-sm text-gray-400 mt-1">총 {items.length}개 상품</p>
        </div>
        <Link
          to="/admin/items/new"
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          상품 등록
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded mb-4 p-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="상품명, 카테고리 검색"
          className="flex-1 text-sm outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['상품', '카테고리', '가격', '옵션 그룹', '상태', ''].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs tracking-widest uppercase text-gray-400 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-12 object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.brandName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                <td className="px-6 py-4 font-medium">{item.price.toLocaleString('ko-KR')}원</td>
                <td className="px-6 py-4 text-gray-500">
                  {item.optionGroups.map((g) => g.name).join(', ') || '—'}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 text-xs rounded ${STATUS_LABEL[item.status].className}`}>
                    {STATUS_LABEL[item.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/product/${item.id}`}
                    target="_blank"
                    className="text-xs text-gray-400 hover:text-black transition-colors"
                  >
                    미리보기 →
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-gray-400 text-sm">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
