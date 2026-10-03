import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Lightbulb, CheckCircle2, MapPin, Users, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Button, Card, Badge } from '../components/ui';
import { categoryById } from '../data';
import MapView from '../components/map/MapView';

export default function Home() {
  const { t } = useTranslation();
  const { signals, ideas, data } = useApp();

  const steps = [
    { icon: MapPin, title: t('home.step1Title'), text: t('home.step1Text') },
    { icon: Users, title: t('home.step2Title'), text: t('home.step2Text') },
    { icon: Lightbulb, title: t('home.step3Title'), text: t('home.step3Text') },
    { icon: CheckCircle2, title: t('home.step4Title'), text: t('home.step4Text') },
    { icon: Sparkles, title: t('home.step5Title'), text: t('home.step5Text') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-neutral-900 text-white">
        <div className="container-app grid gap-8 py-16 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">{t('home.heroTitle')}</h1>
            <p className="mt-4 max-w-xl text-white/80 md:text-lg">{t('home.heroSub')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/zglos"><Button size="lg" variant="light"><Plus size={18} /> {t('cta.submit')}</Button></Link>
              <Link to="/zglos?tab=idea"><Button size="lg" variant="ghost" className="border border-white/30 text-white hover:bg-white/10"><Lightbulb size={18} /> {t('cta.propose')}</Button></Link>
            </div>
          </div>
          <div className="hidden min-w-0 overflow-hidden rounded-card lg:block">
            <MapView items={signals.slice(0, 6)} height="320px" zoom={5} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-app py-16">
        <h2 className="text-2xl font-bold md:text-3xl">{t('home.howItWorks')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <Card key={s.title} className="p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <s.icon size={20} />
              </div>
              <p className="text-xs font-semibold text-neutral-400">0{i + 1}</p>
              <p className="mt-1 font-semibold text-neutral-900">{s.title}</p>
              <p className="mt-1 text-sm text-neutral-400">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured ideas */}
      <section className="container-app pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">{t('home.featuredIdeas')}</h2>
          <Link to="/pomysly" className="text-sm font-medium text-brand-primary hover:underline">
            {t('cta.seeAll')} →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ideas.slice(0, 3).map(i => (
            <Link key={i.id} to={`/pomysly/${i.id}`}>
              <Card hover className="h-full overflow-hidden">
                <div className="h-32" style={{ background: categoryById(i.category).color + '22' }} />
                <div className="p-5">
                  <Badge color={categoryById(i.category).color}>{categoryById(i.category).name}</Badge>
                  <h3 className="mt-2 font-semibold text-neutral-900">{i.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{i.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured solutions */}
      <section className="container-app pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">{t('home.featuredSolutions')}</h2>
          <Link to="/rozwiazania" className="text-sm font-medium text-brand-primary hover:underline">
            {t('cta.seeAll')} →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {data.solutions.slice(0, 3).map(s => (
            <Link key={s.id} to={`/rozwiazania/${s.id}`}>
              <Card hover className="h-full p-5">
                <div className="flex items-center gap-2">
                  <Badge color="#64748B">{t('common.demo')}</Badge>
                  <Badge color={categoryById(s.category).color}>{categoryById(s.category).name}</Badge>
                </div>
                <h3 className="mt-3 font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-400">{s.city}</p>
                <p className="mt-3 text-sm text-neutral-400">{s.budget} · {s.duration}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Map teaser */}
      <section className="container-app pb-16">
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="min-w-0 p-8">
              <h2 className="text-2xl font-bold">{t('home.mapTeaserTitle')}</h2>
              <p className="mt-2 text-neutral-400">{t('home.mapTeaserSub')}</p>
              <Link to="/mapa" className="mt-6 inline-block">
                <Button>{t('cta.openMap')}</Button>
              </Link>
            </div>
            <div className="h-72 min-w-0 lg:h-auto">
              <MapView items={signals.slice(0, 6)} zoom={5} />
            </div>
          </div>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="container-app pb-16">
        <div className="rounded-card bg-neutral-900 p-10 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">{t('home.ctaFinal')}</h2>
          <Link to="/zglos" className="mt-6 inline-block">
            <Button size="lg">{t('cta.startNow')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}