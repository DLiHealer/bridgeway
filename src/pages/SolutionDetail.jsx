import { useParams, Link, useSearchParams } from 'react-router-dom';
import ScoreBreakdown from '../components/cases/ScoreBreakdown.jsx';
import { scoreCase } from '../utils/transferScore';
import { useApp } from '../context/AppContext.jsx';
import { categoryById, categoryName, loc } from '../data';
import { Button, Card, Badge, EvidenceBadge, EmptyState, Modal, Input } from '../components/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function SolutionDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, addProject, user } = useApp();
  const s = data.solutions.find(x => x.id === id);
  const [params] = useSearchParams();
  const [copy, setCopy] = useState(false);
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  if (!s) return <div className="container-app py-12"><EmptyState title={t('cases.notFound')} /></div>;

  const c = categoryById(s.category);
  const transfer = scoreCase(s, { category: params.get('cat') || '', city: params.get('city') || '' });

  const handleCopy = () => {
    const project = addProject({
      title: `${t('projects.copyPrefix')}: ${loc(s.title)} — ${city}`,
      status: 'pomysl', progress: 0,
      sourceSolutionId: s.id,
      team: [{ name: user.name, role: 'lider' }],
      tasks: (s.steps.length ? s.steps.map(loc) : t('cases.defaultSteps', { returnObjects: true })).map((st, i) => ({ id: `t${i + 1}`, title: st, status: 'todo' })),
      budget: [], documents: [],
      deadline: '', kpi: [],
    });
    setCopy(false);
    navigate(`/projekty/${project.id}`);
  };

  const field = (label, value, fallback) => (
    <div><dt className="text-xs text-neutral-400">{label}</dt><dd className="mt-0.5 text-sm text-neutral-800">{value || fallback}</dd></div>
  );

  return (
    <div className="container-app py-8">
      <nav className="text-xs text-neutral-400">
        <Link to="/" className="hover:text-brand-primary">Home</Link> / <Link to="/rozwiazania" className="hover:text-brand-primary">{t('nav.solutions')}</Link> / <span>{loc(s.title)}</span>
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <EvidenceBadge level={s.evidenceLevel} label={t(`cases.level${s.evidenceLevel}`)} />
              {s.kind === 'route' && <Badge color="#64748B">{t('cases.route')}</Badge>}
              <Badge color={c.color}>{categoryName(c)}</Badge>
              <Badge color="#64748B">{s.city}</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-bold md:text-3xl">{loc(s.title)}</h1>
            <p className="mt-1 text-sm text-neutral-500">{loc(s.organisation)}, {s.year}</p>
          </div>

          <Card className="p-6"><h2 className="font-semibold">{t('cases.problem')}</h2><p className="mt-2 text-neutral-700">{loc(s.problem)}</p></Card>
          <Card className="p-6"><h2 className="font-semibold">{t('cases.solution')}</h2><p className="mt-2 text-neutral-700">{loc(s.solution)}</p></Card>

          <Card className="p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              {field(t('cases.cost'), loc(s.cost), t('cases.notStated'))}
              {field(t('cases.duration'), loc(s.duration), t('cases.notStated'))}
              {field(t('cases.outcome'), loc(s.outcome), t('cases.notStated'))}
              {field(t('cases.outcomeMethod'), loc(s.outcomeMethod), t('cases.notMeasured'))}
              {field(t('cases.context'), loc(s.context), t('cases.notStated'))}
              <div>
                <dt className="text-xs text-neutral-400">{t('cases.source')}</dt>
                <dd className="mt-0.5 text-sm"><a href={s.source.url} target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">{s.source.label}</a></dd>
              </div>
            </dl>
          </Card>

          {s.steps.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold">{t('cases.stepsTitle')}</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {s.steps.map((st, i) => <li key={i} className="flex gap-2"><span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary">{i+1}</span>{loc(st)}</li>)}
              </ol>
            </Card>
          )}

          <p className="rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('cases.legend')}</p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Button className="w-full" onClick={() => setCopy(true)}>{t('cta.copy')}</Button>
          <ScoreBreakdown transfer={transfer} />
          <Card className="p-5">
            <p className="text-sm font-semibold">{t('cases.similar')}</p>
            <div className="mt-2 space-y-2 text-sm">
              {data.solutions.filter(x => x.id !== s.id && x.category === s.category).map(x => (
                <Link key={x.id} to={`/rozwiazania/${x.id}`} className="block rounded-btn bg-neutral-100 p-2 hover:bg-neutral-200">{loc(x.title)}</Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      <Modal open={copy} onClose={() => setCopy(false)} title={t('projects.copyTitle')}>
        <p className="text-sm text-neutral-400">{t('projects.copyHint')}</p>
        <Input className="mt-3" placeholder={t('projects.yourCity')} value={city} onChange={e => setCity(e.target.value)} />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setCopy(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleCopy} disabled={!city}>{t('projects.create')}</Button>
        </div>
      </Modal>
    </div>
  );
}