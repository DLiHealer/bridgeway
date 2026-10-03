import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui';

export default function AboutPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  const FAQ = [
    { q: t('about.faq1q'), a: t('about.faq1a') },
    { q: t('about.faq2q'), a: t('about.faq2a') },
    { q: t('about.faq3q'), a: t('about.faq3a') },
  ];

  return (
    <div className="container-app py-8 space-y-8">
      <h1 className="text-3xl font-bold">{t('about.title')}</h1>

      <Card className="p-6">
        <h2 className="font-semibold">{t('about.missionTitle')}</h2>
        <p className="mt-2 text-neutral-700">{t('about.missionText')}</p>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">{t('about.howTitle')}</h2>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-neutral-700">
          <li>{t('about.howStep1')}</li>
          <li>{t('about.howStep2')}</li>
          <li>{t('about.howStep3')}</li>
          <li>{t('about.howStep4')}</li>
        </ol>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">{t('about.faqTitle')}</h2>
        <div className="mt-3 divide-y divide-border">
          {FAQ.map((f, i) => (
            <div key={i} className="py-3">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium">{f.q}</span>
                <span>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="mt-2 text-sm text-neutral-400">{f.a}</p>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">{t('about.contactTitle')}</h2>
        <p className="mt-2 text-neutral-700">{t('about.contactEmail')}</p>
      </Card>
    </div>
  );
}