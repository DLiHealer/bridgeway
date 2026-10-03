// Privacy helpers: sensitive reports are shown on the map only as an approximate area.
export const SENSITIVE_CATEGORIES = ['seniorzy', 'mieszkanie'];
export const APPROX_RADIUS_M = 3000;

export function isSensitive(item) {
  if (!item || item.type === 'idea') return false;
  return SENSITIVE_CATEGORIES.includes(item.category) || !!item.onBehalf;
}

// Snap to a ~0.1° grid (~7–11 km cell) so the exact point cannot be recovered.
export function coarsenCoords([lat, lng]) {
  return [Math.round(lat * 10) / 10, Math.round(lng * 10) / 10];
}
