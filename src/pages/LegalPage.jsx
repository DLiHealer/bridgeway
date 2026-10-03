import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui';

// Shared page for /prywatnosc (kind="privacy") and /regulamin (kind="terms").
export default function LegalPage({ kind }) {
  const { t } = useTranslation();
  const sections = t(`legal.${kind}`, { returnObjects: true });
  return (
    <div className="container-app max-w-3xl space-y-6 py-8">
      <h1 className="text-3xl font-bold">{t(`legal.${kind}Title`)}</h1>
      <p className="text-sm text-neutral-400">{t('legal.demo')}</p>
      {sections.map((s) => (
        <Card key={s.h} className="p-6">
          <h2 className="font-semibold">{s.h}</h2>
          <p className="mt-2 text-neutral-700">{s.p}</p>
        </Card>
      ))}
    </div>
  );
}
