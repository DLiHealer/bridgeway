import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui';

export default function AccessibilityPage() {
  const { t } = useTranslation();
  const list = (key) => t(key, { returnObjects: true });
  return (
    <div className="container-app max-w-3xl space-y-6 py-8">
      <h1 className="text-3xl font-bold">{t('a11y.title')}</h1>
      <p className="text-neutral-700">{t('a11y.intro')}</p>
      <Card className="p-6">
        <h2 className="font-semibold">{t('a11y.doneTitle')}</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-neutral-700">
          {list('a11y.done').map((x) => <li key={x}>{x}</li>)}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold">{t('a11y.limitsTitle')}</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-neutral-700">
          {list('a11y.limits').map((x) => <li key={x}>{x}</li>)}
        </ul>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold">{t('a11y.contactTitle')}</h2>
        <p className="mt-2 text-neutral-700">{t('a11y.contact')}</p>
        <p className="mt-2 text-sm text-neutral-400">{t('a11y.checklist')}</p>
      </Card>
    </div>
  );
}
