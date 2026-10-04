// Thin client for the Worker API (/api/*). Same-origin, cookie session.
async function call(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch { /* non-JSON (e.g. SPA fallback when no Worker runs) */ }
  if (!res.ok || !data) throw Object.assign(new Error(data?.error || 'unavailable'), { status: res.status, code: data?.error || 'unavailable' });
  return data;
}

export const api = {
  health: () => call('/api/health'),
  me: () => call('/api/me'),
  requestLink: (email) => call('/api/auth/request', { method: 'POST', body: { email } }),
  verify: (token) => call('/api/auth/verify', { method: 'POST', body: { token } }),
  logout: () => call('/api/auth/logout', { method: 'POST', body: {} }),
  profile: () => call('/api/profile'),
  saveProfile: (profile) => call('/api/profile', { method: 'PUT', body: profile }),
  userData: () => call('/api/user-data'),
  saveUserData: (slice, value) => call(`/api/user-data/${slice}`, { method: 'PUT', body: { value } }),
  settings: () => call('/api/admin/settings'),
  setTestMode: (testMode) => call('/api/admin/settings', { method: 'POST', body: { testMode } }),
  llm: () => call('/api/admin/llm'),
  llmModels: () => call('/api/admin/llm/models'),
  setLlm: (model) => call('/api/admin/llm', { method: 'POST', body: { model } }),
  registrations: () => call('/api/admin/registrations'),
  decide: (email, decision) => call('/api/admin/registrations/decide', { method: 'POST', body: { email, decision } }),
  adaptPlan: (caseId, city, lang) => call('/api/adapt-plan', { method: 'POST', body: { caseId, city, lang } }),
  metrics: () => call('/api/metrics'),
  reports: () => call('/api/reports'),
  report: (id) => call(`/api/reports/${id}`),
  createReport: (r) => call('/api/reports', { method: 'POST', body: r }),
  setStatus: (id, body) => call(`/api/reports/${id}/status`, { method: 'POST', body }),
};
