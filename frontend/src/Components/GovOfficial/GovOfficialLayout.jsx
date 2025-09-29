import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, FileText, Users, UserCircle } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', to: '/govofficial/dashboard', icon: Home },
  { key: 'alerts', label: 'Alerts Management', to: '/govofficial/alerts', icon: AlertTriangle },
  { key: 'reports', label: 'Report Management', to: '/govofficial/reports', icon: FileText },
  { key: 'team', label: 'Team Management', to: '/govofficial/team', icon: Users },
  { key: 'profile', label: 'Profile', to: '/govofficial/profile', icon: UserCircle },
];

const GovOfficialLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Gov Official',
    email: 'official@gov.in',
    photo: null
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Collapsed by default on small screens
    const mq = window.matchMedia('(max-width: 768px)');
    setOpen(!mq.matches);
    const fn = (e) => setOpen(!e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  // Refresh profile when route changes or after potential saves
  useEffect(() => {
    // You can implement profile fetching logic here
    // setProfile(getGovOfficialProfile());
  }, [location.pathname]);

  const activeKey = navItems.find((n) => location.pathname.startsWith(n.to))?.key;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-sm transition-all duration-300 flex flex-col ${open ? 'w-64' : 'w-16'} sticky top-0 self-start h-screen overflow-y-auto shrink-0 z-40`}>
        <div className="h-16 flex items-center justify-between px-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <img src="/STORM_without bg.png" alt="Logo" className="w-9 h-9 object-contain" />
            {open && <span className="font-extrabold text-lg tracking-tight text-red-600">STORM</span>}
          </div>
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
          >
            {/* chevron icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-1">
          {navItems.map(({ key, label, to, icon: Icon }) => (
            <Link key={key} to={to} className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeKey === key ? 'bg-red-50 text-red-700 shadow-inner' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Icon className="w-5 h-5 shrink-0 text-red-500" />
              {open && <span className="truncate">{label}</span>}
            </Link>
          ))}
        </nav>
        {/* User footer */}
        <div className="p-3 flex items-center gap-3 shadow-inner">
          <img className="w-8 h-8 rounded-full object-cover" src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'Official')}&background=DC2626&color=fff`} alt="User" />
          {open && (
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{profile.name || 'Government Official'}</div>
              <div className="text-xs text-gray-500 truncate">{profile.email || 'official@gov.in'}</div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="h-16 bg-white shadow-sm sticky top-0 z-30 flex items-center px-4 justify-between">
          <div className="font-semibold text-gray-800">Government Official Portal</div>
          <button
            onClick={() => { localStorage.removeItem('role'); navigate('/login'); }}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
          >
            Logout
          </button>
        </div>
        <div className="p-5 md:p-7 lg:p-9">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default GovOfficialLayout;