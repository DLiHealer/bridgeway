import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { api } from '../api.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import * as data from '../data';

const AppContext = createContext(null);

const GUEST = { name: 'Gość', role: 'Mieszkaniec', email: 'gosc@example.com', city: 'Warszawa' };
const SLICES = ['signals', 'ideas', 'projects', 'saved'];
const SEEDS = { signals: data.signals, ideas: data.ideas, projects: data.projects, saved: [] };

export function AppProvider({ children }) {
  // Guest data: per browser (localStorage). Logged in: the same slices live in D1 per account (`acct`), never in localStorage.
  const [guestUser, setGuestUser] = useLocalStorage('bridgeart-user', GUEST);
  const [gSignals, setGSignals] = useLocalStorage('bridgeart-signals', data.signals);
  const [gIdeas, setGIdeas] = useLocalStorage('bridgeart-ideas', data.ideas);
  const [gProjects, setGProjects] = useLocalStorage('bridgeart-projects', data.projects);
  const [gSaved, setGSaved] = useLocalStorage('bridgeart-saved', []);
  const [filters, setFiltersState] = useLocalStorage('bridgeart-filters', { type: 'all', categories: [], city: '', urgency: 'all', q: '' });
  const [toasts, setToasts] = useLocalStorage('bridgeart-toasts-placeholder', []);

  const { account } = useAuth();
  const email = account?.email || null;
  const [acct, setAcct] = useState(null); // { email, user, signals, ideas, projects, saved } of the logged-in account
  const lastSaved = useRef({});
  const cur = email && acct?.email === email ? acct : null;

  // Account change (login / logout / switch): drop the previous account's state, then load this account's profile and data from the server.
  useEffect(() => {
    setAcct(null);
    if (!email) return;
    let dead = false;
    Promise.all([api.profile(), api.userData()]).then(([{ profile }, { slices }]) => {
      if (dead) return;
      const next = {
        email,
        user: { email, name: profile?.name || email.split('@')[0], role: profile?.roleLabel || 'Mieszkaniec', city: profile?.city || '', bio: profile?.bio || '' },
      };
      lastSaved.current = {};
      for (const k of SLICES) {
        next[k] = Array.isArray(slices[k]) ? slices[k] : SEEDS[k];
        lastSaved.current[k] = JSON.stringify(next[k]);
      }
      setAcct(next);
    }).catch(() => {});
    return () => { dead = true; };
  }, [email]);

  // Save changed slices of the logged-in account (debounced).
  useEffect(() => {
    if (!cur) return;
    const t = setTimeout(() => {
      for (const k of SLICES) {
        const text = JSON.stringify(cur[k]);
        if (text === lastSaved.current[k]) continue;
        lastSaved.current[k] = text;
        api.saveUserData(k, cur[k]).catch(() => { lastSaved.current[k] = null; });
      }
    }, 500);
    return () => clearTimeout(t);
  }, [cur?.signals, cur?.ideas, cur?.projects, cur?.saved]);

  const mk = (k, guestSet) => (v) => {
    if (!email) return guestSet(v);
    setAcct(a => (a && a.email === email ? { ...a, [k]: typeof v === 'function' ? v(a[k]) : v } : a));
  };
  const user = email ? (cur?.user || { email, name: email.split('@')[0], role: 'Mieszkaniec', city: '', bio: '' }) : guestUser;
  const setUser = (v) => {
    if (!email) return setGuestUser(v);
    setAcct(a => (a && a.email === email ? { ...a, user: typeof v === 'function' ? v(a.user) : v } : a));
  };
  const signals = email ? (cur?.signals ?? SEEDS.signals) : gSignals;
  const ideas = email ? (cur?.ideas ?? SEEDS.ideas) : gIdeas;
  const projects = email ? (cur?.projects ?? SEEDS.projects) : gProjects;
  const saved = email ? (cur?.saved ?? SEEDS.saved) : gSaved;
  const setSignals = mk('signals', setGSignals), setIdeas = mk('ideas', setGIdeas), setProjects = mk('projects', setGProjects), setSaved = mk('saved', setGSaved);

  const value = useMemo(() => ({
    user, setUser,
    signals, setSignals,
    ideas, setIdeas,
    projects, setProjects,
    saved,
    saveItem: (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]),
    isSaved: (id) => saved.includes(id),
    filters, setFilters: (patch) => setFiltersState(f => ({ ...f, ...patch })),
    clearFilters: () => setFiltersState({ type: 'all', categories: [], city: '', urgency: 'all', q: '' }),
    addSignal: (s) => setSignals(list => [{ ...s, id: 's' + Date.now(), createdAt: new Date().toISOString().slice(0,10), author: user.name }, ...list]),
    addIdea: (i) => setIdeas(list => [{ ...i, id: 'i' + Date.now(), createdAt: new Date().toISOString().slice(0,10), author: user.name, team: [{ name: user.name, role: 'lider' }], teamSize: 1, teamTarget: 5 }, ...list]),
    addProject: (p) => {
      const project = { responsibleBody: null, statusHistory: [{ status: 'received', date: new Date().toISOString().slice(0, 10), note: '' }], ...p, id: 'p' + Date.now() };
      setProjects(list => [project, ...list]);
      return project;
    },
    updateProject: (id, patch) => setProjects(list => list.map(x => x.id === id ? { ...x, ...(typeof patch === 'function' ? patch(x) : patch) } : x)),
    data,
    toasts, setToasts,
  }), [email, acct, guestUser, gSignals, gIdeas, gProjects, gSaved, filters, toasts]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};