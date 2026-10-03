import { useApp } from '../context/AppContext.jsx';
import { Card, Button, Badge } from '../components/ui';
import MapView from '../components/map/MapView';
import { categoryById } from '../data';

export default function AnalyticsPage() {
  const { data } = useApp();
  const a = data.analytics;

  const kpis = [
    { l: 'Sygnały', v: a.kpis.signals },
    { l: 'Pomysły', v: a.kpis.ideas },
    { l: 'Projekty', v: a.kpis.projects },
    { l: 'Wskaźnik realizacji', v: a.kpis.rate + '%' },
  ];

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold md:text-3xl">Analityka</h1>
        <Button variant="secondary">Eksportuj PDF</Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {kpis.map(k => <Card key={k.l} className="p-5"><p className="text-2xl font-bold">{k.v}</p><p className="text-sm text-neutral-400">{k.l}</p></Card>)}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="h-80"><MapView items={data.signals} zoom={5} /></div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-semibold">Trend zgłoszeń</h2>
        <svg viewBox="0 0 400 100" className="mt-3 w-full">
          <polyline fill="none" stroke="#1E5EFF" strokeWidth="2"
            points={a.trend.map((v, i) => `${(i/(a.trend.length-1))*400},${100 - v}`).join(' ')} />
        </svg>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-semibold">Kategorie</h2>
        <table className="mt-3 w-full text-sm">
          <thead><tr className="text-left text-xs text-neutral-400"><th>Kategoria</th><th>Zgłoszenia</th><th>Δ</th></tr></thead>
          <tbody>
            {a.categories.map(c => (
              <tr key={c.id} className="border-t border-border">
                <td className="py-2"><Badge color={categoryById(c.id).color}>{categoryById(c.id).name}</Badge></td>
                <td>{c.count}</td>
                <td className={c.delta >= 0 ? 'text-brand-secondary' : 'text-brand-danger'}>{c.delta >= 0 ? '+' : ''}{c.delta}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}