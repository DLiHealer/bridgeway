import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';

const AuthContext = createContext(null);

// backend: null = checking, true = API reachable, false = no backend (data stays local)
export function AuthProvider({ children }) {
  const [backend, setBackend] = useState(null);
  const [account, setAccount] = useState(null);

  const refresh = useCallback(async () => {
    try {
      await api.health();
      setBackend(true);
      setAccount((await api.me()).user);
    } catch {
      setBackend(false);
      setAccount(null);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const value = useMemo(() => ({
    backend, account, refresh,
    login: (user) => { setBackend(true); setAccount(user); },
    logout: async () => { try { await api.logout(); } finally { setAccount(null); } },
  }), [backend, account, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
