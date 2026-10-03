import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Badge, EvidenceBadge, Select } from '../components/ui';
import { cities, categories, categoryById, categoryName, loc } from '../data';
import { scoreCase } from '../utils/transferScore';
import { useTranslation } from 'react-i18next';

export default function SolutionsPage() {
  const { t } = useTranslation();
  const { data } = useApp();
  const [cat, setCat] = useState('all');
  const [city, setCity] = useState('');

  const query = [cat === 'all' ? '' : `cat=${cat}`, city && `city=${encodeURIComponent(city)}`].filter(Boolean).join('&');

  const list = useMemo(() => data.solutions
    .map(s => ({ ...s, transfer: scoreCase(s, { category: cat === 'all' ? '' : cat, city }) }))
    .filter(s => cat === 'all' || s.category === cat)
    .sort((a, b) => (b.transfer.score ?? -1) - (a.transfer.score ?? -1)), [cat, city, data.solutions]);

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('nav.solutions')}</h1>
      <p className="mt-1 text-neutral-400">{t('cases.subtitle')}</p>
      <p className="mt-2 text-xs text-neutral-500">{t('cases.legend')}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={cat === 'all'} onClick={() => setCat('all')}>{t('common.all')}</Chip>
        {categories.map(c => <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{categoryName(c)}</Chip>)}
      </div>

      <div className="mt-4 max-w-xs">
        <label htmlFor="ctx-city" className="text-xs text-neutral-500">{t('score.cityLabel')}</label>
        <Select id="ctx-city" value={city} onChange={e => setCity(e.target.value)}>
          <option value="">—</option>
          {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </Select>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {list.map(s => (
          <Link key={s.id} to={`/rozwiazania/${s.id}${query ? `?${query}` : ''}`}>
            <Card hover className="h-full p-5">
              <div className="flex items-center gap-2">
                <EvidenceBadge level={s.evidenceLevel} label={`${t('cases.evidence')} ${s.evidenceLevel}`} />
                {s.kind === 'route' && <Badge color="#64748B">{t('cases.route')}</Badge>}
                <Badge color="#64748B">{t('score.title')}: {s.transfer.score === null ? t('score.noData') : `${s.transfer.score}${s.transfer.preliminary ? '*' : ''}`}</Badge>
                <Badge color={categoryById(s.category).color}>{categoryName(categoryById(s.category))}</Badge>
              </div>
              <h3 className="mt-3 font-semibold text-neutral-900">{loc(s.title)}</h3>
              <p className="mt-1 text-sm text-neutral-400">{s.city}, {s.year}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-neutral-400">
                <div><p className="text-neutral-900 font-medium">{loc(s.cost) || t('cases.notStated')}</p><p>{t('cases.cost')}</p></div>
                <div><p className="text-neutral-900 font-medium">{loc(s.duration) || t('cases.notStated')}</p><p>{t('cases.duration')}</p></div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}