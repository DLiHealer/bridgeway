import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import * as data from '../data';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage('bridgeart-user', { name: 'Gość', role: 'Mieszkaniec', email: 'gosc@example.com', city: 'Warszawa' });
  const [signals, setSignals] = useLocalStorage('bridgeart-signals', data.signals);
  const [ideas, setIdeas] = useLocalStorage('bridgeart-ideas', data.ideas);
  const [projects, setProjects] = useLocalStorage('bridgeart-projects', data.projects);
  const [saved, setSaved] = useLocalStorage('bridgeart-saved', []);
  const [filters, setFiltersState] = useLocalStorage('bridgeart-filters', { type: 'all', categories: [], city: '', urgency: 'all', q: '' });
  const [toasts, setToasts] = useLocalStorage('bridgeart-toasts-placeholder', []);

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
    addProject: (p) => setProjects(list => [{ ...p, id: 'p' + Date.now() }, ...list]),
    data,
    toasts, setToasts,
  }), [user, signals, ideas, projects, saved, filters, toasts]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};