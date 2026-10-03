import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, Button, EmptyState } from '../components/ui';
import { avatarUrl } from '../utils/formatters';

export default function ExpertDetail() {
  const { id } = useParams();
  const { data } = useApp();
  const e = data.experts.find(x => x.id === id);
  if (!e) return <div className="container-app py-12"><EmptyState title="Nie znaleziono eksperta" /></div>;
  return (
    <div className="container-app py-8">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <img src={avatarUrl(e.name)} alt="" className="h-20 w-20 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold">{e.name}</h1>
                <p className="text-neutral-400">{e.specialization} · {e.city}</p>
                <p className="text-brand-accent">★ {e.rating}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold">Bio</h2>
            <p className="mt-2 text-neutral-700">{e.bio}</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold">Doświadczenie</h2>
            <ul className="mt-3 list-inside list-disc text-sm text-neutral-700">
              <li>15+ lat w sektorze</li>
              <li>Współpraca z NGO i gminami</li>
              <li>Autor publikacji branżowych</li>
            </ul>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold">Kontakt</p>
            <p className="mt-2 text-sm text-neutral-400">{e.email}</p>
            <p className="text-sm text-neutral-400">linkedin.com/in/{e.name.toLowerCase().replace(' ', '-')}</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}