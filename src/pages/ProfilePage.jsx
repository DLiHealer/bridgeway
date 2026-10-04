import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, Input, Select, Textarea } from '../components/ui';
import { avatarUrl } from '../utils/formatters';
import { matchAll } from '../utils/matching';

const TABS = [
  { id: 'profile', key: 'nav.profile' },
  { id: 'signals', key: 'nav.mySignals' },
  { id: 'ideas', key: 'nav.myIdeas' },
  { id: 'projects', key: 'nav.myProjects' },
  { id: 'matches', key: 'profile.tabMatches' },
];
const ROLES = ['Mieszkaniec', 'Aktywista', 'Ekspert', 'NGO', 'Instytut'];

function ProfileForm() {
  const { t } = useTranslation();
  const { user, setUser } = useApp();
  const { backend, account } = useAuth();
  const [draft, setDraft] = useState({ name: user.name || '', roleLabel: user.role || 'Mieszkaniec', city: user.city || '', bio: user.bio || '' });
  const [msg, setMsg] = useState(null);
  // server profile may arrive after mount (login sync): reset the form to the stored values
  useEffect(() => { setDraft({ name: user.name || '', roleLabel: user.role || 'Mieszkaniec', city: user.city || '', bio: user.bio || '' }); }, [user.name, user.role, user.city, user.bio]);
  const dirty = draft.name !== (user.name || '') || draft.roleLabel !== (user.role || 'Mieszkaniec') || draft.city !== (user.city || '') || draft.bio !== (user.bio || '');
  const set = (k) => (e) => { setMsg(null); setDraft(d => ({ ...d, [k]: e.target.value })); };

  const save = async (e) => {
    e.preventDefault();
    const name = draft.name.trim();
    if (name.length < 2) { setMsg({ err: true, text: t('profile.nameRequired') }); return; }
    const next = { name, roleLabel: draft.roleLabel, city: draft.city.trim(), bio: draft.bio.trim() };
    if (backend && account) {
      try { await api.saveProfile(next); } catch { setMsg({ err: true, text: t('profile.saveFailed') }); return; }
    }
    setUser(u => ({ ...u, name: next.name, role: next.roleLabel, city: next.city, bio: next.bio }));
    setMsg({ text: backend && account ? t('profile.savedAccount') : t('profile.savedLocal') });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center gap-4">
        <img src={avatarUrl(user.name)} alt="" className="h-20 w-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-neutral-500">{user.role}{user.city ? ` · ${user.city}` : ''}</p>
        </div>
      </div>
      <form onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="pf-name" className="text-sm font-medium">{t('profile.name')}</label><Input id="pf-name" className="mt-1" value={draft.name} onChange={set('name')} maxLength={60} required /></div>
        <div><label htmlFor="pf-role" className="text-sm font-medium">{t('profile.role')}</label>
          <Select id="pf-role" className="mt-1" value={draft.roleLabel} onChange={set('roleLabel')}>{ROLES.map(r => <option key={r} value={r}>{t(`profile.roles.${r}`)}</option>)}</Select></div>
        <div><label htmlFor="pf-city" className="text-sm font-medium">{t('profile.city')}</label><Input id="pf-city" className="mt-1" value={draft.city} onChange={set('city')} maxLength={60} /></div>
        <div><label htmlFor="pf-email" className="text-sm font-medium">{t('profile.email')}</label><Input id="pf-email" className="mt-1" value={account?.email || user.email || ''} readOnly aria-describedby="pf-email-note" />
          <p id="pf-email-note" className="mt-1 text-xs text-neutral-500">{account ? t('profile.emailFixed') : t('profile.emailGuest')}</p></div>
        <div className="sm:col-span-2"><label htmlFor="pf-bio" className="text-sm font-medium">{t('profile.bio')}</label><Textarea id="pf-bio" className="mt-1" rows={4} value={draft.bio} onChange={set('bio')} maxLength={500} /></div>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <Button type="submit" disabled={!dirty}>{t('profile.save')}</Button>
          {msg && <span role={msg.err ? 'alert' : 'status'} className={`text-sm ${msg.err ? 'font-medium text-red-600' : 'text-neutral-700'}`}>{msg.text}</span>}
        </div>
        <p className="text-xs text-neutral-500 sm:col-span-2">{backend && account ? t('profile.privacyAccount') : t('profile.privacyLocal')}</p>
      </form>
    </Card>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get('tab') || 'profile');
  const { user, setUser, signals, ideas, projects, data } = useApp();
  const matches = matchAll({ category: 'seniorzy', city: user.city }, data);

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap gap-2">
        {TABS.map(tb => (
          <Chip key={tb.id} active={tab === tb.id} onClick={() => setTab(tb.id)}>
            {t(tb.key)}
          </Chip>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'profile' && <ProfileForm />}

        {tab === 'signals' && <List items={signals} />}
        {tab === 'ideas' && <List items={ideas} />}
        {tab === 'projects' && <List items={projects} />}

        {tab === 'matches' && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-5"><p className="text-sm font-semibold">Eksperci</p>{matches.experts.map(e => <div key={e.id} className="mt-2 text-sm">{e.name}</div>)}</Card>
            <Card className="p-5"><p className="text-sm font-semibold">NGO</p>{matches.ngos.map(n => <div key={n.id} className="mt-2 text-sm">{n.name}</div>)}</Card>
            <Card className="p-5"><p className="text-sm font-semibold">Granty</p>{matches.fundings.map(f => <div key={f.id} className="mt-2 text-sm">{f.name}</div>)}</Card>
          </div>
        )}
      </div>
    </div>
  );
}

function List({ items }) {
  if (!items.length) return <Card className="p-6 text-sm text-neutral-400">Brak elementów</Card>;
  return <div className="grid gap-3 md:grid-cols-2">{items.map(i => <Card key={i.id} className="p-4"><p className="font-medium">{i.title}</p><p className="text-xs text-neutral-400">{i.city || ''}</p></Card>)}</div>;
}