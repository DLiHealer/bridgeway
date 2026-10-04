import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge, Button, Card } from '../components/ui';

function Option({ id, checked, onChange, title, children }) {
  return (
    <label htmlFor={id} className={`flex cursor-pointer gap-3 rounded-card border p-4 ${checked ? 'border-brand-primary bg-neutral-50' : 'border-border'}`}>
      <input id={id} type="radio" name="reg-mode" className="mt-1" checked={checked} onChange={onChange} />
      <span className="text-sm"><b className="block">{title}</b><span className="mt-1 block text-neutral-600">{children}</span></span>
    </label>
  );
}

function RegistrationSetting() {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(null);   // value on the server
  const [draft, setDraft] = useState(null);   // value in the form
  const [msg, setMsg] = useState('');
  useEffect(() => { api.settings().then(r => { setSaved(r.testMode); setDraft(r.testMode); }).catch(() => setMsg(t('auth.err.unavailable'))); }, []);
  const save = async () => {
    setMsg('');
    try { const r = await api.setTestMode(draft); setSaved(r.testMode); setDraft(r.testMode); setMsg(t('admin.saved')); }
    catch { setMsg(t('auth.err.unavailable')); }
  };
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{t('admin.regTitle')}</h2>
      <p className="mt-1 text-sm text-neutral-600">{t('admin.regIntro')}</p>
      {saved !== null && (
        <p role="status" className={`mt-3 rounded-btn p-3 text-sm font-semibold ${saved ? 'bg-red-50 text-red-700' : 'bg-neutral-100 text-neutral-800'}`}>
          {t('admin.current')}: {saved ? t('admin.currentTest') : t('admin.currentApproval')}
        </p>
      )}
      {draft !== null && (
        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">{t('admin.regTitle')}</legend>
          <Option id="mode-approval" checked={!draft} onChange={() => setDraft(false)} title={t('admin.approvalTitle')}>{t('admin.approvalBody')}</Option>
          <Option id="mode-test" checked={draft} onChange={() => setDraft(true)} title={t('admin.testTitle')}>{t('admin.testBody')}</Option>
        </fieldset>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={save} disabled={draft === null || draft === saved}>{t('admin.save')}</Button>
        {msg && <span role="status" className="text-sm text-neutral-600">{msg}</span>}
      </div>
    </Card>
  );
}

const price = (v) => (v == null ? '?' : `$${v}`);

function LlmSetting() {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(null); // { model, isDefault }
  const [models, setModels] = useState(null);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState('');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    api.llm().then(r => { setSaved(r); setSel(r.model); setQ(r.model); }).catch(() => setMsg(t('auth.err.unavailable')));
    api.llmModels().then(r => setModels(r.models)).catch(() => setMsg(t('admin.llmFail')));
  }, []);
  const needle = q.trim().toLowerCase();
  const list = (models || []).filter(m => !needle || sel === q || (m.id + ' ' + m.name).toLowerCase().includes(needle)).slice(0, 50);
  const choose = (m) => { setSel(m.id); setQ(m.id); setOpen(false); setMsg(''); };
  const save = async () => {
    setMsg('');
    try { const r = await api.setLlm(sel); setSaved(r); setMsg(t('admin.saved')); }
    catch { setMsg(t('auth.err.unavailable')); }
  };
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{t('admin.llmTitle')}</h2>
      <p className="mt-1 text-sm text-neutral-600">{t('admin.llmIntro')}</p>
      {saved && <p role="status" className="mt-3 rounded-btn bg-neutral-100 p-3 text-sm font-semibold text-neutral-800">{t('admin.llmCurrent')}: {saved.model}{saved.isDefault ? ` (${t('admin.llmDefault')})` : ''}</p>}
      <label htmlFor="llm-model" className="mt-4 block text-sm font-medium">{t('admin.llmLabel')}</label>
      <div className="relative mt-1">
        <input
          id="llm-model" role="combobox" aria-expanded={open} aria-controls="llm-list" aria-autocomplete="list" autoComplete="off"
          className="w-full rounded-btn border border-border px-3 py-2 text-sm" value={q} disabled={!models}
          onChange={e => { setQ(e.target.value); setSel(''); setOpen(true); }} onFocus={() => setOpen(true)}
          onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}
        />
        {!models && !msg && <p role="status" className="mt-1 text-xs text-neutral-500">{t('admin.llmLoading')}</p>}
        {open && models && (
          <ul id="llm-list" role="listbox" className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-btn border border-border bg-white text-sm shadow-lg">
            {list.length === 0 && <li className="p-3 text-neutral-500">{t('admin.llmNone')}</li>}
            {list.map(m => (
              <li key={m.id} role="option" aria-selected={m.id === sel} tabIndex={-1} className="cursor-pointer px-3 py-2 hover:bg-neutral-100" onMouseDown={e => { e.preventDefault(); choose(m); }}>
                <span className="block font-medium">{m.name}</span>
                <span className="block text-xs text-neutral-600">{m.id} · {t('admin.llmIn')} {price(m.in)} / {t('admin.llmOut')} {price(m.out)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={save} disabled={!sel || sel === saved?.model}>{t('admin.save')}</Button>
        {msg && <span role="status" className="text-sm text-neutral-600">{msg}</span>}
      </div>
    </Card>
  );
}

function Registrations() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(null);
  const load = () => api.registrations().then(r => setRows(r.registrations)).catch(() => setRows([]));
  useEffect(() => { load(); }, []);
  const decide = (email, d) => api.decide(email, d).then(load);
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{t('auth.regTitle')}</h2>
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

export default function AdminPage() {
  const { t } = useTranslation();
  const { backend, account } = useAuth();
  const allowed = backend && account?.role === 'responder';
  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('admin.title')}</h1>
      {backend === null && <p role="status" className="mt-4 text-sm">{t('common.loading')}</p>}
      {backend === false && <p className="mt-4 text-sm">{t('auth.noBackend')}</p>}
      {backend && !allowed && <p role="alert" className="mt-4 text-sm">{t('admin.denied')} <Link className="underline" to="/logowanie">{t('nav.login')}</Link></p>}
      {allowed && <div className="mt-6 grid max-w-2xl gap-6"><RegistrationSetting /><LlmSetting /><Registrations /></div>}
    </div>
  );
}
