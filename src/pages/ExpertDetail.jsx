import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Card, EmptyState } from '../components/ui';
import { avatarUrl } from '../utils/formatters';

export default function ExpertDetail() {
  const { t } = useTranslation();
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
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold">Bio</h2>
            <p className="mt-2 text-neutral-700">{e.bio}</p>
          </Card>
          <p className="rounded-btn bg-neutral-100 p-3 text-xs text-neutral-500">{t('common.demoNote')}</p>
        </div>
      </div>
    </div>
  );
}