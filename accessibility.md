# Accessibility checklist (roadmap Step 11 / P10)

Target: WCAG 2.1 AA, honestly reported. Public statement: route `/dostepnosc` (i18n `a11y.*`).

| Item | Status | How |
|---|---|---|
| Keyboard: skip link, all controls reachable, Esc closes menu/drawer/modal | Done (code) | Header, `Modal`, `a11y.skip` |
| Visible focus | Done | global `:focus-visible` ring in `index.css` |
| Contrast ≥ 4.5:1 | Done (computed) | `neutral-400` #56647A, `brand.danger` #C0392B, `Badge` darkens text colour; hero subtitle white |
| Text scaling 200% | Done (layout) | header `min-h`, no `user-scalable=no`; not tested on every page |
| Landmarks | Done | `header`, labelled `nav`s, `main` (focused on route change), `footer` |
| Icon/button names | Done | i18n `aria-label`s, decorative icons `aria-hidden` |
| Form labels | Done for SubmitPage | `htmlFor`/`id`, grouped radios; ProfilePage wraps inputs in `<label>` |
| Reduced motion | Done | CSS media query + `MotionConfig reducedMotion="user"` |
| Page title / focus on navigation | Done | `Layout` |
| Accessibility statement | Done | `/dostepnosc`, footer link |
| Keyboard-only run of main scenario | **Pending (human)** | Home → case → copy → project → report |
| Screen reader run (NVDA/VoiceOver) | **Pending (human)** | same scenario |

## Known limitations
- Map (Leaflet) only partly keyboard-accessible; list next to it is the alternative.
- Colour-blindness not verified for category colours.
- Contrast computed from tokens, not scanned on rendered pages (no axe/Lighthouse run yet).
- Modal has focus on open/restore but no full focus trap.
