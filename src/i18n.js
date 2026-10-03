import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const pl = {
  nav: {
    map: 'Mapa', ideas: 'Pomysły', solutions: 'Rozwiązania', experts: 'Eksperci',
    funding: 'Finansowanie', projects: 'Projekty', about: 'O nas', analytics: 'Analityka',
    profile: 'Profil', search: 'Szukaj', add: 'Dodaj', login: 'Zaloguj',
  },
  cta: {
    findCase: 'Znajdź rozwiązanie', submit: 'Zgłoś problem', propose: 'Zaproponuj pomysł', join: 'Przyłącz się',
    joinTeam: 'Przyłącz się do zespołu', seeAll: 'Zobacz wszystkie', openMap: 'Otwórz mapę',
    startNow: 'Zacznij teraz', details: 'Szczegóły', more: 'Dowiedz się więcej',
    write: 'Napisz', save: 'Zapisz', copy: 'Skopiuj to u siebie',
    clearFilters: 'Wyczyść filtry', showMore: 'Pokaż więcej', back: 'Powrót',
  },
  home: {
    heroTitle: 'Problem został już gdzieś rozwiązany.',
    heroSub: 'BridgeWay pomaga znaleźć gdzie — i przenieść sprawdzone rozwiązanie do Twojej społeczności. Każdy przypadek ma źródło i poziom dowodów.',
    howItWorks: 'Jak to działa',
    step1Title: 'Opisz problem', step1Text: 'Wybierz kategorię i miasto',
    step2Title: 'Znajdź przypadek', step2Text: 'Realne wdrożenia ze źródłem i poziomem dowodów',
    step3Title: 'Sprawdź wynik', step3Text: 'Wynik transferu z podziałem na czynniki',
    step4Title: 'Skopiuj do siebie', step4Text: 'Powstaje projekt z krokami z przypadku',
    step5Title: 'Prowadź projekt', step5Text: 'Zadania i postęp w pokoju projektu',
    featuredSolutions: 'Zweryfikowane przypadki',
    mapTeaserTitle: 'Mapa zgłoszeń (dane demo)',
    mapTeaserSub: 'Zobacz przykładowe zgłoszenia i dodaj własne.',
    forInstitutions: 'Dla instytucji', partners: 'Partnerzy',
    ctaFinal: 'Zacznij od sprawdzonego przypadku',
  },
  projects: {
    title: 'Moje projekty', empty: 'Nie masz jeszcze projektów.', emptyHint: 'Zacznij od sprawdzonego rozwiązania i skopiuj je do swojej gminy.', browse: 'Przeglądaj rozwiązania',
    tasks: 'zadań', progress: 'Postęp', fromSolution: 'Na podstawie przypadku', back: 'Wszystkie projekty', notFound: 'Nie znaleziono projektu',
    noTasks: 'Brak zadań', noBudget: 'Brak pozycji budżetu', noDocs: 'Brak dokumentów', noTeam: 'Brak członków zespołu', noDeadline: 'nie ustalono',
    copyTitle: 'Skopiuj rozwiązanie', copyHint: 'Utworzymy nowy projekt dla Twojej gminy z krokami z tego rozwiązania jako zadaniami.', yourCity: 'Twoje miasto', create: 'Utwórz projekt', copyPrefix: 'Kopia',
    status: { pomysl: 'Pomysł', pilot: 'Pilotaż', wdrozenie: 'Wdrożenie' },
    report: {
      title: 'Adresat i status zgłoszenia', body: 'Podmiot odpowiedzialny', noBody: 'Brak adresata — nie wiadomo, kto odpowiada za sprawę.', setBody: 'Ustal podmiot odpowiedzialny', save: 'Zapisz',
      history: 'Historia statusów', newStatus: 'Dodaj status', reason: 'Powód / notatka', reasonRequired: 'Przy odrzuceniu podaj powód', add: 'Dodaj', demoNote: 'Dane demo / lokalne — status jest wpisywany ręcznie, nie pochodzi od urzędu.',
      status: { received: 'Przyjęte', assigned: 'Przypisane', inprogress: 'W trakcie', resolved: 'Rozwiązane', rejected: 'Odrzucone' },
    },
  },
  score: {
    title: 'Wynik transferu (model)', noData: 'brak danych', preliminary: 'Wynik wstępny — część czynników nie ma danych.',
    note: 'Model, nie prognoza. Wagi to hipoteza; średnia ważona tylko z czynników, które mają dane.',
    f: { problemType: 'Zgodność typu problemu', context: 'Podobieństwo kontekstu', budget: 'Mieści się w budżecie', partners: 'Partnerzy lokalnie', evidence: 'Poziom dowodów' },
    why: { problemType: 'Wybierz kategorię problemu', context: 'Brak źródła danych (GUS BDL — planowane)', budget: 'Koszt w źródle jest opisowy; brak budżetu użytkownika', partners: 'Brak rejestru organizacji' },
    src: { case: 'Źródło: kategoria przypadku', evidence: 'Źródło: ocena dowodów A–D' },
    explain: 'Jak liczymy wynik',
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
    demo: 'Dane demo', demoNote: 'Dane demonstracyjne — przykładowe, niezweryfikowane. Nie są prawdziwymi osobami, organizacjami ani wynikami.', localData: 'Dane lokalne w Twojej przeglądarce — nie są udostępniane ani zweryfikowane.', budget: 'Budżet', duration: 'Czas', suggestions: 'Podpowiedzi', suggestionsHint: 'Dopasowanie po kategorii i słowach kluczowych; przypadki: ważony wynik transferu (model, bez AI).', needs: 'Potrzeby', stage: 'Etap', team: 'Zespół',
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
    findCase: 'Find a solved case', submit: 'Report a problem', propose: 'Propose an idea', join: 'Join',
    joinTeam: 'Join the team', seeAll: 'See all', openMap: 'Open map',
    startNow: 'Start now', details: 'Details', more: 'Learn more',
    write: 'Write', save: 'Save', copy: 'Copy this',
    clearFilters: 'Clear filters', showMore: 'Show more', back: 'Back',
  },
  home: {
    heroTitle: 'The problem has already been solved somewhere.',
    heroSub: 'BridgeWay helps you find where — and transfer a proven solution to your community. Every case has a source and an evidence level.',
    howItWorks: 'How it works',
    step1Title: 'Describe the problem', step1Text: 'Pick a category and a city',
    step2Title: 'Find a case', step2Text: 'Real implementations with a source and evidence level',
    step3Title: 'Check the score', step3Text: 'Transfer score with a per-factor breakdown',
    step4Title: 'Copy it to your place', step4Text: 'A project is created with the case’s steps',
    step5Title: 'Run the project', step5Text: 'Tasks and progress in the project room',
    featuredSolutions: 'Verified cases',
    mapTeaserTitle: 'Reports map (demo data)',
    mapTeaserSub: 'See sample reports and add your own.',
    forInstitutions: 'For institutions', partners: 'Partners',
    ctaFinal: 'Start from a proven case',
  },
  projects: {
    title: 'My projects', empty: 'You have no projects yet.', emptyHint: 'Start from a proven solution and copy it to your municipality.', browse: 'Browse solutions',
    tasks: 'tasks', progress: 'Progress', fromSolution: 'Based on case', back: 'All projects', notFound: 'Project not found',
    noTasks: 'No tasks', noBudget: 'No budget items', noDocs: 'No documents', noTeam: 'No team members', noDeadline: 'not set',
    copyTitle: 'Copy solution', copyHint: 'We will create a new project for your municipality with this solution’s steps as tasks.', yourCity: 'Your city', create: 'Create project', copyPrefix: 'Copy',
    status: { pomysl: 'Idea', pilot: 'Pilot', wdrozenie: 'Rollout' },
    report: {
      title: 'Addressee and report status', body: 'Responsible body', noBody: 'No addressee — it is not known who is responsible.', setBody: 'Set the responsible body', save: 'Save',
      history: 'Status history', newStatus: 'Add status', reason: 'Reason / note', reasonRequired: 'Give a reason when rejecting', add: 'Add', demoNote: 'Demo / local data — statuses are entered by hand, not provided by an authority.',
      status: { received: 'Received', assigned: 'Assigned', inprogress: 'In progress', resolved: 'Resolved', rejected: 'Rejected' },
    },
  },
  score: {
    title: 'Transfer score (model)', noData: 'no data', preliminary: 'Preliminary score — some factors have no data.',
    note: 'A model, not a forecast. Weights are a hypothesis; weighted mean over factors that have data only.',
    f: { problemType: 'Problem type match', context: 'Context similarity', budget: 'Fits the budget', partners: 'Local partners exist', evidence: 'Evidence level' },
    why: { problemType: 'Pick a problem category', context: 'No data source yet (GUS BDL — planned)', budget: 'Source cost is descriptive; no user budget', partners: 'No organisation registry' },
    src: { case: 'Source: case category tag', evidence: 'Source: evidence grade A–D' },
    explain: 'How the score is computed',
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
    demo: 'Demo data', demoNote: 'Demo data — illustrative and unverified. Not real people, organisations or results.', localData: 'Local data in your browser — not shared, not verified.', budget: 'Budget', duration: 'Duration', suggestions: 'Suggestions', suggestionsHint: 'Matched by category and keywords; cases: weighted transfer score (model, no AI).', needs: 'Needs', stage: 'Stage', team: 'Team',
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