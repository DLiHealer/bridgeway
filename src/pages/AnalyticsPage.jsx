import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext.jsx';
import { Card, Badge } from '../components/ui';
import MapView from '../components/map/MapView';
import { categoryById, categoryName } from '../data';

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const { signals, ideas, projects, data } = useApp();

  const kpis = [
    { l: t('analytics.signals'), v: signals.length },
    { l: t('analytics.ideas'), v: ideas.length },
    { l: t('analytics.projects'), v: projects.length },
  ];
  const byCategory = data.categories
    .map(c => ({ id: c.id, count: signals.filter(s => s.category === c.id).length }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('nav.analytics')}</h1>
      <p className="mt-3 rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('common.localData')}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {kpis.map(k => <Card key={k.l} className="p-5"><p className="text-2xl font-bold">{k.v}</p><p className="text-sm text-neutral-400">{k.l}</p></Card>)}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="h-80"><MapView items={signals} zoom={5} /></div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-semibold">{t('analytics.byCategory')}</h2>
        <table className="mt-3 w-full text-sm">
          <thead><tr className="text-left text-xs text-neutral-400"><th>{t('common.category')}</th><th>{t('analytics.signals')}</th></tr></thead>
          <tbody>
            {byCategory.map(c => (
              <tr key={c.id} className="border-t border-border">
                <td className="py-2"><Badge color={categoryById(c.id).color}>{categoryName(categoryById(c.id))}</Badge></td>
                <td>{c.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
