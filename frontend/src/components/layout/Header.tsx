import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { label: 'NEW IN', to: '/' },
  { label: 'OUTER', to: '/?category=OUTER' },
  { label: 'TOPS', to: '/?category=TOPS' },
  { label: 'BOTTOMS', to: '/?category=BOTTOMS' },
  { label: 'BAGS', to: '/?category=BAGS' },
  { label: 'SALE', to: '/?sale=true', red: true },
];

export default function Header() {
  const { totalCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-[0.3em] uppercase select-none">
            MUSINSA
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'text-xs tracking-widest uppercase transition-colors',
                    link.red ? 'text-red-500 hover:text-red-600' : '',
                    !link.red && isActive ? 'text-black border-b border-black pb-0.5' : '',
                    !link.red && !isActive ? 'text-gray-500 hover:text-black' : '',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="text-gray-700 hover:text-black transition-colors"
              aria-label="Search"
            >
              {searchOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => navigate(user ? '/mypage' : '/login')}
              className="text-gray-700 hover:text-black transition-colors relative"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              {user && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full" />
              )}
            </button>

            {/* Bag */}
            <button
              onClick={() => navigate('/cart')}
              className="text-gray-700 hover:text-black transition-colors relative"
              aria-label="Shopping bag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
