export const categories = [
  { id: 'mieszkanie', name: 'Mieszkanie', nameEn: 'Housing', color: '#1E5EFF' },
  { id: 'seniorzy', name: 'Opieka nad seniorami', nameEn: 'Senior care', color: '#00B894' },
  { id: 'dostepnosc', name: 'Dostępność', nameEn: 'Accessibility', color: '#8E44AD' },
  { id: 'cyfrowe', name: 'Wykluczenie cyfrowe', nameEn: 'Digital exclusion', color: '#FFB020' },
  { id: 'ekologia', name: 'Ekologia', nameEn: 'Ecology', color: '#27AE60' },
  { id: 'integracja', name: 'Integracja', nameEn: 'Integration', color: '#E67E22' },
  { id: 'inne', name: 'Inne', nameEn: 'Other', color: '#64748B' },
];

export const categoryById = (id) => categories.find(c => c.id === id) || categories[categories.length - 1];

// Возвращает имя категории на текущем языке i18next
export const categoryName = (cat) => {
  if (!cat) return '';
  const lang = (typeof window !== 'undefined' && window.__i18nLang) || 'pl';
  return lang.startsWith('en') ? (cat.nameEn || cat.name) : cat.name;
};

export const cities = [
  { id: 'warszawa', name: 'Warszawa', coords: [52.2297, 21.0122] },
  { id: 'krakow', name: 'Kraków', coords: [50.0647, 19.945] },
  { id: 'gdansk', name: 'Gdańsk', coords: [54.352, 18.6466] },
  { id: 'wroclaw', name: 'Wrocław', coords: [51.1079, 17.0385] },
  { id: 'poznan', name: 'Poznań', coords: [52.4064, 16.9252] },
  { id: 'lodz', name: 'Łódź', coords: [51.7592, 19.456] },
  { id: 'szczecin', name: 'Szczecin', coords: [53.4285, 14.5528] },
  { id: 'lublin', name: 'Lublin', coords: [51.2465, 22.5684] },
];

export const signals = [
  { id: 's1', type: 'problem', title: 'Brak podjazdu dla wózków', description: 'Budynek przy ul. Kwiatowej nie ma podjazdu — seniorzy i osoby na wózkach nie mogą wejść.', category: 'dostepnosc', city: 'Warszawa', coords: [52.235, 21.02], urgency: 'wysoka', tags: ['wózki', 'podjazd'], status: 'nowe', createdAt: '2026-01-15', author: 'Anna K.' },
  { id: 's2', type: 'problem', title: 'Wykluczenie cyfrowe seniorów', description: 'Wielu seniorów w dzielnicy nie potrafi korzystać z e-usług.', category: 'cyfrowe', city: 'Kraków', coords: [50.06, 19.95], urgency: 'średnia', tags: ['seniorzy', 'cyfryzacja'], status: 'w toku', createdAt: '2026-01-12', author: 'Piotr M.' },
  { id: 's3', type: 'problem', title: 'Śmieci na skwerze', description: 'Skwer przy parku pełen śmieci, brak koszy.', category: 'ekologia', city: 'Gdańsk', coords: [54.36, 18.65], urgency: 'niska', tags: ['śmieci', 'park'], status: 'nowe', createdAt: '2026-01-10', author: 'Ewa L.' },
  { id: 's4', type: 'problem', title: 'Brak miejsc integracji', description: 'Brak świetlicy dla młodzieży.', category: 'integracja', city: 'Wrocław', coords: [51.11, 17.04], urgency: 'krytyczna', tags: ['młodzież', 'świetlica'], status: 'w toku', createdAt: '2026-01-08', author: 'Marek T.' },
  { id: 's5', type: 'problem', title: 'Zły stan kamienicy', description: 'Kamienica w centrum wymaga remontu.', category: 'mieszkanie', city: 'Poznań', coords: [52.41, 16.93], urgency: 'wysoka', tags: ['remont', 'kamienica'], status: 'nowe', createdAt: '2026-01-06', author: 'Zofia W.' },
  { id: 's6', type: 'problem', title: 'Izolacja samotnych seniorów', description: 'Samotni seniorzy w bloku nie mają kontaktu.', category: 'seniorzy', city: 'Łódź', coords: [51.76, 19.46], urgency: 'średnia', tags: ['seniorzy', 'samotność'], status: 'nowe', createdAt: '2026-01-05', author: 'Krzysztof P.' },
];

export const ideas = [
  { id: 'i1', title: 'Sąsiedzka pomoc dla seniorów', description: 'Wolontariusze pomagają seniorom w codziennych zakupach i wizytach u lekarza.', category: 'seniorzy', city: 'Kraków', stage: 'szukam-zespolu', needs: ['ekspert', 'finansowanie'], team: [{ name: 'Jan N.', role: 'lider' }], teamSize: 3, teamTarget: 5, author: 'Jan N.', createdAt: '2026-01-10' },
  { id: 'i2', title: 'Cyfrowy przewodnik po mieście', description: 'Aplikacja pokazująca dostępne miejsca dla osób z niepełnosprawnościami.', category: 'dostepnosc', city: 'Warszawa', stage: 'pilot', needs: ['ekspert', 'zespol'], team: [{ name: 'Ala Z.', role: 'PM' }, { name: 'Tomek R.', role: 'dev' }], teamSize: 2, teamTarget: 6, author: 'Ala Z.', createdAt: '2026-01-08' },
  { id: 'i3', title: 'Wymiana umiejętności sąsiedzkich', description: 'Platforma do wymiany usług — ktoś naprawi kran, ktoś inny pomoże w nauce.', category: 'integracja', city: 'Gdańsk', stage: 'pomysl', needs: ['zespol', 'lokal'], team: [{ name: 'Bartek K.', role: 'lider' }], teamSize: 1, teamTarget: 4, author: 'Bartek K.', createdAt: '2026-01-05' },
  { id: 'i4', title: 'Zielone podwórka', description: 'Sadzenie drzew i ogrodów społecznych na podwórkach kamienic.', category: 'ekologia', city: 'Wrocław', stage: 'skalowanie', needs: ['finansowanie'], team: [{ name: 'Kasia W.', role: 'lider' }, { name: 'Michał B.', role: 'ogrodnik' }], teamSize: 5, teamTarget: 5, author: 'Kasia W.', createdAt: '2026-01-02' },
  { id: 'i5', title: 'Warsztaty cyfrowe dla seniorów', description: 'Praktyczne warsztaty obsługi smartfona i e-usług.', category: 'cyfrowe', city: 'Poznań', stage: 'pilot', needs: ['ekspert', 'lokal'], team: [{ name: 'Dorota S.', role: 'lider' }], teamSize: 3, teamTarget: 4, author: 'Dorota S.', createdAt: '2025-12-28' },
  { id: 'i6', title: 'Remonty pustostanów', description: 'Adaptacja pustych lokali gminnych na mieszkania komunalne.', category: 'mieszkanie', city: 'Łódź', stage: 'szukam-zespolu', needs: ['ekspert', 'finansowanie', 'zespol'], team: [{ name: 'Rafał M.', role: 'lider' }], teamSize: 2, teamTarget: 6, author: 'Rafał M.', createdAt: '2025-12-20' },
];

export const solutions = [
  { id: 'r1', title: 'Cyfrowi przewodnicy dla seniorów', problem: 'Seniorzy nie radzą sobie z e-usługami.', solution: 'Wolontariusze-seniorzy uczą innych seniorów.', category: 'cyfrowe', city: 'Gdańsk', budget: '5000-15000 PLN', duration: '3 miesiące', effect: '+40% uczestnictwa', verified: true, complexity: 'łatwa', cost: 'niski', steps: ['Rekrutacja przewodników', 'Szkolenie', 'Warsztaty w dzielnicach', 'Ewaluacja'], risks: ['Niska frekwencja', 'Bariery techniczne'], contacts: [{ name: 'Fundacja X', email: 'kontakt@fundacjax.pl' }] },
  { id: 'r2', title: 'Zielone podwórka', problem: 'Betonoza i brak zieleni na podwórkach.', solution: 'Mieszkańcy wspólnie sadzą drzewa i tworzą ogrody.', category: 'ekologia', city: 'Wrocław', budget: '2000-8000 PLN', duration: '2 miesiące', effect: '-3°C latem', verified: true, complexity: 'łatwa', cost: 'niski', steps: ['Wybór podwórka', 'Konsultacje', 'Zakup sadzonek', 'Wspólne sadzenie'], risks: ['Vandalizm', 'Susza'], contacts: [{ name: 'Zielone Wrocław', email: 'kontakt@zielone.pl' }] },
  { id: 'r3', title: 'Sąsiedzka pomoc seniorom', problem: 'Samotność i problemy z zakupami.', solution: 'Sieć wolontariuszy pomaga seniorom.', category: 'seniorzy', city: 'Kraków', budget: '3000-10000 PLN', duration: '6 miesięcy', effect: '120 seniorów objętych', verified: true, complexity: 'średnia', cost: 'średni', steps: ['Mapowanie potrzeb', 'Rekrutacja wolontariuszy', 'System zgłoszeń'], risks: ['Wypalenie wolontariuszy'], contacts: [{ name: 'Fundacja Tkanka', email: 'biuro@tkanka.org' }] },
  { id: 'r4', title: 'Podjazdy sąsiedzkie', problem: 'Brak podjazdów dla wózków.', solution: 'Proste, drewniane rampy budowane przez sąsiadów.', category: 'dostepnosc', city: 'Warszawa', budget: '1000-4000 PLN', duration: '1 miesiąc', effect: '+15 budynków', verified: true, complexity: 'łatwa', cost: 'niski', steps: ['Inwentaryzacja', 'Projekt', 'Budowa', 'Odbiór'], risks: ['Brak zgody wspólnoty'], contacts: [{ name: 'Dostępne Miasto', email: 'info@dostepne.pl' }] },
];

export const experts = [
  { id: 'e1', name: 'Maria Kowalska', specialization: 'Seniorzy', city: 'Warszawa', rating: 4.8, bio: 'Gerontolog z 15-letnim doświadczeniem.', email: 'maria@example.com', projects: ['r3'] },
  { id: 'e2', name: 'Tomasz Nowak', specialization: 'Dostępność', city: 'Kraków', rating: 4.6, bio: 'Architekt specjalizujący się w dostępności.', email: 'tomasz@example.com', projects: ['r4'] },
  { id: 'e3', name: 'Agnieszka Lis', specialization: 'Ekologia', city: 'Wrocław', rating: 4.9, bio: 'Biolog, aktywistka miejska.', email: 'aga@example.com', projects: ['r2'] },
  { id: 'e4', name: 'Paweł Zieliński', specialization: 'Cyfryzacja', city: 'Gdańsk', rating: 4.7, bio: 'Trener kompetencji cyfrowych.', email: 'pawel@example.com', projects: ['r1'] },
  { id: 'e5', name: 'Katarzyna Dąbrowska', specialization: 'Integracja', city: 'Łódź', rating: 4.5, bio: 'Socjolog, animatorka społeczna.', email: 'kasia@example.com', projects: [] },
  { id: 'e6', name: 'Michał Wójcik', specialization: 'Mieszkanie', city: 'Poznań', rating: 4.4, bio: 'Ekspert polityki mieszkaniowej.', email: 'michal@example.com', projects: [] },
  { id: 'e7', name: 'Ewa Kaczmarek', specialization: 'Seniorzy', city: 'Kraków', rating: 4.9, bio: 'Pracownik socjalny.', email: 'ewa@example.com', projects: ['r3'] },
  { id: 'e8', name: 'Jakub Lewandowski', specialization: 'Cyfryzacja', city: 'Warszawa', rating: 4.3, bio: 'Programista i społecznik.', email: 'jakub@example.com', projects: [] },
];

export const ngos = [
  { id: 'n1', name: 'Fundacja Tkanka', mission: 'Wsparcie lokalnych społeczności', city: 'Kraków', projects: 12 },
  { id: 'n2', name: 'Dostępne Miasto', mission: 'Miasto bez barier', city: 'Warszawa', projects: 8 },
  { id: 'n3', name: 'Zielone Wrocław', mission: 'Zieleń w mieście', city: 'Wrocław', projects: 15 },
  { id: 'n4', name: 'Senior Plus', mission: 'Aktywni seniorzy', city: 'Poznań', projects: 6 },
];

export const fundings = [
  { id: 'f1', name: 'Fundusz Sołecki', source: 'Gmina', amount: 'do 50 000 PLN', deadline: '2026-03-31', region: 'Cała Polska', url: 'https://example.com', requirements: ['Wniosek sołtysa', 'Konsultacje'], checklist: ['Opis projektu', 'Budżet', 'Harmonogram'] },
  { id: 'f2', name: 'Budżet Obywatelski', source: 'Miasto', amount: 'do 200 000 PLN', deadline: '2026-04-15', region: 'Warszawa', url: 'https://example.com', requirements: ['Projekt ogólnodostępny'], checklist: ['Formularz', 'Kosztorys'] },
  { id: 'f3', name: 'Fundusze EEA', source: 'EOG', amount: '50 000 – 500 000 PLN', deadline: '2026-05-30', region: 'Cała Polska', url: 'https://example.com', requirements: ['Partner zagraniczny'], checklist: ['Wniosek', 'Budżet szczegółowy'] },
  { id: 'f4', name: 'Fundusz Sektor 3.0', source: 'NGO', amount: 'do 30 000 PLN', deadline: '2026-02-28', region: 'Cała Polska', url: 'https://example.com', requirements: ['Rejestracja NGO'], checklist: ['Wniosek online'] },
  { id: 'f5', name: 'Moc Małych Społeczności', source: 'Fundacja', amount: 'do 15 000 PLN', deadline: '2026-06-15', region: 'Małopolska', url: 'https://example.com', requirements: ['Lokalna grupa'], checklist: ['Opis', 'Budżet'] },
];

export const projects = [
  {
    id: 'p1', title: 'Podjazd dla wózków — Kwiatowa 5', status: 'pilot', progress: 45,
    team: [{ name: 'Anna K.', role: 'lider' }, { name: 'Tomasz N.', role: 'ekspert' }],
    tasks: [
      { id: 't1', title: 'Zebrać zgody wspólnoty', status: 'done' },
      { id: 't2', title: 'Zamówić materiały', status: 'inprogress' },
      { id: 't3', title: 'Budowa', status: 'todo' },
    ],
    budget: [
      { category: 'Materiały', plan: 3000, fact: 1500, source: 'Fundusz Sołecki' },
      { category: 'Robocizna', plan: 2000, fact: 0, source: 'Wolontariat' },
    ],
    documents: [{ name: 'projekt.pdf', url: '#' }, { name: 'zgody.pdf', url: '#' }],
    deadline: '2026-06-01',
    kpi: [{ name: 'Osoby objęte', value: '12' }, { name: 'Koszt', value: '5000 PLN' }],
  },
];

export const analytics = {
  kpis: { signals: 1248, ideas: 356, projects: 89, rate: 68 },
  trend: [10, 22, 18, 30, 42, 38, 55, 62, 58, 71, 80, 92],
  categories: [
    { id: 'seniorzy', count: 210, delta: 12 },
    { id: 'dostepnosc', count: 180, delta: 8 },
    { id: 'ekologia', count: 165, delta: -3 },
    { id: 'cyfrowe', count: 140, delta: 15 },
    { id: 'integracja', count: 120, delta: 4 },
  ],
};

export const allData = { signals, ideas, solutions, experts, ngos, fundings, projects, categories, cities };