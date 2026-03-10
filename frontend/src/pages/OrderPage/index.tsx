import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const DELIVERY_FEE = 3000;
const FREE_THRESHOLD = 100000;
const PAYMENT_METHODS = [
  { id: 'CARD',       label: '신용·체크카드' },
  { id: 'KAKAO_PAY', label: '카카오페이' },
  { id: 'NAVER_PAY', label: '네이버페이' },
  { id: 'BANK',       label: '무통장 입금' },
];
const MEMO_PRESETS = ['문 앞에 놓아주세요', '경비실에 맡겨주세요', '배송 전 연락 주세요', '직접 입력'];

function UField({ label, value, onChange, placeholder, type = 'text', required = false, error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean; error?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-1.5">
        {label}{required && <span className="text-amber ml-0.5">*</span>}
      </label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={[
          'w-full bg-transparent border-b py-2.5 text-sm text-warm-900 outline-none transition-colors placeholder:text-warm-300',
          error ? 'border-red-400' : 'border-parchment-300 focus:border-warm-900',
        ].join(' ')}
      />
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function genOrderNum() {
  const d = new Date();
  return `SRF-${String(d.getFullYear()).slice(2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(Math.random()*90000+10000)}`;
}

export default function OrderPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const deliveryFee = totalPrice >= FREE_THRESHOLD ? 0 : DELIVERY_FEE;
  const finalPrice  = totalPrice + deliveryFee;

  const [form, setForm] = useState({ name: '', phone: '', zipCode: '', address: '', detail: '', memo: MEMO_PRESETS[0], customMemo: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState('CARD');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const sf = (k: string) => (v: string) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name)    e.name    = '이름을 입력해주세요.';
    if (!form.phone)   e.phone   = '연락처를 입력해주세요.';
    if (!form.address) e.address = '주소를 입력해주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!agreed) { alert('주문 내용 확인 및 약관에 동의해주세요.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const num = genOrderNum();
    clearCart();
    navigate('/order/complete', { state: { orderNumber: num, finalPrice } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="font-display text-2xl italic text-warm-400">장바구니가 비어있습니다</p>
        <Link to="/" className="text-[11px] tracking-widest uppercase border-b border-warm-900 pb-px text-warm-900 hover:text-amber transition-colors">
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="flex items-baseline justify-between mb-12 border-b border-parchment-300 pb-8">
        <h1 className="font-display text-4xl font-medium text-warm-900">Order & Payment</h1>
        <p className="text-[11px] tracking-widest text-warm-400 hidden md:block">
          Cart → <span className="text-warm-900 font-medium">Order</span> → Confirmation
        </p>
      </div>

      <form onSubmit={submit}>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-16">
          <div className="space-y-16">

            {/* 01 배송지 */}
            <section>
              <div className="flex items-start gap-5 mb-9">
                <span className="font-display text-5xl font-light text-parchment-300 leading-none">01</span>
                <div className="pt-1">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-warm-400">Shipping</p>
                  <h2 className="font-display text-2xl font-medium text-warm-900">배송지 정보</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <UField label="받는 분" value={form.name} onChange={sf('name')} placeholder="홍길동" required error={errors.name} />
                <UField label="연락처" type="tel" value={form.phone} onChange={sf('phone')} placeholder="010-0000-0000" required error={errors.phone} />
                <UField label="우편번호" value={form.zipCode} onChange={sf('zipCode')} placeholder="12345" />
                <UField label="주소" value={form.address} onChange={sf('address')} placeholder="서울시 강남구" required error={errors.address} />
                <div className="sm:col-span-2">
                  <UField label="상세주소" value={form.detail} onChange={sf('detail')} placeholder="동/호수" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-3">배송 메모</p>
                <div className="flex flex-wrap gap-2">
                  {MEMO_PRESETS.map((p) => (
                    <button key={p} type="button" onClick={() => sf('memo')(p)}
                      className={`px-3 py-2 text-xs border transition-all ${form.memo === p ? 'border-warm-900 bg-warm-900 text-parchment-50' : 'border-parchment-300 text-warm-500 hover:border-warm-600'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <div className="border-t border-parchment-300" />

            {/* 02 결제 수단 */}
            <section>
              <div className="flex items-start gap-5 mb-9">
                <span className="font-display text-5xl font-light text-parchment-300 leading-none">02</span>
                <div className="pt-1">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-warm-400">Payment</p>
                  <h2 className="font-display text-2xl font-medium text-warm-900">결제 수단</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <button key={m.id} type="button" onClick={() => setPayment(m.id)}
                    className={`py-5 text-xs tracking-wide border transition-all ${payment === m.id ? 'border-warm-900 bg-warm-900 text-parchment-50' : 'border-parchment-300 text-warm-500 hover:border-warm-500'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </section>

            <div className="border-t border-parchment-300" />

            {/* 03 약관 */}
            <section>
              <div className="flex items-start gap-5 mb-7">
                <span className="font-display text-5xl font-light text-parchment-300 leading-none">03</span>
                <div className="pt-1">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-warm-400">Agreement</p>
                  <h2 className="font-display text-2xl font-medium text-warm-900">약관 동의</h2>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-warm-900" />
                <span className="text-sm text-warm-600">구매 조건 확인 및 결제 진행에 동의합니다 (필수)</span>
              </label>
            </section>
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-24 border border-parchment-300 bg-parchment-200/50">
              <div className="px-6 py-5 border-b border-parchment-300">
                <p className="text-[10px] tracking-widest uppercase text-warm-400">Order Summary</p>
              </div>
              <div className="divide-y divide-parchment-200 max-h-56 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.cartKey} className="flex gap-3 px-5 py-4">
                    <div className="w-12 aspect-[3/4] flex-shrink-0 overflow-hidden bg-parchment-200">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate text-warm-800">{item.name}</p>
                      <p className="text-[10px] text-warm-400 mt-0.5">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-medium text-warm-900 self-end flex-shrink-0">
                      {(item.price * item.quantity).toLocaleString('ko-KR')}원
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-5 border-t border-parchment-300 space-y-2.5">
                <div className="flex justify-between text-xs text-warm-500">
                  <span>상품 금액</span><span>{totalPrice.toLocaleString('ko-KR')}원</span>
                </div>
                <div className="flex justify-between text-xs text-warm-500">
                  <span>배송비</span>
                  <span>{deliveryFee === 0 ? <span className="text-amber font-medium">무료</span> : `${deliveryFee.toLocaleString('ko-KR')}원`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-warm-900 pt-3 border-t border-parchment-300">
                  <span>최종 결제금액</span><span>{finalPrice.toLocaleString('ko-KR')}원</span>
                </div>
              </div>
              <div className="px-6 pb-6 space-y-3">
                <button type="submit" disabled={loading}
                  className="w-full bg-warm-900 text-parchment-50 py-4 text-xs tracking-widest uppercase hover:bg-warm-800 transition-colors disabled:opacity-50">
                  {loading
                    ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>처리 중…</span>
                    : `${finalPrice.toLocaleString('ko-KR')}원 결제하기`}
                </button>
                <p className="text-[10px] text-warm-400 text-center">주문 후 1–3 영업일 내 출고</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
