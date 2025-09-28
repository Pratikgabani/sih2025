// Simple localStorage-based state for demo purposes
export const getLS = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
export const setLS = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

export const PROFILE_KEY = 'citizen_profile_v1';
export const AVAILABILITY_KEY = 'citizen_available_v1';
export const REPORTS_KEY = 'citizen_reports_v1';

export const getProfile = () => getLS(PROFILE_KEY, { name: '', phone: '', photo: '', email: '', address: '', skills: [], certifications: [], gpsOn: false, available: false });
export const saveProfile = (p) => setLS(PROFILE_KEY, p);
export const isProfileComplete = (p) => !!(p.name && p.phone && p.email && (p.address || p.gpsOn));

export const getAvailability = () => getLS(AVAILABILITY_KEY, false);
export const setAvailability = (v) => setLS(AVAILABILITY_KEY, v);

export const getReports = () => getLS(REPORTS_KEY, []);
export const saveReports = (arr) => setLS(REPORTS_KEY, arr);

export const canSubmitReportToday = () => {
  const arr = getReports();
  const today = new Date().toDateString();
  const countToday = arr.filter(r => new Date(r.createdAt).toDateString() === today).length;
  return { allowed: countToday < 10, remaining: Math.max(0, 10 - countToday) };
};
