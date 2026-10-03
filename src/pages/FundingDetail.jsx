import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Button, Card, Badge, EmptyState } from '../components/ui';

export default function FundingDetail() {
  const { id } = useParams();
  const { data, addProject, user } = useApp();
  const f = data.fundings.find(x => x.id === id);
  const navigate = useNavigate();

  if (!f) {
    return (
      <div className="container-app py-12">
        <EmptyState
          title="Nie znaleziono grantu"
          action={<Button onClick={() => navigate('/finansowanie')}>Wróć do listy</Button>}
        />
      </div>
    );
  }

  const handleAdd = () => {
    addProject({
      title: `Projekt: ${f.name}`,
      status: 'pomysl',
      progress: 0,
      team: [{ name: user.name, role: 'lider' }],
      tasks: [],
      budget: [],
      documents: [],
      deadline: f.deadline,
      kpi: [],
    });
    navigate('/projekty');
  };

  return (
    <div className="container-app py-8">
      <nav className="text-xs text-neutral-400">
        <Link to="/" className="hover:text-brand-primary">Home</Link>{' / '}
        <Link to="/finansowanie" className="hover:text-brand-primary">Finansowanie</Link>{' / '}
        <span>{f.name}</span>
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <Badge color="#00B894">{f.amount}</Badge>
            <h1 className="mt-3 text-2xl font-bold md:text-3xl">{f.name}</h1>
            <p className="mt-2 text-sm text-neutral-400">{f.source} · {f.region}</p>
          </div>

          <Card className="p-6">
            <h2 className="font-semibold">Opis</h2>
            <p className="mt-2 text-neutral-700">
              Program grantowy wspierający lokalne inicjatywy. Szczegółowy opis zależy od źródła
              finansowania — sprawdź stronę grantu, aby poznać pełne warunki.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">Wymagania</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">
              {(f.requirements || []).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">Checklista</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {(f.checklist || []).map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" /> <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <p className="text-sm text-neutral-400">Termin składania</p>
            <p className="text-lg font-semibold">{f.deadline}</p>
          </Card>
          <Button className="w-full" onClick={handleAdd}>Dodaj do mojego projektu</Button>
          <a href={f.url} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="secondary" className="w-full">Otwórz stronę grantu ↗</Button>
          </a>
        </aside>
      </div>
    </div>
  );
}