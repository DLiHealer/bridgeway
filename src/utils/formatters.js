export const fmtDate = (iso) => new Date(iso).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
export const initials = (name = '') => name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
export const avatarUrl = (name) => `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1E5EFF,00B894,8E44AD,FFB020`;