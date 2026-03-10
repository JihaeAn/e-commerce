import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserResponse {
  userId: number;
  loginId: string;
  email: string;
  userName: string;
  phone: string;
  gender: string;
  birthDate: string;
  grade: 'VIP' | 'NORMAL';
  lastLoginAt: string;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// Fallback mock data when backend is unavailable
const MOCK_USERS: UserResponse[] = [
  { userId: 1, loginId: 'user001', email: 'user001@example.com', userName: '김민준', phone: '010-1234-5678', gender: 'M', birthDate: '1995-03-15', grade: 'VIP', lastLoginAt: '2025-03-10T09:23:00' },
  { userId: 2, loginId: 'user002', email: 'user002@example.com', userName: '이서연', phone: '010-2345-6789', gender: 'F', birthDate: '1998-07-22', grade: 'NORMAL', lastLoginAt: '2025-03-09T14:05:00' },
  { userId: 3, loginId: 'user003', email: 'user003@example.com', userName: '박지호', phone: '010-3456-7890', gender: 'M', birthDate: '1993-11-08', grade: 'NORMAL', lastLoginAt: '2025-03-08T18:41:00' },
  { userId: 4, loginId: 'user004', email: 'user004@example.com', userName: '최유나', phone: '010-4567-8901', gender: 'F', birthDate: '2000-01-30', grade: 'VIP', lastLoginAt: '2025-03-10T11:00:00' },
  { userId: 5, loginId: 'user005', email: 'user005@example.com', userName: '정도윤', phone: '010-5678-9012', gender: 'M', birthDate: '1996-05-17', grade: 'NORMAL', lastLoginAt: '2025-03-07T20:15:00' },
];

const GRADE_STYLE = {
  VIP: 'bg-amber-50 text-amber-700',
  NORMAL: 'bg-gray-100 text-gray-600',
};

export default function UserList() {
  const [data, setData] = useState<Page<UserResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  const [search, setSearch] = useState({ loginId: '', userName: '' });
  const [grade, setGrade] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params: Record<string, string | number> = { page, size: 10, sort: 'userId,asc' };
        if (search.loginId) params.loginId = search.loginId;
        if (search.userName) params.userName = search.userName;
        if (grade) params.grade = grade;

        const res = await axios.get<Page<UserResponse>>('/api/v1/user', { params });
        setData(res.data);
        setUseMock(false);
      } catch {
        // Backend unavailable — show mock data
        setData({ content: MOCK_USERS, totalElements: MOCK_USERS.length, totalPages: 1, number: 0, size: 10 });
        setUseMock(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page, grade]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
  };

  const formatDate = (iso: string) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">회원 관리</h1>
        <p className="text-sm text-gray-400 mt-1">GET /api/v1/user</p>
      </div>

      {useMock && (
        <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
          백엔드 서버에 연결할 수 없어 목업 데이터를 표시하고 있습니다.
        </div>
      )}

      {/* Filters */}
      <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded p-4 flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">로그인 ID</label>
          <input
            type="text"
            value={search.loginId}
            onChange={(e) => setSearch((p) => ({ ...p, loginId: e.target.value }))}
            placeholder="loginId"
            className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors w-40"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">이름</label>
          <input
            type="text"
            value={search.userName}
            onChange={(e) => setSearch((p) => ({ ...p, userName: e.target.value }))}
            placeholder="이름"
            className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors w-32"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">등급</label>
          <select
            value={grade}
            onChange={(e) => { setGrade(e.target.value); setPage(0); }}
            className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
          >
            <option value="">전체</option>
            <option value="VIP">VIP</option>
            <option value="NORMAL">일반</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
        >
          검색
        </button>
      </form>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['ID', '로그인 ID', '이름', '이메일', '연락처', '등급', '마지막 로그인'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs tracking-widest uppercase text-gray-400 font-normal whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center text-gray-400 text-sm">
                  불러오는 중...
                </td>
              </tr>
            ) : data?.content.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-gray-400 text-xs">{user.userId}</td>
                <td className="px-5 py-3.5 font-medium">{user.loginId}</td>
                <td className="px-5 py-3.5">{user.userName}</td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">{user.email}</td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">{user.phone || '—'}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2 py-0.5 text-xs rounded ${GRADE_STYLE[user.grade]}`}>
                    {user.grade}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                  {formatDate(user.lastLoginAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              총 {data.totalElements}명 · {data.number + 1} / {data.totalPages} 페이지
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={data.number === 0}
                className="px-3 py-1.5 text-xs border border-gray-200 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                disabled={data.number === data.totalPages - 1}
                className="px-3 py-1.5 text-xs border border-gray-200 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
