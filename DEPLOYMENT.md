# Specyfikacja wdrożenia — GitHub + Cloudflare Pages (w obecnej postaci, bez backendu)

Zakres dokumentu: przeniesienie obecnej statycznej aplikacji BridgeWay na GitHub, a następnie hostowanie jej na Cloudflare Pages dokładnie tak, jak działa dziś (dane demo po stronie klienta, stan w `localStorage`). Dodanie prawdziwego backendu (Cloudflare Workers + D1) to osobne, późniejsze zadanie — nieopisane w tej części (zobacz sekcje na końcu dokumentu).

## 1. Nazwa repozytorium

**`bridgeway`** — zgodna z faktyczną nazwą produktu (tytuł strony, nagłówek, identyfikacja wizualna), a nie z nieaktualną nazwą `bridgeart`, która była w `package.json` (obecnie poprawiona).

## 2. Co jest w repozytorium, a co ignorowane

Śledzone:
```
.gitignore
README.md
DEPLOYMENT.md
index.html
netlify.toml          (można zostawić; Cloudflare go ignoruje, czyta go tylko Netlify)
package.json / package-lock.json
postcss.config.js
tailwind.config.js
vite.config.js
public/               (favicon.svg, _redirects)
src/                  (cały kod aplikacji)
```

Ignorowane (`.gitignore`):
```
node_modules
dist
.netlify
.DS_Store
*.log
```

`node_modules` nigdy nie jest commitowany — to już jest zapewnione. Każdy, kto sklonuje repozytorium, uruchamia `npm install`, aby je odtworzyć.

## 3. Przygotowanie lokalne — wykonane

Poniższe kroki wykonano w czystej kopii roboczej w ścieżce bez spacji i cyrylicy (`~/Projects/bridgeway`), skopiowanej z oryginalnego archiwum ZIP z pominięciem `node_modules`, `dist`, `.netlify`, `.DS_Store` i zbędnego folderu `__MACOSX`:

- [x] Uporządkowany katalog (bez śmieci z macOS, bez zagnieżdżonego duplikatu folderu)
- [x] Rozszerzony `.gitignore` (`node_modules`, `dist`, `.netlify`, `.DS_Store`, `*.log`)
- [x] Dodany `public/_redirects` — `/* /index.html 200` (fallback SPA dla Cloudflare Pages, odpowiednik istniejącej reguły Netlify `[[redirects]]`, potrzebny, bo aplikacja używa `BrowserRouter` z React Router z prawdziwymi ścieżkami, np. `/mapa`, `/pomysly/i1`)
- [x] Poprawione pole `name` w `package.json` na `bridgeway`
- [x] `git init` + pierwszy commit (zobacz niżej)

## 4. Wypchnięcie na GitHub

To środowisko ma skonfigurowany dostęp SSH do GitHuba (użytkownik `codriter`), ale nie ma `gh` CLI ani tokenu API, więc puste repozytorium trzeba raz utworzyć przez interfejs WWW GitHuba — wszystko inne jest już zrobione lub oskryptowane.

**Jedyny krok ręczny:**
1. Wejdź na <https://github.com/new>
2. Nazwa repozytorium: `bridgeway`
3. Widoczność: **Public**
4. **Nie** zaznaczaj „Add a README”, „Add .gitignore” ani „Choose a license” — repozytorium musi być puste, inaczej pierwszy push będzie w konflikcie z plikami utworzonymi po stronie GitHuba.
5. Kliknij **Create repository**.

Następnie wypchnij (z `~/Projects/bridgeway`):
```bash
git remote add origin git@github.com:codriter/bridgeway.git
git branch -M main
git push -u origin main
```

**Aby uzyskać kopię roboczą w innym miejscu** („sklonuj do innego folderu”):
```bash
git clone git@github.com:codriter/bridgeway.git /path/to/another/folder
cd /path/to/another/folder
npm install
npm run dev
```

## 5. Konfiguracja Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**
2. Autoryzuj aplikację GitHub Cloudflare i wybierz repozytorium `bridgeway`
3. Ustawienia buildu:
   | Ustawienie | Wartość |
   |---|---|
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` |
   | Environment variables | niepotrzebne |
4. Kliknij **Save and Deploy**

Cloudflare buduje i serwuje aplikację pod `https://bridgeway.pages.dev` (darmowa subdomena `*.pages.dev`, dodawana automatycznie). Każdy kolejny push do `main` uruchamia nowe wdrożenie; każdy pull request dostaje własny darmowy adres podglądu.

## 6. Lista kontrolna po wdrożeniu

- [ ] Strona główna ładuje się pod `https://bridgeway.pages.dev`
- [ ] Nawigacja po stronie klienta działa (przejście do `/mapa`, `/pomysly` itd.)
- [ ] **Bezpośredni URL / odświeżenie podstrony działa** (np. otwórz bezpośrednio `https://bridgeway.pages.dev/mapa` albo odśwież będąc na niej) — dokładnie ten przypadek naprawia `public/_redirects`; jeśli pojawia się 404, plik `_redirects` nie trafił do wyniku buildu w `dist`
- [ ] Mapa (Leaflet) renderuje się poprawnie
- [ ] Przełącznik języka (PL/EN przez i18next) działa
- [ ] Wysłanie problemu/pomysłu przez `/zglos` nadal działa (zapis do `localStorage`, więc tylko w danej przeglądarce — oczekiwane bez backendu)

## 7. Zgodność z darmowym planem

Wszystko tutaj działa w darmowym planie Cloudflare: nielimitowane statyczne żądania i transfer dla Pages, darmowa subdomena `*.pages.dev` i SSL, 500 buildów miesięcznie. Nie jest potrzebna karta płatnicza ani własna domena. (Własną domenę można później podpiąć za darmo — płaci się tylko rejestratorowi za samą nazwę domeny, nie Cloudflare.)

## 8. Poza zakresem (przyszłe prace)

Prawdziwy backend (Cloudflare Pages Functions + D1, zastępujący dane demo w `src/data/index.js` i zapisy do `localStorage` współdzieloną, trwałą bazą danych) omówiono osobno i celowo pominięto w tej migracji. Do powrotu, gdy będzie gotowość — to mały, dobrze wydzielony dodatek do tej konfiguracji, a nie przepisanie aplikacji.

## Backend (krok 16): Worker + D1 + logowanie magic linkiem
- Lokalnie: utwórz `.dev.vars` (w gitignore) z `DEV_MAGIC_LINK=true` i `RESPONDER_EMAILS=urzad@example.com`; `npm run build`, `npm run db:migrate:local`, `npm run dev:api` (serwuje stronę + API na :8787) albo `npm run dev` + `npm run dev:api` (Vite przekierowuje `/api`). Z `DEV_MAGIC_LINK` link logowania pokazuje się na stronie zamiast w e-mailu.
- Produkcja: `npx wrangler d1 create bridgeway` (albo automatyczne utworzenie przez wrangler), `npx wrangler d1 migrations apply bridgeway --remote`, następnie `wrangler secret put RESPONDER_EMAILS` (lista rozdzielona przecinkami) i ustawienie `MAIL_FROM` oraz bindingu wysyłki `EMAIL` (Cloudflare Email Service; domena nadawcy musi być dodana). Nigdy nie ustawiaj `DEV_MAGIC_LINK` na produkcji. `npx wrangler deploy` po `npm run build`.
- Bez Workera (np. na Netlify) aplikacja działa jak wcześniej; udostępniane zgłoszenia i logowanie pokazują komunikat „brak serwera / dane są lokalne”.
- E-mail przez Resend (bez własnej domeny): `wrangler secret put RESEND_API_KEY`. Bez `MAIL_FROM` nadawcą jest `onboarding@resend.dev`, z którego Resend dostarcza wiadomości **tylko na adres właściciela konta Resend** — wystarcza to do logowania odpowiadającego; mieszkańcy potrzebują zweryfikowanej domeny (`MAIL_FROM` w niej). Kolejność wysyłki: link deweloperski → Resend → binding Cloudflare `EMAIL`.
- Rejestracja z akceptacją: nowe adresy są zapisywane jako oczekujące; odpowiadający akceptuje je w `/logowanie`. Ze wspólnym testowym nadawcą Resend linki otrzymuje tylko skrzynka właściciela konta Resend, więc zaakceptowani mieszkańcy nie zalogują się, dopóki `MAIL_FROM` nie będzie w zweryfikowanej domenie (Resend lub Cloudflare Email Service).
- Nadawca produkcyjny: `MAIL_FROM = BridgeWay <login@mail.processtotool.com>` (zmienne w wrangler.jsonc; subdomena zweryfikowana w Resend), więc zaakceptowane adresy mogą otrzymywać linki. Dostarczanie do prawdziwej skrzynki potwierdzone przez właściciela (2026-10-04).
- Tryb testowy: odpowiadający może włączyć w `/admin` opcję „wysyłaj linki na nowe adresy bez akceptacji” (zapisane w D1, domyślnie wyłączone, limit 50 linków/h). Linki nadal są wysyłane e-mailem, więc posiadanie adresu jest weryfikowane. Po pokazach wyłącz.

### Plan adaptacji (krok 17)
Korzysta z OpenRouter: sekret `OPENROUTER_API_KEY` (`wrangler secret put OPENROUTER_API_KEY`); model wybiera się w `/admin` (D1 `settings.llmModel`). Przed wdrożeniem zastosuj nową migrację (`wrangler d1 migrations apply bridgeway --remote`); lokalnie `npm run db:migrate:local`. Lokalnie umieść `OPENROUTER_API_KEY` w `.dev.vars`; bez niego endpoint zwraca `llm_unavailable`.
