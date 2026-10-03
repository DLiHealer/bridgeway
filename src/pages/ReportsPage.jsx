import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { categoryName } from '../data';
import { Badge, Button, Card, EmptyState, Input, Select } from '../components/ui';

const STATUSES = ['received', 'assigned', 'inprogress', 'resolved', 'rejected'];

function BackendNote({ backend }) {
  const { t } = useTranslation();
  if (backend === false) return <Card className="mt-6 p-4 text-sm">{t('reports.noBackend')}</Card>;
  return <p className="mt-2 text-xs text-neutral-500">{t('reports.sharedNote')}</p>;
}

function Detail({ id }) {
  const { t } = useTranslation();
  const { account, backend } = useAuth();
  const [report, setReport] = useState(null);
  const [error, setError] = useState(false);
  const [st, setSt] = useState('assigned');
  const [note, setNote] = useState('');
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(() => api.report(id).then(r => { setReport(r.report); setError(false); }).catch(() => setError(true)), [id]);
  useEffect(() => { if (backend) load(); }, [backend, load]);

  if (backend === false || error) return <><BackendNote backend={backend} />{error && backend && <p role="alert" className="mt-4 text-sm">{t('reports.notFound')}</p>}</>;
  if (!report) return <p role="status" className="mt-4 text-sm">{t('common.loading')}</p>;

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (st === 'rejected' && !note.trim()) { setMsg(t('projects.report.reasonRequired')); return; }
    try {
      await api.setStatus(id, { status: st, note: note.trim(), responsibleBody: body.trim() });
      setNote(''); setBody('');
      load();
    } catch (err) { setMsg(t(`reports.err.${err.code}`, t('auth.err.unavailable'))); }
  };

  return (
    <Card className="mt-6 p-6">
      <div className="flex flex-wrap items-center gap-2"><Badge>{categoryName(report.category)}</Badge><span className="text-sm text-neutral-500">{report.city} · {report.createdAt}</span>{report.onBehalf && <Badge>{t('reports.proxy')}</Badge>}</div>
      <h2 className="mt-3 text-xl font-semibold">{report.title}</h2>
      <p className="mt-2 whitespace-pre-line text-sm">{report.description}</p>
      <p className="mt-4 text-sm">{t('projects.report.body')}: {report.responsibleBody ? <b>{report.responsibleBody}</b> : <span className="font-medium text-red-600">{t('projects.report.noBody')}</span>}</p>
      <h3 className="mt-5 text-sm font-semibold">{t('projects.report.history')}</h3>
      <ol className="mt-2 space-y-2 border-l-2 border-border pl-4 text-sm">
        {report.statusHistory.map((h, i) => (
          <li key={i}><b>{t(`projects.report.status.${h.status}`)}</b> <span className="text-xs text-neutral-500">{h.date} · {t(`auth.role.${h.actorRole}`)}</span>{h.note && <span className="block text-neutral-600">{h.note}</span>}</li>
        ))}
      </ol>
      {account?.role === 'responder' ? (
        <form onSubmit={submit} className="mt-5 grid gap-2 sm:grid-cols-2">
          <h3 className="text-sm font-semibold sm:col-span-2">{t('reports.responderTitle')}</h3>
          <Select value={st} onChange={e => setSt(e.target.value)} aria-label={t('projects.report.newStatus')}>
            {STATUSES.map(k => <option key={k} value={k}>{t(`projects.report.status.${k}`)}</option>)}
          </Select>
          <Input value={body} onChange={e => setBody(e.target.value)} aria-label={t('projects.report.setBody')} placeholder={t('projects.report.setBody')} />
          <Input className="sm:col-span-2" value={note} onChange={e => setNote(e.target.value)} aria-label={t('projects.report.reason')} placeholder={st === 'rejected' ? t('projects.report.reasonRequired') : t('projects.report.reason')} />
          <div className="sm:col-span-2"><Button type="submit">{t('projects.report.add')}</Button>{msg && <span role="alert" className="ml-3 text-sm text-red-600">{msg}</span>}</div>
        </form>
      ) : (
        <p className="mt-5 text-xs text-neutral-500">{account ? t('reports.residentNote') : <>{t('reports.loginNote')} <Link className="underline" to="/logowanie">{t('nav.login')}</Link></>}</p>
      )}
    </Card>
  );
}

function List() {
  const { t } = useTranslation();
  const { backend } = useAuth();
  const [reports, setReports] = useState(null);
  useEffect(() => { if (backend) api.reports().then(r => setReports(r.reports)).catch(() => setReports([])); }, [backend]);

  return (
    <>
      <BackendNote backend={backend} />
      {backend && reports && reports.length === 0 && <div className="mt-6"><EmptyState title={t('reports.empty')} description={t('reports.emptyDesc')} action={<Link to="/zglos"><Button>{t('nav.add')}</Button></Link>} /></div>}
      {backend && reports?.length > 0 && (
        <ul className="mt-6 grid gap-3">
          {reports.map(r => (
            <li key={r.id}>
              <Link to={`/zgloszenia/${r.id}`} className="block"><Card hover className="p-4">
                <div className="flex flex-wrap items-center gap-2"><Badge>{t(`projects.report.status.${r.status}`)}</Badge><span className="text-xs text-neutral-500">{r.city} · {r.createdAt}</span></div>
                <p className="mt-2 font-semibold">{r.title}</p>
                <p className="mt-1 text-xs text-neutral-500">{t('projects.report.body')}: {r.responsibleBody || t('reports.noBodyShort')}</p>
              </Card></Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function ReportsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="container-app py-8">
      {id && <Link to="/zgloszenia" className="text-sm underline">← {t('reports.back')}</Link>}
      <h1 className="mt-2 text-2xl font-bold md:text-3xl">{t('reports.title')}</h1>
      {id ? <Detail id={id} /> : <List />}
    </div>
  );
}
