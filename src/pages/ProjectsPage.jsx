import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext.jsx';
import { Card, Badge, Button, EmptyState } from '../components/ui';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { projects, data } = useApp();

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('projects.title')}</h1>
      <p className="mt-2 rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('common.localData')}</p>

      {projects.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title={t('projects.empty')}
            description={t('projects.emptyHint')}
            action={<Button as={Link} to="/rozwiazania">{t('projects.browse')}</Button>}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.map(p => {
            const src = p.sourceSolutionId && data.solutions.find(s => s.id === p.sourceSolutionId);
            return (
              <Card key={p.id} hover className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/projekty/${p.id}`} className="font-semibold hover:text-brand-primary">{p.title}</Link>
                  <Badge color="#64748B">{t(`projects.status.${p.status}`, p.status)}</Badge>
                </div>
                <div className="mt-3 h-2 rounded-full bg-neutral-100"><div className="h-full rounded-full bg-brand-primary" style={{ width: `${p.progress || 0}%` }} /></div>
                <p className="mt-2 text-xs text-neutral-400">{t('projects.progress')}: {p.progress || 0}% · {p.tasks.length} {t('projects.tasks')}</p>
                {src && (
                  <p className="mt-2 text-xs text-neutral-500">{t('projects.fromSolution')}: <Link to={`/rozwiazania/${src.id}`} className="text-brand-primary hover:underline">{src.title}</Link></p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
