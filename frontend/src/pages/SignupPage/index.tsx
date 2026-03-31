import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Form { name: string; email: string; password: string; confirm: string; agreed: boolean; marketing: boolean; }
interface Errs { name?: string; email?: string; password?: string; confirm?: string; agreed?: string; }

function validate(f: Form): Errs {
  const e: Errs = {};
  if (!f.name.trim())             e.name     = '이름을 입력해주세요.';
  if (!f.email)                   e.email    = '이메일을 입력해주세요.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = '유효한 이메일을 입력해주세요.';
  if (!f.password)                e.password = '비밀번호를 입력해주세요.';
  else if (f.password.length < 8) e.password = '8자 이상이어야 합니다.';
  if (f.password !== f.confirm)   e.confirm  = '비밀번호가 일치하지 않습니다.';
  if (!f.agreed)                  e.agreed   = '이용약관에 동의해주세요.';
  return e;
}

function InputField({
  placeholder, type = 'text', value, onChange, error, autoComplete,
}: {
  placeholder: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; autoComplete?: string;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={[
          'w-full border bg-neutral-50 px-4 py-3.5 text-[13px] text-black placeholder:text-neutral-400 outline-none focus:bg-white transition-colors',
          error ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-black',
        ].join(' ')}
      />
      {error && <p className="mt-1.5 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<Form>({ name: '', email: '', password: '', confirm: '', agreed: false, marketing: false });
  const [errors, setErrors] = useState<Errs>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Form) => (v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login({ name: form.name, email: form.email });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
        <Link to="/login" className="text-[13px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
          로그인
        </Link>
        <Link to="/" className="text-[22px] font-bold tracking-[0.18em] uppercase text-black">
          Musinsa
        </Link>
        <span className="w-[40px]" />
      </header>

      {/* Body */}
      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">

          <h1 className="text-[19px] font-bold tracking-[0.3em] uppercase text-black text-center mb-10">
            회원가입
          </h1>

          <form onSubmit={submit} className="space-y-3">
            <InputField
              placeholder="이름"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              autoComplete="name"
            />
            <InputField
              placeholder="이메일 주소"
              type="email"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />
            <InputField
              placeholder="비밀번호 (8자 이상)"
              type="password"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              autoComplete="new-password"
            />
            <InputField
              placeholder="비밀번호 확인"
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              error={errors.confirm}
              autoComplete="new-password"
            />

            {/* 약관 동의 */}
            <div className="pt-3 space-y-3 border-t border-neutral-100">
              {/* 전체 동의 */}
              <label className="flex items-center gap-3 cursor-pointer py-3 border border-neutral-200 px-4 hover:border-neutral-400 transition-colors">
                <input
                  type="checkbox"
                  checked={form.agreed && form.marketing}
                  onChange={(e) => {
                    set('agreed')(e.target.checked);
                    set('marketing')(e.target.checked);
                  }}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-[13px] font-medium text-black">전체 동의</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer px-1">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => set('agreed')(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-[12px] text-neutral-500">
                  <a href="#" className="text-black underline underline-offset-2 hover:opacity-60 transition-opacity">이용약관</a>
                  {' '}및{' '}
                  <a href="#" className="text-black underline underline-offset-2 hover:opacity-60 transition-opacity">개인정보처리방침</a>
                  {' '}동의 (필수)
                </span>
              </label>
              {errors.agreed && <p className="text-[11px] text-red-500 pl-1">{errors.agreed}</p>}

              <label className="flex items-center gap-3 cursor-pointer px-1">
                <input
                  type="checkbox"
                  checked={form.marketing}
                  onChange={(e) => set('marketing')(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-[12px] text-neutral-500">마케팅 정보 수신 동의 (선택)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-[14px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            >
              {loading ? '가입 중...' : '가입하기'}
            </button>
          </form>

          <p className="mt-6 text-center text-[12px] text-neutral-400">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-black font-medium underline underline-offset-2 hover:opacity-60 transition-opacity">
              로그인
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}