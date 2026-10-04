# BridgeWay — Koncepcja v1.0

**Status:** zatwierdzona (v1.0). Sekcja roadmapy (§17) w recenzji; do `roadmap.md` jeszcze nie przeniesiona
**Data:** 2026-10-03
**Zastępuje merytorycznie:** `concept_review_v0.1.md` (surowa analiza), `concept_review_v0.2.md` (strategia + długa roadmapa)
**Przeznaczenie dokumentu:** jedna, zwięzła i *wykonalna* koncepcja. To nie analiza ani lista zadań — to decyzja: co dokładnie robimy, dla kogo, jak udowodnimy wartość i czego świadomie NIE robimy.

> Jak czytać: §1–4 — istota. §5–6 — co budujemy i demo. §7–9 — dowody, dane, uczciwość. §10–13 — wpływ, pieniądze, konkurencja, walidacja. §14–15 — ryzyka i otwarte pytania do was.

---

## 0. Co się zmieniło względem v0.1 / v0.2 (v1.0 = zatwierdzona v0.3)

| Problem w poprzednich wersjach | Rozwiązanie w v1.0 |
|---|---|
| v0.2: 6 iteracji, 40+ zadań, 12 zewnętrznych API — niewykonalne w czasie hackathonu | Twarda **linia odcięcia** (§5): wszystko, co nie wchodzi do „rdzenia demo”, jest wyraźnie oznaczone „po hackathonie” |
| USP opiera się na danych, których nie ma | Obowiązkowe **rozpoznanie źródeł** (§7) *przed* jakimkolwiek programowaniem; pitch dostosowuje się do wyniku |
| Wskaźnik transferu na danych demo = ta sama wymyślona metryka | Przejrzysta **formuła z widocznymi wagami** i oznaczeniem „model”, bez „89% context fit” wziętego z powietrza (§6.3) |
| Włączenie odłożone do iteracji 4, choć grupa docelowa jest wykluczona z sieci | Minimalne **zgłaszanie z pomocą + dostępność** wchodzą do demo (§8) |
| Brak walidacji popytu | Konkretny **plan walidacji** z mierzalnym minimum (§12) |
| Brak odpowiedzi na pytanie „dlaczego nie 19115 / Decidim / ngo.pl” | Tabela konkurencji i pozycjonowanie (§11) |
| Wpływ — ogólna opowieść o instytucjach | W demo jeden **ludzki przypadek przed/po** (§5.4) |
| Dokument-potwór na 2258 wierszy | ≈ 1/5 objętości, jeden dokument zamiast dwóch |

---

## 1. Jedno zdanie

> **BridgeWay pomaga gminie, organizacji pozarządowej lub mieszkańcowi nie wymyślać od nowa rozwiązania problemu społecznego: znajduje już wdrożone w Polsce i UE weryfikowalne rozwiązania, uczciwie pokazuje, na ile pasują właśnie tutaj, i prowadzi od zgłoszenia do zmierzonego rezultatu.**

Krótki slogan (Home): **„Problem został już gdzieś rozwiązany.”**

Czego w tym zdaniu celowo nie ma: „most między problemem a rozwiązaniem” (zbyt ogólne), „platforma AI” (AI to narzędzie, nie produkt), „platforma do wszystkiego”.

---

## 2. Problem

**Fakt-hipoteza (do sprawdzenia w wywiadach, §12):** w Polsce lokalne problemy społeczne (dostępność, samotność osób starszych, wykluczenie cyfrowe) są rozwiązywane w każdej gminie / dzielnicy / organizacji od nowa, a wiedza o tym, co zadziałało gdzie indziej, jest rozproszona po raportach, stronach fundacji, konferencjach i kontaktach osobistych.

Trzy konkretne bolączki:

1. **Zgłaszający** (mieszkaniec, sąsiad, wolontariusz) nie wie, dokąd iść i co w ogóle da się zrobić.
2. **Realizator** (NGO, wydział gminy, zarządca budynku) nie wie, że podobną rzecz już zrobiono, jaki dała rezultat, ile kosztowała i gdzie pojawiły się trudności.
3. **Grantodawca** nie widzi, które interwencje naprawdę działają → pieniądze trafiają na niesprawdzone projekty.

Czego NIE twierdzimy: że ludzie nie potrafią się skarżyć. Portali do skarg jest wystarczająco dużo. Deficyt dotyczy **wiedzy „co robić dalej”** i **odpowiedzialności „kto to robi”**.

---

## 3. Grupy docelowe i ich role

| Rola | Kto | Co otrzymuje | Status w demo |
|---|---|---|---|
| **Zgłaszający** | mieszkaniec, rodzina, sąsiedzi | zrozumiałą drogę od problemu do działania | w demo |
| **Pomocnik-pełnomocnik** | bibliotekarz, pracownik socjalny, wolontariusz, klub seniora | może złożyć zgłoszenie *za* inną osobę | w demo (minimum) |
| **Realizator** | NGO, wydział gminy | gotowy, poparty źródłami plan adaptacji | w demo |
| **Odpowiedzialny (duty holder)** | ZDM/ZIM, zarządca nieruchomości, OPS | jasnego adresata i status zgłoszenia | w demo (jedno pole + status) |
| **Grantodawca** | programy, fundacje | realne otwarte konkursy | po hackathonie |

**Główny beneficjent** — osoby o ograniczonej mobilności i osoby starsze. Produkt jest projektowany tak, by *nie musiały* korzystać z niego same.

---

## 4. Pozycjonowanie i USP

### 4.1. Rdzeń (to, co nas wyróżnia)

**Transfer rozwiązań oparty na dowodach:**

```
Problem → Podobne realne przypadki → Siła dowodów → Dopasowanie do miejsca → Plan adaptacji → Odpowiedzialny → Rezultat → (powrót do bazy wiedzy)
```

### 4.2. Trzy „żelazne” zasady produktu

1. **Każde twierdzenie — ze źródłem.** Nie ma źródła — nie ma faktu na ekranie.
2. **Każda ocena jest wyjaśnialna.** Nie ma „magicznego procentu”: widać czynniki, wagi i ich pochodzenie.
3. **Każde zgłoszenie ma adresata i status.** Zgłoszenie bez adresata to nie zgłoszenie, tylko bilet w próżnię.

### 4.3. Co z czasem staje się „naszym aktywem” (fosa)

Uporządkowana baza interwencji: *co, gdzie, dla kogo, w jakich warunkach, ile kosztowało, jaki zmierzony rezultat*. UI, mapa i React to nie fosa.

> Uczciwe zastrzeżenie: fosa powstanie tylko wtedy, gdy przypadków z realnymi danymi będzie wystarczająco dużo (§7). Jeśli nie — aktyw trzeba będzie stworzyć samodzielnie (wywiady, zapytania do NGO), i to staje się główną pracą.

---

## 5. Co budujemy: rdzeń i linia odcięcia

### 5.1. Zasada

**Lepiej 6 działających rzeczy end-to-end niż 25 ekranów.** Każdy przycisk albo działa, albo jest ukryty, albo podpisany „prototyp”.

### 5.2. Rdzeń demo (obowiązkowo — „poziom 1”)

| # | Element | Kryterium gotowości |
|---|---|---|
| C1 | **Uczciwość danych**: usunięte wymyślone KPI/„verified”/oceny; dane demo podpisane | na Home/Analityce nie ma liczb bez źródła lub oznaczenia |
| C2 | **Naprawiony główny przepływ** Rozwiązanie → „Skopiuj u siebie” → Projekt (obecnie psuje się na `/projekty`) | scenariusz end-to-end przechodzi bez ślepych zaułków |
| C3 | **Uczciwe dopasowanie** (na wszystkich ekranach rekomendacji, a nie tylko w Zgłoś) i usunięta imitacja „AI” | wszędzie jeden algorytm; etykieta „AI” nie jest używana dla dopasowań po słowach kluczowych |
| C4 | **Schemat przypadku z dowodami**: źródło, organizacja, koszt, czas, zmierzony rezultat, poziom dowodów (A–D) | pola istnieją i są wyświetlane |
| C5 | **10–15 realnych przypadków ze źródłami** (wynik rozpoznania źródeł) | każdy przypadek ma klikalne źródło |
| C6 | **Wskaźnik transferu z wyjaśnieniem czynników** (§6.3) | widać czynniki, wagi, źródło każdej liczby wejściowej |
| C7 | **Adresat + status** zgłoszenia (jedno pole `responsibleBody` i oś czasu statusów) | zgłoszenie demo pokazuje adresata i historię |
| C8 | **Minimalne zgłaszanie z pomocą** i przegląd dostępności (§8) | zgłoszenie „za kogoś”, klawiatura, kontrast, duża czcionka |
| C9 | **Przepisana strona główna** pod nowe pozycjonowanie (§1) | slogan, 2 CTA, „jak to działa” w 5 krokach |

### 5.3. Pożądane, jeśli zostanie czas („poziom 2”)

- Jedno prawdziwe źródło kontekstu: GUS BDL (struktura ludności 65+, liczba ludności) dla 2–3 gmin.
- Wspólny backend dla pełnej pętli (zgłoszenie → strona publiczna → zmiana statusu przez inną rolę): minimalna baza danych + logowanie magic linkiem. *Jeśli nie zdążymy — demo jest uczciwie podpisane „prototyp, dane lokalne”.*
- Plan adaptacji wygenerowany przez LLM **wyłącznie z wczytanych przypadków** (RAG po naszej bazie, każde twierdzenie z linkiem).

### 5.4. Wyraźnie „po hackathonie” („poziom 3”)

Wszystko pozostałe z v0.2: 12 zewnętrznych API (KRS, REGON, GIOŚ, Eurostat, Geoportal i in.), realne nabory finansowania UE, panel B2G, pomiar efektów na produkcji, system moderacji, pilotaże z gminami, publiczne API, wielojęzyczność poza pl/en.

### 5.5. Co degradujemy w produkcie

| Sekcja | Decyzja |
|---|---|
| Rozwiązania (przypadki) | **centrum produktu** |
| Mapa | interfejs, nie produkt; prywatność lokalizacji (§9) |
| Pomysły | zdegradować; połączyć z Projektami |
| Eksperci, NGO | warstwa realizatorów |
| Finansowanie | zostawić, ale bez wymyślonych programów: albo realne, albo ukryć |
| Analityka | przebudować na uczciwe metryki albo ukryć |
| Profil, Wyszukiwanie | drugorzędne; nie udawać, że działają |

---

## 6. Scenariusz demo (90 sekund)

### 6.1. Wybór klina wejścia

**Dostępność lokalnych/publicznych usług** — zrozumiała, daje się nanieść na mapę, ma odpowiedzialnych adresatów, rezultat jest mierzalny „przed/po”, dużo otwartych danych (OSM).
Nie na zawsze „tylko o tym”, ale w demo i pilotażu — tylko to (+ powiązany przypadek samotności osób starszych jako drugi przykład).

### 6.2. Scenariusz

**Persona:** Anna pomaga starszej sąsiadce poruszającej się na wózku, która nie może dostać się do ośrodka usług społecznych.

1. Anna (albo bibliotekarka za nią) opisuje problem — krótko, prostymi słowami.
2. BridgeWay ustala kategorię i doprecyzowuje miejsce.
3. Pokazuje **3 realne podobne przypadki** ze źródłem, organizacją, ceną, czasem, zmierzonym rezultatem i **poziomem dowodów**.
4. Dla każdego — **wskaźnik transferu z rozbiciem** („dlaczego 71%”).
5. Anna otwiera najlepszy przypadek → **„Dostosuj do mojej gminy”**.
6. Otrzymuje plan: odpowiedzialny organ (adresat), możliwy realizator-NGO, kroki, orientacyjny koszt i ryzyka — wszystko ze źródłami.
7. „Rozpocznij wdrożenie” → Project Room → publiczny status zgłoszenia z adresatem.
8. Kadr końcowy: **jeden realny (albo wyraźnie oznaczony jako zainscenizowany) przypadek „przed/po”** z człowiekiem w centrum.

### 6.3. Model wskaźnika transferu (przejrzysty, bez „magii AI”)

Prosta suma ważona; wszystkie wagi są widoczne dla użytkownika i można je kwestionować:

| Czynnik | Waga (wstępnie) | Skąd dane |
|---|---|---|
| Zgodność typu problemu | 30% | nasze oznaczenie przypadku |
| Podobieństwo kontekstu (odsetek 65+, wielkość gminy) | 25% | GUS BDL (poziom 2) / albo ręcznie ze źródłem |
| Budżet się mieści | 15% | przypadek + dane od użytkownika |
| Potrzebni uczestnicy (NGO/organ) istnieją lokalnie | 15% | nasze dane / KRS (poziom 3) |
| Poziom dowodów przypadku | 15% | ocena A–D |

Zasady:
- Jeśli dla czynnika nie ma realnych danych — czynnik jest pokazywany jako **„brak danych”**, a nie wypełniany wymyśloną liczbą; łączny wynik jest oznaczany jako „wstępny”.
- Wagi to hipoteza, co jest wprost napisane w interfejsie („model, nie prognoza”).
- Twarde ograniczenia (hard constraints) najpierw odrzucają przypadek, potem następuje punktacja (np. przypadek wymaga usługi, której nie ma).

### 6.4. Poziomy dowodów (zamiast „verified”)

| Poziom | Znaczenie |
|---|---|
| **A** | Rezultat zmierzony przez niezależne/oficjalne źródło (ewaluacja, instytucja publiczna, recenzowana publikacja) |
| **B** | Rezultat opublikowany przez realizatora wraz z opisem metodyki |
| **C** | Realizacja udokumentowana, ocena rezultatu słaba |
| **D** | Pomysł/propozycja bez potwierdzonego rezultatu |

Słowo „verified” usuwamy z produktu.

> Uwaga: w trakcie realizacji (krok 5 roadmapy) skala została doprecyzowana do wersji opartej na metodyce badania — zobacz [`sourcing-spike.md`](./sourcing-spike.md).

### 6.5. Rola LLM

LLM **nie jest źródłem faktów**. Dopuszczalne: krótkie streszczenie, prosty język, tłumaczenie, wyjaśnienie dopasowania, wyciąganie pól z dokumentu, szkic planu adaptacji **wyłącznie na podstawie znalezionych przypadków**. Zabronione: wymyślanie liczb, źródeł, organizacji, ocenianie „dobrze/źle” bez podstaw.
Nie wolno nazywać AI czegoś, co jest wyszukiwaniem po słowach kluczowych.

---

## 7. Dane i rozpoznanie źródeł (pierwszy obowiązkowy krok)

### 7.1. Dlaczego to krytyczne

Cała wartość produktu = realne przypadki ze źródłami. Jeśli jest ich mało albo większość nie ma zmierzonych rezultatów, pitch o „sprawdzonych rozwiązaniach” się rozsypuje i trzeba go zmienić **teraz**, a nie na obronie.

### 7.2. Zadanie

**Limit czasu: 1–2 dni, przed rozpoczęciem jakichkolwiek prac nad C4–C6.** Znaleźć i przeanalizować 10–15 realnych przypadków dotyczących dostępności i/lub wsparcia osób starszych (priorytetowo Polska, potem UE).

Dla każdego przypadku zapisać: nazwę, organizację, miejsce, rok, problem, interwencję, koszt, czas, **rezultat + sposób jego pomiaru**, link do źródła, poziom A–D, licencję/zasady wykorzystania.

### 7.3. Typy źródeł do przeszukania (kierunki; konkretne przypadki trzeba jeszcze znaleźć i sprawdzić)

- Raporty i strony polskich NGO i fundacji zajmujących się dostępnością i osobami starszymi.
- Publikacje miast/gmin, programy dostępności, ewaluacje programów.
- Otwarte zbiory danych i publikacje: dane.gov.pl, GUS.
- Europejskie repozytoria praktyk (programy sąsiedzkie, healthy ageing, dostępność).
- Prace naukowe oceniające interwencje.

> Celowo NIE wymieniam tu konkretnych przypadków: trzeba je znaleźć i potwierdzić w źródle. Żaden przypadek, którego nie udało się potwierdzić, nie trafia do bazy.

### 7.4. Kryterium decyzji po rozpoznaniu

| Wynik | Decyzja |
|---|---|
| ≥10 przypadków, ≥4 na poziomie A/B | idziemy zgodnie z planem, USP „sprawdzone rozwiązania” jest uzasadnione |
| 10 przypadków, ale prawie wszystkie C/D | zmieniamy sformułowanie na „udokumentowane rozwiązania + rejestr dowodów”, a *pomiar rezultatów* staje się częścią produktu |
| <10 przypadków | USP zmienia się na „uporządkowany rejestr praktyk + pomoc w zbieraniu dowodów”; pitch mówi o tym uczciwie |

### 7.5. Bezpieczeństwo przypadków

Interwencje fizyczne (np. podjazdy) są rekomendowane **tylko** wtedy, gdy mają podstawę techniczną. Istniejący przypadek „samodzielnie budowane drewniane podjazdy” usuwamy albo zastępujemy ścieżką: *audyt dostępności → odpowiedzialna instytucja → technicznie uzgodnione rozwiązanie*.

---

## 8. Włączenie: minimum na demo

Produkt dla osób, którym trudno korzystać z sieci, nie może być „tylko w sieci”.

**W demo (obowiązkowo):**
1. **Zgłoszenie za inną osobę:** flaga „zgłaszam w imieniu…”, bez obowiązkowej rejestracji podopiecznego, zgoda podopiecznego jest zapisywana (ustnie/przez zaznaczenie).
2. **Punkty pomocy (jako koncepcja + jedno realne porozumienie, jeśli się uda):** biblioteka, klub seniora, pracownik socjalny, NGO.
3. **Minimum dostępności:** pełna nawigacja z klawiatury, widoczny fokus, kontrast WCAG AA, skalowanie tekstu do 200%, prosty język, podpisy ikon, nagłówki/landmarki dla czytników ekranu. Deklaracja dostępności.
4. **Realne sprawdzenie** (klawiatura + czytnik ekranu przynajmniej w głównym scenariuszu) i uczciwe zapisanie tego, co nie jest pokryte.

**Po hackathonie:** telefon/SMS/formularz papierowy, profil z dużą czcionką, wprowadzanie głosowe, audyt WCAG 2.2 AA przez zewnętrznego audytora.

---

## 9. Prywatność i bezpieczeństwo (minimum)

| Temat | Zasada |
|---|---|
| Adresy i ludzie | Publiczna mapa **nie pokazuje dokładnych adresów** dla wrażliwych kategorii (osoby starsze, samotne); punkt jest zgrubiany |
| Osoby trzecie | W dowolnym tekście zakazane są imiona i kontakty osób trzecich; ostrzeżenie + sprawdzenie |
| Moderacja | Przycisk „zgłoś nadużycie”, ręczny przegląd publicznych zgłoszeń przed publikacją (w pilotażu) |
| Organizacje | Status „sprawdzono” tylko przy realnej weryfikacji (np. numer KRS); w przeciwnym razie „niesprawdzone” |
| Eksperci | Nie pokazujemy ocen i kontaktów bez mechanizmu i zgody; wymyślone profile usuwamy |
| RODO | Polityka prywatności i regulamin — **prawdziwe strony**, a nie podpisy w stopce; cel przetwarzania, okres przechowywania, kontakt |
| Logowanie | Minimum — magic link; żadnego „autora” jako dowolnego tekstu |

---

## 10. Wpływ: jak mierzymy (bez „liczby zgłoszeń”)

### 10.1. Teoria zmiany (w skrócie)

Problem opisany → znaleziony pasujący sprawdzony przypadek → wyznaczony odpowiedzialny → rozwiązanie wdrożone → rezultat zmierzony → przypadek wzbogaca bazę → kolejne miejsce potrzebuje mniej czasu i pieniędzy.

### 10.2. Metryki

| Poziom | Metryka | Uwaga |
|---|---|---|
| Produkt | % zgłoszeń z wyznaczonym adresatem | cel pilotażu; nie „liczba zgłoszeń” |
| Produkt | liczba przypadków ze źródłem i poziomem dowodów | wzrost bazy |
| Rezultat | **Czas do pierwszej odpowiedzi** (mediana) | silny wskaźnik odpowiedzialności |
| Rezultat | **Czas do działania** (od zgłoszenia do rozpoczęcia wdrożenia) | porównać z „bez BridgeWay” na podstawie wywiadów |
| Rezultat | **Wskaźnik ponownego wykorzystania**: odsetek nowych problemów rozwiązanych w oparciu o istniejący przypadek | charakterystyczna metryka |
| Rezultat | % spraw rozwiązanych w ciągu 30/60/90 dni | w pilotażu |
| Wpływ | liczba osób, którym poprawiła się dostępność / dostęp do usługi | w pilotażu, ankieta |
| Efektywność | koszt na beneficjenta | z projektów |

### 10.3. Gwiazda Polarna

**„Liczba skutecznie przeniesionych rozwiązań”**: problem się pojawił → znaleziono istniejący przypadek → zaadaptowano → wdrożono → zmierzono rezultat.

### 10.4. Zasada uczciwości

Każda liczba w UI/pitchu: **realna** (ze źródłem), **docelowa** (podpisana „cel”) albo **demo** (podpisana „dane demonstracyjne”). Innych wariantów nie ma.

Dzisiejsze wartości bazowe to zera; nie wstydzimy się tego.

---

## 11. Konkurencja i wyróżnienie

> Tabela to robocza hipoteza. Każdą pozycję trzeba sprawdzić na aktualnych stronach przed pitchem; nie twierdzę nic o szczegółach funkcjonalności bez sprawdzenia.

| Typ rozwiązania | Przykłady (do sprawdzenia) | Co robią | Czego nie robią (hipoteza) | Nasza różnica |
|---|---|---|---|---|
| Miejskie portale skarg | miejskie aplikacje „zgłoś problem”, 19115 w Warszawie | przyjmują zgłoszenia | nie pokazują, co zadziałało gdzie indziej; rezultat zostaje wewnątrz urzędu | wyszukiwanie i transfer przypadków + publiczny status |
| Platformy partycypacji | portale typu Decidim, budżety obywatelskie | głosowanie, pomysły | nie doprowadzają do weryfikowalnego rezultatu; mało „wiedzy, co robić” | rejestr dowodów + plan adaptacji |
| Katalogi NGO | ngo.pl i podobne | spis, ogłoszenia | niepowiązane z konkretnym problemem/przypadkiem | powiązanie realizatora z przypadkiem |
| Crowdfunding | zrzutka.pl, polakpotrafi.pl | zbieranie pieniędzy | nie pomagają wybrać, *co* finansować | ocena dopasowania przed zbiórką |
| Media społecznościowe/grupy | grupy osiedlowe | szybka dyskusja | wiedza ginie, brak struktury | uporządkowana baza |

**Pozycjonowanie:** nie zastępujemy tych systemów. Jesteśmy warstwą wiedzy i odpowiedzialności pomiędzy nimi: „co robić” i „kto odpowiada”.

---

## 12. Walidacja (część obowiązkowa, nie opcja)

Minimum **przed obroną**:

| Co | Minimum | Po co |
|---|---|---|
| Wywiady z grupą docelową (osoby starsze/opiekunowie/osoby o ograniczonej mobilności) | 5 | sprawdzić bolączkę i kanał dostępu |
| Rozmowa z przedstawicielem gminy/dzielnicy/wydziału dostępności | ≥1 | sprawdzić, czy istnieje rola „odpowiedzialnego” i czy są gotowi odpowiadać |
| Rozmowa z NGO | ≥2 | sprawdzić, czy potrzebują rejestru przypadków i czy udostępnią dane |
| Punkt pomocy (biblioteka, klub, pracownik socjalny) | ≥1 | sprawdzić zgłaszanie z pomocą |
| List intencyjny / cytat za zgodą | ≥1–2 | najtańszy mocny dowód |

Pytania do wywiadów (szkic):
- Co zrobił/a Pan/Pani ostatnio, gdy zetknął/zetknęła się z takim problemem? Gdzie się Pan/Pani zwracał/a?
- Czy wiedział/a Pan/Pani, że gdzie indziej to rozwiązano? Co by to zmieniło?
- Kto w Pana/Pani organizacji podejmuje taką decyzję i ile to trwa?
- Czego Pan/Pani potrzebuje, aby zaufać cudzemu przypadkowi?
- Jakie dane o rezultatach jest Pan/Pani gotów/gotowa publikować?

Wyniki wywiadów — w osobnym pliku (zobacz [`validation.md`](./validation.md)); w pitchu — realne cytaty (za zgodą) i **uczciwa** liczba (np. „5 wywiadów, 3 potwierdziły”), bez zaokrąglania w górę.

---

## 13. Model biznesowy (hipoteza, nie obietnica)

| Segment | Oferta | Płatność |
|---|---|---|
| Mieszkańcy, NGO | bezpłatnie | — |
| Gminy / powiaty | panel: otwarte zgłoszenia, czas odpowiedzi, przenaszalne przypadki, raporty | subskrypcja (hipoteza) |
| Fundacje / programy | raport skuteczności i katalog sprawdzonych interwencji | subskrypcja/grant (hipoteza) |
| Badacze, partnerzy | otwarte API/eksport zanonimizowanych danych | bezpłatnie/na podstawie umowy |

Do sprawdzenia: kto *konkretnie* w gminie kupuje (wydział polityki społecznej, wydział cyfryzacji?), czy jest budżet, z jakimi systemami potrzebna jest integracja. Przed walidacją — nie podajemy cen.

---

## 14. Ryzyka

| Ryzyko | Prawdopodobieństwo | Skutek | Łagodzenie |
|---|---|---|---|
| Mało realnych przypadków ze zmierzonym rezultatem | Wysokie | USP nie działa | rozpoznanie źródeł (§7), zmiana sformułowania zgodnie z §7.4 |
| Nie zdążymy w terminie | Wysokie | niedokończona platforma | linia odcięcia (§5), poziom 2 tylko przy zapasie czasu |
| Wskaźnik transferu odebrany jako wymysł | Średnie | utrata zaufania | przejrzysta formuła, „brak danych” zamiast fikcji (§6.3) |
| LLM „wymyśla” fakty | Średnie | dezinformacja | tylko RAG po naszej bazie, linki, zakaz generowania faktów |
| Grupa docelowa nie może korzystać z produktu | Wysokie | negatywna ocena wartości społecznej | ścieżka przez pełnomocnika + dostępność w demo (§8) |
| Ryzyka prawne (RODO, zniesławienie) | Średnie | nie można prowadzić pilotażu | minimum z §9 |
| Gmina niezainteresowana | Średnie | brak płacącego | walidacja (§12), zacząć od NGO/fundacji |

---

## 15. Otwarte pytania do was (potrzebne decyzje przed roadmapą)

1. **Termin i skład zespołu.** Ile dni do hackathonu/obrony i ile osób realnie programuje? Od tego zależy, czy wejdzie poziom 2 (wspólny backend, GUS BDL, adaptacja przez LLM).
2. **Klin wejścia.** Potwierdzamy „dostępność lokalnych usług” (+ izolacja osób starszych jako drugi przykład) czy inny fokus?
3. **Geografia.** Jedno miasto / para miast do demo? Proponuję: dwie gminy, między którymi pokazujemy transfer.
4. **Język demo.** Pitch po polsku/angielsku; interfejs pl/en — zostawiamy? (Język ukraiński — po hackathonie.)
5. **Kto robi rozpoznanie źródeł** i czy macie kontakty w NGO/gminie do walidacji?
6. **Backend.** Czy jesteście gotowi poświęcić czas na wspólną bazę i logowanie linkiem w ramach hackathonu, czy uczciwie pokazujemy lokalny prototyp?
7. **LLM.** Czy zewnętrzne API są dopuszczalne (koszt, klucze, prywatność)? Czy demo bez LLM, z deterministycznym planem z przypadku?
8. **Które dokumenty łączymy:** zostawić `concept_review_v0.1/0.2` jako archiwum, a `concept_v1.0.md` jako roboczą koncepcję? Odpowiednio zaktualizować indeks specyfikacji.

---

## 16. Kryterium „koncepcja v1.0 przyjęta”

Uznajemy koncepcję za gotową do przeniesienia do roadmapy, gdy:
- [ ] otrzymano odpowiedzi na §15;
- [ ] linia odcięcia z §5 została potwierdzona (lub zrewidowana) z uwzględnieniem terminu i zespołu;
- [ ] zdecydowano, którego sformułowania USP trzymamy się po rozpoznaniu źródeł (§7.4) — albo samo rozpoznanie zaplanowano jako pierwszy krok roadmapy;
- [ ] przyjęto formułę punktacji z §6.3 i zasadę „brak danych zamiast fikcji”;
- [ ] przyjęto minimalny plan walidacji z §12.

Następnie roadmapa jest budowana *od linii odcięcia*: najpierw C1–C3 (zaufanie i zepsuty przepływ), potem rozpoznanie i C4–C6, potem C7–C9.

---

## 17. Roadmapa według zasady Pareto (od najbardziej do najmniej efektywnego)

> Status: **w recenzji**, do `roadmap.md` nie przeniesiona. Odpowiedzi na §15 jeszcze nie otrzymano, dlatego poniżej wprost podano założenia; przy ich zmianie kolejność/skład są rewidowane.

### 17.1. Zasada szeregowania

Kroki są uporządkowane według **stosunku „wkład w ocenę jury / koszt”**. Zasada 80/20: pierwsze ~20% wysiłku (kroki P1–P6) powinno dać ~80% postrzeganej wartości — zaufanie, działający scenariusz end-to-end, widoczny rdzeń USP. Każdy kolejny krok daje malejący zwrot.

Szacunki nakładu (S ≈ do pół dnia, M ≈ 1 dzień, L ≈ 2–3 dni) i wartości (●●● wysoka … ● niska) są orientacyjne, dla zespołu 1–2 programistów.

### 17.2. Założenia (przed odpowiedziami na §15)

- Klin wejścia: dostępność lokalnych usług (+ izolacja osób starszych jako drugi przykład).
- Demo: dwie gminy, transfer przypadku z jednej do drugiej; interfejs pl/en.
- Backend i LLM to **poziom 2**: nie blokują głównego demo; bez nich prototyp jest uczciwie podpisany „dane lokalne”.
- Rozpoznanie źródeł i walidację prowadzi zespół równolegle z programowaniem (nie programista na ścieżce krytycznej).

### 17.3. Kroki

Zależności podano w kolumnie „Po”. Status wszystkich kroków przy przenoszeniu do roadmapy — Otwarte.

| # | Krok | Pokrywa | Nakład | Wartość | Po | Rezultat / kryterium gotowości |
|---|---|---|---|---|---|---|
| **P1** | **Uczciwość danych**: usunąć wymyślone KPI (Home, Analityka), „verified”, oceny i „efekty”; podpisać dane demo; usunąć/ukryć fałszywe kontakty ekspertów | C1, §10.4 | S | ●●● | — | W UI nie ma liczby bez źródła lub oznaczenia „demo/cel”. Nie ma wymyślonych organizacji i ocen |
| **P2** | **Naprawić przepływ end-to-end** „Rozwiązanie → Skopiuj u siebie → Projekt” (`/projekty` jest obecnie kopią Profilu) | C2 | S | ●●● | — | Scenariusz przechodzi bez ślepych zaułków; lista projektów jest prawdziwa |
| **P3** | **Usunąć „martwe” UI**: niedziałające przyciski albo zaimplementować minimalnie, albo ukryć/podpisać „prototyp” (wyszukiwanie, wylogowanie, zapis wersji roboczej, przesyłanie plików, czat, eksport PDF, dołączanie do zespołu) | C1–C2 | S | ●●● | — | Na ścieżce demo nie ma przycisków bez efektu |
| **P4** | **Rozpoznanie źródeł**: znaleźć i potwierdzić 10–15 realnych przypadków (źródło, organizacja, cena, czas, rezultat i sposób pomiaru, poziom A–D) | §7, C5 | M (równolegle) | ●●● | — | Tabela przypadków z klikalnymi źródłami; decyzja według §7.4 podjęta i zapisana |
| **P5** | **Schemat przypadku z dowodami** (`source`, `organisation`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel`, `context`) i wczytanie przypadków z P4; usunąć niebezpieczny przypadek „samodzielnie budowane podjazdy” | C4, C5, §7.5 | M | ●●● | P4 | Wszystkie przypadki w aplikacji są realne, ze źródłem i poziomem A–D; zastąpiony przypadek — ścieżka „audyt → odpowiedzialny → uzgodnione rozwiązanie” |
| **P6** | **Wskaźnik transferu z wyjaśnieniem**: formuła z §6.3, widoczne wagi, „brak danych” zamiast fikcji, twarde ograniczenia; jedno dopasowanie na wszystkich ekranach rekomendacji; usunąć etykietę „AI” z wyszukiwania po słowach kluczowych | C3, C6 | M | ●●● | P5 | Dla przypadku widać wynik + rozbicie na czynniki i źródło każdego wejścia; wszystkie rekomendacje używają jednego algorytmu |
| **P7** | **Strona główna pod nowe pozycjonowanie**: slogan, 2 CTA, „jak to działa” (5 kroków), sekcja przypadków jako centrum nawigacji; degradacja Pomysłów/Profilu/Analityki | C9, §5.5 | S | ●●○ | P5 | Pierwszy ekran wyjaśnia wartość w 5 sekund; nawigacja zgodna z §5.5 |
| **P8** | **Adresat i status zgłoszenia**: pole `responsibleBody`, oś czasu statusów (przyjęte → przypisane → w realizacji → rozwiązane/odrzucone + powód), wyświetlanie w Project Room | C7, §4.2 | M | ●●○ | P2 | Zgłoszenie demo pokazuje adresata i historię statusów; pusty adresat jest oznaczony |
| **P9** | **Minimalne zgłaszanie z pomocą**: „zgłaszam za kogoś”, zapis zgody, podpowiedź o punktach pomocy | C8, §8 | S | ●●○ | — | Flaga i tekst zgody w formularzu; scenariusz demo przechodzi przez pełnomocnika |
| **P10** | **Minimum dostępności i sprawdzenie**: klawiatura, fokus, kontrast AA, tekst do 200%, landmarki, podpisy ikon, deklaracja dostępności; przejście głównego scenariusza z klawiaturą i czytnikiem ekranu | C8, §8 | M | ●●○ | P7, P9 | Lista kontrolna zaliczona, ograniczenia uczciwie wymienione |
| **P11** | **Minimum prywatności i bezpieczeństwa**: zgrubienie punktów na mapie dla wrażliwych kategorii, ostrzeżenie o danych osób trzecich, prawdziwe strony Polityki prywatności i Regulaminu | §9 | S–M | ●●○ | — | Strony istnieją i są linkowane w stopce; dokładne adresy wrażliwych kategorii nie są publikowane |
| **P12** | **Walidacja**: 5 wywiadów, ≥1 gmina/powiat, ≥2 NGO, ≥1 punkt pomocy, ≥1 list/cytat; wyniki w osobnym pliku `spec/` | §12 | M (równolegle) | ●●● | — | Cytaty i uczciwe liczby gotowe do pitchu. *Niski koszt kodu, dlatego wysoko w rankingu wartości, ale czasowo idzie równolegle z P1–P6* |
| **P13** | **Scenariusz demo i pitch**: 90-sekundowy scenariusz end-to-end, kadr „przed/po” (realny albo oznaczony jako zainscenizowany), slajd o konkurencji (§11), uczciwe zastrzeżenie o danych demo | §6, §11 | M | ●●● | P6, P8, P9, P12 | Próba przechodzi bez błędów, wszystkie liczby oznaczone |
| **P14** | **Jedno realne źródło kontekstu**: GUS BDL (odsetek 65+, liczba ludności) dla 2 gmin w czynniku „podobieństwo kontekstu” | Poziom 2, §6.3 | M | ●●○ | P6 | Czynnik kontekstu liczony z realnych danych ze wskazaniem źródła |
| **P15** | **Wspólny backend + logowanie magic linkiem** dla pętli „zgłoszenie → strona publiczna → zmiana statusu przez inną rolę” | Poziom 2, §9 | L | ●●○ | P8 | Dwie przeglądarki widzą te same dane; w przeciwnym razie demo zachowuje podpis „dane lokalne” |
| **P16** | **Plan adaptacji LLM** ściśle według wczytanych przypadków (RAG, linki do źródła przy każdym twierdzeniu, zakaz generowania faktów) | Poziom 2, §6.5 | L | ●○○ | P5, P6 | Każde twierdzenie planu ma link; bez źródła pole nie jest wypełniane |
| **P17** | **Uczciwa analityka**: przebudować Analitykę na realnych metrykach (wskaźnik ponownego wykorzystania, czas odpowiedzi) albo ukryć sekcję | §10 | M | ●○○ | P8, P15 | Brak wykresów dla ozdoby; tylko metryki liczone |
| **P18** | **Poziom 3 (po hackathonie)**: weryfikacja organizacji w KRS/REGON, realne nabory finansowania, panel B2G, system moderacji, pilotaże, SMS/głos/papier, wielojęzyczność poza pl/en, publiczne API | Poziom 3, §5.4 | XL | ●○○ | wyjście z hackathonu | Planowane osobno, w roadmapie nieszczegółowe |

### 17.4. Krzywa zwrotu (co daje każda „warstwa”)

| Warstwa | Kroki | Co otrzymuje jury |
|---|---|---|
| **1. Zaufanie i sprawność** (≈ 20% wysiłku → ≈ 50% wartości) | P1, P2, P3 | Brak fałszu, brak ślepych zaułków — demo nie „pada” po pierwszych kliknięciach |
| **2. Rdzeń USP** (≈ 25% wysiłku → ≈ +30% wartości) | P4, P5, P6, P7 | Widać, czym BridgeWay się wyróżnia: realne przypadki, wyjaśnialny wynik |
| **3. Znaczenie społeczne i odpowiedzialność** (≈ 20% wysiłku → ≈ +12% wartości) | P8, P9, P10, P11, P12 | Ludzie w centrum, adresat, dostępność, walidacja |
| **4. Pakowanie** | P13 | Wszystko to zamienia się w przekonującą 90-sekundową opowieść |
| **5. Wzmocnienie przy zapasie czasu** (malejący zwrot) | P14, P15, P16, P17 | Dodatkowy efekt „wow” i „realność” |
| **6. Po hackathonie** | P18 | Droga do pilotażu i inwestora |

Procenty to orientacyjne wskazówki do priorytetyzacji, a nie pomiary.

### 17.5. Zalecana kolejność realizacji

1. **Równolegle od pierwszego dnia:** P4 (rozpoznanie) i P12 (walidacja) — to praca nie dla programisty na ścieżce krytycznej.
2. **Programowanie:** P1 → P2 → P3 (szybkie zwycięstwa, 1 dzień) → P5 → P6 → P7 → P8 → P9 → P10 → P11.
3. **Pakowanie:** P13 — zarezerwować minimum 1 dzień na próbę.
4. **Tylko przy zapasie czasu:** P14 → P15 → P16 → P17.
5. **Bramka po P4:** jeśli wynik rozpoznania trafia do wierszy 2–3 tabeli z §7.4, zrewidować sformułowanie USP przed rozpoczęciem P5–P6.

### 17.6. Zasady pracy z roadmapą

- Przy przenoszeniu do `roadmap.md` każdy krok otrzymuje status `Otwarte`; zamknięcie — według kryterium z kolumny „Rezultat”.
- Każda zmiana tras, stanu, modelu danych lub zależności (P5, P6, P8, P15) jest połączona z aktualizacją `architecture.md` w tej samej zmianie.
- Każda liczba w UI i pitchu jest realna ze źródłem, „cel” albo „demo” (§10.4).
- Kroki P14–P17 nie zaczynają się, dopóki P1–P13 nie są zamknięte albo świadomie okrojone.
