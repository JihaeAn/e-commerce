import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Field = ({
  label, name, type = 'text', value, onChange, placeholder, error, autoComplete,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string; autoComplete?: string;
}) => (
  <div>
    <label className="block text-[10px] tracking-[0.22em] uppercase text-warm-400 mb-2">{label}</label>
    <input
      type={type}
      name={name}
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
    if (!form.email || !form.password) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const name = form.email.split('@')[0];
    login({ name, email: form.email });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1200&fit=crop&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-900/40" />
        <div className="absolute bottom-14 left-14">
          <p className="font-display text-4xl font-medium italic text-parchment-50 leading-tight">
            Welcome<br/>back.
          </p>
        </div>
        <Link to="/" className="absolute top-8 left-8 font-display text-xl font-semibold tracking-[0.15em] uppercase text-parchment-50">
          Surface
        </Link>
      </div>

      {/* Right — form */}
      <div className="bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16">
        <Link to="/" className="lg:hidden font-display text-xl font-semibold tracking-[0.15em] uppercase text-warm-900 mb-14 self-start">
          Surface
        </Link>

        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h1 className="font-display text-3xl font-medium text-warm-900 mb-1">Sign in</h1>
          <p className="text-sm text-warm-400 mb-10">Your SURFACE account</p>

          <form onSubmit={submit} className="space-y-7">
            <Field label="Email" name="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" />
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] tracking-[0.22em] uppercase text-warm-400">Password</label>
                <a href="#" className="text-[11px] text-warm-400 hover:text-warm-700 transition-colors">비밀번호 찾기</a>
              </div>
              <input
                type="password"
                value={form.password}
                onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setError(''); }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-parchment-300 focus:border-warm-900 py-2.5 text-sm text-warm-900 outline-none transition-colors placeholder:text-warm-300"
              />
            </div>

            {error && <p className="text-[11px] text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-warm-900 text-parchment-50 py-4 text-xs tracking-widest uppercase hover:bg-warm-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-parchment-300" />
            <span className="text-[10px] tracking-widest uppercase text-warm-400">or</span>
            <div className="flex-1 h-px bg-parchment-300" />
          </div>

          <p className="text-center text-sm text-warm-500">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-warm-900 font-medium hover:text-amber transition-colors underline underline-offset-2">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
