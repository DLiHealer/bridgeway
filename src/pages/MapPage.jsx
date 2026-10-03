import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import MapView from '../components/map/MapView.jsx';
import { Chip, Input, Card, Badge, Button } from '../components/ui';
import { categories, categoryById } from '../data';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MapPage() {
  const { t } = useTranslation();
  const { signals, ideas, filters, setFilters, clearFilters } = useApp();
  const [sheet, setSheet] = useState(false);

  const all = useMemo(() => [
    ...signals.map(s => ({ ...s, type: 'problem' })),
    ...ideas.map(i => ({ ...i, type: 'idea' })),
  ], [signals, ideas]);

  const filtered = useMemo(() => all.filter(i =>
    (filters.type === 'all' || i.type === filters.type) &&
    (filters.categories.length === 0 || filters.categories.includes(i.category)) &&
    (!filters.city || i.city === filters.city) &&
    (!filters.q || i.title.toLowerCase().includes(filters.q.toLowerCase()))
  ), [all, filters]);

  const toggleCat = (id) => {
    const s = new Set(filters.categories);
    s.has(id) ? s.delete(id) : s.add(id);
    setFilters({ categories: [...s] });
  };

  const Sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <Input placeholder={t('common.search') + '…'} value={filters.q} onChange={e => setFilters({ q: e.target.value })} />
        <div className="mt-3 flex flex-wrap gap-2">
          {['all', 'problem', 'idea'].map(v => (
            <Chip key={v} active={filters.type === v} onClick={() => setFilters({ type: v })}>
              {v === 'all' ? t('common.all') : v === 'problem' ? t('common.problems') : t('common.ideas')}
            </Chip>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map(c => (
            <Chip key={c.id} active={filters.categories.includes(c.id)} onClick={() => toggleCat(c.id)}>{c.name}</Chip>
          ))}
        </div>
        <button onClick={clearFilters} className="mt-3 text-xs font-medium text-brand-primary hover:underline">{t('cta.clearFilters')}</button>
      </div>
      <div className="scrollbar-thin flex-1 overflow-y-auto p-4">
        <p className="mb-2 text-xs text-neutral-400">{filtered.length} wyników</p>
        <div className="space-y-3">
          {filtered.map(i => (
            <Card key={i.id} className="p-4">
              <div className="flex items-center gap-2">
                <Badge color={categoryById(i.category).color}>{categoryById(i.category).name}</Badge>
                {i.type === 'idea' && <Badge color="#FFB020">Pomysł</Badge>}
              </div>
              <p className="mt-2 font-semibold text-neutral-900">{i.title}</p>
              <p className="text-xs text-neutral-400">{i.city}</p>
              <Link to={i.type === 'idea' ? `/pomysly/${i.id}` : `/mapa`} className="mt-2 inline-block text-sm font-medium text-brand-primary hover:underline">Szczegóły →</Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-56px)] lg:h-[calc(100vh-64px)]">
      <aside className="hidden w-[360px] border-r border-border bg-white lg:block">{Sidebar}</aside>
      <div className="relative flex-1">
        <MapView items={filtered} zoom={6} />
        <button onClick={() => setSheet(true)} className="absolute bottom-4 left-4 z-[400] rounded-full bg-white px-4 py-2 text-sm font-medium shadow-md lg:hidden">
          Filtry i lista ({filtered.length})
        </button>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-[500] lg:hidden">
          <div className="absolute inset-0 bg-neutral-900/40" onClick={() => setSheet(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] rounded-t-modal bg-white">
            <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-neutral-400" />
            {Sidebar}
          </div>
        </div>
      )}
    </div>
  );
}