import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, EmptyState, Input, Select, Badge } from '../components/ui';
import { loc } from '../data';

const TABS = ['overview', 'tasks', 'budget', 'docs', 'team'];

export default function ProjectRoom() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { projects, data, updateProject } = useApp();
  const p = projects.find(x => x.id === id);
  const [tab, setTab] = useState('overview');
  const [body, setBody] = useState('');
  const [st, setSt] = useState('inprogress');
  const [note, setNote] = useState('');
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
            <Card className="mb-4 p-6">
              <div className="flex items-center justify-between gap-2"><h2 className="font-semibold">{t('projects.report.title')}</h2><Badge>{t('common.demo')}</Badge></div>
              <p className="mt-1 text-xs text-neutral-500">{t('projects.report.demoNote')}</p>
              <p className="mt-3 text-sm">{t('projects.report.body')}: {p.responsibleBody ? <b>{p.responsibleBody}</b> : <span className="font-medium text-red-600">{t('projects.report.noBody')}</span>}</p>
              <form className="mt-2 flex gap-2" onSubmit={e => { e.preventDefault(); if (body.trim()) { updateProject(p.id, { responsibleBody: body.trim() }); setBody(''); } }}>
                <Input value={body} onChange={e => setBody(e.target.value)} aria-label={t('projects.report.setBody')} placeholder={t('projects.report.setBody')} />
                <Button type="submit">{t('projects.report.save')}</Button>
              </form>
              <h3 className="mt-5 text-sm font-semibold">{t('projects.report.history')}</h3>
              <ol className="mt-2 space-y-2 border-l-2 border-border pl-4 text-sm">
                {(p.statusHistory || []).map((h, i) => (
                  <li key={i}><b>{t(`projects.report.status.${h.status}`)}</b> <span className="text-xs text-neutral-400">{h.date}</span>{h.note && <span className="block text-neutral-500">{h.note}</span>}</li>
                ))}
              </ol>
              <form className="mt-4 grid gap-2 sm:grid-cols-[auto,1fr,auto]" onSubmit={e => {
                e.preventDefault();
                if (st === 'rejected' && !note.trim()) return;
                updateProject(p.id, x => ({ statusHistory: [...(x.statusHistory || []), { status: st, date: new Date().toISOString().slice(0, 10), note: note.trim() }] }));
                setNote('');
              }}>
                <Select value={st} onChange={e => setSt(e.target.value)} aria-label={t('projects.report.newStatus')}>
                  {['received', 'assigned', 'inprogress', 'resolved', 'rejected'].map(k => <option key={k} value={k}>{t(`projects.report.status.${k}`)}</option>)}
                </Select>
                <Input value={note} onChange={e => setNote(e.target.value)} aria-label={t('projects.report.reason')} placeholder={st === 'rejected' ? t('projects.report.reasonRequired') : t('projects.report.reason')} />
                <Button type="submit">{t('projects.report.add')}</Button>
              </form>
            </Card>
          )}

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