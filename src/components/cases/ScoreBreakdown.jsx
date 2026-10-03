import { useTranslation } from 'react-i18next';
import { Card } from '../ui';

export default function ScoreBreakdown({ transfer, compact = false }) {
  const { t } = useTranslation();
  const { score, preliminary, factors } = transfer;
  return (
    <Card className="p-5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">{t('score.title')}</p>
        <p className="text-lg font-bold">{score === null ? t('score.noData') : `${score}/100`}</p>
      </div>
      {preliminary && <p className="mt-1 text-xs text-amber-700">{t('score.preliminary')}</p>}
      <ul className="mt-3 space-y-1.5 text-xs">
        {factors.map(f => (
          <li key={f.id} className="flex flex-wrap justify-between gap-x-2">
            <span className="text-neutral-700">{t(`score.f.${f.id}`)} <span className="text-neutral-400">({f.weight}%)</span></span>
            <span className={f.value === null ? 'text-neutral-400' : 'font-medium text-neutral-900'}>
              {f.value === null ? t('score.noData') : `${Math.round(f.value * 100)}%`}
            </span>
            {!compact && <span className="w-full text-neutral-400">{f.value === null ? t(`score.why.${f.id}`) : t(`score.src.${f.source}`)}</span>}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-neutral-400">{t('score.note')}</p>
    </Card>
  );
}
