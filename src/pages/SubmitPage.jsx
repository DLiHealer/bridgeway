import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useApp } from '../context/AppContext.jsx';
import { Button, Card, Chip, Input, Textarea, Select, Modal } from '../components/ui';
import { categories, cities, loc } from '../data';
import { matchAll } from '../utils/matching';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SubmitPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get('tab') === 'idea' ? 'idea' : 'problem');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const { addSignal, addIdea, data } = useApp();
  const navigate = useNavigate();

  const title = watch('title', '');
  const category = watch('category', '');
  const city = watch('city', '');

  const hasInput = (title?.length || 0) >= 3 && !!category;
  const matches = hasInput ? matchAll({ title, category, city, tags }, data) : null;

  const onSubmit = (values) => {
    const payload = {
      ...values,
      tags,
      category: values.category,
      city: values.city,
      type: tab,
      urgency: values.urgency || 'średnia',
      stage: 'pomysl',
      needs: [],
      coords: cities.find(c => c.name === values.city)?.coords || [52.2, 21],
    };
    if (tab === 'idea') addIdea(payload); else addSignal(payload);
    setSuccess(true);
    reset();
    setTags([]);
  };

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold md:text-3xl">Zgłoś problem lub pomysł</h1>
      <div className="mt-6 flex gap-2">
        {['problem', 'idea'].map(x => (
          <Chip key={x} active={tab === x} onClick={() => setTab(x)}>
            {x === 'problem' ? 'Problem' : 'Pomysł'}
          </Chip>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Card className="p-5">
            <label className="block text-sm font-medium">Tytuł *</label>
            <Input {...register('title', { required: true, maxLength: 100 })} className="mt-2" placeholder="Krótki tytuł" />

            <label className="mt-4 block text-sm font-medium">Opis *</label>
            <Textarea rows={5} maxLength={1000} {...register('description', { required: true })} className="mt-2" placeholder="Opisz problem lub pomysł…" />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Kategoria *</label>
                <Select {...register('category', { required: true })} className="mt-2">
                  <option value="">Wybierz…</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium">Miasto *</label>
                <Select {...register('city', { required: true })} className="mt-2">
                  <option value="">Wybierz…</option>
                  {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Tagi</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map(tg => (
                  <Chip key={tg} onClick={() => setTags(t => t.filter(x => x !== tg))}>{tg} ✕</Chip>
                ))}
              </div>
              <Input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (tagInput.trim()) { setTags(t => [...t, tagInput.trim()]); setTagInput(''); }
                  }
                }}
                placeholder="Dodaj tag i Enter" className="mt-2" />
            </div>

            {tab === 'problem' && (
              <div className="mt-4">
                <label className="block text-sm font-medium">Pilność</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['niska', 'średnia', 'wysoka', 'krytyczna'].map(u => (
                    <label key={u} className="flex items-center gap-2 rounded-btn border border-border px-3 py-2 text-sm">
                      <input type="radio" value={u} {...register('urgency')} defaultChecked={u === 'średnia'} /> {u}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button type="submit">Opublikuj</Button>
          </div>
        </form>

        <aside className="space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-neutral-900">{t('common.suggestions')}</p>
            <p className="mt-1 text-xs text-neutral-400">{t('common.suggestionsHint')}</p>

            {!hasInput && (
              <p className="mt-2 text-xs text-neutral-400">
                Wpisz tytuł lub wybierz kategorię — pokażemy dopasowania.
              </p>
            )}

            {matches && (
              <div className="mt-3 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-neutral-500">
                    {tab === 'problem' ? 'Podobne problemy i rozwiązania' : 'Może szukasz tego?'}
                  </p>
                  {matches.solutions.filter(s => s.score > 0).slice(0, 3).length > 0 ? (
                    matches.solutions.filter(s => s.score > 0).slice(0, 3).map(s => (
                      <div key={s.id} className="mt-1 rounded-btn bg-neutral-100 p-2 text-xs">
                        {loc(s.title)} <span className="text-neutral-400">· {t('cases.evidence')} {s.evidenceLevel}</span>
                      </div>
                    ))
                  ) : (
                    <p className="mt-1 text-xs text-neutral-400">Brak trafień w tej kategorii.</p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-500">
                    {tab === 'problem' ? 'Osoby, które pomogą w rozwiązaniu' : 'Osoby, które pomogą w rozwoju'}
                  </p>
                  {matches.experts.filter(e => e.score > 0).slice(0, 2).length > 0 ? (
                    matches.experts.filter(e => e.score > 0).slice(0, 2).map(e => (
                      <div key={e.id} className="mt-1 text-xs">
                        <span className="font-medium">{e.name}</span>
                        <span className="text-neutral-400"> — {e.specialization}</span>
                      </div>
                    ))
                  ) : (
                    <p className="mt-1 text-xs text-neutral-400">Brak dopasowanych ekspertów.</p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-500">
                    {tab === 'problem' ? 'Możliwe źródła finansowania' : 'Pasujące finansowanie'}
                  </p>
                  {matches.fundings.filter(f => f.score > 0).slice(0, 2).length > 0 ? (
                    matches.fundings.filter(f => f.score > 0).slice(0, 2).map(f => (
                      <div key={f.id} className="mt-1 text-xs">
                        <span className="font-medium">{f.name}</span>
                        <span className="text-neutral-400"> — {f.amount}</span>
                      </div>
                    ))
                  ) : (
                    <p className="mt-1 text-xs text-neutral-400">Brak pasujących grantów.</p>
                  )}
                </div>
              </div>
            )}
          </Card>
        </aside>
      </div>

      <Modal open={success} onClose={() => setSuccess(false)} title="Dziękujemy!">
        <p className="text-sm text-neutral-700">Twoje zgłoszenie zostało dodane.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => { setSuccess(false); navigate('/mapa'); }}>Przejdź do mapy</Button>
          <Button variant="secondary" onClick={() => setSuccess(false)}>Dodaj kolejny</Button>
        </div>
      </Modal>
    </div>
  );
}