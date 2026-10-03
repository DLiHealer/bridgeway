// Явный маппинг человекочитаемых специализаций на id категорий
const SPEC_TO_CAT = {
  'mieszkanie': 'mieszkanie',
  'seniorzy': 'seniorzy',
  'dostepnosc': 'dostepnosc',
  'dostępność': 'dostepnosc',
  'cyfryzacja': 'cyfrowe',
  'cyfrowe': 'cyfrowe',
  'ekologia': 'ekologia',
  'integracja': 'integracja',
  'inne': 'inne',
};

function normalize(s = '') {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
}

function specToCat(spec = '') {
  const key = String(spec).toLowerCase();
  if (SPEC_TO_CAT[key]) return SPEC_TO_CAT[key];
  return SPEC_TO_CAT[normalize(spec)] || null;
}

function scoreByCategory(itemCat, targetCat) {
  if (!targetCat) return 40;          // нет категории → нейтральный скор
  if (!itemCat) return 0;
  return itemCat === targetCat ? 100 : 0;
}

function scoreByText(item, text = '') {
  if (!text) return 0;
  const words = normalize(text).split(/\s+/).filter(w => w.length >= 3);
  if (words.length === 0) return 0;
  const hay = normalize(JSON.stringify(item));
  return words.reduce((acc, w) => acc + (hay.includes(w) ? 25 : 0), 0);
}

function scoreByCity(item, city) {
  if (!city) return 0;
  return item.city === city ? 30 : 0;
}

export function matchExperts(input, experts = []) {
  return experts.map(e => {
    const cat = specToCat(e.specialization);
    const catScore = scoreByCategory(cat, input.category);
    const cityScore = scoreByCity(e, input.city);
    const textScore = scoreByText(e, input.title || '');
    return { ...e, score: Math.min(100, catScore * 0.7 + cityScore + textScore) };
  }).sort((a, b) => b.score - a.score);
}

export function matchNgos(input, ngos = []) {
  return ngos.map(n => ({
    ...n,
    score: scoreByCity(n, input.city) + scoreByText(n, (input.title || '') + ' ' + (input.tags || []).join(' ')),
  })).sort((a, b) => b.score - a.score);
}

export function matchSolutions(input, solutions = []) {
  return solutions.map(s => ({
    ...s,
    score: scoreByCategory(s.category, input.category) + scoreByText(s, (input.tags || []).join(' ')),
  })).sort((a, b) => b.score - a.score);
}

export function matchFundings(input, fundings = []) {
  return fundings.map(f => ({
    ...f,
    score: scoreByText(f, input.category) +
      (f.region === 'Cała Polska' ? 30 : scoreByCity(f, input.city)),
  })).sort((a, b) => b.score - a.score);
}

export function matchIdeas(input, ideas = []) {
  return ideas.map(i => ({
    ...i,
    score: scoreByCategory(i.category, input.category) + scoreByText(i, (input.tags || []).join(' ')),
  })).sort((a, b) => b.score - a.score);
}

export function matchAll(input, data) {
  return {
    experts: matchExperts(input, data.experts).slice(0, 3),
    ngos: matchNgos(input, data.ngos).slice(0, 2),
    solutions: matchSolutions(input, data.solutions).slice(0, 3),
    fundings: matchFundings(input, data.fundings).slice(0, 3),
    ideas: matchIdeas(input, data.ideas).slice(0, 3),
  };
}