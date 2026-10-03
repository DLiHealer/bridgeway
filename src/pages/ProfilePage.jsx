import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, Badge } from '../components/ui';
import { avatarUrl } from '../utils/formatters';
import { matchAll } from '../utils/matching';

const TABS = [
  { id: 'profile', label: 'Profil' },
  { id: 'signals', label: 'Moje sygnały' },
  { id: 'ideas', label: 'Moje pomysły' },
  { id: 'projects', label: 'Moje projekty' },
  { id: 'matches', label: 'Dopasowania' },
  { id: 'settings', label: 'Ustawienia' },
];

export default function ProfilePage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get('tab') || 'profile');
  const { user, setUser, signals, ideas, projects, data } = useApp();
  const matches = matchAll({ category: 'seniorzy', city: user.city }, data);

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap gap-2">
        {TABS.map(tb => (
          <Chip key={tb.id} active={tab === tb.id} onClick={() => setTab(tb.id)}>
            {tb.label}
          </Chip>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'profile' && (
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <img src={avatarUrl(user.name)} alt="" className="h-20 w-20 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-neutral-400">{user.role} · {user.city}</p>
              </div>
              <Button variant="secondary" className="ml-auto">Edytuj</Button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <label className="text-sm">Imię<input className="mt-1 h-11 w-full rounded-btn border border-border px-3" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} /></label>
              <label className="text-sm">Rola<select className="mt-1 h-11 w-full rounded-btn border border-border px-3" value={user.role} onChange={e => setUser({ ...user, role: e.target.value })}>
                <option>Mieszkaniec</option><option>Aktywista</option><option>Ekspert</option><option>NGO</option><option>Instytut</option>
              </select></label>
              <label className="text-sm">Miasto<input className="mt-1 h-11 w-full rounded-btn border border-border px-3" value={user.city} onChange={e => setUser({ ...user, city: e.target.value })} /></label>
              <label className="text-sm">Email<input className="mt-1 h-11 w-full rounded-btn border border-border px-3" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} /></label>
            </div>
          </Card>
        )}

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

        {tab === 'settings' && (
          <Card className="p-6 space-y-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Powiadomienia email</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Powiadomienia push</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Profil publiczny</label>
          </Card>
        )}
      </div>
    </div>
  );
}

function List({ items }) {
  if (!items.length) return <Card className="p-6 text-sm text-neutral-400">Brak elementów</Card>;
  return <div className="grid gap-3 md:grid-cols-2">{items.map(i => <Card key={i.id} className="p-4"><p className="font-medium">{i.title}</p><p className="text-xs text-neutral-400">{i.city || ''}</p></Card>)}</div>;
}