import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button, Card, Input } from '../ui';

// LLM adaptation plan: items are shown only with verbatim source quotes (checked server-side, worker/adaptPlan.js).
export default function AdaptPlan({ caseId, source }) {
  const { t, i18n } = useTranslation();
  const { account, backend } = useAuth();
  const [city, setCity] = useState('');
  const [state, setState] = useState({ loading: false, plan: null, error: '' });

  const run = async () => {
    setState({ loading: true, plan: null, error: '' });
    try {
      const { plan } = await api.adaptPlan(caseId, city, i18n.language === 'en' ? 'en' : 'pl');
      setState({ loading: false, plan, error: '' });
    } catch (e) {
      const key = e.code === 'llm_unavailable' ? 'unavailable' : e.code === 'rate_limited' ? 'rate' : e.code === 'login_required' ? 'login' : 'error';
      setState({ loading: false, plan: null, error: t(`cases.plan.${key}`) });
    }
  };

  const { plan } = state;
  return (
    <Card className="p-6" aria-labelledby="adapt-title">
      <h2 id="adapt-title" className="font-semibold">{t('cases.plan.title')}</h2>
      <p className="mt-1 text-xs text-neutral-500">{t('cases.plan.hint')}</p>
      {backend === false ? <p className="mt-3 text-sm text-neutral-500">{t('cases.plan.noServer')}</p>
        : !account ? <p className="mt-3 text-sm"><Link to="/logowanie" className="text-brand-primary hover:underline">{t('cases.plan.login')}</Link></p>
        : (
          <div className="mt-3 flex flex-wrap items-end gap-2">
            <label className="text-xs text-neutral-500">{t('cases.plan.city')}
              <Input className="mt-1" value={city} maxLength={60} onChange={e => setCity(e.target.value)} />
            </label>
            <Button onClick={run} disabled={state.loading}>{state.loading ? t('cases.plan.loading') : t('cases.plan.generate')}</Button>
          </div>
        )}
      <div aria-live="polite">
        {state.error && <p className="mt-3 text-sm text-red-700">{state.error}</p>}
        {plan && (plan.items.length === 0 ? <p className="mt-3 text-sm text-neutral-500">{t('cases.plan.empty')}</p> : (
          <ol className="mt-4 space-y-3 text-sm">
            {plan.items.map((it, i) => (
              <li key={i} className="rounded-btn bg-neutral-100 p-3">
                <p className="font-medium text-neutral-800">{i + 1}. {it.action}</p>
                {it.evidence.map((e, k) => (
                  <blockquote key={k} className="mt-2 border-l-2 border-brand-primary/40 pl-3 text-xs text-neutral-600">
                    <span className="block text-neutral-500">{t('cases.plan.quote')} · {t(`cases.plan.fields.${e.field}`, { defaultValue: e.field })}</span>
                    “{e.quote}” — <a href={plan.source.url} target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">{plan.source.label}</a>
                  </blockquote>
                ))}
              </li>
            ))}
          </ol>
        ))}
        {plan && plan.dropped > 0 && <p className="mt-2 text-xs text-neutral-500">{t('cases.plan.dropped', { n: plan.dropped })}</p>}
        {plan && plan.gaps.length > 0 && (
          <p className="mt-2 text-xs text-neutral-500">{t('cases.plan.gaps')}: {plan.gaps.map(g => t(`cases.plan.fields.${g}`)).join(', ')}</p>
        )}
      </div>
    </Card>
  );
}
