import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Form { name: string; email: string; password: string; confirm: string; agreed: boolean; }
interface Errs { name?: string; email?: string; password?: string; confirm?: string; agreed?: string; }

function validate(f: Form): Errs {
  const e: Errs = {};
  if (!f.name.trim())         e.name     = '이름을 입력해주세요.';
  if (!f.email)               e.email    = '이메일을 입력해주세요.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = '유효한 이메일을 입력해주세요.';
  if (!f.password)            e.password = '비밀번호를 입력해주세요.';
  else if (f.password.length < 8) e.password = '8자 이상이어야 합니다.';
  if (f.password !== f.confirm) e.confirm = '비밀번호가 일치하지 않습니다.';
  if (!f.agreed)              e.agreed   = '이용약관에 동의해주세요.';
  return e;
}

const Field = ({ label, type = 'text', value, onChange, placeholder, error, autoComplete }:
  { label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; error?: string; autoComplete?: string; }) => (
  <div>
    <label className="block text-[10px] tracking-[0.22em] uppercase text-warm-400 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={[
        'w-full bg-transparent border-b py-2.5 text-sm text-warm-900 outline-none transition-colors placeholder:text-warm-300',
        error ? 'border-red-400' : 'border-parchment-300 focus:border-warm-900',
      ].join(' ')}
    />
    {error && <p className="mt-1.5 text-[11px] text-red-400">{error}</p>}
  </div>
);

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<Form>({ name: '', email: '', password: '', confirm: '', agreed: false });
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1200&fit=crop&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-900/35" />
        <div className="absolute bottom-14 left-14">
          <p className="font-display text-4xl font-medium italic text-parchment-50 leading-tight">
            Join the<br/>Community.
          </p>
        </div>
        <Link to="/" className="absolute top-8 left-8 font-display text-xl font-semibold tracking-[0.15em] uppercase text-parchment-50">
          Surface
        </Link>
      </div>

      {/* Right — form */}
      <div className="bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 overflow-y-auto">
        <Link to="/" className="lg:hidden font-display text-xl font-semibold tracking-[0.15em] uppercase text-warm-900 mb-14 self-start">
          Surface
        </Link>

        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h1 className="font-display text-3xl font-medium text-warm-900 mb-1">Create account</h1>
          <p className="text-sm text-warm-400 mb-10">SURFACE 멤버가 되어보세요</p>

          <form onSubmit={submit} className="space-y-6">
            <Field label="이름" value={form.name} onChange={set('name')} placeholder="홍길동" error={errors.name} autoComplete="name" />
            <Field label="이메일" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" error={errors.email} autoComplete="email" />
            <Field label="비밀번호" type="password" value={form.password} onChange={set('password')} placeholder="8자 이상" error={errors.password} autoComplete="new-password" />
            <Field label="비밀번호 확인" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" error={errors.confirm} autoComplete="new-password" />

            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={(e) => set('agreed')(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-warm-900"
              />
              <span className="text-xs text-warm-500 leading-relaxed">
                <a href="#" className="text-warm-800 underline underline-offset-2 hover:text-amber transition-colors">이용약관</a>
                {' '}및{' '}
                <a href="#" className="text-warm-800 underline underline-offset-2 hover:text-amber transition-colors">개인정보처리방침</a>
                에 동의합니다.
              </span>
            </label>
            {errors.agreed && <p className="text-[11px] text-red-400 -mt-4">{errors.agreed}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-warm-900 text-parchment-50 py-4 text-xs tracking-widest uppercase hover:bg-warm-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : '가입하기'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-warm-500">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-warm-900 font-medium hover:text-amber transition-colors underline underline-offset-2">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
