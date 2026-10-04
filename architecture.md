# BridgeWay — specyfikacja architektury

> Źródło prawdy o tym, jak zbudowana jest aplikacja. Aktualizuj w tej samej zmianie co każdą zmianę kodu, która jej dotyczy.

## 1. Przegląd
Polskojęzyczna aplikacja SPA do zaangażowania obywatelskiego („most między problemem a rozwiązaniem”). Mieszkańcy zgłaszają problemy (sygnały), proponują pomysły, otrzymują dopasowania do rozwiązań/ekspertów/organizacji/finansowania i śledzą projekty społeczne na mapie. MVP: SPA po stronie klienta z danymi demo/lokalnymi; od kroku 16 opcjonalny backend Cloudflare Worker + D1 współdzieli zgłoszenia problemów między przeglądarkami (logowanie magic linkiem). Bez backendu aplikacja pozostaje lokalna i to komunikuje. **Zasada uczciwości danych:** każdy wprowadzony zbiór danych to dane demo i jest tak oznaczony w UI (`common.demo`, `common.demoNote`); żadnych wymyślonych KPI, ocen, deklaracji „zweryfikowano”, efektów ani kontaktów.

## 2. Stos
| Obszar | Wybór |
|---|---|
| Build | Vite 5 (`npm run dev/build/preview`), wynik w `dist/` |
| UI | React 18, Tailwind CSS 3 (własne kolory `brand` w `tailwind.config.js`), framer-motion, lucide-react |
| Routing | react-router-dom v6, `BrowserRouter`, wszystkie strony ładowane leniwie |
| Formularze | react-hook-form |
| Mapa | leaflet + react-leaflet |
| i18n | i18next + react-i18next, języki `pl` (domyślny) i `en`; zasoby inline w `src/i18n.js` |
| Hosting | Cloudflare Workers Static Assets (`wrangler.jsonc`, fallback SPA); `netlify.toml` zachowany jako alternatywa. Zobacz `DEPLOYMENT.md` |
| Backend | Cloudflare Worker `worker/index.js` (+ D1 `DB`, `migrations/`), tylko `/api/*`; pliki przez binding `ASSETS` (`run_worker_first: ["/api/*"]`). Dev: `npm run dev:api` (wrangler, 8787) + `npm run dev` (Vite przekierowuje `/api`); `npm run db:migrate:local` |
| LLM | OpenRouter (sekret `OPENROUTER_API_KEY`), model wybierany przez odpowiadającego w `/admin` (D1 `settings.llmModel`, domyślnie `openai/gpt-4o-mini` w `worker/adaptPlan.js`); tylko dla planu adaptacji (krok 17) |
| Testy | jeszcze brak |

## 3. Struktura katalogów
```
src/
  main.jsx            punkt wejścia: providery (Router, AppProvider), import i18n
  App.jsx             tablica tras (leniwe strony, Suspense)
  i18n.js             zasoby pl/en, język zapisywany w localStorage
  index.css           warstwy Tailwind + wspólne klasy (np. container-app)
  context/AppContext.jsx   stan globalny (zobacz §5)
  context/AuthContext.jsx  dostępność backendu + sesja magic link (§5)
  api.js              klient fetch dla /api/*
  components/RequireAuth.jsx  strażnik trasy: z backendem i bez konta → przekierowanie do /logowanie
worker/index.js     API Worker (auth, zgłoszenia, adapt-plan); worker/adaptPlan.js (wyszukiwanie + walidacja cytatów); migrations/ (0001 init, 0002 registrations, 0003 settings, 0004 profiles, 0005 adapt_log, 0006 user_data)
  data/index.js       zbiory demo + pomocniki kategorii/miast
  data/bdlContext.json  migawka GUS BDL (odsetek 65+ per miasto), zapisywana przez scripts/fetch-bdl-context.mjs
  utils/              matching.js (punktacja słów kluczowych), transferScore.js (wskaźnik transferu przypadku), privacy.js (wrażliwe kategorie, zgrubienie współrzędnych), geo.js (distanceKm), formatters.js
  hooks/              useLocalStorage, useDebounce
  components/
    layout/           Layout (Header, Footer, Outlet)
    map/MapView.jsx   wrapper Leaflet
    cases/ScoreBreakdown.jsx   karta wskaźnika transferu z rozbiciem na czynniki
    cases/AdaptPlan.jsx        karta planu adaptacji LLM na stronie przypadku (elementy z dosłownymi cytatami)
    ui/index.jsx      prymitywy design systemu (Button, Card, Badge, Chip, Input, Textarea, Select, Modal, Toast, EmptyState, Skeleton, cx)
  pages/              jeden plik na trasę
```

Dokumentacja: publiczne specyfikacje linkowane z `README.md` / `docs/` są w katalogu głównym repozytorium (`architecture.md`, `roadmap.md`, `concept_v1.0.md`, `sourcing-spike.md`, `accessibility.md`, `validation.md`). `spec/` (indeks, pitch, recenzje, zgłoszenie HackYeah + prezentacja) i `crs/` są w gitignore, tylko do użytku wewnętrznego. Dokumentacja publiczna jest po polsku; `LICENSE` pozostaje po angielsku jako tekst wiążący (tłumaczenie: `LICENSE.pl`).

## 4. Trasy (polskie ścieżki)
| Ścieżka | Strona |
|---|---|
| `/` | Home (slogan „Problem został już gdzieś rozwiązany.”, przyciski: znajdź przypadek → `/rozwiazania`, zgłoś → `/zglos`; sekcje: zweryfikowane przypadki, 5 kroków „jak to działa”, zapowiedź mapy demo) |
| `/mapa` | MapPage |
| `/zglos` | SubmitPage (zgłoszenie problemu / propozycja pomysłu) |
| `/pomysly`, `/pomysly/:id` | IdeasPage, IdeaDetail |
| `/rozwiazania`, `/rozwiazania/:id` | SolutionsPage, SolutionDetail |
| `/eksperci`, `/eksperci/:id` | ExpertsPage, ExpertDetail |
| `/finansowanie` | FundingPage (komponent szczegółów: FundingDetail) |
| `/projekty`, `/projekty/:id` | ProjectsPage (lista projektów, stan pusty → `/rozwiazania`), ProjectRoom |
| `/zgloszenia`, `/zgloszenia/:id` | ReportsPage (publiczne udostępniane zgłoszenia z backendu, oś czasu statusów; formularz odpowiadającego dla roli `responder`) |
| `/admin` | AdminPage (wymaga logowania przez `RequireAuth`; tylko odpowiadający): ustawienie rejestracji — radio *wymagaj akceptacji* (domyślnie) / *tryb testowy*, jawne opisy + Zapisz, baner bieżącego stanu; wybór modelu LLM (lista modeli OpenRouter z podpowiadaniem, z cenami USD/1M tokenów wejście/wyjście + Zapisz); lista próśb o rejestrację z akceptacją/odrzuceniem |
| `/logowanie` | LoginPage (e-mail → magic link; obsługuje `?token=`) |
| `/profil` | ProfilePage (wymaga logowania przez `RequireAuth`, gdy istnieje backend; linki profil / moje-* w menu ukryte po wylogowaniu) |
| `/analityka` | AnalyticsPage (krok 18: metryki liczone z `GET /api/metrics`; wymaga backendu, w przeciwnym razie komunikat „brak serwera”) |
| `/o-nas` | AboutPage |
| `/dostepnosc` | AccessibilityPage (deklaracja dostępności, link w stopce) |
| `/prywatnosc`, `/regulamin` | LegalPage (`kind="privacy"`/`"terms"`; projekty dokumentów prototypu, linki w stopce) |
| `*` | NotFound |

Kolejność nawigacji (koncepcja §5.5): Rozwiązania (w centrum), Mapa, Projekty, Zgłoszenia (udostępniane, krok 16), Eksperci, Finansowanie, Pomysły (zdegradowane, na końcu). Analityka (krok 18) przed Pomysłami; Profil tylko w menu awatara.

## 5. Stan i trwałość
`AppProvider` (`useApp()`) przechowuje: `user`, `signals`, `ideas`, `projects`, `saved`, `filters`, `toasts` oraz akcje (`addSignal`, `addIdea`, `addProject` (zwraca utworzony projekt; domyślnie `responsibleBody: null`, `statusHistory: [received]`), `updateProject(id, patch|fn)`, `saveItem`, `isSaved`, `setFilters`, `clearFilters`) i `data` (zbiory statyczne).
- Każdy fragment jest zapisywany przez `useLocalStorage` pod kluczami `bridgeart-*` (`-user`, `-signals`, `-ideas`, `-projects`, `-saved`, `-filters`, `-toasts-placeholder`, a także `bridgeart-lang` dla języka).
- Przy pierwszym uruchomieniu wypełniany z `src/data/index.js`. **Goście** (bez logowania lub bez backendu): fragmenty per przeglądarka w localStorage. **Zalogowani:** `user`, `signals`, `ideas`, `projects`, `saved` są per konto, trzymane w stanie `AppProvider` (nie w localStorage), ładowane z D1 przy logowaniu (`GET /api/profile` + `GET /api/user-data`; brak fragmentu = dane demo; nazwa domyślnie z części lokalnej e-maila), zapisywane z opóźnieniem (500 ms) przez `PUT /api/user-data/:slice` (tabela `user_data(email, slice, json)`, fragmenty signals|ideas|projects|saved, tablica JSON ≤256 KB, wymaga logowania, prywatne). Przy wylogowaniu/zmianie konta stan poprzedniego konta jest porzucany (brak przecieków między kontami; dane gościa nienaruszone).
- **Fragment współdzielony (krok 16):** w D1 znajdują się tylko *zgłoszenia* problemów. `AuthProvider` (`useAuth()`: `backend` null|true|false z `GET /api/health`, `account` `{email, role}`, `login`, `logout`). Magic link: `POST /api/auth/request` (hasz tokenu w `login_tokens`, 15 min, jednorazowy; brak limitu logowań — usunięty w Issue 2) → e-mail przez Resend HTTP API (`RESEND_API_KEY`, opcjonalnie `MAIL_FROM`) albo binding `EMAIL` + `MAIL_FROM` (Resend potwierdzony na produkcji, binding Cloudflare nieprzetestowany) albo, z `DEV_MAGIC_LINK=true` wyłącznie w `.dev.vars`, link w odpowiedzi → `/logowanie?token=` → `POST /api/auth/verify` → ciasteczko HttpOnly `bw_session` (hasz w `sessions`, 30 dni). **Rejestracja:** link jest wydawany tylko odpowiadającym i adresom `approved`; każdy inny adres staje się wierszem `pending` w `registrations` (`{pending:true}`, maks. 200 oczekujących), dopóki odpowiadający go nie zaakceptuje/odrzuci w `/logowanie` (`GET /api/admin/registrations`, `POST /api/admin/registrations/decide`, tylko odpowiadający); odrzucony → 403. `DEV_MAGIC_LINK=true` (tylko lokalnie) to omija. **Tryb testowy** (`settings.testMode`, domyślnie wyłączony; `GET/POST /api/admin/settings`, tylko odpowiadający; model LLM: `GET/POST /api/admin/llm` (walidowany względem katalogu), `GET /api/admin/llm/models` (proxy OpenRouter `/models`, cache 10 min, cena za 1M tokenów), ustawienie i lista próśb w `/admin`; link w menu tylko dla odpowiadających): nowe i oczekujące adresy są automatycznie akceptowane i dostają prawdziwy link e-mailem (odrzucone pozostają zablokowane; globalny limit 50 linków/h). Przeznaczony do pokazów na żywo; potem wyłączyć. Role: `responder` wtedy i tylko wtedy, gdy e-mail jest w `RESPONDER_EMAILS`, w przeciwnym razie `resident`. API: `GET /api/reports[/:id]` publiczne (bez e-maili/współrzędnych), `POST /api/reports` (logowanie), `POST /api/reports/:id/status` (odpowiadający; `rejected` wymaga uzasadnienia; opcjonalnie `responsibleBody`). Żądania POST wymagają typu treści JSON i nagłówka `Origin` z tego samego źródła. **Profil:** tabela `profiles` (email PK; name, roleLabel ∈ Mieszkaniec/Aktywista/Ekspert/NGO/Instytut, city, bio ≤500), `GET/PUT /api/profile` (wymaga logowania, prywatne — nigdy nie zwracane w publicznych zgłoszeniach). Formularz ProfilePage ma wersję roboczą + przycisk *Zapisz* (nieaktywny do czasu zmiany, imię ≥2 znaki): zalogowany → zapis na koncie i wczytanie do `user` przy logowaniu (efekt w `AppProvider`); goście → tylko localStorage (komunikat w UI). E-mail tylko do odczytu (z konta). Dawna martwa zakładka *Ustawienia* została usunięta. SubmitPage (zakładka problemu) dodatkowo wysyła udostępnianą kopię (tytuł, opis, kategoria, miasto, onBehalf), gdy użytkownik jest zalogowany; lokalny sygnał bez zmian.
- **Plan adaptacji (krok 17):** `POST /api/adapt-plan {caseId, city, lang}` (logowanie, JSON same-origin, 10/h na konto w `adapt_log`; 404 nieznany przypadek, 503 `llm_unavailable` bez `OPENROUTER_API_KEY`, 502 `llm_failed`, 429 `rate_limited`; model z `settings.llmModel`). Jedynym korpusem jest wybrany przypadek (`src/data/index.js`); LLM zwraca `{items:[{action, evidence:[{field, quote}]}]}`; `validate` zachowuje element tylko wtedy, gdy `action` nie zawiera cyfr, a cytat jest fragmentem cytowanego pola przypadku (zastępowany tekstem źródła); link do źródła = `case.source`; `gaps` = pola przypadku o wartości `null`. Wynik nie jest przechowywany.
- **Metryki (krok 18):** `GET /api/metrics` (publiczne, tylko agregaty): `reports{total, byStatus, responded}`, `firstResponse{n, medianMs}|null` (pierwszy status inny niż `received` minus utworzenie zgłoszenia, mediana), `reuse{accounts, projects, fromCases, accountsReusing, rate|null, byCase}` (z fragmentu `projects` w `user_data`, `sourceSolutionId`). Liczone przy każdym żądaniu, bez przechowywania, bez danych osobowych.
- Statyczne encje tylko do odczytu (solutions, experts, ngos, fundings) są czytane bezpośrednio z `data`.

## 6. Model domenowy (demo, w `src/data/index.js`)
Encje: `categories` (id, name, nameEn, color), `cities` (id, name, coords), `signals`, `ideas`, `solutions`, `experts`, `ngos`, `fundings`, `projects`. (Brak zbioru `analytics`: strona Analityka pokazuje tylko metryki liczone na serwerze, §5. Eksperci nie mają `rating`/`email`, organizacje nie mają liczby projektów.)
`solutions` to **przypadki poparte dowodami** (trasa `/rozwiazania`), wczytane z `sourcing-spike.md`: `id`, `kind` (`case` | `route`), `category`, `city`, `country`, `year`, `title`, `organisation`, `problem`, `solution`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel` (A–D: A przegląd systematyczny, B badanie kontrolowane, C ewaluacja / efekt bez kontroli, D tylko produkty), `context`, `source` (`{label,url}`), `steps`. Pola tekstowe to obiekty `{pl,en}` czytane przez `loc()`; `null` = nie podano w źródle (UI pokazuje „nie podano”/„nie zmierzono”, nigdy wymyślonej wartości). Każdy przypadek musi być realny, mieć źródło i ocenę; przypadków, których nie da się zweryfikować, nie dodaje się. `kind: 'route'` to zalecany proces (audyt dostępności → odpowiedzialny organ → technicznie zatwierdzone rozwiązanie), zastępujący usunięty niebezpieczny przypadek podjazdu „zrób to sam”. Przypadki bez `steps` przy kopiowaniu tworzą ogólne zadania `cases.defaultSteps`. Identyfikatory kategorii: mieszkanie, seniorzy, dostepnosc, cyfrowe, ekologia, integracja, inne. `projects` mają opcjonalne `sourceSolutionId` (ustawiane przy kopiowaniu z przypadku; jego `steps` lub `cases.defaultSteps` stają się zadaniami `todo`). `projects` mają też `responsibleBody` (string | null — null jest sygnalizowane w Project Room) i `statusHistory[]` (`{status, date, note}`, status ∈ received | assigned | inprogress | resolved | rejected; odrzucenie wymaga uzasadnienia); pokazywane/edytowane w przeglądzie Project Room, oznaczone jako demo/lokalne. `signals` mogą mieć `onBehalf` (bool) + `consentAt` (ISO) — ustawiane przez SubmitPage (zakładka problemu) tylko wtedy, gdy zaznaczono zarówno flagę pełnomocnika, jak i zgodę; sygnał demo `s6` jest zgłoszeniem przez pełnomocnika; popup MapView pokazuje plakietkę. **Prywatność:** `utils/privacy.js` `isSensitive` = problem z kategorią `seniorzy`/`mieszkanie` lub `onBehalf`; takie sygnały są rysowane na mapie jako `Circle` 3 km we współrzędnych przyciągniętych do siatki 0,1° (przy wyświetlaniu, a także zapisywane zgrubnie przez SubmitPage). Zbierane jest tylko miasto, nigdy adres. Identyfikatory elementów utworzonych przez użytkownika mają prefiks (`s`/`i`/`p` + znacznik czasu).
Pomocniki: `categoryById`, `categoryName`, `loc` (język przez `window.__i18nLang`). UI: `EvidenceBadge` w `components/ui`.

## 7. Dopasowanie (`src/utils/`)
**Przypadki (`transferScore.js`, używany przez `matchSolutions`, SolutionsPage, SolutionDetail, SubmitPage, IdeaDetail):** `scoreCase(case, {category, city, available})` → `{excluded, score|null, preliminary, factors[]}`. Wagi (koncepcja §6.3, hipoteza pokazywana w UI): typ problemu 30, kontekst 25, budżet 15, partnerzy 15, dowody 15. Wynik = średnia ważona czynników, **dla których są dane**, 0–100; czynniki bez danych mają `value: null` → „brak danych”, a wynik jest oznaczony jako wstępny. Obecnie z danymi: typ problemu (kategoria przypadku = wybrana kategoria; null bez kategorii) i dowody (A 1, B 0,75, C 0,5, D 0,25 — założenie). Podobieństwo kontekstu (krok 15): `1 − min(1, |share65_user − share65_case| / 0.10)` z migawki GUS BDL `data/bdlContext.json` (`units[city].share65`, rok, źródło/data pobrania pokazywane w `ScoreBreakdown`), tylko gdy zarówno miasto użytkownika (`input.city`; wybór miasta w SolutionsPage, `?city=` w szczegółach), jak i miasto przypadku są w migawce — w przeciwnym razie „brak danych” (miasta zagraniczne, województwa). Różnica 10 pp = 0 to założenie. Migawka (pobrana 2026-10-03, rok 2024, zmienne BDL 72305 ogółem / 72239 + 72240 w wieku 65+, poziom gminy) obejmuje wszystkie 8 miast demo; odświeżanie: `node scripts/fetch-bdl-context.mjs` (opcjonalny klucz `BDL_CLIENT_ID`). Zawsze „brak danych”: budżet (koszty przypadków to dowolny tekst, brak budżetu użytkownika), partnerzy (brak realnego rejestru). Najpierw twarde ograniczenia: `case.requires[]` nieobecne w `input.available[]` → wykluczenie (punkt zaczepienia; żaden przypadek nie deklaruje jeszcze `requires`). SolutionDetail czyta dane wejściowe z `?cat=&city=`.
**Pozostałe encje (`matching.js`):** `matchExperts/Ngos/Fundings/Ideas` przez `matchAll` — punktacja słów kluczowych: kategoria (100/0, 40 neutralna), trafienia słów kluczowych (25 za słowo ≥3 znaki, znormalizowane znaki diakrytyczne), miasto (30). Etykieta: „Sugestie … (model, bez AI)”. Ciągi specjalizacji mapowane przez `SPEC_TO_CAT`.

## 8. Konwencje
- Teksty UI przechodzą przez klucze i18n (pl + en); w nowym kodzie nigdy nie zapisuj na sztywno tekstów widocznych dla użytkownika.
- Używaj prymitywów `components/ui` i klas Tailwind; kolory marki z konfiguracji Tailwind.
- Nowa trasa = strona w `src/pages`, leniwy wpis + `<Route>` w `App.jsx`, aktualizacja nawigacji/i18n, aktualizacja §4 tutaj.
- Środowisko backendu (krok 16, zobacz `DEPLOYMENT.md`): `RESPONDER_EMAILS`, `RESEND_API_KEY`, `MAIL_FROM`, opcjonalnie `PUBLIC_URL` (zmienne/sekrety), binding `EMAIL`; lokalnie `.dev.vars` (w gitignore). Żadnych sekretów w kliencie. Jedyne wywołania zewnętrzne: kafelki mapy, awatary dicebear (`formatters.avatarUrl`). GUS BDL jest pobierany w czasie buildu przez `scripts/fetch-bdl-context.mjs` (nigdy w czasie działania).
- Dostępność (WCAG AA, zobacz `accessibility.md`): kolory tekstu muszą zachować ≥4,5:1 (`neutral-400` spełnia już AA; nie używaj `brand-secondary/accent` jako koloru tekstu); przyciski z samą ikoną wymagają `aria-label` z i18n (`a11y.*`), a ikony dekoracyjne `aria-hidden`; kontrolki formularzy wymagają `htmlFor`/`id`; `Layout` ustawia fokus na `<main>` i tytuł karty z `<h1>` przy zmianie trasy; framer-motion działa w `MotionConfig reducedMotion="user"`.
- Prywatność: SubmitPage pokazuje ostrzeżenie o danych osobowych osób trzecich; wrażliwe zgłoszenia nigdy nie dostają dokładnych punktów na mapie (`utils/privacy.js`); teksty polityki/regulaminu są w i18n `legal.*`.
- Wynik LLM nigdy nie jest pokazywany, jeśli którykolwiek element nie przejdzie sprawdzenia cytatów (krok 17); żadnych wygenerowanych faktów, liczb ani źródeł.
- Nagłówki bezpieczeństwa dla Netlify w `netlify.toml`; Cloudflare używa `wrangler.jsonc`.

## 9. Znane luki / dług techniczny
- Niedziałające kontrolki są ukryte, a nie udawane (brak wyszukiwania, wersji roboczych, dołączania do zespołu, czatu, przesyłania plików/zaproszeń w Project Room); część może wrócić na backendzie z kroku 16 (niezrobione).
- `toasts` zapisywane w localStorage pod kluczem zastępczym.
- Dostępność: ręczny test klawiatury + czytnika ekranu w toku; `Modal` nie ma pełnej pułapki fokusu; mapa tylko częściowo dostępna z klawiatury.
- Migawka GUS BDL jest statyczna (odświeżanie ręczne); tylko 8 miast demo, odsetek osób 65+ jest jedynym wskaźnikiem kontekstu (gęstość zaludnienia itp. nieużywane). Anonimowy limit BDL to 100 żądań/15 min.
- Brak testów. Udostępniane są tylko zgłoszenia (pomysły, projekty, sygnały na mapie zostają lokalne); brak moderacji treści zgłoszeń, brak zmiany e-maila/usuwania konta; dostarczanie e-maili przez Resend z mail.processtotool.com potwierdzone na produkcji (ścieżka Cloudflare Email Service nieprzetestowana); brak limitu linków logowania; lista odpowiadających to zmienna środowiskowa, a nie rejestr realnych organów.
- Plan adaptacji: tekst `action` jest parafrazą modelu (chronią go tylko zakaz cyfr i wymóg cytatu); jakość modelu na żywo jeszcze niesprawdzona; wymaga sekretu `OPENROUTER_API_KEY`.
- Część komentarzy w kodzie jest po rosyjsku.
