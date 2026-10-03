import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { categoryById } from '../data';
import { Button, Card, Badge, EmptyState, Modal, Input } from '../components/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function SolutionDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, addProject } = useApp();
  const s = data.solutions.find(x => x.id === id);
  const [copy, setCopy] = useState(false);
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  if (!s) return <div className="container-app py-12"><EmptyState title="Nie znaleziono rozwiązania" /></div>;

  const c = categoryById(s.category);

  const handleCopy = () => {
    addProject({
      title: `Kopia: ${s.title} — ${city}`,
      status: 'pomysl', progress: 0,
      team: [], tasks: [], budget: [], documents: [],
      deadline: '', kpi: [],
    });
    setCopy(false);
    navigate('/projekty');
  };

  return (
    <div className="container-app py-8">
      <nav className="text-xs text-neutral-400">
        <Link to="/" className="hover:text-brand-primary">Home</Link> / <Link to="/rozwiazania" className="hover:text-brand-primary">Rozwiązania</Link> / <span>{s.title}</span>
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge color="#00B894">Sprawdzone</Badge>
              <Badge color={c.color}>{c.name}</Badge>
              <Badge color="#64748B">{s.city}</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-bold md:text-3xl">{s.title}</h1>
          </div>

          <Card className="p-6"><h2 className="font-semibold">Problem</h2><p className="mt-2 text-neutral-700">{s.problem}</p></Card>
          <Card className="p-6"><h2 className="font-semibold">Rozwiązanie</h2><p className="mt-2 text-neutral-700">{s.solution}</p></Card>

          <Card className="p-6">
            <h2 className="font-semibold">Jak to zrobiliśmy</h2>
            <ol className="mt-3 space-y-2 text-sm">
              {s.steps.map((st, i) => <li key={i} className="flex gap-2"><span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary">{i+1}</span>{st}</li>)}
            </ol>
          </Card>

          <p className="rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('common.demoNote')}</p>

          <Card className="p-6">
            <h2 className="font-semibold">Ryzyka</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">{s.risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Button className="w-full" onClick={() => setCopy(true)}>Skopiuj to u siebie</Button>
          <Card className="p-5">
            <p className="text-sm font-semibold">Podobne rozwiązania</p>
            <div className="mt-2 space-y-2 text-sm">
              {data.solutions.filter(x => x.id !== s.id && x.category === s.category).map(x => (
                <Link key={x.id} to={`/rozwiazania/${x.id}`} className="block rounded-btn bg-neutral-100 p-2 hover:bg-neutral-200">{x.title}</Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      <Modal open={copy} onClose={() => setCopy(false)} title="Skopiuj rozwiązanie">
        <p className="text-sm text-neutral-400">Utworzymy nową komorę projektową dla Twojej gminy.</p>
        <Input className="mt-3" placeholder="Twoje miasto" value={city} onChange={e => setCity(e.target.value)} />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setCopy(false)}>Anuluj</Button>
          <Button onClick={handleCopy} disabled={!city}>Utwórz projekt</Button>
        </div>
      </Modal>
    </div>
  );
}