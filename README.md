<div align="center">

# 🌉 BridgeWay

### „Problem został już gdzieś rozwiązany.”
**Wystarczy zbudować most.**

Platforma obywatelska, która łączy lokalny problem społeczny z realnym, udokumentowanym rozwiązaniem, które już gdzieś zadziałało, a potem prowadzi sprawę, aż coś naprawdę się zmieni.

[**Projekt**](#o-projekcie) · [**Specyfikacja techniczna**](./docs/TECH_SPEC.md) · [**Architektura**](./docs/ARCHITECTURE.md) · [**Licencja**](./docs/LICENSE.md)

</div>

> **© 2026 Dominik Liahovich. Wszelkie prawa zastrzeżone.** BridgeWay jest oprogramowaniem własnościowym. Kod jest udostępniony wyłącznie do oceny i nie może być kopiowany, ponownie wykorzystywany ani wdrażany. Zobacz [Licencja](#licencja).

---

## Spis treści
1. [O projekcie](#o-projekcie)
2. [Problem](#problem)
3. [Nasza odpowiedź](#nasza-odpowiedź)
4. [Dla kogo jest BridgeWay](#dla-kogo-jest-bridgeway)
5. [Historia: od problemu do zmiany](#historia-od-problemu-do-zmiany)
6. [Co można zrobić w BridgeWay](#co-można-zrobić-w-bridgeway)
7. [Zasady, od których nie odstępujemy](#zasady-od-których-nie-odstępujemy)
8. [Włączenie i dostępność](#włączenie-i-dostępność)
9. [Prywatność w fazie projektowania](#prywatność-w-fazie-projektowania)
10. [Mierzenie wpływu społecznego](#mierzenie-wpływu-społecznego)
11. [Miejsce BridgeWay wśród innych narzędzi](#miejsce-bridgeway-wśród-innych-narzędzi)
12. [Model trwałości](#model-trwałości)
13. [Status projektu](#status-projektu)
14. [Dokumentacja](#dokumentacja)
15. [Szybki start](#szybki-start)
16. [Licencja](#licencja)

---

## O projekcie

BridgeWay pomaga **gminie, organizacji pozarządowej albo zwykłemu mieszkańcowi** przestać wymyślać od nowa rozwiązania problemów społecznych. Wyszukuje interwencje, które już przeprowadzono w Polsce i UE, pokazuje, jak mocne są naprawdę stojące za nimi dowody, uczciwie wyjaśnia, na ile pasowałyby do *tego* miejsca, i prowadzi problem od zgłoszenia do właściciela, statusu i zmierzonego rezultatu.

Interfejs jest po polsku (z pełną wersją angielską), bo pierwszymi użytkownikami są polskie społeczności.

## Problem

W każdym polskim mieście występuje ten sam zestaw trudnych, cichych problemów: starsze osoby osamotnione w domu, budynki i urzędy, do których nie wejdą osoby z niepełnosprawnościami, sąsiedzi wykluczeni ze świata cyfrowego, rodziny zmagające się z mieszkaniem. To nie są nowe problemy i wiele z nich zostało już gdzieś dobrze rozwiązanych.

Ta wiedza jest jednak rozproszona. Leży w raportach z ewaluacji, podsumowaniach projektów unijnych, na stronach fundacji i w slajdach z konferencji. Pracownik socjalny w jednej gminie rzadko dowiaduje się, co zadziałało w sąsiednim województwie, dlatego:

- **każda społeczność zaczyna od zera**, wydając czas i publiczne pieniądze na podejścia, które już ktoś wypróbował;
- **zgłoszenia trafiają donikąd**: mieszkaniec się skarży, ale nikt nie zostaje wskazany jako odpowiedzialny i nic widocznego się nie dzieje;
- **najbardziej dotknięci są najmniej słyszani**: seniorzy i osoby o ograniczonej mobilności często nie potrafią korzystać ze skomplikowanych stron ani samodzielnie załatwiać spraw w instytucjach.

Skala jest realna. Kontrola Najwyższej Izby Kontroli (NIK) z 2026 roku dotycząca dostępności w samorządach wykazała, że **87% skontrolowanych jednostek nie spełniało minimalnych wymagań dostępności**. Żadna z 34 sprawdzonych stron internetowych nie była w pełni zgodna ([źródło](https://www.prawo.pl/samorzad/dostepnosc-w-samorzadach-tylko-na-papierze-krytyczne-wyniki-kontroli-nik,1547387.html), odnotowane w [`sourcing-spike.md`](./sourcing-spike.md)).

## Nasza odpowiedź

**Transfer rozwiązań oparty na dowodach:**

```
Problem → podobne realne przypadki → siła dowodów → dopasowanie do miejsca
        → plan adaptacji → odpowiedzialny organ → status → zmierzony rezultat
        → powrót do wspólnej bazy wiedzy
```

Każdy zakończony transfer sprawia, że następny jest tańszy i szybszy. Z czasem prawdziwą wartością BridgeWay staje się uporządkowana baza interwencji: *co zrobiono, gdzie, dla kogo, w jakich warunkach, za ile i z jakim zmierzonym rezultatem.*

## Dla kogo jest BridgeWay

| Rola | Kto | Co daje mu BridgeWay |
|---|---|---|
| **Zgłaszający** | mieszkaniec, rodzina, sąsiedzi | Jasną drogę od „coś jest nie tak” do działania, z widocznym statusem |
| **Pomocnik (pełnomocnik)** | bibliotekarka, pracownik socjalny, wolontariusz, klub seniora | Możliwość zgłoszenia **w imieniu** osoby, która nie może tego zrobić sama, z odnotowaną zgodą |
| **Realizator** | organizacja pozarządowa, wydział urzędu | Gotowy, oparty na źródłach plan adaptacji zamiast pustej kartki |
| **Odpowiedzialny organ** | zarząd dróg / nadzór budowlany, zarządca mieszkań, ośrodek pomocy społecznej | Wskazanego adresata i publiczną oś czasu statusów, przez którą może odpowiedzieć |
| **Grantodawca** *(po hackathonie)* | programy grantowe, fundacje | Sprawdzone interwencje warte finansowania, dopasowane do realnych potrzeb |

**Głównymi beneficjentami są osoby starsze i osoby o ograniczonej mobilności.** BridgeWay zaprojektowano tak, by **nie musiały korzystać z niego same**: może to za nie zrobić ktoś, komu ufają.

## Historia: od problemu do zmiany

> *Scenariusz ilustracyjny (zainscenizowany, jak w naszym demo).*

Starszy sąsiad Anny porusza się na wózku i nie może już dotrzeć do lokalnego ośrodka pomocy społecznej. Anna otwiera BridgeWay:

1. **Zgłasza problem w jego imieniu.** Wybiera kategorię *dostępność*, miasto i zaznacza „zgłaszam w imieniu innej osoby”. Jego zgoda zostaje odnotowana. Adres nie jest zbierany.
2. **BridgeWay pokazuje pasujące realne przypadki**, każdy z organizacją, kosztem, czasem trwania, zmierzonym efektem i poziomem dowodów od A do D. Większość realnych przypadków to C lub D, a aplikacja mówi o tym wprost.
3. **Otwiera przypadek i widzi jego wskaźnik transferu**: które czynniki pasują do jej miasta, jakie mają wagi i dla których czynników **brakuje danych**. Brakujące czynniki nigdy nie są zgadywane, a wynik jest oznaczony jako *wstępny*.
4. **Jedno kliknięcie tworzy lokalny projekt** z krokami przypadku jako zadaniami.
5. **Projekt wskazuje odpowiedzialny organ.** Jeśli jeszcze go nie wskazano, luka jest sygnalizowana. Publiczna oś czasu śledzi status: *przyjęte → przypisane → w realizacji → rozwiązane / odrzucone (z uzasadnieniem)*.

## Co można zrobić w BridgeWay

- 🔎 **Znajdować rozwiązania.** Przeglądać zweryfikowane przypadki z Polski i UE, każdy z linkiem do źródła i poziomem dowodów.
- 📊 **Sprawdzać dopasowanie.** Przejrzysty wskaźnik transferu waży typ problemu, kontekst lokalny (np. odsetek mieszkańców w wieku 65+ z oficjalnych danych GUS), budżet, partnerów i dowody.
- 🧭 **Adaptować.** Otrzymać plan adaptacji wspierany przez AI, który jest pokazywany **tylko wtedy, gdy każdy krok jest poparty dosłownym cytatem** z przypadku. AI nie może dodawać faktów, liczb ani źródeł.
- 📣 **Zgłaszać.** Przesyłać lokalne problemy. Udostępnione zgłoszenia są publiczne i mają oś czasu statusów aktualizowaną przez odpowiadających.
- 🤝 **Łączyć się.** Znajdować ekspertów, organizacje pozarządowe i programy finansowania dopasowane do problemu według słów kluczowych i lokalizacji.
- 🗺️ **Oglądać mapę** lokalnych sygnałów i projektów społecznych. Wrażliwe zgłoszenia są pokazywane tylko jako rozmyty obszar.
- 💡 **Proponować pomysły** i zamieniać przypadki w **projekty** z zadaniami, adresatem i historią statusów.
- 📈 **Mierzyć.** Analityka jest liczona z realnej aktywności (czas do pierwszej odpowiedzi, jak często rozwiązania są ponownie wykorzystywane). Nie ma wykresów dla ozdoby.

## Zasady, od których nie odstępujemy

1. **Każde twierdzenie ma źródło.** Bez źródła nie ma faktu na ekranie.
2. **Każdy wynik da się wyjaśnić.** Nie ma „magicznego procentu”: czynniki, wagi i ich pochodzenie są widoczne.
3. **Każde zgłoszenie ma adresata i status.** Zgłoszenie bez właściciela to bilet w próżnię.
4. **Tylko uczciwe liczby.** Każda liczba jest albo **realna** (ze źródłem), albo **docelowa** (oznaczona), albo **demonstracyjna** (oznaczona). Dane demo są zawsze oznaczone w interfejsie.
5. **AI to narzędzie, nie produkt.** Jest zabezpieczona i audytowalna, i nigdy nie jest źródłem prawdy.
6. **Bezpieczeństwo przede wszystkim.** Nie polecamy niebezpiecznych rozwiązań typu „zrób to sam” (np. samodzielnie budowanych podjazdów). BridgeWay wskazuje właściwą drogę: audyt dostępności → odpowiedzialny organ → technicznie zatwierdzone rozwiązanie.

## Włączenie i dostępność

- **Zgłaszanie z pomocą (przez pełnomocnika)** z wyraźną zgodą, aby osoby wykluczone z internetu też mogły zostać usłyszane.
- **Cel: WCAG 2.1 AA**: kontrast ≥ 4,5:1, opisane kontrolki, zarządzanie fokusem klawiatury, tytuły stron przyjazne czytnikom ekranu i respektowanie ustawienia „ograniczonego ruchu”.
- **Dwujęzyczny interfejs** (polski / angielski), przełączany w dowolnym momencie.
- **Deklaracja dostępności** opublikowana w aplikacji (`/dostepnosc`, szczegóły w [`accessibility.md`](./accessibility.md)).

## Prywatność w fazie projektowania

- Zbierane jest tylko **miasto**, nigdy adres.
- **Wrażliwe zgłoszenia** (seniorzy, mieszkalnictwo lub zgłoszenia w imieniu innej osoby) nigdy nie są przypinane do dokładnego punktu. Mapa pokazuje zamiast tego obszar 3 km na zgrubnej siatce.
- Przed wysłaniem zgłoszenia wyświetlane jest ostrzeżenie dotyczące danych osobowych osób trzecich.
- Logowanie odbywa się przez **jednorazowe linki e-mail**: nie ma haseł, które mogłyby wyciec. Dane każdego konta są prywatne.
- Projekty polityki prywatności i regulaminu są dostępne w aplikacji (`/prywatnosc`, `/regulamin`).

## Mierzenie wpływu społecznego

**Teoria zmiany:** problem opisany → znaleziony pasujący sprawdzony przypadek → przypisany właściciel → rozwiązanie wdrożone → rezultat zmierzony → przypadek wzbogaca bazę → kolejne miejsce potrzebuje mniej czasu i pieniędzy.

| Poziom | Miara | Dlaczego to ważne |
|---|---|---|
| Produkt | Odsetek zgłoszeń ze wskazanym adresatem | Odpowiedzialność, a nie liczba zgłoszeń |
| Produkt | Liczba przypadków ze źródłem i poziomem dowodów | Wzrost bazy wiedzy |
| Rezultat | **Czas do pierwszej odpowiedzi** (mediana) | Czy instytucje faktycznie reagują |
| Rezultat | **Wskaźnik ponownego wykorzystania**: odsetek nowych problemów rozwiązywanych istniejącym przypadkiem | Charakterystyczna miara BridgeWay |
| Rezultat | Odsetek spraw rozwiązanych w ciągu 30 / 60 / 90 dni | Realny postęp |
| Wpływ | Osoby, którym poprawił się dostęp do miejsca lub usługi | Zmiana, która się liczy |

**Gwiazda Polarna:** *liczba skutecznie przeniesionych rozwiązań.* Dzisiejszy punkt wyjścia to zero i nie ukrywamy tego.

## Miejsce BridgeWay wśród innych narzędzi

BridgeWay nie zastępuje istniejących narzędzi. Jest **warstwą wiedzy i odpowiedzialności pomiędzy nimi**: *co zrobić* i *kto za to odpowiada*.

| Istniejące narzędzie | Co robi dobrze | Co dodaje BridgeWay |
|---|---|---|
| Miejskie portale „zgłoś problem” | Zbierają skargi | Sprawdzone rozwiązania z innych miejsc + publiczny status |
| Budżety obywatelskie i platformy partycypacyjne | Pomysły i głosowanie | Bazę dowodów + plan adaptacji aż do rezultatu |
| Katalogi organizacji pozarządowych | Kto działa w okolicy | Dopasowanie właściwego partnera do konkretnego przypadku |
| Crowdfunding | Zbieranie pieniędzy | Sprawdzenie, *co* warto finansować, zanim pieniądze zostaną zebrane |
| Osiedlowe grupy w mediach społecznościowych | Szybka dyskusja | Uporządkowaną wiedzę, która nie ginie |

*(To porównanie jest roboczą hipotezą. Zobacz [`concept_v1.0.md`](./concept_v1.0.md) §11.)*

## Model trwałości

*(Hipoteza, jeszcze niezweryfikowana. Przed walidacją nie podajemy cen.)*

- **Bezpłatnie dla mieszkańców i organizacji pozarządowych.**
- **Gminy:** panel otwartych zgłoszeń, czasów odpowiedzi, przenaszalnych przypadków i raportów.
- **Fundacje i programy:** raportowanie skuteczności i katalog sprawdzonych interwencji.
- **Badacze i partnerzy:** dostęp do zanonimizowanych danych na podstawie umowy.

## Status projektu

**MVP z hackathonu. Działa i jest wdrożone na Cloudflare.**

- ✅ Zweryfikowana baza przypadków (realne źródła, poziomy dowodów A–D), wskaźnik transferu, dopasowanie, mapa, pomysły i projekty
- ✅ Opcjonalny backend: udostępniane zgłoszenia, logowanie przez magic link z akceptacją rejestracji, obsługa przez odpowiadających, dane per konto
- ✅ Zabezpieczony plan adaptacji LLM, liczona analityka, przegląd dostępności, zabezpieczenia prywatności
- ⏳ Wywiady walidacyjne z użytkownikami (odłożone): produkt **nie został jeszcze zweryfikowany z użytkownikami** ([`validation.md`](./validation.md))
- ⏳ Po hackathonie: realne nabory grantowe, rejestr odpowiedzialnych organów, moderacja, testy automatyczne

Wprowadzeni eksperci, organizacje, źródła finansowania, pomysły i projekty to **dane demonstracyjne** i są tak oznaczone. Pełny plan: [`roadmap.md`](./roadmap.md).

---

## Dokumentacja

| Zakładka | Zawartość |
|---|---|
| [**Specyfikacja techniczna**](./docs/TECH_SPEC.md) | Moduły funkcjonalne, trasy, API, model danych, wzory punktacji, zabezpieczenia LLM, bezpieczeństwo, konfiguracja, ograniczenia |
| [**Architektura**](./docs/ARCHITECTURE.md) | Kontekst systemu, komponenty, przepływy żądań, przechowywanie danych, schemat D1, wdrożenie, decyzje projektowe |
| [**Licencja**](./docs/LICENSE.md) | Prawa autorskie, co jest dozwolone, a co nie, informacje o komponentach zewnętrznych |

Szczegółowe specyfikacje: [`architecture.md`](./architecture.md), [`roadmap.md`](./roadmap.md), [`concept_v1.0.md`](./concept_v1.0.md), [`sourcing-spike.md`](./sourcing-spike.md), [`accessibility.md`](./accessibility.md), [`validation.md`](./validation.md). Kroki wdrożenia opisuje [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Szybki start

```bash
npm install
npm run dev        # frontend pod http://localhost:5173
npm run build      # build produkcyjny do dist/
```

Udostępniane zgłoszenia, logowanie i plan adaptacji wymagają API Workera (`npm run dev:api`; zobacz [Specyfikacja techniczna → Uruchomienie, build, wdrożenie](./docs/TECH_SPEC.md#12-uruchomienie-build-wdrożenie)). Bez niego aplikacja działa w **trybie lokalnym** i to komunikuje.

## Licencja

**Copyright © 2026 Dominik Liahovich. Wszelkie prawa zastrzeżone.**

BridgeWay jest **oprogramowaniem własnościowym, a nie open source**. Kod źródłowy, projekt graficzny, teksty i opracowana baza przypadków są udostępnione **wyłącznie do oceny** (na przykład przez jury hackathonu). Bez uprzedniej pisemnej zgody właściciela praw autorskich nie wolno ich kopiować, forkować, modyfikować, wdrażać, hostować, rozpowszechniać ani ponownie wykorzystywać w innym produkcie, ani używać żadnej ich części do eksploracji tekstów i danych (text and data mining) lub trenowania AI. Dotyczy to w równym stopniu użytku komercyjnego i niekomercyjnego.

Pełne warunki: [`LICENSE`](./LICENSE) (wiążące, po angielsku) · tłumaczenie: [`LICENSE.pl`](./LICENSE.pl) · Podsumowanie i informacje o komponentach zewnętrznych: [`docs/LICENSE.md`](./docs/LICENSE.md)
