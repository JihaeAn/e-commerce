import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MENU = [
  { label: '주문 내역', icon: '📦', desc: '주문 현황 및 배송 추적' },
  { label: '위시리스트', icon: '♡', desc: '저장한 상품 목록' },
  { label: '배송지 관리', icon: '📍', desc: '배송지 추가 및 수정' },
  { label: '포인트', icon: '✦', desc: '적립 및 사용 내역' },
  { label: '쿠폰', icon: '◇', desc: '보유 쿠폰 확인' },
  { label: '1:1 문의', icon: '✉', desc: '문의 내역 및 답변 확인' },
];

export default function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-lg font-medium text-gray-700">로그인이 필요합니다</p>
        <Link
          to="/login"
          className="bg-black text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-neutral-800 transition-colors"
        >
          로그인
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-screen-md mx-auto px-6 py-14">
      {/* Profile */}
      <div className="flex items-center gap-5 pb-10 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold select-none">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto text-xs text-gray-400 hover:text-black transition-colors border border-gray-200 hover:border-gray-400 px-4 py-2"
        >
          로그아웃
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 py-8 border-b border-gray-100">
        {[
          { label: '주문', value: '0' },
          { label: '위시리스트', value: '0' },
          { label: '포인트', value: '0 P' },
        ].map(({ label, value }) => (
          <div key={label} className="text-center px-4">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1 tracking-wider uppercase">{label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MENU.map(({ label, icon, desc }) => (
          <button
            key={label}
            className="flex items-center gap-4 p-5 border border-gray-100 hover:border-gray-300 transition-colors text-left group"
          >
            <span className="text-xl w-8 text-center">{icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-900 group-hover:text-black">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
