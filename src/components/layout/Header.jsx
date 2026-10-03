import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Plus, X, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../ui';
import { cx } from '../ui';

const NAV = [
  { to: '/rozwiazania', key: 'solutions' },
  { to: '/mapa', key: 'map' },
  { to: '/projekty', key: 'projects' },
  { to: '/zgloszenia', key: 'reports' },
  { to: '/eksperci', key: 'experts' },
  { to: '/finansowanie', key: 'funding' },
  { to: '/pomysly', key: 'ideas' },
];

function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language?.startsWith('en') ? 'en' : 'pl';
  return (
    <div role="group" aria-label={t('a11y.language')} className="flex items-center rounded-full border border-border bg-white p-0.5 text-xs">
      {['pl', 'en'].map((l) => (
        <button key={l} lang={l} aria-pressed={lng === l} onClick={() => i18n.changeLanguage(l)}
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
  const { backend, account, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen && !avatarOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setAvatarOpen(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, avatarOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (
    <nav aria-label={t('a11y.mainNav')} className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
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
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded-btn focus:bg-brand-primary focus:px-3 focus:py-2 focus:text-white">{t('a11y.skip')}</a>
      <header className={cx('sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur transition-shadow', scrolled && 'shadow-sm')}>
        <div className="container-app flex min-h-14 items-center justify-between gap-3 py-1 lg:min-h-16">
          <div className="flex items-center gap-2 min-w-0">
            <button className="rounded-btn p-2 lg:hidden flex-none" aria-label={t('a11y.menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={20} aria-hidden="true" /></button>
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
              <Plus size={16} aria-hidden="true" /> {t('nav.add')}
            </Button>
            <button onClick={() => navigate('/zglos')} className="rounded-btn p-2 hover:bg-neutral-100 sm:hidden" aria-label={t('nav.add')}><Plus size={20} aria-hidden="true" /></button>

            <div className="relative hidden lg:block">
              <button onClick={() => setAvatarOpen(o => !o)} aria-label={t('a11y.account')} aria-haspopup="true" aria-expanded={avatarOpen} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
                <User size={16} aria-hidden="true" />
              </button>
              {avatarOpen && (
                <div onMouseLeave={() => setAvatarOpen(false)} className="absolute right-0 mt-2 w-52 rounded-card border border-border bg-white py-2 shadow-md">
                  <div className="px-3 py-2 text-xs text-neutral-400">{user.name} · {user.role}</div>
                  {backend && (account
                    ? <button onClick={() => { setAvatarOpen(false); logout(); }} className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-100">{t('nav.logout')} ({account.email})</button>
                    : <Link to="/logowanie" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">{t('nav.login')}</Link>)}
                  <Link to="/profil" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">{t('nav.profile')}</Link>
                  <Link to="/profil?tab=signals" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">{t('nav.mySignals')}</Link>
                  <Link to="/profil?tab=ideas" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">{t('nav.myIdeas')}</Link>
                  <Link to="/profil?tab=projects" onClick={() => setAvatarOpen(false)} className="block px-3 py-2 text-sm hover:bg-neutral-100">{t('nav.myProjects')}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t('a11y.menu')}>
          <div className="absolute inset-0 bg-neutral-900/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">BridgeWay</span>
              <button autoFocus onClick={() => setMenuOpen(false)} className="rounded-full p-2 hover:bg-neutral-100" aria-label={t('a11y.close')}><X size={18} aria-hidden="true" /></button>
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
              <nav aria-label={t('a11y.profileNav')} className="flex flex-col gap-1">
                {backend && (account
                  ? <button onClick={() => { setMenuOpen(false); logout(); }} className="rounded-btn px-3 py-2.5 text-left text-sm font-medium hover:bg-neutral-100">{t('nav.logout')} ({account.email})</button>
                  : <Link to="/logowanie" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">{t('nav.login')}</Link>)}
                <Link to="/profil" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  {t('nav.profile')}
                </Link>
                <Link to="/profil?tab=signals" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  {t('nav.mySignals')}
                </Link>
                <Link to="/profil?tab=ideas" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  {t('nav.myIdeas')}
                </Link>
                <Link to="/profil?tab=projects" onClick={() => setMenuOpen(false)} className="rounded-btn px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  {t('nav.myProjects')}
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