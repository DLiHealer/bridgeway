import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext.jsx';
import { Button, Card, Chip, Badge, EmptyState } from '../components/ui';
import { categories, categoryById } from '../data';

export default function IdeasPage() {
  const { t } = useTranslation();
  const { ideas } = useApp();
  const [cat, setCat] = useState('all');
  const [stage, setStage] = useState('all');
  const [sort, setSort] = useState('new');

  const filtered = useMemo(() => {
    let list = ideas.filter(i =>
      (cat === 'all' || i.category === cat) &&
      (stage === 'all' || i.stage === stage)
    );
    if (sort === 'new') list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === 'popular') list = [...list].sort((a, b) => b.teamSize - a.teamSize);
    return list;
  }, [ideas, cat, stage, sort]);

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{t('nav.ideas')}</h1>
          <p className="mt-1 text-neutral-400">Pomysły, które czekają na zespół lub wsparcie.</p>
        </div>
        <Link to="/zglos?tab=idea"><Button><Plus size={16} /> Dodaj pomysł</Button></Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={cat === 'all'} onClick={() => setCat('all')}>Wszystkie</Chip>
        {categories.map(c => <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{c.name}</Chip>)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select value={stage} onChange={e => setStage(e.target.value)} className="h-9 rounded-btn border border-border bg-white px-2 text-sm">
          <option value="all">Każdy etap</option>
          <option value="pomysl">Pomysł</option>
          <option value="szukam-zespolu">Szukam zespołu</option>
          <option value="pilot">Pilot</option>
          <option value="skalowanie">Skalowanie</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="h-9 rounded-btn border border-border bg-white px-2 text-sm">
          <option value="new">Najnowsze</option>
          <option value="popular">Popularne</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8"><EmptyState title={t('common.noResults')} /></div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(i => {
            const c = categoryById(i.category);
            return (
              <Link key={i.id} to={`/pomysly/${i.id}`}>
                <Card hover className="flex h-full flex-col overflow-hidden">
                  <div className="h-32" style={{ background: c.color + '22' }} />
                  <div className="flex flex-1 flex-col p-5">
                    <Badge color={c.color}>{c.name}</Badge>
                    <h3 className="mt-2 font-semibold text-neutral-900">{i.title}</h3>
                    <p className="mt-1 text-xs text-neutral-400">Autor: {i.author}</p>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-400">{i.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full bg-brand-primary" style={{ width: `${(i.teamSize/i.teamTarget)*100}%` }} />
                      </div>
                      <span className="text-xs text-neutral-400">{i.teamSize}/{i.teamTarget}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}