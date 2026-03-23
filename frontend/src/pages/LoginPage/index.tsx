import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('아이디와 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const name = form.email.split('@')[0];
    login({ name, email: form.email });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
        <Link to="/" className="text-[11px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
          홈
        </Link>
        <Link to="/" className="text-[22px] font-bold tracking-[0.18em] uppercase text-black">
          Musinsa
        </Link>
        <Link to="/signup" className="text-[11px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
          회원가입
        </Link>
      </header>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[400px]">

          <h1 className="text-[13px] font-bold tracking-[0.3em] uppercase text-black text-center mb-10">
            로그인
          </h1>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email')(e.target.value)}
              placeholder="이메일 주소"
              autoComplete="email"
              className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-[13px] text-black placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition-colors"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => set('password')(e.target.value)}
              placeholder="비밀번호"
              autoComplete="current-password"
              className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-[13px] text-black placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition-colors"
            />

            {error && (
              <p className="text-[12px] text-red-500 pt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* Links */}
          <div className="flex items-center justify-center gap-5 mt-5">
            <a href="#" className="text-[11px] text-neutral-400 hover:text-black transition-colors">
              아이디 찾기
            </a>
            <span className="w-px h-3 bg-neutral-200" />
            <a href="#" className="text-[11px] text-neutral-400 hover:text-black transition-colors">
              비밀번호 찾기
            </a>
            <span className="w-px h-3 bg-neutral-200" />
            <Link to="/signup" className="text-[11px] text-neutral-400 hover:text-black transition-colors">
              회원가입
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-300">SNS 로그인</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-neutral-200 py-3 text-[12px] text-neutral-600 hover:border-neutral-400 hover:text-black transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
              </svg>
              Facebook
            </button>
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-neutral-200 py-3 text-[12px] text-neutral-600 hover:border-neutral-400 hover:text-black transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.19 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill="currentColor"/>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-neutral-200 py-3 text-[12px] text-neutral-600 hover:border-neutral-400 hover:text-black transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 6.58 3 11C3 13.64 4.36 16 6.58 17.5L5.5 21L9.28 18.88C10.14 19.11 11.06 19.25 12 19.25C16.97 19.25 21 15.67 21 11.25C21 6.83 16.97 3 12 3ZM16.07 13.5L14.62 12.31L12.12 14L9.44 12.31L7.93 13.5L10.12 11.19L7.93 9L9.44 10.19L11.94 8.5L14.44 10.19L15.99 9L13.75 11.19L16.07 13.5Z" fill="#FEE500"/>
              </svg>
              Kakao
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}