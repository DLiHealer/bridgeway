import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const SUFFIX = 'BridgeWay';

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const first = useRef(true);

  // Route change: title from the page <h1> and focus to <main> (screen-reader / keyboard users land on new content).
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const id = setTimeout(() => {
      const h1 = mainRef.current?.querySelector('h1')?.textContent?.trim();
      if (h1) document.title = `${h1} — ${SUFFIX}`;
      mainRef.current?.focus({ preventScroll: true });
    }, 150);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
