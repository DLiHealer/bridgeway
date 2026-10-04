## Roadmapa przygotowania MVP aplikacji

Statusy:
- Otwarte
- W toku
- Zablokowane
- Odłożone
- Zrobione


### Krok 1. Status: Zrobione

Utworzyć specyfikację architektury i dodać dokumentację dla Claude Code, aby była utrzymywana przy każdej wprowadzanej zmianie i służyła jako punkt odniesienia dla przyszłych zmian.

Zaktualizować .gitignore tak, aby w repozytorium nie pojawiały się instrukcje dla AI.

Utworzyć indeks specyfikacji, który również będzie aktualizowany przy zmianach.

---

# Roadmapa v1 — z `concept_v1.0.md` §17

Źródło: [concept_v1.0.md](./concept_v1.0.md) (zatwierdzona). Kroki są uporządkowane według zasady Pareto: najpierw najwyższy stosunek wartości do nakładu. Krok N = punkt koncepcji P(N-1); identyfikatory `P1…P18` zachowano dla identyfikowalności.

Konwencje:
- Nakład: S ≈ do pół dnia, M ≈ 1 dzień, L ≈ 2–3 dni, XL = po hackathonie. Wartość: ●●● wysoka … ● niska. Szacunki są przybliżone, dla zespołu 1–2 programistów.
- Każda zmiana tras, stanu, modelu danych lub zależności (P5, P6, P8, P15) aktualizuje `architecture.md` w tej samej zmianie.
- Każda liczba pokazana w UI lub w pitchu jest **realna** (ze źródłem), **docelowa** (oznaczona) albo **demonstracyjna** (oznaczona). Innych nie ma.
- Kroki P14–P17 nie zaczynają się, dopóki P1–P13 nie są Zrobione albo świadomie wycięte.

## Założenia (otwarte pytania z koncepcji §15, na które jeszcze nie odpowiedziano)
- Klin wejścia: dostępność lokalnych/publicznych usług (+ osamotnienie seniorów jako drugi przykład).
- Demo: dwie gminy, przypadek przeniesiony z jednej do drugiej; UI w pl/en.
- Backend i LLM to poziom 2: nie blokują głównego demo; bez nich prototyp jest uczciwie oznaczony „dane są lokalne”.
- Rozpoznanie źródeł (P4) i walidację (P12) prowadzi zespół równolegle, a nie programista na ścieżce krytycznej.

## Kolejność realizacji
1. Równolegle od pierwszego dnia: **P4** (rozpoznanie źródeł) i **P12** (walidacja).
2. Rozwój: P1 → P2 → P3 (szybkie zwycięstwa) → P5 → P6 → P7 → P8 → P9 → P10 → P11.
3. Pakowanie: **P13**; zarezerwować co najmniej jeden dzień na próbę.
4. Tylko przy wolnym czasie: P14 → P15 → P16 → P17.
5. **Bramka po P4:** jeśli wynik rozpoznania trafia do wierszy 2–3 z koncepcji §7.4, zrewidować sformułowanie USP przed rozpoczęciem P5–P6.

## Warstwa 1 — Zaufanie i działający przepływ (~20% nakładu → ~50% wartości)

### Krok 2 (P1). Status: Zrobione
**Uczciwość danych.** Usunąć wymyślone KPI (Home, Analityka), plakietki „zweryfikowano”, oceny ekspertów i deklaracje „efektu” bez źródeł; oznaczyć dane demo; usunąć lub ukryć fałszywe kontakty ekspertów.
- Nakład S · Wartość ●●● · Po: —
- Zrobione, gdy: żadna liczba w UI nie jest pozbawiona źródła lub etykiety „demo/cel”; nie zostały żadne wymyślone organizacje ani oceny.

### Krok 3 (P2). Status: Zrobione
**Naprawić przepływ end-to-end** Rozwiązanie → „Skopiuj to u siebie” → Projekt (`/projekty` był kopią ProfilePage).
- Nakład S · Wartość ●●● · Po: —
- Zrobione, gdy: scenariusz przechodzi bez ślepych zaułków; lista projektów jest prawdziwą listą.

### Krok 4 (P3). Status: Zrobione
**Usunąć martwe UI.** Każda niedziałająca kontrolka jest albo minimalnie zaimplementowana, albo ukryta, albo oznaczona jako „prototyp” (wyszukiwanie, wylogowanie, zapis wersji roboczej, przesyłanie plików, czat, eksport PDF, dołączanie do zespołu).
- Nakład S · Wartość ●●● · Po: —
- Zrobione, gdy: ścieżka demo nie zawiera żadnego przycisku bez efektu.

## Warstwa 2 — Główne USP (~25% nakładu → ~+30% wartości)

### Krok 5 (P4). Status: Zrobione
**Rozpoznanie źródeł.** Znaleźć i zweryfikować 10–15 realnych przypadków dotyczących dostępności / wsparcia seniorów (źródło, organizacja, koszt, czas trwania, efekt i sposób jego pomiaru, poziom dowodów A–D, licencja/zasady ponownego wykorzystania). Przypadki, których nie da się zweryfikować, są wykluczane. Prowadzone równolegle.
- Nakład M · Wartość ●●● · Po: —
- Zrobione, gdy: istnieje tabela przypadków z klikalnymi źródłami, a decyzja zgodnie z koncepcją §7.4 jest zapisana.
- Wynik ([sourcing-spike.md](./sourcing-spike.md)): 6 zweryfikowanych przypadków (<10) → §7.4 wiersz 3; sformułowanie USP trzeba zrewidować przed krokami 6–7. Zespół rozszerza bazę równolegle.

### Krok 6 (P5). Status: Zrobione
**Schemat przypadku popartego dowodami.** Dodać `source`, `organisation`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel`, `context`; wczytać przypadki z P4; usunąć niebezpieczny przypadek „drewniane podjazdy zrób to sam” (zastąpić ścieżką: audyt dostępności → odpowiedzialny organ → technicznie zatwierdzone rozwiązanie).
- Nakład M · Wartość ●●● · Po: P4
- Zrobione, gdy: wszystkie przypadki w aplikacji są realne, mają źródła i ocenę A–D. Zaktualizować `architecture.md` §6.
- Wynik: 6 zweryfikowanych przypadków + 1 wpis ścieżki (`route1`, Dostępność Plus, poziom C) w `src/data/index.js`; poziom dowodów, źródło, koszt, efekt i pomiar pokazane na stronach listy/szczegółów; sformułowanie USP zgodnie z bramką z kroku 5 do zastosowania w kroku 8 (P7).

### Krok 7 (P6). Status: Zrobione
**Wskaźnik transferu z wyjaśnieniem.** Ważona formuła z koncepcji §6.3 z widocznymi wagami, „brak danych” zamiast wymyślonych wartości, najpierw twarde ograniczenia; jeden algorytm dopasowania na każdym ekranie rekomendacji; usunąć etykietę „AI” z dopasowania po słowach kluczowych.
- Nakład M · Wartość ●●● · Po: P5
- Zrobione, gdy: każdy przypadek pokazuje wynik z rozbiciem na czynniki i źródło każdej danej wejściowej. Zaktualizować `architecture.md` §7.
- Wynik: `src/utils/transferScore.js` + `ScoreBreakdown`; dane mają tylko typ problemu i dowody, kontekst/budżet/partnerzy pokazują „brak danych” (wynik wstępny) do kroku 15 / realnego rejestru.

### Krok 8 (P7). Status: Zrobione
**Nowe pozycjonowanie strony głównej.** Slogan „Problem został już gdzieś rozwiązany.” (pl; odpowiednik en, przez i18n), dwa przyciski CTA, 5 kroków „jak to działa”, przypadki jako centrum nawigacji; zdegradować Pomysły / Profil / Analitykę zgodnie z koncepcją §5.5.
- Nakład S · Wartość ●●○ · Po: P5
- Zrobione, gdy: pierwszy ekran wyjaśnia wartość w ~5 sekund. Zaktualizować `architecture.md` §4.
- Wynik: nowy slogan + dwa CTA (znajdź przypadek / zgłoś), przypadki pokazane w sekcji hero i zaraz po niej, sekcja pomysłów usunięta ze strony głównej, nawigacja przestawiona (Pomysły na końcu), zapowiedź mapy oznaczona jako demo.

## Warstwa 3 — Wartość społeczna i odpowiedzialność (~20% nakładu → ~+12% wartości)

### Krok 9 (P8). Status: Zrobione
**Adresat i status zgłoszenia.** Pole `responsibleBody`, oś czasu statusów (przyjęte → przypisane → w realizacji → rozwiązane/odrzucone + uzasadnienie), pokazywane w Project Room.
- Nakład M · Wartość ●●○ · Po: P2
- Zrobione, gdy: zgłoszenie demo pokazuje adresata i historię statusów; pusty adresat jest sygnalizowany. Zaktualizować `architecture.md` §6.
- Wynik: `responsibleBody` + `statusHistory` w projektach, oś czasu i karta adresata w przeglądzie Project Room (pusty adresat sygnalizowany, odrzucenie wymaga uzasadnienia).

### Krok 10 (P9). Status: Zrobione
**Minimalne zgłaszanie z pomocą.** Flaga „zgłaszam w imieniu innej osoby”, zapisana zgoda, podpowiedź o punktach pomocy (biblioteka, klub seniora, pracownik socjalny, NGO).
- Nakład S · Wartość ●●○ · Po: —
- Zrobione, gdy: flaga i tekst zgody są w formularzu; scenariusz demo przechodzi przez pełnomocnika.
- Wynik: pole wyboru pełnomocnika + wymagana zgoda + podpowiedź o punktach pomocy w formularzu zgłoszenia (zakładka problemu), `onBehalf`/`consentAt` zapisane w sygnale, sygnał demo `s6` jest zgłoszeniem przez pełnomocnika, plakietka w popupie mapy.

### Krok 11 (P10). Status: Zrobione
**Minimum dostępności i sprawdzenie.** Nawigacja klawiaturą, widoczny fokus, kontrast WCAG AA, skalowanie tekstu do 200%, landmarki, etykiety ikon, deklaracja dostępności; przejście głównego scenariusza z klawiaturą i czytnikiem ekranu.
- Nakład M · Wartość ●●○ · Po: P7, P9
- Zrobione, gdy: lista kontrolna zaliczona; pozostałe ograniczenia uczciwie wymienione.
- Wynik: lista kontrolna na poziomie kodu wykonana ([accessibility.md](./accessibility.md)) — tokeny kontrastu, opisane landmarki/ikony/formularze, obsługa Esc, fokus przy zmianie trasy, ograniczony ruch, deklaracja pod `/dostepnosc`. **Ręczny test klawiatury + czytnika ekranu wciąż czeka (człowiek)** i jest wymieniony jako ograniczenie.

### Krok 12 (P11). Status: Zrobione
**Minimum prywatności i bezpieczeństwa.** Zgrubienie punktów na mapie dla wrażliwych kategorii, ostrzeżenie o danych osobowych osób trzecich, prawdziwe strony Polityki prywatności i Regulaminu linkowane w stopce.
- Nakład S–M · Wartość ●●○ · Po: —
- Zrobione, gdy: strony istnieją; dokładne adresy wrażliwych kategorii nie są publikowane.
- Wynik: `/prywatnosc` + `/regulamin` (linki w stopce, projekty prototypowe, pl/en), ostrzeżenie o danych osób trzecich w formularzu zgłoszenia, wrażliwe kategorie (seniorzy, mieszkalnictwo) i zgłoszenia przez pełnomocnika pokazywane na mapie jako przybliżony obszar 3 km. Teksty prawne wymagają prawdziwej weryfikacji prawnej przed produkcją.

### Krok 13 (P12). Status: Odłożone
**Walidacja.** 5 wywiadów z grupą docelową, ≥1 gmina/powiat, ≥2 NGO, ≥1 punkt pomocy, ≥1 list intencyjny lub cytat; wyniki w osobnym pliku w `spec/`. Prowadzone równolegle.
- Nakład M · Wartość ●●● · Po: —
- Zrobione, gdy: realne cytaty i uczciwe liczby są gotowe do pitchu (bez zaokrąglania w górę).
- Decyzja: **świadomie wycięte na czas hackathonu** — brak dostępu do respondentów przed terminem. Zastąpione dowodami zza biurka (wtórnymi, tak oznaczonymi) i uczciwą deklaracją „jeszcze niezweryfikowane” w pitchu; opcjonalny kontakt asynchroniczny, wyniki raportowane z n. Plan, scenariusz wywiadu i logi zachowane w [validation.md](./validation.md) na pilotaż po hackathonie.

## Warstwa 4 — Pakowanie

### Krok 14 (P13). Status: Zrobione
**Scenariusz demo i pitch.** 90-sekundowy scenariusz end-to-end, kadr przed/po (prawdziwy albo wyraźnie oznaczony jako zainscenizowany), slajd o konkurencji (koncepcja §11), uczciwa informacja, co jest symulowane.
- Nakład M · Wartość ●●● · Po: P6, P8, P9 (P12 wycięte)
- Zrobione, gdy: próba przechodzi bez błędów, a każda liczba jest oznaczona; slajd walidacji pokazuje realny status (dowody zza biurka + „jeszcze niezweryfikowane z użytkownikami”, kolejny krok: wywiady/pilotaż).
- Wynik: pitch.md (`spec/pitch.md`, wewnętrzny) — 90-sekundowy scenariusz przypisany do tras, zainscenizowany (oznaczony) kadr przed/po plus jeden realny zmierzony efekt (c1, poziom B), slajd o konkurencji oznaczony jako niezweryfikowany, lista symulowane-vs-realne, rejestr liczb, slajd walidacji. **Próba z ludźmi i sprawdzenie stron konkurencji wciąż czekają** (lista kontrolna w pitch.md).

## Warstwa 5 — Wzmocnienie, jeśli zostanie czas (malejące korzyści)

### Krok 15 (P14). Status: Zrobione
**Jedno realne źródło kontekstu.** GUS BDL (odsetek 65+, ludność) dla 2 gmin, zasilające czynnik „podobieństwa kontekstu”.
- Nakład M · Wartość ●●○ · Po: P6
- Zrobione, gdy: czynnik jest liczony z realnych danych z pokazanym źródłem.
- Wynik: `src/data/bdlContext.json` — realna migawka GUS BDL (odsetek 65+, 2024, poziom gminy) dla 8 miast demo, tworzona przez `scripts/fetch-bdl-context.mjs`; czynnik kontekstu = 1 − różnica/10 pp (przyjęta skala), gdy oba miasta mają dane, źródło + wartości pokazane w karcie wyniku, wybór miasta na liście przypadków. Przypadki zagraniczne/regionalne pozostają „brak danych”.

### Krok 16 (P15). Status: Zrobione
**Współdzielony backend + logowanie magic linkiem** dla pętli zgłoszenie → strona publiczna → zmiana statusu przez inną rolę.
- Nakład L · Wartość ●●○ · Po: P8
- Zrobione, gdy: dwie przeglądarki widzą te same dane; w przeciwnym razie demo zachowuje etykietę „dane są lokalne”. Zaktualizować `architecture.md` §2, §5, §9.
- Wynik (+ rejestracja z akceptacją odpowiadającego): Worker + D1 (`worker/index.js`), logowanie magic linkiem, publiczne `/zgloszenia` z osią czasu statusów, rola odpowiadającego (lista w env) zmienia status; zweryfikowane lokalnie przez `wrangler dev` i curl dla całej pętli (w tym ponowne użycie tokenu, sprawdzenia roli i origin). Później zweryfikowane: lokalny test UI z dwoma klientami, wdrożenie produkcyjne (https://bridgeway.najvendo.workers.dev) i realne dostarczanie e-maili przez Resend. Udostępniane są tylko zgłoszenia; wszystko inne zostaje lokalne.

### Krok 17 (P16). Status: Zrobione
**Plan adaptacji LLM** wyłącznie z wczytanych przypadków (RAG, link do źródła dla każdego twierdzenia, żadnych wygenerowanych faktów).
- Nakład L · Wartość ●○○ · Po: P5, P6
- Zrobione, gdy: każde stwierdzenie w planie ma link do źródła; pola bez źródła pozostają puste.
- Wynik: `POST /api/adapt-plan` (Workers AI, logowanie, 10/h) + `worker/adaptPlan.js`: jeden przypadek jako jedyny korpus, elementy zachowywane tylko z dosłownymi cytatami ze źródła (sprawdzane na serwerze, cyfry zakazane w tekście akcji), link do źródła z przypadku, brakujące pola wymienione jako luki; karta na stronie przypadku. Uruchomienie modelu na żywo nie zostało jeszcze zweryfikowane lokalnie; sformułowanie `action` wciąż jest parafrazą modelu. (Później przeniesione na OpenRouter z wyborem modelu w `/admin` — Issue 2.)

### Krok 18 (P17). Status: Zrobione
**Uczciwa analityka.** Przebudować Analitykę na realnych metrykach (wskaźnik ponownego wykorzystania, czas do pierwszej odpowiedzi) albo ukryć sekcję.
- Nakład M · Wartość ●○○ · Po: P8, P15
- Zrobione, gdy: brak wykresów dla ozdoby; tylko metryki liczone.
- Wynik: `GET /api/metrics` (publiczny agregat z D1) + przebudowana `/analityka`: mediana czasu do pierwszej odpowiedzi, odsetek zgłoszeń z odpowiedzią, wskaźnik ponownego wykorzystania (konta, które skopiowały przypadek / konta z projektami), tabele według statusu i według przypadku; „brak danych” przy n = 0, pokazane n i ograniczenia; usunięte mapa, KPI z lokalnych liczników i tabela kategorii. Link w nawigacji nagłówka.

## Warstwa 6 — Po hackathonie

### Krok 19 (P18). Status: Odłożone
**Poziom 3.** Weryfikacja organizacji w KRS/REGON, realne nabory grantowe, panel B2G, system moderacji, pilotaże w gminach, kanały SMS/głosowe/papierowe, języki poza pl/en, publiczne API. Planowane osobno; tu nieopisane.
- Nakład XL · Wartość ●○○ · Po: wyjście z hackathonu
