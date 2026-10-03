import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const pl = {
  nav: {
    map: 'Mapa', ideas: 'Pomysły', solutions: 'Rozwiązania', experts: 'Eksperci',
    funding: 'Finansowanie', projects: 'Projekty', about: 'O nas', analytics: 'Analityka',
    profile: 'Profil', search: 'Szukaj', add: 'Dodaj', login: 'Zaloguj',
  },
  cta: {
    submit: 'Zgłoś problem', propose: 'Zaproponuj pomysł', join: 'Przyłącz się',
    joinTeam: 'Przyłącz się do zespołu', seeAll: 'Zobacz wszystkie', openMap: 'Otwórz mapę',
    startNow: 'Zacznij teraz', details: 'Szczegóły', more: 'Dowiedz się więcej',
    write: 'Napisz', save: 'Zapisz', copy: 'Skopiuj to u siebie',
    clearFilters: 'Wyczyść filtry', showMore: 'Pokaż więcej', back: 'Powrót',
  },
  home: {
    heroTitle: 'Most między problemem a rozwiązaniem',
    heroSub: 'BridgeWay łączy mieszkańców, ekspertów i organizacje, aby dobre pomysły nie ginęły',
    howItWorks: 'Jak to działa',
    step1Title: 'Zgłoś', step1Text: 'Wskaż problem na mapie',
    step2Title: 'Połącz', step2Text: 'Dopasujemy ekspertów i NGO',
    step3Title: 'Wymyśl', step3Text: 'Wspólnie wypracujcie rozwiązanie',
    step4Title: 'Sprawdź', step4Text: 'Pilotuj i mierz efekty',
    step5Title: 'Skaluj', step5Text: 'Kopiuj do innych miejsc',
    featuredIdeas: 'Wyróżnione pomysły', featuredSolutions: 'Zweryfikowane przypadki',
    mapTeaserTitle: 'Mapa problemów i pomysłów',
    mapTeaserSub: 'Zobacz, co dzieje się w Twojej okolicy i włącz się w działanie.',
    forInstitutions: 'Dla instytucji', partners: 'Partnerzy',
    ctaFinal: 'Nie czekaj. Twój pomysł może zmienić czyjeś życie',
  },
  projects: {
    title: 'Moje projekty', empty: 'Nie masz jeszcze projektów.', emptyHint: 'Zacznij od sprawdzonego rozwiązania i skopiuj je do swojej gminy.', browse: 'Przeglądaj rozwiązania',
    tasks: 'zadań', progress: 'Postęp', fromSolution: 'Na podstawie przypadku', back: 'Wszystkie projekty', notFound: 'Nie znaleziono projektu',
    noTasks: 'Brak zadań', noBudget: 'Brak pozycji budżetu', noDocs: 'Brak dokumentów', noTeam: 'Brak członków zespołu', noDeadline: 'nie ustalono',
    copyTitle: 'Skopiuj rozwiązanie', copyHint: 'Utworzymy nowy projekt dla Twojej gminy z krokami z tego rozwiązania jako zadaniami.', yourCity: 'Twoje miasto', create: 'Utwórz projekt', copyPrefix: 'Kopia',
    status: { pomysl: 'Pomysł', pilot: 'Pilotaż', wdrozenie: 'Wdrożenie' },
  },
  cases: {
    subtitle: 'Zweryfikowane przypadki ze źródłem i poziomem dowodów. Nie są to „sprawdzone gwarancje” — poziom dowodów mówi, jak mocno poparto wynik.',
    evidence: 'Dowody', source: 'Źródło', organisation: 'Organizacja', cost: 'Koszt', duration: 'Czas', outcome: 'Wynik', outcomeMethod: 'Jak zmierzono', context: 'Kontekst', year: 'Rok',
    notStated: 'nie podano w źródle', notMeasured: 'nie zmierzono', route: 'Ścieżka', stepsTitle: 'Kroki', problem: 'Problem', solution: 'Rozwiązanie', similar: 'Podobne przypadki',
    levelA: 'A — przegląd systematyczny', levelB: 'B — badanie kontrolowane', levelC: 'C — ewaluacja / wynik bez grupy kontrolnej', levelD: 'D — tylko wyniki bezpośrednie',
    legend: 'Poziomy dowodów: A przegląd systematyczny · B badanie kontrolowane · C ewaluacja lub wynik bez kontroli · D tylko wyniki bezpośrednie (brak zmierzonego efektu).',
    notFound: 'Nie znaleziono przypadku',
    defaultSteps: ['Zapoznaj się ze źródłem i kontekstem przypadku', 'Ustal podmiot odpowiedzialny w Twojej gminie', 'Dostosuj budżet i harmonogram do swojej sytuacji', 'Zaplanuj sposób pomiaru efektu'],
  },
  analytics: { signals: 'Sygnały', ideas: 'Pomysły', projects: 'Projekty', byCategory: 'Sygnały według kategorii' },
  common: {
    all: 'Wszystko', problems: 'Problemy', ideas: 'Pomysły',
    category: 'Kategoria', city: 'Miasto', status: 'Status', urgency: 'Pilność',
    search: 'Szukaj', noResults: 'Brak wyników', loading: 'Ładowanie…',
    send: 'Wyślij', cancel: 'Anuluj', close: 'Zamknij', author: 'Autor',
    demo: 'Dane demo', demoNote: 'Dane demonstracyjne — przykładowe, niezweryfikowane. Nie są prawdziwymi osobami, organizacjami ani wynikami.', localData: 'Dane lokalne w Twojej przeglądarce — nie są udostępniane ani zweryfikowane.', budget: 'Budżet', duration: 'Czas', suggestions: 'Podpowiedzi', suggestionsHint: 'Dopasowanie po kategorii i słowach kluczowych (bez AI).', needs: 'Potrzeby', stage: 'Etap', team: 'Zespół',
    budget: 'Budżet', deadline: 'Termin', region: 'Region', amount: 'Kwota', source: 'Źródło',
  },
  urgency: { low: 'Niska', medium: 'Średnia', high: 'Wysoka', critical: 'Krytyczna' },
  stage: { idea: 'Pomysł', team: 'Szukam zespołu', pilot: 'Pilot', scale: 'Skalowanie' },
  needs: { expert: 'Ekspert', funding: 'Finansowanie', team: 'Zespół', place: 'Lokal' },
  statuses: { new: 'Nowe', inprogress: 'W toku', done: 'Zrealizowane' },
  footer: {
    platform: 'Platforma', forWho: 'Dla kogo', about: 'O projekcie',
    residents: 'Mieszkańcom', activists: 'Aktywistom', ngos: 'NGO',
    cities: 'Gminom', funds: 'Funduszom',
    contact: 'Kontakt', privacy: 'Polityka prywatności', terms: 'Regulamin',
    madeFor: 'Stworzone na HackYeah',
  },
};

const en = {
  nav: {
    map: 'Map', ideas: 'Ideas', solutions: 'Solutions', experts: 'Experts',
    funding: 'Funding', projects: 'Projects', about: 'About', analytics: 'Analytics',
    profile: 'Profile', search: 'Search', add: 'Add', login: 'Log in',
  },
  cta: {
    submit: 'Report a problem', propose: 'Propose an idea', join: 'Join',
    joinTeam: 'Join the team', seeAll: 'See all', openMap: 'Open map',
    startNow: 'Start now', details: 'Details', more: 'Learn more',
    write: 'Write', save: 'Save', copy: 'Copy this',
    clearFilters: 'Clear filters', showMore: 'Show more', back: 'Back',
  },
  home: {
    heroTitle: 'A bridge between problem and solution',
    heroSub: 'BridgeWay connects citizens, experts, and organisations so good ideas don’t get lost',
    howItWorks: 'How it works',
    step1Title: 'Report', step1Text: 'Point out the problem on the map',
    step2Title: 'Connect', step2Text: 'We match experts and NGOs',
    step3Title: 'Ideate', step3Text: 'Co-create a solution together',
    step4Title: 'Verify', step4Text: 'Pilot and measure the impact',
    step5Title: 'Scale', step5Text: 'Copy to other places',
    featuredIdeas: 'Featured ideas', featuredSolutions: 'Verified cases',
    mapTeaserTitle: 'Map of problems and ideas',
    mapTeaserSub: 'See what’s happening in your area and get involved.',
    forInstitutions: 'For institutions', partners: 'Partners',
    ctaFinal: 'Don’t wait. Your idea can change someone’s life',
  },
  projects: {
    title: 'My projects', empty: 'You have no projects yet.', emptyHint: 'Start from a proven solution and copy it to your municipality.', browse: 'Browse solutions',
    tasks: 'tasks', progress: 'Progress', fromSolution: 'Based on case', back: 'All projects', notFound: 'Project not found',
    noTasks: 'No tasks', noBudget: 'No budget items', noDocs: 'No documents', noTeam: 'No team members', noDeadline: 'not set',
    copyTitle: 'Copy solution', copyHint: 'We will create a new project for your municipality with this solution’s steps as tasks.', yourCity: 'Your city', create: 'Create project', copyPrefix: 'Copy',
    status: { pomysl: 'Idea', pilot: 'Pilot', wdrozenie: 'Rollout' },
  },
  cases: {
    subtitle: 'Verified cases with a source and an evidence level. These are not “proven guarantees” — the level shows how strongly the outcome is supported.',
    evidence: 'Evidence', source: 'Source', organisation: 'Organisation', cost: 'Cost', duration: 'Duration', outcome: 'Outcome', outcomeMethod: 'How measured', context: 'Context', year: 'Year',
    notStated: 'not stated in the source', notMeasured: 'not measured', route: 'Route', stepsTitle: 'Steps', problem: 'Problem', solution: 'Solution', similar: 'Similar cases',
    levelA: 'A — systematic review', levelB: 'B — controlled study', levelC: 'C — evaluation / outcome without control', levelD: 'D — outputs only',
    legend: 'Evidence levels: A systematic review · B controlled study · C evaluation or outcome without a control · D outputs only (no measured effect).',
    notFound: 'Case not found',
    defaultSteps: ['Read the source and the case context', 'Identify the responsible body in your municipality', 'Adapt budget and timeline to your situation', 'Plan how to measure the outcome'],
  },
  analytics: { signals: 'Signals', ideas: 'Ideas', projects: 'Projects', byCategory: 'Signals by category' },
  common: {
    all: 'All', problems: 'Problems', ideas: 'Ideas',
    category: 'Category', city: 'City', status: 'Status', urgency: 'Urgency',
    search: 'Search', noResults: 'No results', loading: 'Loading…',
    send: 'Send', cancel: 'Cancel', close: 'Close', author: 'Author',
    demo: 'Demo data', demoNote: 'Demo data — illustrative and unverified. Not real people, organisations or results.', localData: 'Local data in your browser — not shared, not verified.', budget: 'Budget', duration: 'Duration', suggestions: 'Suggestions', suggestionsHint: 'Matched by category and keywords (no AI).', needs: 'Needs', stage: 'Stage', team: 'Team',
    budget: 'Budget', deadline: 'Deadline', region: 'Region', amount: 'Amount', source: 'Source',
  },
  urgency: { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' },
  stage: { idea: 'Idea', team: 'Looking for team', pilot: 'Pilot', scale: 'Scaling' },
  needs: { expert: 'Expert', funding: 'Funding', team: 'Team', place: 'Venue' },
  statuses: { new: 'New', inprogress: 'In progress', done: 'Done' },
  footer: {
    platform: 'Platform', forWho: 'For whom', about: 'About',
    residents: 'Residents', activists: 'Activists', ngos: 'NGOs',
    cities: 'Municipalities', funds: 'Funds',
    contact: 'Contact', privacy: 'Privacy policy', terms: 'Terms',
    madeFor: 'Made at HackYeah',
  },
};

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('bridgeart-lang') : null;

i18n.use(initReactI18next).init({
  resources: { pl: { translation: pl }, en: { translation: en } },
  lng: stored || 'pl',
  fallbackLng: 'pl',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem('bridgeart-lang', lng); } catch {}
  document.documentElement.lang = lng;
});

// Глобальный доступ к текущему языку для хелперов (например, categoryName)
if (typeof window !== 'undefined') {
  window.__i18nLang = i18n.language;
}
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') window.__i18nLang = lng;
});
export default i18n;