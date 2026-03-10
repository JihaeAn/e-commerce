import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const POPULAR = ['오버사이즈 블레이저', '와이드 팬츠', '니트 터틀넥', '슬립 드레스', '캔버스 토트백'];
const TRENDING = [
  { rank: 1, keyword: '코쿤 코트', up: true },
  { rank: 2, keyword: '리넨 셔츠', up: true },
  { rank: 3, keyword: '스트레이트 데님', up: false },
  { rank: 4, keyword: '레더 벨트', up: true },
  { rank: 5, keyword: '미니멀 머플러', up: false },
];

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
    else setQuery('');
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const go = (kw: string) => {
    if (!kw.trim()) return;
    onClose();
    navigate(`/?search=${encodeURIComponent(kw.trim())}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          'fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px] transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={[
          'fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg overflow-hidden',
          'transition-all duration-200',
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); go(query); }}
            className="flex items-center gap-4 border-b border-black pb-3 mb-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="상품, 카테고리, 브랜드 검색"
              className="flex-1 bg-transparent text-base text-black outline-none placeholder:text-gray-300"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-gray-300 hover:text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {/* Popular */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-4">인기 검색어</p>
              <ul>
                {POPULAR.map((kw, i) => (
                  <li key={kw}>
                    <button
                      onClick={() => go(kw)}
                      className="w-full flex items-center gap-4 py-2.5 text-sm text-left text-gray-600 hover:text-black transition-colors group border-b border-gray-100 last:border-0"
                    >
                      <span className="w-4 text-[10px] text-gray-300">{i + 1}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">{kw}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-4">급상승 검색어</p>
              <ul>
                {TRENDING.map((item) => (
                  <li key={item.keyword}>
                    <button
                      onClick={() => go(item.keyword)}
                      className="w-full flex items-center gap-4 py-2.5 text-sm text-left text-gray-600 hover:text-black transition-colors group border-b border-gray-100 last:border-0"
                    >
                      <span className="w-4 text-[10px] text-gray-300">{item.rank}</span>
                      <span className="flex-1 group-hover:translate-x-0.5 transition-transform duration-150">{item.keyword}</span>
                      <span className={`text-[9px] font-semibold tracking-wide ${item.up ? 'text-red-500' : 'text-gray-300'}`}>
                        {item.up ? '▲' : '—'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
