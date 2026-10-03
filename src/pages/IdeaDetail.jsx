import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { categoryById, loc } from '../data';
import { Badge, Button, Card, EmptyState } from '../components/ui';
import { Bookmark } from 'lucide-react';

export default function IdeaDetail() {
  const { id } = useParams();
  const { ideas, data, saveItem, isSaved, user } = useApp();
  const idea = ideas.find(i => i.id === id);
  const navigate = useNavigate();

  if (!idea) {
    return (
      <div className="container-app py-12">
        <EmptyState
          title="Nie znaleziono pomysłu"
          action={<Button onClick={() => navigate('/pomysly')}>Wróć</Button>}
        />
      </div>
    );
  }

  const c = categoryById(idea.category);

  // Жёстко берём первые элементы из данных — без matchAll
  const topExperts = (data.experts || []).slice(0, 2);
  const topSolutions = (data.solutions || []).slice(0, 2);
  const topFundings = (data.fundings || []).slice(0, 2);
  const topNgos = (data.ngos || []).slice(0, 1);

  return (
    <div className="container-app py-8">
      <nav className="text-xs text-neutral-400">
        <Link to="/" className="hover:text-brand-primary">Home</Link>
        {' / '}
        <Link to="/pomysly" className="hover:text-brand-primary">Pomysły</Link>
        {' / '}
        <span>{idea.title}</span>
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge color={c.color}>{c.name}</Badge>
              <Badge color="#FFB020">{idea.stage}</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-bold md:text-3xl">{idea.title}</h1>
            <p className="mt-2 text-sm text-neutral-400">Autor: {idea.author} · {idea.createdAt}</p>
          </div>

          <Card className="p-6">
            <h2 className="font-semibold">Opis</h2>
            <p className="mt-2 text-neutral-700">{idea.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">Zespół</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {(idea.team || []).map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white">
                    {m.name[0]}
                  </span>
                  {m.name} · <span className="text-neutral-400">{m.role}</span>
                </div>
              ))}
            </div>
          </Card>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <p className="text-sm font-semibold">Potrzebujemy</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(idea.needs || []).map(n => <Badge key={n} color="#1E5EFF">{n}</Badge>)}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold">Rekomendowani eksperci</p>
            <div className="mt-3 space-y-2 text-sm">
              {topExperts.map(e => (
                <div key={e.id} className="rounded-btn bg-neutral-100 p-2">
                  <span className="font-medium">{e.name}</span>
                  <span className="text-neutral-400"> · {e.specialization}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold">Podobne przypadki</p>
            <div className="mt-3 space-y-2 text-sm">
              {topSolutions.map(s => (
                <Link
                  key={s.id}
                  to={`/rozwiazania/${s.id}`}
                  className="block rounded-btn bg-neutral-100 p-2 hover:bg-neutral-200"
                >
                  {loc(s.title)}
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold">Pasujące finansowanie</p>
            <div className="mt-3 space-y-2 text-sm">
              {topFundings.map(f => (
                <div key={f.id} className="rounded-btn bg-neutral-100 p-2">
                  {f.name} · <span className="text-neutral-400">{f.amount}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold">Organizacje, które mogą pomóc</p>
            <div className="mt-3 space-y-2 text-sm">
              {topNgos.map(n => (
                <div key={n.id} className="rounded-btn bg-neutral-100 p-2">
                  {n.name} · <span className="text-neutral-400">{n.city}</span>
                </div>
              ))}
            </div>
          </Card>

          <Button variant="ghost" className="w-full" onClick={() => saveItem(idea.id)}>
            <Bookmark size={16} /> {isSaved(idea.id) ? 'Zapisane' : 'Zapisz'}
          </Button>
        </aside>
      </div>

    </div>
  );
}