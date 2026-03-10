import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// ── 백엔드 POST /admin/v1/item 스펙과 1:1 대응 ──
interface SaveItemOptionValue {
  valueName: string;
  additionalPrice: number;
  sortOrder: number;
}

interface SaveItemOptionGroup {
  groupName: string;
  sortOrder: number;
  values: SaveItemOptionValue[];
}

interface SaveItemPayload {
  categoryId: number;
  itemName: string;
  description: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'SOLD_OUT';
  policyType: 'NORMAL' | 'EVENT' | 'TIME_SALE' | 'PRE_ORDER';
  salePrice: number;
  saleStartAt: string;
  saleEndAt: string;
  groups: SaveItemOptionGroup[];
}

const CATEGORIES = [
  { id: 1, name: 'OUTER' },
  { id: 2, name: 'TOPS' },
  { id: 3, name: 'BOTTOMS' },
  { id: 4, name: 'DRESSES' },
  { id: 5, name: 'BAGS' },
  { id: 6, name: 'ACCESSORIES' },
];

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: '판매 가능' },
  { value: 'INACTIVE', label: '준비 중' },
  { value: 'SOLD_OUT', label: '품절' },
  { value: 'DELETED', label: '삭제' },
];

const POLICY_OPTIONS = [
  { value: 'NORMAL', label: '일반 판매' },
  { value: 'EVENT', label: '이벤트 판매' },
  { value: 'TIME_SALE', label: '타임 세일' },
  { value: 'PRE_ORDER', label: '예약 판매' },
];

const inputClass =
  'w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors';
const labelClass = 'block text-xs tracking-widest uppercase text-gray-500 mb-1.5';

export default function ItemCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    categoryId: 1,
    itemName: '',
    description: '',
    price: '',
    status: 'ACTIVE' as SaveItemPayload['status'],
    policyType: 'NORMAL' as SaveItemPayload['policyType'],
    salePrice: '',
    saleStartAt: '',
    saleEndAt: '',
  });

  const [groups, setGroups] = useState<SaveItemOptionGroup[]>([]);

  // ── 옵션 그룹 조작 ──
  const addGroup = () => {
    setGroups((prev) => [
      ...prev,
      { groupName: '', sortOrder: prev.length + 1, values: [] },
    ]);
  };

  const removeGroup = (gi: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== gi));
  };

  const updateGroupName = (gi: number, name: string) => {
    setGroups((prev) =>
      prev.map((g, i) => (i === gi ? { ...g, groupName: name } : g)),
    );
  };

  const addValue = (gi: number) => {
    setGroups((prev) =>
      prev.map((g, i) =>
        i === gi
          ? { ...g, values: [...g.values, { valueName: '', additionalPrice: 0, sortOrder: g.values.length + 1 }] }
          : g,
      ),
    );
  };

  const removeValue = (gi: number, vi: number) => {
    setGroups((prev) =>
      prev.map((g, i) =>
        i === gi ? { ...g, values: g.values.filter((_, j) => j !== vi) } : g,
      ),
    );
  };

  const updateValue = (gi: number, vi: number, field: keyof SaveItemOptionValue, val: string | number) => {
    setGroups((prev) =>
      prev.map((g, i) =>
        i === gi
          ? { ...g, values: g.values.map((v, j) => (j === vi ? { ...v, [field]: val } : v)) }
          : g,
      ),
    );
  };

  // ── 제출 ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.itemName.trim()) { setError('상품명을 입력해주세요.'); return; }
    if (!form.price) { setError('가격을 입력해주세요.'); return; }
    if (!form.salePrice) { setError('판매가를 입력해주세요.'); return; }

    const payload: SaveItemPayload = {
      categoryId: form.categoryId,
      itemName: form.itemName,
      description: form.description,
      price: Number(form.price),
      status: form.status,
      policyType: form.policyType,
      salePrice: Number(form.salePrice),
      saleStartAt: form.saleStartAt || new Date().toISOString(),
      saleEndAt: form.saleEndAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      groups,
    };

    setLoading(true);
    setError('');
    try {
      await axios.post('/admin/v1/item', payload);
      navigate('/admin/items');
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : '상품 등록에 실패했습니다. 서버 연결을 확인해주세요.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/items" className="text-gray-400 hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">상품 등록</h1>
          <p className="text-sm text-gray-400 mt-0.5">POST /admin/v1/item</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left: 기본 정보 */}
          <div className="xl:col-span-2 space-y-6">

            {/* 기본 정보 */}
            <section className="bg-white border border-gray-200 rounded p-6 space-y-5">
              <h2 className="text-sm font-semibold">기본 정보</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>상품명 *</label>
                  <input
                    type="text"
                    value={form.itemName}
                    onChange={(e) => setForm((p) => ({ ...p, itemName: e.target.value }))}
                    placeholder="최소 2자 이상"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>카테고리 *</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm((p) => ({ ...p, categoryId: Number(e.target.value) }))}
                    className={inputClass}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>상태 *</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as SaveItemPayload['status'] }))}
                    className={inputClass}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>상품 설명</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    rows={4}
                    placeholder="상품에 대한 설명을 입력하세요"
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </section>

            {/* 판매 정책 */}
            <section className="bg-white border border-gray-200 rounded p-6 space-y-5">
              <h2 className="text-sm font-semibold">판매 정책</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>정가 *</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                      placeholder="0"
                      min={0}
                      className={`${inputClass} pr-8`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">원</span>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>판매가 *</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.salePrice}
                      onChange={(e) => setForm((p) => ({ ...p, salePrice: e.target.value }))}
                      placeholder="0"
                      min={0}
                      className={`${inputClass} pr-8`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">원</span>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>판매 정책 *</label>
                  <select
                    value={form.policyType}
                    onChange={(e) => setForm((p) => ({ ...p, policyType: e.target.value as SaveItemPayload['policyType'] }))}
                    className={inputClass}
                  >
                    {POLICY_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>판매 시작일시</label>
                    <input
                      type="datetime-local"
                      value={form.saleStartAt}
                      onChange={(e) => setForm((p) => ({ ...p, saleStartAt: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>판매 종료일시</label>
                    <input
                      type="datetime-local"
                      value={form.saleEndAt}
                      onChange={(e) => setForm((p) => ({ ...p, saleEndAt: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 옵션 그룹 */}
            <section className="bg-white border border-gray-200 rounded p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">옵션 그룹</h2>
                <button
                  type="button"
                  onClick={addGroup}
                  className="flex items-center gap-1.5 text-xs text-black border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  그룹 추가
                </button>
              </div>

              {groups.length === 0 && (
                <p className="text-sm text-gray-400 py-4 text-center">
                  옵션 그룹을 추가하세요 (예: 색상, 사이즈)
                </p>
              )}

              {groups.map((group, gi) => (
                <div key={gi} className="border border-gray-100 rounded p-4 space-y-3 bg-gray-50">
                  {/* Group header */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={group.groupName}
                      onChange={(e) => updateGroupName(gi, e.target.value)}
                      placeholder="그룹명 (예: COLOR, SIZE)"
                      className="flex-1 border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeGroup(gi)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>

                  {/* Values */}
                  <div className="space-y-2 pl-2">
                    {group.values.map((val, vi) => (
                      <div key={vi} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={val.valueName}
                          onChange={(e) => updateValue(gi, vi, 'valueName', e.target.value)}
                          placeholder="옵션값 (예: Black, M)"
                          className="flex-1 border border-gray-200 bg-white px-3 py-1.5 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                        <div className="relative w-28">
                          <input
                            type="number"
                            value={val.additionalPrice}
                            onChange={(e) => updateValue(gi, vi, 'additionalPrice', Number(e.target.value))}
                            placeholder="0"
                            min={0}
                            className="w-full border border-gray-200 bg-white px-3 py-1.5 pr-7 text-sm focus:outline-none focus:border-black transition-colors"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">원</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeValue(gi, vi)}
                          className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addValue(gi)}
                      className="text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1 mt-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      옵션값 추가
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right: 제출 */}
          <div className="space-y-4">
            <section className="bg-white border border-gray-200 rounded p-6 space-y-4">
              <h2 className="text-sm font-semibold">등록 요약</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>상품명</span>
                  <span className="text-black truncate max-w-[120px]">{form.itemName || '—'}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>정가</span>
                  <span className="text-black">{form.price ? `${Number(form.price).toLocaleString()}원` : '—'}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>판매가</span>
                  <span className="text-black">{form.salePrice ? `${Number(form.salePrice).toLocaleString()}원` : '—'}</span>
                </div>
                {form.price && form.salePrice && Number(form.price) > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>할인율</span>
                    <span className="text-red-500 font-medium">
                      {Math.round((1 - Number(form.salePrice) / Number(form.price)) * 100)}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>옵션 그룹</span>
                  <span className="text-black">{groups.length}개</span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '등록 중...' : '상품 등록'}
              </button>

              <Link
                to="/admin/items"
                className="block w-full text-center border border-gray-200 text-gray-500 py-3 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors"
              >
                취소
              </Link>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}
