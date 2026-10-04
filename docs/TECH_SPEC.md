[← README](../README.md) · [Projekt](../README.md#o-projekcie) · **Specyfikacja techniczna** · [Architektura](./ARCHITECTURE.md) · [Licencja](./LICENSE.md)

# BridgeWay: specyfikacja techniczna

> © 2026 Dominik Liahovich. Wszelkie prawa zastrzeżone. Ta strona podsumowuje system. Wiążącym, zawsze aktualnym źródłem jest [`architecture.md`](../architecture.md).

## Spis treści
1. [Zakres i cele](#1-zakres-i-cele)
2. [Stos technologiczny](#2-stos-technologiczny)
3. [Moduły funkcjonalne](#3-moduły-funkcjonalne)
4. [Trasy](#4-trasy)
5. [Role i uprawnienia](#5-role-i-uprawnienia)
6. [Model danych](#6-model-danych)
7. [Wskaźnik transferu](#7-wskaźnik-transferu)
8. [Dopasowanie po słowach kluczowych](#8-dopasowanie-po-słowach-kluczowych)
9. [Plan adaptacji LLM i zabezpieczenia](#9-plan-adaptacji-llm-i-zabezpieczenia)
10. [HTTP API](#10-http-api)
11. [Wymagania niefunkcjonalne](#11-wymagania-niefunkcjonalne)
12. [Uruchomienie, build, wdrożenie](#12-uruchomienie-build-wdrożenie)
13. [Konfiguracja](#13-konfiguracja)
14. [Znane ograniczenia](#14-znane-ograniczenia)

---

## 1. Zakres i cele

| Cel | Jak jest realizowany |
|---|---|
| Znajdować sprawdzone rozwiązania lokalnych problemów społecznych | Opracowana baza realnych przypadków ze źródłami i poziomami dowodów A–D |
| Uczciwie oceniać dopasowanie | Przejrzysty ważony wskaźnik transferu; „brak danych” zamiast zgadywania |
| Przechodzić od problemu do rezultatu | Zgłoszenia i projekty z odpowiedzialnym organem i osią czasu statusów |
| Włączać osoby wykluczone | Zgłaszanie przez pełnomocnika ze zgodą, cel WCAG AA, PL/EN |
| Chronić prywatność | Lokalizacja tylko na poziomie miasta, zgrubne wyświetlanie wrażliwych zgłoszeń na mapie |
| Nigdy nie wprowadzać w błąd | Dane demo oznaczone; wynik LLM tylko z dosłownymi cytatami sprawdzonymi w źródle |

**Poza zakresem MVP:** bieżące kanały naborów grantowych, rejestr realnych odpowiedzialnych organów, moderacja treści, czat lub przesyłanie plików w pokojach projektów, natywne aplikacje mobilne.

## 2. Stos technologiczny

| Obszar | Wybór | Uwagi |
|---|---|---|
| Build | Vite 5 | `npm run dev / build / preview`, wynik w `dist/` |
| UI | React 18, Tailwind CSS 3 | własna paleta `brand` w `tailwind.config.js` |
| Animacje i ikony | framer-motion, lucide-react | animacje respektują `prefers-reduced-motion` |
| Routing | react-router-dom v6 (`BrowserRouter`) | każda strona ładowana leniwie |
| Formularze | react-hook-form | |
| Mapa | Leaflet + react-leaflet | kafelki OpenStreetMap |
| i18n | i18next + react-i18next | `pl` (domyślny) i `en`; zasoby w `src/i18n.js` |
| Backend | Cloudflare Worker (`worker/index.js`) | obsługuje tylko `/api/*`; pliki statyczne przez binding `ASSETS` |
| Baza danych | Cloudflare D1 (SQLite) | schemat w `migrations/0001–0006` |
| E-mail | Resend HTTP API (produkcja), binding Cloudflare `EMAIL` (zapasowo) | dostarczanie magic linków |
| LLM | OpenRouter | model wybierany w `/admin`, domyślnie `openai/gpt-4o-mini` |
| Statystyki | GUS BDL (Bank Danych Lokalnych) | pobierane **w czasie buildu** przez `scripts/fetch-bdl-context.mjs` |
| Hosting | Cloudflare Workers Static Assets | fallback SPA; `netlify.toml` zachowany jako alternatywa |
| Testy | jeszcze brak | weryfikacja przez `npm run build` i ręczne sprawdzenia |

## 3. Moduły funkcjonalne

### 3.1 Rozwiązania (baza przypadków)
- Realne interwencje z Polski, UE i Wielkiej Brytanii, zaczerpnięte z [`sourcing-spike.md`](../sourcing-spike.md). Każdy przypadek ma link do źródła i oceniony poziom dowodów.
- **Poziomy dowodów:** **A** przegląd systematyczny / metaanaliza RCT · **B** recenzowane badanie kontrolowane lub quasi-eksperymentalne · **C** oficjalna/niezależna ewaluacja albo efekty bez grupy kontrolnej · **D** tylko produkty (wydane pieniądze, przeszkolone osoby), bez zmierzonego efektu.
- Pola, których źródło nie podaje, mają wartość `null` i są pokazywane jako „nie podano” / „nie zmierzono”. Wartości nigdy nie są szacowane.
- Wpisy `kind: 'route'` opisują zalecany proces (np. audyt dostępności → odpowiedzialny organ → technicznie zatwierdzone rozwiązanie) zamiast pojedynczej interwencji.
- „Skopiuj do mojego miasta” tworzy projekt, którego zadania pochodzą z `steps` przypadku albo z ogólnych kroków domyślnych.

### 3.2 Zgłaszanie (sygnały i pomysły)
- Zgłoszenie problemu lub propozycja pomysłu: tytuł, opis, kategoria, miasto.
- **Zgłaszanie przez pełnomocnika:** flaga „w imieniu innej osoby” z zapisanym znacznikiem czasu zgody.
- Przed wysłaniem wyświetlane jest ostrzeżenie dotyczące danych osobowych osób trzecich.
- Pasujące przypadki pojawiają się bezpośrednio pod formularzem.

### 3.3 Udostępniane zgłoszenia (backend)
- Publiczna lista i strony szczegółów z osią czasu statusów: `przyjęte → przypisane → w realizacji → rozwiązane | odrzucone`. Odrzucenie musi zawierać uzasadnienie.
- Odpowiadający ustalają odpowiedzialny organ i zmieniają status.

### 3.4 Projekty
- Pokój projektu z zadaniami, odpowiedzialnym organem (brak jest sygnalizowany), historią statusów i linkiem do przypadku źródłowego (`sourceSolutionId`).

### 3.5 Eksperci, organizacje pozarządowe, finansowanie
- Katalogi demonstracyjne, oznaczone jako takie. Wpisy są dopasowywane do problemu punktacją słów kluczowych ([§8](#8-dopasowanie-po-słowach-kluczowych)). Oceny, adresy e-mail i wymyślone liczby celowo pominięto.

### 3.6 Mapa
- Mapa Leaflet z sygnałami i projektami. Wrażliwe sygnały są rysowane jako okrąg 3 km we współrzędnych przyciągniętych do siatki 0,1° ([§11](#11-wymagania-niefunkcjonalne)).

### 3.7 Analityka
- Liczona na żądanie z D1 (`GET /api/metrics`): liczba zgłoszeń według statusu, odsetek zgłoszeń z odpowiedzią, mediana czasu do pierwszej odpowiedzi i **wskaźnik ponownego wykorzystania** rozwiązań (projekty utworzone z przypadków). Tylko agregaty, bez danych osobowych.

### 3.8 Konta i administracja
- Logowanie bez hasła przez magic linki; akceptacja rejestracji; edycja profilu.
- Prywatne dane per konto (sygnały, pomysły, projekty, zapisane elementy) synchronizowane z D1.
- `/admin` (tylko odpowiadający): tryb rejestracji (wymagana akceptacja / tryb testowy), wybór modelu LLM z cenami, akceptacja/odrzucanie oczekujących rejestracji.

## 4. Trasy

Polskie ścieżki; wszystkie strony ładowane leniwie w `src/App.jsx`.

| Ścieżka | Strona | Uwagi |
|---|---|---|
| `/` | Strona główna | slogan, przyciski do przypadków i zgłaszania, jak to działa, zapowiedź mapy |
| `/rozwiazania`, `/rozwiazania/:id` | Rozwiązania, szczegóły przypadku | rozbicie wskaźnika transferu, plan adaptacji, „skopiuj do mojego miasta” |
| `/zglos` | Zgłoś | zgłoszenie problemu / propozycja pomysłu |
| `/zgloszenia`, `/zgloszenia/:id` | Udostępniane zgłoszenia | wymaga backendu; kontrolki dla odpowiadających |
| `/mapa` | Mapa | |
| `/projekty`, `/projekty/:id` | Projekty, pokój projektu | |
| `/pomysly`, `/pomysly/:id` | Pomysły | |
| `/eksperci`, `/eksperci/:id` | Eksperci | dane demo |
| `/finansowanie` | Finansowanie | dane demo |
| `/analityka` | Analityka | wymaga backendu |
| `/logowanie` | Logowanie | e-mail → magic link; obsługuje `?token=` |
| `/profil` | Profil | wymaga logowania, gdy istnieje backend |
| `/admin` | Administracja | logowanie + rola odpowiadającego |
| `/o-nas`, `/dostepnosc`, `/prywatnosc`, `/regulamin` | O nas, deklaracja dostępności, prywatność, regulamin | |
| `*` | Nie znaleziono | |

## 5. Role i uprawnienia

| Rola | Źródło | Może |
|---|---|---|
| Gość | bez logowania lub bez backendu | korzystać ze wszystkich funkcji lokalnych; dane zostają w tej przeglądarce |
| Mieszkaniec | zaakceptowany e-mail | tworzyć udostępniane zgłoszenia; prywatne dane per konto; plan adaptacji |
| Odpowiadający | na liście `RESPONDER_EMAILS` | wszystko, co mieszkaniec, a ponadto zmieniać status zgłoszenia i odpowiedzialny organ, akceptować rejestracje, zmieniać ustawienia i model LLM |

Rejestracja: linki są wysyłane tylko do odpowiadających i zaakceptowanych adresów. Pozostałe adresy otrzymują status `pending` (najwyżej 200), dopóki odpowiadający nie zdecyduje. W **trybie testowym** nowe adresy są akceptowane automatycznie, ale nadal trzeba kliknąć link z e-maila (limit 50 linków na godzinę).

## 6. Model danych

### 6.1 Encje po stronie klienta (`src/data/index.js`)
| Encja | Kluczowe pola |
|---|---|
| `categories` | `id` (mieszkanie, seniorzy, dostepnosc, cyfrowe, ekologia, integracja, inne), `name`, `nameEn`, `color` |
| `cities` | `id`, `name`, `coords` (8 miast demo) |
| `solutions` | `id`, `kind` (case/route), `category`, `city`, `country`, `year`, `title`, `organisation`, `problem`, `solution`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel`, `context`, `source {label,url}`, `steps`. Pola tekstowe mają postać `{pl,en}` |
| `signals` | zgłoszenia problemów; opcjonalnie `onBehalf`, `consentAt`; zgrubne współrzędne, gdy zgłoszenie jest wrażliwe |
| `ideas`, `projects` | projekty mają `sourceSolutionId`, `responsibleBody`, `statusHistory[] {status,date,note}`, zadania |
| `experts`, `ngos`, `fundings` | wpisy katalogów demonstracyjnych |

Identyfikatory elementów utworzonych przez użytkownika mają prefiks (`s`/`i`/`p`) i znacznik czasu.

### 6.2 Tabele po stronie serwera (D1)
| Tabela | Przeznaczenie |
|---|---|
| `login_tokens` | zahaszowane jednorazowe tokeny logowania (15 min, jednokrotnego użytku) |
| `sessions` | zahaszowane tokeny sesji (30 dni) |
| `registrations` | `email`, `status` (pending/approved/rejected), znaczniki czasu |
| `profiles` | `email`, `name`, `role_label`, `city`, `bio` |
| `reports` | udostępniane zgłoszenia: właściciel, tytuł, opis, kategoria, miasto, `on_behalf`, `responsible_body` |
| `report_status` | wiersze osi czasu statusów z uzasadnieniem i rolą wykonawcy |
| `user_data` | fragmenty JSON per konto (`signals`, `ideas`, `projects`, `saved`), każdy ≤ 256 KB |
| `adapt_log` | wywołania planu adaptacji, do limitowania |
| `settings` | klucz/wartość: `testMode`, `llmModel` |

Pełny diagram: [Architektura → Przechowywanie danych](./ARCHITECTURE.md#6-przechowywanie-danych).

## 7. Wskaźnik transferu

Zaimplementowany w `src/utils/transferScore.js` jako `scoreCase(case, {category, city, available})` → `{excluded, score|null, preliminary, factors[]}`.

| Czynnik | Waga | Wartość | Dane obecnie |
|---|---|---|---|
| Typ problemu | 30 | 1, jeśli kategoria przypadku równa się wybranej kategorii | ✅ gdy wybrano kategorię |
| Kontekst lokalny | 25 | `1 − min(1, |share65_user − share65_case| / 0.10)` | ✅ gdy oba miasta są w migawce GUS BDL |
| Budżet | 15 | — | ❌ zawsze „brak danych” (koszty to dowolny tekst) |
| Partnerzy | 15 | — | ❌ zawsze „brak danych” (brak realnego rejestru) |
| Dowody | 15 | A 1,0 · B 0,75 · C 0,5 · D 0,25 | ✅ |

- **Wynik** = średnia ważona czynników, **dla których są dane**, przeskalowana do 0–100.
- Jeśli któregokolwiek czynnika brakuje, wynik jest oznaczony jako **wstępny**, a UI wymienia każdy brakujący czynnik jako „brak danych”.
- **Najpierw twarde ograniczenia:** przypadek, którego `requires[]` nie jest spełnione, jest wykluczany (punkt zaczepienia na przyszłość).
- Wagi i próg 10 punktów procentowych to jawne hipotezy i są pokazywane w UI.
- Dane kontekstowe: GUS BDL, poziom gminy, rok 2024, ludność w wieku 65+ podzielona przez ludność ogółem (pobrano 2026-10-03). Odświeżanie: `node scripts/fetch-bdl-context.mjs`.

## 8. Dopasowanie po słowach kluczowych

`src/utils/matching.js` szereguje ekspertów, organizacje, finansowanie i pomysły względem problemu:

| Sygnał | Punkty |
|---|---|
| Zgodność kategorii | 100 (40 przy neutralnej, 0 przy niezgodnej) |
| Trafienie słowa kluczowego (słowo ≥ 3 znaki, znormalizowane znaki diakrytyczne) | 25 za każde |
| To samo miasto | 30 |

W UI są oznaczone jako „Sugestie (model, bez AI)”.

## 9. Plan adaptacji LLM i zabezpieczenia

`POST /api/adapt-plan {caseId, city, lang}` (zaimplementowane w `worker/adaptPlan.js`):

1. **Wyszukiwanie:** jedynym korpusem jest wybrany przypadek. Brak dostępu do internetu i innej wiedzy.
2. **Generowanie:** model zwraca `{items: [{action, evidence: [{field, quote}]}]}`.
3. **Walidacja:** element zostaje zachowany tylko wtedy, gdy
   - `action` **nie zawiera cyfr** (więc nie ma wymyślonych liczb), oraz
   - każdy `quote` jest **dosłownym fragmentem** cytowanego pola przypadku. Cytat jest następnie zastępowany oryginalnym tekstem źródła.
4. **Wyświetlanie:** plan jest pokazywany tylko wtedy, gdy każdy element przejdzie walidację. Link do źródła to własne `source` przypadku. `gaps` wymienia pola przypadku, które mają wartość `null`.
5. **Limity:** wymagane logowanie, tylko JSON z tego samego źródła (same-origin), 10 wywołań na godzinę na konto. Wyniki nie są przechowywane.

Kontrakt błędów: `404` nieznany przypadek · `429 rate_limited` · `502 llm_failed` · `503 llm_unavailable` (brak klucza API).

## 10. HTTP API

Wszystkie endpointy obsługuje Worker pod `/api/`. Treści żądań i odpowiedzi to JSON. Sesje używają ciasteczka HttpOnly `bw_session`.

| Metoda | Ścieżka | Autoryzacja | Przeznaczenie |
|---|---|---|---|
| GET | `/api/health` | — | sprawdzenie dostępności backendu |
| GET | `/api/me` | sesja | bieżące konto `{email, role}` |
| POST | `/api/auth/request` | — | prośba o magic link (lub utworzenie oczekującej rejestracji) |
| POST | `/api/auth/verify` | — | wymiana tokenu na ciasteczko sesji |
| POST | `/api/auth/logout` | sesja | zakończenie sesji |
| GET, PUT | `/api/profile` | sesja | odczyt / aktualizacja profilu |
| GET | `/api/user-data` | sesja | wszystkie prywatne fragmenty danych |
| PUT | `/api/user-data/:slice` | sesja | zapis jednego fragmentu (`signals`, `ideas`, `projects`, `saved`) |
| GET | `/api/reports` | — | lista udostępnianych zgłoszeń |
| POST | `/api/reports` | sesja | utworzenie udostępnianego zgłoszenia |
| GET | `/api/reports/:id` | — | szczegóły zgłoszenia z osią czasu |
| POST | `/api/reports/:id/status` | odpowiadający | dodanie statusu (+ uzasadnienie, odpowiedzialny organ) |
| POST | `/api/adapt-plan` | sesja | zabezpieczony plan adaptacji LLM |
| GET | `/api/metrics` | — | zagregowana analityka |
| GET | `/api/admin/registrations` | odpowiadający | oczekujące rejestracje |
| POST | `/api/admin/registrations/decide` | odpowiadający | akceptacja / odrzucenie |
| GET, POST | `/api/admin/settings` | odpowiadający | tryb testowy |
| GET, POST | `/api/admin/llm` | odpowiadający | bieżący model LLM (walidowany względem katalogu) |
| GET | `/api/admin/llm/models` | odpowiadający | katalog modeli OpenRouter z cenami (cache 10 min) |

## 11. Wymagania niefunkcjonalne

### Bezpieczeństwo
- Logowanie bez hasła. Tokeny i sesje są przechowywane wyłącznie jako **hasze**. Tokeny logowania są jednorazowe i wygasają po 15 minutach.
- Ciasteczko sesji ma atrybuty `HttpOnly; Secure; SameSite=Lax`. Żądania zmieniające stan wymagają nagłówka `Origin` z tego samego źródła i typu treści JSON (ochrona przed CSRF).
- Tylko odpowiadający mogą zmieniać status zgłoszenia. Odrzucenie bez uzasadnienia jest odrzucane (`400 reason_required`).
- **Brak sekretów w kliencie.** Klucze API znajdują się wyłącznie w sekretach Workera.
- Nagłówki bezpieczeństwa są zdefiniowane w `netlify.toml` / `wrangler.jsonc`.
- Jedyne zewnętrzne wywołania w czasie działania to kafelki OpenStreetMap i awatary DiceBear. GUS BDL jest pobierany tylko w czasie buildu.

### Prywatność (zgodnie z duchem RODO)
- Przechowywane jest tylko miasto, nigdy adres.
- Wrażliwe zgłoszenia (kategorie `seniorzy` i `mieszkanie` lub każde zgłoszenie w imieniu innej osoby) są zapisywane ze zgrubnymi współrzędnymi i rysowane jako okrąg 3 km na siatce 0,1° (`src/utils/privacy.js`).
- Dane per konto są prywatne. Gdy użytkownik się wyloguje lub zmieni konto, stan poprzedniego konta jest czyszczony z pamięci.
- Metryki są wyłącznie zagregowane.

### Dostępność
- Cel: WCAG 2.1 AA. Kontrast tekstu ≥ 4,5:1; przyciski z samą ikoną mają przetłumaczone `aria-label`; ikony dekoracyjne mają `aria-hidden`; kontrolki formularzy są opisane.
- Po zmianie trasy fokus przechodzi do `<main>`, a tytuł karty jest aktualizowany. Animacje działają w `MotionConfig reducedMotion="user"`.
- Lista kontrolna i oczekujące ręczne sprawdzenia: [`accessibility.md`](../accessibility.md).

### Internacjonalizacja
- Każdy tekst widoczny dla użytkownika przechodzi przez klucze i18n w `pl` i `en`. Wybór języka jest zapisywany w `localStorage`.

### Wydajność
- Strony są ładowane leniwie, a mapa jest wydzielona do osobnego chunka.
- Pliki statyczne są serwowane z brzegu sieci Cloudflare, a Worker działa tylko dla `/api/*`.

### Odporność
- Bez backendu (`/api/health` nie odpowiada) aplikacja działa w trybie lokalnym i informuje użytkownika, że dane zostają w przeglądarce.

## 12. Uruchomienie, build, wdrożenie

```bash
npm install
npm run dev                 # serwer deweloperski Vite (przekierowuje /api na :8787)
npm run dev:api             # Worker + D1 lokalnie na :8787
npm run db:migrate:local    # zastosowanie migracji D1 lokalnie
npm run build               # build produkcyjny do dist/
npm run preview             # podgląd buildu
node scripts/fetch-bdl-context.mjs   # odświeżenie migawki GUS BDL
```

Do lokalnego logowania utwórz `.dev.vars` (w gitignore) z `DEV_MAGIC_LINK=true` i `RESPONDER_EMAILS=you@example.com`. Link logowania pojawi się wtedy na stronie zamiast w e-mailu.

Wdrożenie produkcyjne (Cloudflare):
```bash
npx wrangler d1 migrations apply bridgeway --remote
npx wrangler secret put RESPONDER_EMAILS
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put OPENROUTER_API_KEY
npm run build && npx wrangler deploy
```
Pełny przewodnik: [`DEPLOYMENT.md`](../DEPLOYMENT.md).

## 13. Konfiguracja

| Nazwa | Rodzaj | Wymagane | Przeznaczenie |
|---|---|---|---|
| `DB` | binding D1 | backend | baza danych |
| `ASSETS` | binding assets | tak | statyczne pliki SPA |
| `RESPONDER_EMAILS` | sekret | backend | adresy e-mail odpowiadających, rozdzielone przecinkami |
| `RESEND_API_KEY` | sekret | dla e-maili | wysyłka przez Resend |
| `MAIL_FROM` | zmienna | dla e-maili | nadawca, np. `BridgeWay <login@…>` w zweryfikowanej domenie |
| `EMAIL` | binding send-email | opcjonalne | zapasowo Cloudflare Email Service |
| `OPENROUTER_API_KEY` | sekret | dla planu adaptacji | dostęp do LLM |
| `PUBLIC_URL` | zmienna | opcjonalne | bazowy URL w linkach z e-maili |
| `DEV_MAGIC_LINK` | tylko `.dev.vars` | lokalnie | pokazuje link zamiast wysyłać go e-mailem. **Nigdy nie ustawiaj na produkcji** |
| `BDL_CLIENT_ID` | env | opcjonalne | wyższy limit GUS BDL dla skryptu migawki |

## 14. Znane ograniczenia

- Brak testów automatycznych.
- Udostępniane są tylko zgłoszenia. Pomysły, projekty i sygnały na mapie zostają per konto / per przeglądarka.
- Brak moderacji treści, zmiany adresu e-mail i usuwania konta. Brak limitu linków logowania.
- Odpowiadający to lista w zmiennej środowiskowej, a nie rejestr realnych organów.
- Migawka GUS jest statyczna, obejmuje 8 miast demo i używa jednego wskaźnika kontekstu (odsetek mieszkańców w wieku 65+).
- Tekst `action` z LLM jest parafrazą, zabezpieczoną tylko zakazem cyfr i wymogiem cytatu. Jakość modelu na żywo nie została jeszcze sprawdzona.
- Dostępność: ręczny przegląd z czytnikiem ekranu jest w toku, `Modal` nie ma pełnej pułapki fokusu, a mapa jest tylko częściowo dostępna z klawiatury.
- Produkt **nie został jeszcze zweryfikowany z użytkownikami** ([`validation.md`](../validation.md)).

---

[← Powrót do README](../README.md) · [Architektura →](./ARCHITECTURE.md)
