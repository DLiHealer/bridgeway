import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-16 border-t border-border bg-neutral-100">
      <div className="container-app grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="" className="h-7 w-7" />
            <span className="font-bold text-neutral-900">BridgeWay</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-neutral-400">Most między problemem a rozwiązaniem.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-neutral-900">{t('footer.platform')}</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link className="hover:text-brand-primary" to="/mapa">{t('nav.map')}</Link></li>
            <li><Link className="hover:text-brand-primary" to="/pomysly">{t('nav.ideas')}</Link></li>
            <li><Link className="hover:text-brand-primary" to="/rozwiazania">{t('nav.solutions')}</Link></li>
            <li><Link className="hover:text-brand-primary" to="/eksperci">{t('nav.experts')}</Link></li>
            <li><Link className="hover:text-brand-primary" to="/finansowanie">{t('nav.funding')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-neutral-900">{t('footer.forWho')}</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>{t('footer.residents')}</li>
            <li>{t('footer.activists')}</li>
            <li>{t('footer.ngos')}</li>
            <li>{t('footer.cities')}</li>
            <li>{t('footer.funds')}</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-neutral-900">{t('footer.about')}</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link className="hover:text-brand-primary" to="/o-nas">{t('nav.about')}</Link></li>
            <li>{t('footer.contact')}</li>
            <li>{t('footer.privacy')}</li>
            <li>{t('footer.terms')}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-neutral-400">
        © 2026 BridgeWay. {t('footer.madeFor')}.
      </div>
    </footer>
  );
}