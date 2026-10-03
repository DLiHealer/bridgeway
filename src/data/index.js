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

// Picks the current-language string from a {pl, en} value; plain strings pass through.
export const loc = (v) => {
  if (!v || typeof v === 'string') return v || '';
  const lang = (typeof window !== 'undefined' && window.__i18nLang) || 'pl';
  return lang.startsWith('en') ? (v.en || v.pl) : (v.pl || v.en);
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
  { id: 's6', type: 'problem', title: 'Izolacja samotnych seniorów', description: 'Samotni seniorzy w bloku nie mają kontaktu.', category: 'seniorzy', city: 'Łódź', coords: [51.76, 19.46], urgency: 'średnia', tags: ['seniorzy', 'samotność'], status: 'nowe', createdAt: '2026-01-05', author: 'Krzysztof P.', onBehalf: true, consentAt: '2026-01-05T10:00:00.000Z' },
];

export const ideas = [
  { id: 'i1', title: 'Sąsiedzka pomoc dla seniorów', description: 'Wolontariusze pomagają seniorom w codziennych zakupach i wizytach u lekarza.', category: 'seniorzy', city: 'Kraków', stage: 'szukam-zespolu', needs: ['ekspert', 'finansowanie'], team: [{ name: 'Jan N.', role: 'lider' }], teamSize: 3, teamTarget: 5, author: 'Jan N.', createdAt: '2026-01-10' },
  { id: 'i2', title: 'Cyfrowy przewodnik po mieście', description: 'Aplikacja pokazująca dostępne miejsca dla osób z niepełnosprawnościami.', category: 'dostepnosc', city: 'Warszawa', stage: 'pilot', needs: ['ekspert', 'zespol'], team: [{ name: 'Ala Z.', role: 'PM' }, { name: 'Tomek R.', role: 'dev' }], teamSize: 2, teamTarget: 6, author: 'Ala Z.', createdAt: '2026-01-08' },
  { id: 'i3', title: 'Wymiana umiejętności sąsiedzkich', description: 'Platforma do wymiany usług — ktoś naprawi kran, ktoś inny pomoże w nauce.', category: 'integracja', city: 'Gdańsk', stage: 'pomysl', needs: ['zespol', 'lokal'], team: [{ name: 'Bartek K.', role: 'lider' }], teamSize: 1, teamTarget: 4, author: 'Bartek K.', createdAt: '2026-01-05' },
  { id: 'i4', title: 'Zielone podwórka', description: 'Sadzenie drzew i ogrodów społecznych na podwórkach kamienic.', category: 'ekologia', city: 'Wrocław', stage: 'skalowanie', needs: ['finansowanie'], team: [{ name: 'Kasia W.', role: 'lider' }, { name: 'Michał B.', role: 'ogrodnik' }], teamSize: 5, teamTarget: 5, author: 'Kasia W.', createdAt: '2026-01-02' },
  { id: 'i5', title: 'Warsztaty cyfrowe dla seniorów', description: 'Praktyczne warsztaty obsługi smartfona i e-usług.', category: 'cyfrowe', city: 'Poznań', stage: 'pilot', needs: ['ekspert', 'lokal'], team: [{ name: 'Dorota S.', role: 'lider' }], teamSize: 3, teamTarget: 4, author: 'Dorota S.', createdAt: '2025-12-28' },
  { id: 'i6', title: 'Remonty pustostanów', description: 'Adaptacja pustych lokali gminnych na mieszkania komunalne.', category: 'mieszkanie', city: 'Łódź', stage: 'szukam-zespolu', needs: ['ekspert', 'finansowanie', 'zespol'], team: [{ name: 'Rafał M.', role: 'lider' }], teamSize: 2, teamTarget: 6, author: 'Rafał M.', createdAt: '2025-12-20' },
];

// Cases come from spec/sourcing-spike.md (verified against sources 2026-10-04). null = not stated in the source.
// Evidence level: A review/meta-analysis · B controlled/quasi-experimental · C evaluation or uncontrolled outcomes · D outputs only.
export const solutions = [
  {
    id: 'c1', kind: 'case', category: 'seniorzy', city: 'Barcelona', country: 'ES', year: 2014,
    title: { pl: 'Wyjścia z wolontariuszami na schodowym wózku elektrycznym dla starszych osób odciętych barierami', en: 'Outings with volunteers in a stair-climbing power wheelchair for older people isolated by barriers' },
    organisation: 'Barcelona (3 deprived areas) — study in Gaceta Sanitaria',
    problem: { pl: 'Osoby starsze zamknięte w domach przez bariery architektoniczne (brak wind, schody).', en: 'Older people confined to their homes by architectural barriers (no lifts, stairs).' },
    solution: { pl: 'Program wyjść z wolontariuszami (4 wyjścia na osobę) z użyciem wózka elektrycznego pokonującego schody.', en: 'Programme of outings with volunteers (4 outings per person) using a stair-climbing power wheelchair.' },
    cost: null, duration: { pl: '4 wyjścia na osobę; czas programu nie podany', en: '4 outings per person; programme length not stated' },
    outcome: { pl: 'n=74, mediana wieku 83 lata: postrzegane zdrowie +21%, zdrowie psychiczne +24%, dystres psychologiczny −16%, satysfakcja 98%.', en: 'n=74, median age 83: perceived health +21%, mental health +24%, psychological distress −16%, satisfaction 98%.' },
    outcomeMethod: { pl: 'Badanie quasi-eksperymentalne przed–po', en: 'Quasi-experimental before–after study' },
    evidenceLevel: 'B',
    context: { pl: 'Duże miasto, dzielnice o niskich dochodach', en: 'Large city, low-income districts' },
    source: { label: 'Gac Sanit 2014, doi:10.1016/j.gaceta.2014.04.013', url: 'https://doi.org/10.1016/j.gaceta.2014.04.013' },
    steps: [],
  },
  {
    id: 'c2', kind: 'case', category: 'seniorzy', city: 'Mazowsze', country: 'PL', year: 2020,
    title: { pl: 'Regionalna teleopieka dla seniorów (przycisk SOS, centrum monitoringu 24/7)', en: 'Regional telecare for seniors (SOS button, 24/7 monitoring centre)' },
    organisation: 'Województwo Mazowieckie, 28 gmin',
    problem: { pl: 'Seniorzy mieszkający samotnie bez możliwości szybkiego wezwania pomocy.', en: 'Seniors living alone without a way to quickly call for help.' },
    solution: { pl: 'Pilotaż teleopieki: przycisk SOS i całodobowe centrum monitoringu, współfinansowany przez region.', en: 'Telecare pilot: SOS button and a round-the-clock monitoring centre, co-funded by the region.' },
    cost: { pl: 'ok. 549 000 PLN łącznie, ponad 173 000 PLN dotacji regionu (do 50% kosztów pierwszego roku)', en: 'approx. PLN 549,000 total, over PLN 173,000 regional subsidy (up to 50% of year 1)' },
    duration: { pl: '2020–2021', en: '2020–2021' },
    outcome: { pl: '654 użytkowników; zgłoszono 4 uratowane życia (2 Węgrów, 2 Płońsk) oraz inne interwencje alarmowe.', en: '654 users; 4 lives saved reported (2 Węgrów, 2 Płońsk) plus other alarm interventions.' },
    outcomeMethod: { pl: 'Raporty gmin i centrum monitoringu; bez grupy kontrolnej', en: 'Gmina and monitoring-centre reports; no control group' },
    evidenceLevel: 'C',
    context: { pl: 'Region z gminami miejskimi i wiejskimi', en: 'Region with urban and rural gminas' },
    source: { label: 'mazovia.pl', url: 'https://mazovia.pl/pl/dla_mediow/informacje_prasowe/teleopieka-dla-seniorow-na-mazowszu.html' },
    steps: [],
  },
  {
    id: 'c3', kind: 'case', category: 'seniorzy', city: 'Gdańsk', country: 'PL', year: 2017,
    title: { pl: 'Sąsiedzki system teleopieki („czerwony przycisk”)', en: 'Neighbourhood telecare pilot (“red button”)' },
    organisation: 'Gdańska Fundacja / Inkubator Sąsiedzkiej Energii, Dolne Miasto',
    problem: { pl: 'Samotni seniorzy w dzielnicy bez szybkiego dostępu do pomocy.', en: 'Isolated seniors in a district without quick access to help.' },
    solution: { pl: 'Lokalny pilotaż teleopieki: 50 urządzeń dla mieszkańców dzielnicy.', en: 'Local telecare pilot: 50 devices for district residents.' },
    cost: { pl: '50 000 PLN (z czego ponad 17 000 PLN na 50 urządzeń)', en: 'PLN 50,000 (over PLN 17,000 of it for 50 devices)' },
    duration: { pl: '6 miesięcy', en: '6 months' },
    outcome: { pl: 'Brak wyniku w źródle — 50 użytkowników; raport zapowiedziany.', en: 'No outcome stated in the source — 50 users; a report was announced.' },
    outcomeMethod: null,
    evidenceLevel: 'D',
    context: { pl: 'Dzielnica miasta, organizacja pozarządowa', en: 'City district, NGO-led' },
    source: { label: 'netka.gda.pl', url: 'https://netka.gda.pl/pierwszy-w-polsce-sasiedzki-system-teleopieki-domowej-powstaje-w-gdansku-dolnym-miescie/' },
    steps: [],
  },
  {
    id: 'c4', kind: 'case', category: 'dostepnosc', city: 'Szczecin', country: 'PL', year: 2020,
    title: { pl: 'Uczelnia dostępna: biuro dostępności, symulatorium, studia podyplomowe, narzędzie audytu AuditOmate', en: 'Accessible university: accessibility office, simulatorium, postgraduate course, AuditOmate audit tool' },
    organisation: 'ZUT + Uniwersytet Szczeciński, NCBR',
    problem: { pl: 'Budynki i procedury uczelni niedostosowane do osób z niepełnosprawnościami.', en: 'University buildings and procedures not adapted to people with disabilities.' },
    solution: { pl: 'Trzy projekty: biuro dostępności, symulatorium, kształcenie „specjalistów ds. dostępności”, narzędzie do audytu budynków.', en: 'Three projects: accessibility office, simulatorium, training of “accessibility specialists”, a building-audit tool.' },
    cost: { pl: '4,3 + 2,3 + 5,7 mln PLN (trzy projekty; część ZUT w ostatnim ok. 1,1 mln)', en: 'PLN 4.3 + 2.3 + 5.7 million (three projects; ZUT part of the last ≈ 1.1 million)' },
    duration: null,
    outcome: { pl: '39 przebadanych budynków, ponad 40 absolwentów. Tylko wyniki bezpośrednie.', en: '39 buildings audited, 40+ graduates. Outputs only.' },
    outcomeMethod: null,
    evidenceLevel: 'D',
    context: { pl: 'Uczelnie publiczne, finansowanie NCBR', en: 'Public universities, NCBR funding' },
    source: { label: 'gov.pl/ncbr', url: 'https://www.gov.pl/web/ncbr/uczelnia-dostepna-krok-po-kroku-przyklad-ze-szczecina' },
    steps: [],
  },
  {
    id: 'c5', kind: 'case', category: 'dostepnosc', city: 'Podlaskie', country: 'PL', year: 2021,
    title: { pl: '„Dostępne Podlaskie”: audyty, przegląd procedur i szkolenia koordynatorów dostępności', en: '“Dostępne Podlaskie”: audits, procedure reviews and training of accessibility coordinators' },
    organisation: 'Grupa Edukacji Otwartej, EFS',
    problem: { pl: 'Urzędy samorządowe bez koordynatorów i procedur dostępności.', en: 'Local-government offices without accessibility coordinators or procedures.' },
    solution: { pl: 'Audyty urzędów, przegląd procedur, szkolenia koordynatorów dostępności i pracowników.', en: 'Audits of offices, procedure reviews, training of accessibility coordinators and staff.' },
    cost: { pl: '2 088 000 PLN (w tym 1 759 766 PLN z UE)', en: 'PLN 2,088,000 (of which PLN 1,759,766 EU funds)' },
    duration: { pl: 'ok. 16–20 miesięcy (od lutego 2021)', en: 'approx. 16–20 months (from Feb 2021)' },
    outcome: { pl: '56 urzędów wdrożyło rekomendacje, przeszkolono 51 koordynatorów i 95 pracowników. Tylko wskaźniki produktu.', en: '56 offices implemented recommendations, 51 coordinators and 95 staff trained. Output indicators only.' },
    outcomeMethod: null,
    evidenceLevel: 'D',
    context: { pl: 'Region, wiele samorządów, projekt EFS', en: 'Region, many local governments, ESF project' },
    source: { label: 'mapadotacji.gov.pl', url: 'https://mapadotacji.gov.pl/projekty/1359123/?lang=en' },
    steps: [],
  },
  {
    id: 'c6', kind: 'case', category: 'seniorzy', city: 'UK', country: 'GB', year: 2013,
    title: { pl: 'The Silver Line: bezpłatna całodobowa infolinia i rozmowy towarzyskie (pilotaż)', en: 'The Silver Line: free 24/7 helpline and befriending calls (pilot)' },
    organisation: 'The Silver Line; ewaluacja: Centre for Social Justice (2013)',
    problem: { pl: 'Samotność i izolacja osób starszych.', en: 'Loneliness and isolation of older people.' },
    solution: { pl: 'Telefon zaufania 24/7 i regularne rozmowy towarzyskie z wolontariuszami.', en: 'A 24/7 helpline and regular befriending calls with volunteers.' },
    cost: null,
    duration: { pl: 'Ewaluacja 3 miesiące, 6 miesięcy po starcie pilotażu', en: '3-month evaluation, 6 months after the pilot started' },
    outcome: { pl: 'Dzwoniący zgłaszają większą pewność siebie i lepsze samopoczucie krótkoterminowo; chcą też kontaktu twarzą w twarz. Brak wyniku ilościowego.', en: 'Callers report more confidence and wellbeing short-term and want face-to-face contact too. No quantitative outcome.' },
    outcomeMethod: { pl: 'Wywiady z personelem, wolontariuszami i dzwoniącymi', en: 'Interviews with staff, volunteers and callers' },
    evidenceLevel: 'C',
    context: { pl: 'Wielka Brytania, usługa ogólnokrajowa organizacji pozarządowej', en: 'United Kingdom, NGO-run national service' },
    source: { label: 'Centre for Social Justice (PDF)', url: 'https://www.centreforsocialjustice.org.uk/wp-content/uploads/2018/03/silver.pdf' },
    steps: [],
  },
  {
    id: 'route1', kind: 'route', category: 'dostepnosc', city: 'Polska', country: 'PL', year: 2021,
    title: { pl: 'Ścieżka: audyt dostępności → właściwy podmiot → zatwierdzone technicznie rozwiązanie', en: 'Route: accessibility audit → responsible body → technically approved solution' },
    organisation: { pl: 'Program rządowy Dostępność Plus 2018–2025', en: 'Government programme Dostępność Plus 2018–2025' },
    problem: { pl: 'Brak podjazdu lub innej bariery przy budynku lub w usłudze publicznej.', en: 'A missing ramp or other barrier at a building or public service.' },
    solution: { pl: 'Zamiast samodzielnej budowy: zlecić audyt dostępności, zgłosić do podmiotu odpowiedzialnego za obiekt, wdrożyć rozwiązanie zatwierdzone technicznie.', en: 'Instead of building it yourself: commission an accessibility audit, report to the body responsible for the site, implement a technically approved solution.' },
    cost: null,
    duration: { pl: 'Program 2018–2025', en: 'Programme 2018–2025' },
    outcome: { pl: 'Ewaluacja systemu zarządzania i efektów programu (okres 2018–2021). To kontekst i ścieżka, nie wynik pojedynczej interwencji.', en: 'Evaluation of the programme’s management system and effects (period 2018–2021). Context and route, not the result of a single intervention.' },
    outcomeMethod: { pl: 'Raport ewaluacyjny, wrzesień 2021', en: 'Evaluation report, September 2021' },
    evidenceLevel: 'C',
    context: { pl: 'Cała Polska; budynki i usługi publiczne', en: 'Poland-wide; public buildings and services' },
    source: { label: 'ewaluacja.gov.pl (PDF)', url: 'https://www.ewaluacja.gov.pl/media/105004/Raport_Dostepnosc_Plus_FINAL.pdf' },
    steps: [
      { pl: 'Zlecić audyt dostępności obiektu', en: 'Commission an accessibility audit of the site' },
      { pl: 'Ustalić podmiot odpowiedzialny za obiekt i zgłosić mu problem', en: 'Identify the body responsible for the site and report the problem' },
      { pl: 'Uzyskać technicznie zatwierdzone rozwiązanie', en: 'Obtain a technically approved solution' },
      { pl: 'Wdrożyć i zmierzyć efekt', en: 'Implement and measure the outcome' },
    ],
  },
];

export const experts = [
  { id: 'e1', name: 'Maria Kowalska', specialization: 'Seniorzy', city: 'Warszawa', bio: 'Gerontolog z 15-letnim doświadczeniem.', projects: ['r3'] },
  { id: 'e2', name: 'Tomasz Nowak', specialization: 'Dostępność', city: 'Kraków', bio: 'Architekt specjalizujący się w dostępności.', projects: ['r4'] },
  { id: 'e3', name: 'Agnieszka Lis', specialization: 'Ekologia', city: 'Wrocław', bio: 'Biolog, aktywistka miejska.', projects: ['r2'] },
  { id: 'e4', name: 'Paweł Zieliński', specialization: 'Cyfryzacja', city: 'Gdańsk', bio: 'Trener kompetencji cyfrowych.', projects: ['r1'] },
  { id: 'e5', name: 'Katarzyna Dąbrowska', specialization: 'Integracja', city: 'Łódź', bio: 'Socjolog, animatorka społeczna.', projects: [] },
  { id: 'e6', name: 'Michał Wójcik', specialization: 'Mieszkanie', city: 'Poznań', bio: 'Ekspert polityki mieszkaniowej.', projects: [] },
  { id: 'e7', name: 'Ewa Kaczmarek', specialization: 'Seniorzy', city: 'Kraków', bio: 'Pracownik socjalny.', projects: ['r3'] },
  { id: 'e8', name: 'Jakub Lewandowski', specialization: 'Cyfryzacja', city: 'Warszawa', bio: 'Programista i społecznik.', projects: [] },
];

export const ngos = [
  { id: 'n1', name: 'Fundacja Tkanka', mission: 'Wsparcie lokalnych społeczności', city: 'Kraków' },
  { id: 'n2', name: 'Dostępne Miasto', mission: 'Miasto bez barier', city: 'Warszawa' },
  { id: 'n3', name: 'Zielone Wrocław', mission: 'Zieleń w mieście', city: 'Wrocław' },
  { id: 'n4', name: 'Senior Plus', mission: 'Aktywni seniorzy', city: 'Poznań' },
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
    responsibleBody: 'Zarząd Dróg Miejskich (dane demo)',
    statusHistory: [
      { status: 'received', date: '2026-01-15', note: '' },
      { status: 'assigned', date: '2026-01-22', note: '' },
      { status: 'inprogress', date: '2026-02-10', note: '' },
    ],
    kpi: [{ name: 'Osoby objęte', value: '12' }, { name: 'Koszt', value: '5000 PLN' }],
  },
];

export const allData = { signals, ideas, solutions, experts, ngos, fundings, projects, categories, cities };