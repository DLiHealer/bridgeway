import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Plus, X, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext.jsx';
import { Button } from '../ui';
import { cx } from '../ui';

const NAV = [
  { to: '/mapa', key: 'map' },
  { to: '/pomysly', key: 'ideas' },
  { to: '/rozwiazania', key: 'solutions' },
  { to: '/eksperci', key: 'experts' },
  { to: '/finansowanie', key: 'funding' },
  { to: '/projekty', key: 'projects' },
];

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const lng = i18n.language?.startsWith('en') ? 'en' : 'pl';
  return (
    <div className="flex items-center rounded-full border border-border bg-white p-0.5 text-xs">
      {['pl', 'en'].map((l) => (
        <button key={l} onClick={() => i18n.changeLanguage(l)}
          className={cx('rounded-full px-2.5 py-1 font-medium uppercase transition', lng === l ? 'bg-brand-primary text-white' : 'text-neutral-400 hover:text-neutral-900')}>
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { user } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (
    <nav className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
      {NAV.map(item => (
        <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
          className={({ isActive }) => cx('rounded-btn px-3 py-2.5 text-sm font-medium transition lg:py-2', isActive ? 'text-brand-primary bg-brand-primary/5' : 'text-neutral-700 hover:bg-neutral-100')}>
          {t('nav.' + item.key)}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded-btn focus:bg-brand-primary focus:px-3 focus:py-2 focus:text-white">Przejdź do treści</a>
      <header className={cx('sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur transition-shadow', scrolled && 'shadow-sm')}>
        <div className="container-app flex h-14 items-center justify-between gap-3 lg:h-16">
          <div className="flex items-center gap-2 min-w-0">
            <button className="rounded-btn p-2 lg:hidden flex-none" aria-label="Menu" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <img src="/favicon.svg" alt="" className="h-6 w-6 flex-none md:h-7 md:w-7" />
              <span className="text-sm font-bold text-neutral-900 truncate md:text-base">BridgeWay</span>
            </Link>
          </div>

          <div className="hidden lg:flex">{nav}</div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden lg:block">
              <LanguageSwitch />
            </div>


            <Button size="sm" onClick={() => navigate('/zglos')} className="hidden sm:inline-flex">
              <Plus size={16} /> {t('nav.add')}
            </Button>
            <button onClick={() => navigate('/zglos')} className="rounded-btn p-2 hover:bg-neutral-100 sm:hidden" aria-label={t('nav.add')}><Plus size={20} /></button>

            <div className="relative hidden lg:block">
              <button onClick={() => setAvatarOpen(o => !o)} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
                <User size={16} />
              </button>
              {avatarOpen && (
                <div onMouseLeave={() => setAvatarOpen(false)} className="absolute right-0 mt-2 w-52 rounded-card border border-border bg-white py-2 shadow-md">
                  <div className="px-3 py-2 text-xs text-neutral-400">{user.name} · {user.role}</div>
                  <Link to="/profil" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">{t('nav.profile')}</Link>
                  <Link to="/profil?tab=signals" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">Moje sygnały</Link>
                  <Link to="/profil?tab=ideas" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">Moje pomysły</Link>
                  <Link to="/profil?tab=projects" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">Moje projekty</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-neutral-900/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">BridgeWay</span>
              <button onClick={() => setMenuOpen(false)} className="rounded-full p-2 hover:bg-neutral-100" aria-label="Zamknij"><X size={18} /></button>
            </div>

            {nav}

            <div className="mt-auto border-t border-border pt-4">
              {/* Профиль-карточка */}
              <Link to="/profil" onClick={() => setMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-btn bg-neutral-100 p-3 hover:bg-neutral-200">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white">
                  {user.name?.[0] || 'G'}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-neutral-400">{user.role} · {user.city}</p>
                </div>
              </Link>

              {/* Ссылки профиля */}
              <nav className="flex flex-col gap-1">
                <Link to="/profil" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  Profil
                </Link>
                <Link to="/profil?tab=signals" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  Moje sygnały
                </Link>
                <Link to="/profil?tab=ideas" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  Moje pomysły
                </Link>
                <Link to="/profil?tab=projects" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  Moje projekty
                </Link>
              </nav>

              {/* Переключатель языка */}
              <div className="mt-3">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}