import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, EmptyState } from '../components/ui';
import { loc } from '../data';

const TABS = ['overview', 'tasks', 'budget', 'docs', 'team'];

export default function ProjectRoom() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { projects, data } = useApp();
  const p = projects.find(x => x.id === id);
  const [tab, setTab] = useState('overview');
  if (!p) return <div className="container-app py-12"><EmptyState title={t('projects.notFound')} action={<Button as={Link} to="/projekty">{t('projects.back')}</Button>} /></div>;
  const src = p.sourceSolutionId && data.solutions.find(x => x.id === p.sourceSolutionId);

  return (
    <div className="container-app py-8">
      <Link to="/projekty" className="text-xs text-neutral-400 hover:text-brand-primary">← {t('projects.back')}</Link>
      <h1 className="mt-2 text-2xl font-bold md:text-3xl">{p.title}</h1>
      {src && <p className="mt-1 text-sm text-neutral-500">{t('projects.fromSolution')}: <Link to={`/rozwiazania/${src.id}`} className="text-brand-primary hover:underline">{loc(src.title)}</Link></p>}
      <p className="mt-3 rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('common.localData')}</p>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {TABS.map(tb => <Chip key={tb} active={tab === tb} onClick={() => setTab(tb)}>{tb}</Chip>)}
      </div>

      <div className="mt-6">

        <section>
          {tab === 'overview' && (
            <Card className="p-6">
              <h2 className="font-semibold">Przegląd</h2>
              <p className="mt-3 text-sm text-neutral-400">Postęp: {p.progress}%</p>
              <div className="mt-2 h-2 rounded-full bg-neutral-100"><div className="h-full bg-brand-primary" style={{ width: `${p.progress}%` }} /></div>
              <p className="mt-4 text-sm">Deadline: <b>{p.deadline || t('projects.noDeadline')}</b></p>
            </Card>
          )}

          {tab === 'tasks' && (p.tasks.length === 0 ? <Card className="p-6 text-sm text-neutral-400">{t('projects.noTasks')}</Card> :
            <div className="grid gap-4 md:grid-cols-3">
              {['todo', 'inprogress', 'done'].map(st => (
                <Card key={st} className="p-4">
                  <p className="mb-3 text-sm font-semibold capitalize">{st}</p>
                  <div className="space-y-2">
                    {p.tasks.filter(k => k.status === st).map(k => <div key={k.id} className="rounded-btn bg-neutral-100 p-2 text-sm">{k.title}</div>)}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tab === 'budget' && (
            <Card className="p-6">
              {p.budget.length === 0 && <p className="text-sm text-neutral-400">{t('projects.noBudget')}</p>}
              {p.budget.length > 0 && <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-neutral-400"><th className="pb-2">Kategoria</th><th>Plan</th><th>Fakt</th><th>Źródło</th></tr></thead>
                <tbody>
                  {p.budget.map((b, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="py-2">{b.category}</td><td>{b.plan}</td><td>{b.fact}</td><td>{b.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
            </Card>
          )}

          {tab === 'docs' && (
            <Card className="p-6">
              <div className="flex items-center justify-between"><h2 className="font-semibold">Dokumenty</h2></div>
              {p.documents.length === 0 && <p className="mt-3 text-sm text-neutral-400">{t('projects.noDocs')}</p>}
              <ul className="mt-3 space-y-2 text-sm">{p.documents.map((d, i) => <li key={i} className="rounded-btn bg-neutral-100 p-2">{d.name}</li>)}</ul>
            </Card>
          )}

          {tab === 'team' && (
            <Card className="p-6">
              <div className="flex items-center justify-between"><h2 className="font-semibold">Zespół</h2></div>
              {p.team.length === 0 && <p className="mt-3 text-sm text-neutral-400">{t('projects.noTeam')}</p>}
              <ul className="mt-3 space-y-2 text-sm">{p.team.map((m, i) => <li key={i} className="rounded-btn bg-neutral-100 p-2">{m.name} — {m.role}</li>)}</ul>
            </Card>
          )}

        </section>

      </div>
    </div>
  );
}