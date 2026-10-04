import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/ui';
import { solutions, loc } from '../data';

const STATUSES = ['received', 'assigned', 'inprogress', 'resolved', 'rejected'];

function formatDuration(ms, t) {
  const min = ms / 60000;
  if (min < 60) return t('analytics.minutes', { n: Math.max(1, Math.round(min)) });
  if (min < 2880) return t('analytics.hours', { n: Math.round(min / 60) });
  return t('analytics.days', { n: Math.round(min / 1440) });
}

function Metric({ label, value, note }) {
  return (
    <Card className="p-5">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-neutral-500">{note}</p>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const { backend } = useAuth();
  const [m, setM] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (backend) api.metrics().then(setM).catch(() => setFailed(true));
  }, [backend]);

  const noData = t('analytics.noData');
  const caseTitle = (id) => { const c = solutions.find(s => s.id === id); return c ? loc(c.title) : id; };

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('nav.analytics')}</h1>
      <p className="mt-3 rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('analytics.intro')}</p>

      {(backend === false || failed) && <Card className="mt-6 p-4 text-sm">{t('analytics.noBackend')}</Card>}

      {m && (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Metric
              label={t('analytics.firstResponse')}
              value={m.firstResponse ? formatDuration(m.firstResponse.medianMs, t) : noData}
              note={t('analytics.firstResponseNote', { n: m.firstResponse?.n ?? 0, total: m.reports.total })} />
            <Metric
              label={t('analytics.responseShare')}
              value={m.reports.total ? `${Math.round((m.reports.responded / m.reports.total) * 100)}%` : noData}
              note={t('analytics.responseShareNote', { n: m.reports.responded, total: m.reports.total })} />
            <Metric
              label={t('analytics.reuseRate')}
              value={m.reuse.rate == null ? noData : `${Math.round(m.reuse.rate * 100)}%`}
              note={t('analytics.reuseNote', { n: m.reuse.accountsReusing, total: m.reuse.accounts, copies: m.reuse.fromCases })} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="font-semibold">{t('analytics.byStatus')}</h2>
              <table className="mt-3 w-full text-sm">
                <thead><tr className="text-left text-xs text-neutral-500"><th scope="col">{t('analytics.status')}</th><th scope="col">{t('analytics.count')}</th></tr></thead>
                <tbody>
                  {STATUSES.map(s => (
                    <tr key={s} className="border-t border-border"><td className="py-2">{t(`projects.report.status.${s}`)}</td><td>{m.reports.byStatus[s] ?? 0}</td></tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <Card className="p-6">
              <h2 className="font-semibold">{t('analytics.byCase')}</h2>
              {Object.keys(m.reuse.byCase).length === 0 ? <p className="mt-3 text-sm text-neutral-500">{noData}</p> : (
                <table className="mt-3 w-full text-sm">
                  <thead><tr className="text-left text-xs text-neutral-500"><th scope="col">{t('analytics.case')}</th><th scope="col">{t('analytics.copies')}</th></tr></thead>
                  <tbody>
                    {Object.entries(m.reuse.byCase).sort((a, b) => b[1] - a[1]).map(([id, n]) => (
                      <tr key={id} className="border-t border-border"><td className="py-2">{caseTitle(id)}</td><td>{n}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </div>

          <Card className="mt-6 p-5 text-xs text-neutral-500">
            <h2 className="text-sm font-semibold text-neutral-900">{t('analytics.limitsTitle')}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>{t('analytics.limit1')}</li>
              <li>{t('analytics.limit2')}</li>
              <li>{t('analytics.limit3')}</li>
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
