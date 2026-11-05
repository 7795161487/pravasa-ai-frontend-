import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = [
  { path: '/', key: 'nav_home', defaultLabel: 'Home' },
  { path: '/explore', key: 'nav_explore', defaultLabel: 'Explore' },
  { path: '/gems', key: 'nav_gems', defaultLabel: 'Hidden Gems' },
  { path: '/adventure-roads', key: 'nav_adventure', defaultLabel: 'Adventure Roads' },
  { path: '/family-travel', key: 'nav_family', defaultLabel: 'Family Travel' },
  { path: '/plan', key: 'nav_plan', defaultLabel: 'Trip Planner' },
  { path: '/saved-trips', key: 'nav_saved', defaultLabel: 'Saved Trips' },
  { path: '/smart-map', key: 'nav_map', defaultLabel: 'Smart Map', icon: '🗺' },
  { path: '/budget-calculator', key: 'nav_budget', defaultLabel: 'Budget' },
  { path: '/crowd', key: 'nav_crowd', defaultLabel: 'Crowd Status' },
];

export default function Navbar() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, isKannada, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pravasa_user');
      if (stored) setUser(JSON.parse(stored));
    } catch { }
    // Listen for storage changes (login/logout in other tabs)
    const onStorage = () => {
      try {
        const stored = localStorage.getItem('pravasa_user');
        setUser(stored ? JSON.parse(stored) : null);
      } catch { setUser(null); }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [loc.pathname]); // re-check on route change (after login redirect)

  const handleLogout = () => {
    localStorage.removeItem('pravasa_token');
    localStorage.removeItem('pravasa_user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a3d2e] shadow-lg">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center gap-2.5 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-1 flex-shrink-0">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-black text-[#1a3d2e] text-base shadow-sm">
              P
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm leading-none">{t('brand_title', 'Pravasa AI')}</div>
              <div className="text-white/60 text-[10px] leading-none mt-0.5">{t('brand_subtitle', 'Karnataka Tourism AI')}</div>
            </div>
          </Link>

          {/* Quick Search in Navbar */}
          <div className="hidden xl:flex items-center bg-white/10 rounded-lg px-2.5 py-1.5 gap-2 w-48 focus-within:bg-white/20 transition-all">
            <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate(`/explore?q=${encodeURIComponent(searchVal)}`)}
              placeholder={t('nav_search_placeholder', 'Search district, taluk, city...')}
              className="bg-transparent text-white placeholder-white/40 text-xs outline-none w-full"
            />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-2 overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map(l => (
              <Link
                key={l.path}
                to={l.path}
                className={`px-2.5 py-2 text-xs font-medium rounded transition-all duration-150 whitespace-nowrap ${loc.pathname === l.path
                    ? 'text-white border-b-2 border-white rounded-none pb-1.5 font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                {l.icon && <span className="mr-1">{l.icon}</span>}
                {t(l.key, l.defaultLabel)}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all shadow-sm"
              title={isKannada ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}
            >
              <span className="text-sm">🌐</span>
              <span className="font-bold">{isKannada ? 'English' : 'ಕನ್ನಡ'}</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded font-black tracking-wider">
                {isKannada ? 'KN' : 'EN'}
              </span>
            </button>

            <Link to="/sos" className="sos-btn hidden sm:block">
              {t('nav_sos', 'SOS 112')}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 text-white/90 text-xs">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                    {(user.name || user.email || '?')[0].toUpperCase()}
                  </div>
                  <span className="font-medium max-w-[80px] truncate">{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/15 border border-white/20 text-white font-medium text-xs px-2.5 py-1.5 rounded-lg hover:bg-white/25 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-white text-[#1a3d2e] font-semibold text-xs px-3.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                {t('nav_signin', 'Sign In')}
              </Link>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-1.5 rounded hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#163528] px-4 py-3 space-y-2">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2.5">
            <span className="text-white text-xs font-medium">ಭಾಷೆ / Language:</span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="bg-white text-[#1a3d2e] font-bold text-xs px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm"
            >
              <span>🌐</span>
              <span>{isKannada ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}</span>
            </button>
          </div>

          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 mb-2">
            <span className="text-white/50 text-xs mr-2">🔍</span>
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setMobileOpen(false);
                  navigate(`/explore?q=${encodeURIComponent(searchVal)}`);
                }
              }}
              placeholder={t('nav_search_placeholder', 'Search Karnataka destination...')}
              className="bg-transparent text-white placeholder-white/40 text-sm outline-none flex-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-1 pb-2">
            {NAV_ITEMS.map(l => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-3 py-2 rounded text-xs font-medium ${loc.pathname === l.path
                    ? 'text-white bg-white/15 font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                {l.icon && <span className="mr-1.5">{l.icon}</span>}
                {t(l.key, l.defaultLabel)}
              </Link>
            ))}
          </div>

          <Link
            to="/sos"
            onClick={() => setMobileOpen(false)}
            className="block text-center sos-btn py-2 text-xs"
          >
            🆘 {t('nav_sos', 'Emergency SOS 112')}
          </Link>

          {user ? (
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-2.5 mt-2">
              <span className="text-white text-xs font-medium truncate max-w-[180px]">
                👤 {user.name || user.email}
              </span>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded hover:bg-white/30"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-white text-[#1a3d2e] font-semibold text-xs py-2 rounded-lg mt-2 hover:bg-gray-100"
            >
              {t('nav_signin', 'Sign In')}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
