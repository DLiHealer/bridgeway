import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, Badge } from '../components/ui';
import { avatarUrl, initials } from '../utils/formatters';
import { useTranslation } from 'react-i18next';

export default function ExpertsPage() {
  const { t } = useTranslation();
  const { data } = useApp();
  const [tab, setTab] = useState('experts');

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('nav.experts')}</h1>
      <div className="mt-4 flex gap-2">
        <Chip active={tab === 'experts'} onClick={() => setTab('experts')}>Eksperci</Chip>
        <Chip active={tab === 'ngos'} onClick={() => setTab('ngos')}>Organizacje</Chip>
      </div>

      {tab === 'experts' ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.experts.map(e => (
            <Card key={e.id} hover className="p-5 text-center">
              <img src={avatarUrl(e.name)} alt="" className="mx-auto h-16 w-16 rounded-full" />
              <h3 className="mt-3 font-semibold text-neutral-900">{e.name}</h3>
              <p className="text-sm text-neutral-400">{e.specialization}</p>
              <p className="mt-1 text-xs text-neutral-400">{e.city}</p>
              <p className="mt-2 text-sm font-medium text-brand-accent">★ {e.rating}</p>
              <Button as={Link} to={`/eksperci/${e.id}`} size="sm" variant="secondary" className="mt-3 w-full">{t('cta.more')}</Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.ngos.map(n => (
            <Card key={n.id} hover className="p-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary/10 text-xl font-bold text-brand-secondary">{initials(n.name)}</div>
              <h3 className="mt-3 font-semibold text-neutral-900">{n.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{n.mission}</p>
              <p className="mt-1 text-xs text-neutral-400">{n.city} · {n.projects} projektów</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}