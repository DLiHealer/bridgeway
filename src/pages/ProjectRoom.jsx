import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, EmptyState } from '../components/ui';

const TABS = ['overview', 'tasks', 'budget', 'docs', 'team', 'chat'];

export default function ProjectRoom() {
  const { id } = useParams();
  const { projects } = useApp();
  const p = projects.find(x => x.id === id);
  const [tab, setTab] = useState('overview');
  if (!p) return <div className="container-app py-12"><EmptyState title="Nie znaleziono projektu" /></div>;

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{p.title}</h1>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {TABS.map(tb => <Chip key={tb} active={tab === tb} onClick={() => setTab(tb)}>{tb}</Chip>)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,2fr,1fr]">
        <aside className="hidden lg:block">
          <Card className="p-5">
            <p className="text-sm font-semibold">Nawigacja</p>
            <ul className="mt-3 space-y-1 text-sm">
              {TABS.map(tb => <li key={tb}><button onClick={() => setTab(tb)} className={`w-full rounded-btn px-2 py-1.5 text-left ${tab === tb ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-neutral-100'}`}>{tb}</button></li>)}
            </ul>
          </Card>
        </aside>

        <section>
          {tab === 'overview' && (
            <Card className="p-6">
              <h2 className="font-semibold">Przegląd</h2>
              <p className="mt-3 text-sm text-neutral-400">Postęp: {p.progress}%</p>
              <div className="mt-2 h-2 rounded-full bg-neutral-100"><div className="h-full bg-brand-primary" style={{ width: `${p.progress}%` }} /></div>
              <p className="mt-4 text-sm">Deadline: <b>{p.deadline}</b></p>
            </Card>
          )}

          {tab === 'tasks' && (
            <div className="grid gap-4 md:grid-cols-3">
              {['todo', 'inprogress', 'done'].map(st => (
                <Card key={st} className="p-4">
                  <p className="mb-3 text-sm font-semibold capitalize">{st}</p>
                  <div className="space-y-2">
                    {p.tasks.filter(t => t.status === st).map(t => <div key={t.id} className="rounded-btn bg-neutral-100 p-2 text-sm">{t.title}</div>)}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tab === 'budget' && (
            <Card className="p-6">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-neutral-400"><th className="pb-2">Kategoria</th><th>Plan</th><th>Fakt</th><th>Źródło</th></tr></thead>
                <tbody>
                  {p.budget.map((b, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="py-2">{b.category}</td><td>{b.plan}</td><td>{b.fact}</td><td>{b.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}

          {tab === 'docs' && (
            <Card className="p-6">
              <div className="flex items-center justify-between"><h2 className="font-semibold">Dokumenty</h2><Button size="sm">+ Wgraj</Button></div>
              <ul className="mt-3 space-y-2 text-sm">{p.documents.map((d, i) => <li key={i} className="rounded-btn bg-neutral-100 p-2">{d.name}</li>)}</ul>
            </Card>
          )}

          {tab === 'team' && (
            <Card className="p-6">
              <div className="flex items-center justify-between"><h2 className="font-semibold">Zespół</h2><Button size="sm">+ Zaproś</Button></div>
              <ul className="mt-3 space-y-2 text-sm">{p.team.map((m, i) => <li key={i} className="rounded-btn bg-neutral-100 p-2">{m.name} — {m.role}</li>)}</ul>
            </Card>
          )}

          {tab === 'chat' && (
            <Card className="p-6">
              <div className="h-64 space-y-2 overflow-y-auto">
                <div className="rounded-btn bg-neutral-100 p-2 text-sm">Anna: Kiedy zaczynamy?</div>
                <div className="ml-8 rounded-btn bg-brand-primary/10 p-2 text-sm">Tomasz: W przyszłym tygodniu.</div>
              </div>
              <div className="mt-3 flex gap-2"><input className="h-11 flex-1 rounded-btn border border-border px-3 text-sm" placeholder="Napisz…" /><Button>Wyślij</Button></div>
            </Card>
          )}
        </section>

        <aside className="hidden lg:block">
          <Card className="p-5">
            <p className="text-sm font-semibold">Aktywność</p>
            <ul className="mt-3 space-y-2 text-xs text-neutral-400">
              <li>Dodano zadanie „Zamówić materiały”</li>
              <li>Anna dołączyła do projektu</li>
              <li>Zaktualizowano budżet</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}