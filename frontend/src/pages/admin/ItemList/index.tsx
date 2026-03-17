import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../../api/client';

type BackendStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'SOLD_OUT';

interface ItemListItem {
  itemId: number;
  itemName: string;
  categoryName: string | null;
  price: number;
  status: BackendStatus;
  optionGroupNames: string[];
}

interface PageResponse {
  content: ItemListItem[];
  totalElements: number;
  totalPages: number;
  number: number;
}

const STATUS_LABEL: Record<BackendStatus, { label: string; className: string }> = {
  ACTIVE: { label: '판매중', className: 'bg-green-50 text-green-700' },
  INACTIVE: { label: '비활성', className: 'bg-gray-100 text-gray-500' },
  SOLD_OUT: { label: '품절', className: 'bg-yellow-50 text-yellow-700' },
  DELETED: { label: '삭제됨', className: 'bg-red-50 text-red-400' },
};

export default function ItemList() {
  const [items, setItems] = useState<ItemListItem[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchItems();
  }, [search, page]);

  async function fetchItems() {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = { page, size: PAGE_SIZE };
      if (search) params.itemName = search;

      const res = await apiClient.get<PageResponse>('/admin/v1/items', { params });
      setItems(res.data.content);
      setTotalElements(res.data.totalElements);
      setTotalPages(res.data.totalPages);
    } catch {
      setError('상품 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(0);
    setSearch(inputValue);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">상품 관리</h1>
          <p className="text-sm text-gray-400 mt-1">총 {totalElements}개 상품</p>
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
      <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded mb-4 p-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="상품명 검색"
          className="flex-1 text-sm outline-none placeholder:text-gray-300"
        />
        <button type="submit" className="text-xs text-gray-500 hover:text-black px-2 py-1 transition-colors">
          검색
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['상품명', '카테고리', '가격', '옵션 그룹', '상태'].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs tracking-widest uppercase text-gray-400 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                  불러오는 중...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                  {search ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.itemId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium leading-tight">{item.itemName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">ID: {item.itemId}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.categoryName ?? '—'}</td>
                  <td className="px-6 py-4 font-medium">{item.price.toLocaleString('ko-KR')}원</td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.optionGroupNames.length > 0 ? item.optionGroupNames.join(', ') : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded ${STATUS_LABEL[item.status].className}`}>
                      {STATUS_LABEL[item.status].label}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 text-xs border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            이전
          </button>
          <span className="px-3 py-1 text-xs text-gray-500">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 text-xs border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}