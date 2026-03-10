import { useLocation, Link } from 'react-router-dom';

function eta() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${['일','월','화','수','목','금','토'][d.getDay()]})`;
}

export default function OrderComplete() {
  const { state } = useLocation() as { state: { orderNumber?: string; finalPrice?: number } | null };
  const num   = state?.orderNumber ?? 'SRF-000000-00000';
  const price = state?.finalPrice  ?? 0;

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      {/* Circle check */}
      <div className="opacity-0 animate-fade-in-up flex justify-center mb-12">
        <div className="w-16 h-16 border border-warm-300 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <div className="opacity-0 animate-fade-in-up delay-100 mb-10">
        <p className="text-[10px] tracking-[0.35em] uppercase text-warm-400 mb-4">Order Confirmed</p>
        <h1 className="font-display text-5xl font-medium italic text-warm-900 mb-3 leading-tight">
          Thank you<br/>for your order
        </h1>
        <p className="text-sm text-warm-400 mt-4">
          주문번호 <span className="font-medium text-warm-800 tracking-widest">{num}</span>
        </p>
      </div>

      <div className="opacity-0 animate-fade-in-up delay-200 border border-parchment-300 divide-y divide-parchment-200 mb-10 text-left">
        {[
          { label: '결제 금액',  value: price ? `${price.toLocaleString('ko-KR')}원` : '—' },
          { label: '예상 도착일', value: eta() },
          { label: '배송 알림',  value: '출고 시 문자로 안내드립니다' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between px-6 py-4">
            <p className="text-[10px] tracking-widest uppercase text-warm-400">{label}</p>
            <p className="text-sm text-warm-800">{value}</p>
          </div>
        ))}
      </div>

      <div className="opacity-0 animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="bg-warm-900 text-parchment-50 text-xs tracking-widest uppercase px-10 py-4 hover:bg-warm-800 transition-colors">
          쇼핑 계속하기
        </Link>
        <button className="border border-parchment-300 text-warm-500 text-xs tracking-widest uppercase px-10 py-4 hover:border-warm-700 hover:text-warm-800 transition-colors">
          주문 내역 보기
        </button>
      </div>
    </div>
  );
}
