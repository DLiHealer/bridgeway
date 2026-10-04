# Lista kontrolna dostępności (roadmapa, krok 11 / P10)

Cel: WCAG 2.1 AA, raportowany uczciwie. Deklaracja publiczna: trasa `/dostepnosc` (i18n `a11y.*`).

| Element | Status | Jak |
|---|---|---|
| Klawiatura: link „przejdź do treści”, wszystkie kontrolki osiągalne, Esc zamyka menu/szufladę/okno modalne | Zrobione (kod) | Header, `Modal`, `a11y.skip` |
| Widoczny fokus | Zrobione | globalna obwódka `:focus-visible` w `index.css` |
| Kontrast ≥ 4,5:1 | Zrobione (wyliczone) | `neutral-400` #56647A, `brand.danger` #C0392B, `Badge` przyciemnia kolor tekstu; podtytuł w sekcji hero biały |
| Skalowanie tekstu 200% | Zrobione (układ) | `min-h` w nagłówku, brak `user-scalable=no`; nie testowane na każdej stronie |
| Landmarki | Zrobione | `header`, opisane `nav`, `main` (z fokusem przy zmianie trasy), `footer` |
| Nazwy ikon/przycisków | Zrobione | `aria-label` z i18n, ikony dekoracyjne `aria-hidden` |
| Etykiety formularzy | Zrobione dla SubmitPage | `htmlFor`/`id`, pogrupowane przyciski radio; ProfilePage opakowuje pola w `<label>` |
| Ograniczony ruch | Zrobione | media query w CSS + `MotionConfig reducedMotion="user"` |
| Tytuł strony / fokus przy nawigacji | Zrobione | `Layout` |
| Deklaracja dostępności | Zrobione | `/dostepnosc`, link w stopce |
| Przejście głównego scenariusza tylko klawiaturą | **Czeka (człowiek)** | Home → przypadek → kopiowanie → projekt → zgłoszenie |
| Przejście z czytnikiem ekranu (NVDA/VoiceOver) | **Czeka (człowiek)** | ten sam scenariusz |

## Znane ograniczenia
- Mapa (Leaflet) jest tylko częściowo dostępna z klawiatury; alternatywą jest lista obok niej.
- Nie zweryfikowano kolorów kategorii pod kątem daltonizmu.
- Kontrast wyliczony z tokenów, a nie zeskanowany na wyrenderowanych stronach (jeszcze bez uruchomienia axe/Lighthouse).
- Okno modalne ustawia fokus przy otwarciu i przywraca go po zamknięciu, ale nie ma pełnej pułapki fokusu.
