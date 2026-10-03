import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Card, Chip, Button, Badge } from '../components/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function FundingPage() {
  const { t } = useTranslation();
  const { data } = useApp();
  const [type, setType] = useState('all');

  const types = ['all', 'Fundusz Sołecki', 'Budżet Obywatelski', 'EOG', 'Fundusz Sektor 3.0', 'Fundacja'];
  const list = data.fundings.filter(f => type === 'all' || f.source === type || f.name.includes(type));

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">{t('nav.funding')}</h1>
      <p className="mt-1 text-neutral-400">Znajdź grant dla swojego projektu.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {types.map(tp => <Chip key={tp} active={type === tp} onClick={() => setType(tp)}>{tp === 'all' ? 'Wszystkie' : tp}</Chip>)}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {list.map(f => (
          <Card key={f.id} hover className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-neutral-900">{f.name}</h3>
                <p className="text-sm text-neutral-400">{f.source}</p>
              </div>
              <Badge color="#00B894">{f.amount}</Badge>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-neutral-400">
              <span>Termin: {f.deadline}</span>
              <span>Region: {f.region}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}