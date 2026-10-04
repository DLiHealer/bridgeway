import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Button, Card, Input, Badge } from '../components/ui';

export default function LoginPage() {
  const { t } = useTranslation();
  const { backend, account, login } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token');
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ phase: 'idle' }); // idle | sending | sent | error | verifying
  const verified = useRef(false);

  useEffect(() => {
    if (!token || verified.current) return;
    verified.current = true; // StrictMode runs effects twice; the token is single use
    setState({ phase: 'verifying' });
    api.verify(token)
      .then(({ user }) => { login(user); navigate('/zgloszenia', { replace: true }); })
      .catch(() => setState({ phase: 'error', code: 'invalid_token' }));
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    setState({ phase: 'sending' });
    try {
      const res = await api.requestLink(email.trim());
      setState(res.pending ? { phase: 'pending' } : { phase: 'sent', devLink: res.devLink });
    } catch (err) {
      setState({ phase: 'error', code: err.code });
    }
  };

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('auth.title')}</h1>
      <Card className="mt-6 max-w-md p-6">
        {backend === false && <p className="text-sm text-neutral-700">{t('auth.noBackend')}</p>}
        {backend !== false && account && <p className="text-sm">{t('auth.loggedAs', { email: account.email })} <Badge>{t(`auth.role.${account.role}`)}</Badge></p>}
        {backend !== false && !account && state.phase === 'verifying' && <p role="status" className="text-sm">{t('auth.verifying')}</p>}
        {backend !== false && !account && state.phase !== 'verifying' && state.phase !== 'sent' && state.phase !== 'pending' && (
          <form onSubmit={submit} className="space-y-3">
            <label htmlFor="login-email" className="block text-sm font-medium">{t('auth.email')}</label>
            <Input id="login-email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
            <p className="text-xs text-neutral-500">{t('auth.hint')}</p>
            <Button type="submit" disabled={state.phase === 'sending'}>{t('auth.send')}</Button>
          </form>
        )}
        {state.phase === 'sent' && (
          <div role="status" className="space-y-2 text-sm">
            <p>{t('auth.sent')}</p>
            {state.devLink && <p className="break-all rounded-btn bg-neutral-100 p-2 text-xs"><b>{t('auth.devLink')}:</b> <a className="underline" href={state.devLink}>{state.devLink}</a></p>}
          </div>
        )}
        {state.phase === 'pending' && <p role="status" className="text-sm">{t('auth.pending')}</p>}
        {state.phase === 'error' && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{t(`auth.err.${state.code}`, t('auth.err.unavailable'))}</p>}
      </Card>
      {backend && account?.role === 'responder' && <Registrations />}
    </div>
  );
}

function Registrations() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(null);
  const load = () => api.registrations().then(r => setRows(r.registrations)).catch(() => setRows([]));
  useEffect(() => { load(); }, []);
  const decide = (email, d) => api.decide(email, d).then(load);
  return (
    <Card className="mt-6 max-w-md p-6">
      <h2 className="font-semibold">{t('auth.regTitle')}</h2>
      {rows && rows.length === 0 && <p className="mt-2 text-sm text-neutral-500">{t('auth.regEmpty')}</p>}
      <ul className="mt-3 space-y-2">
        {rows?.map(r => (
          <li key={r.email} className="flex flex-wrap items-center gap-2 text-sm">
            <span className="break-all">{r.email}</span> <Badge>{t(`auth.reg.${r.status}`)}</Badge>
            {r.status !== 'approved' && <Button size="sm" onClick={() => decide(r.email, 'approved')}>{t('auth.approve')}</Button>}
            {r.status !== 'rejected' && <Button size="sm" variant="secondary" onClick={() => decide(r.email, 'rejected')}>{t('auth.reject')}</Button>}
          </li>
        ))}
      </ul>
    </Card>
  );
}
