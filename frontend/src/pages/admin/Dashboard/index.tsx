import { Link } from 'react-router-dom';
import { mockItems } from '../../../constants/mockItems';

const STATS = [
  { label: '전체 상품', value: mockItems.length, unit: '개', to: '/admin/items' },
  { label: '판매 중', value: mockItems.filter((i) => i.status === 'AVAILABLE').length, unit: '개', to: '/admin/items' },
  { label: '전체 회원', value: 128, unit: '명', to: '/admin/users' },
  { label: '오늘 주문', value: 14, unit: '건', to: '#' },
];

const RECENT_ITEMS = mockItems.slice(0, 5);

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-sm text-gray-400 mt-1">MUSINSA 관리자 페이지</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="bg-white border border-gray-200 rounded p-6 hover:border-black transition-colors group"
          >
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">{stat.label}</p>
            <p className="text-3xl font-bold tracking-tight">
              {stat.value.toLocaleString()}
              <span className="text-base font-normal text-gray-400 ml-1">{stat.unit}</span>
            </p>
          </Link>
        ))}
      </div>

      {/* Recent items */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold">최근 등록 상품</h2>
          <Link to="/admin/items" className="text-xs text-gray-400 hover:text-black transition-colors">
            전체 보기 →
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['상품명', '카테고리', '가격', '상태'].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs tracking-widest uppercase text-gray-400 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RECENT_ITEMS.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                <td className="px-6 py-4">{item.price.toLocaleString('ko-KR')}원</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded">
                    판매중
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
