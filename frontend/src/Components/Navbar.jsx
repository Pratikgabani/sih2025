import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkBase = 'px-4 py-2 rounded-lg font-medium transition-colors';

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-700 font-bold">
          <span role="img" aria-label="logo">🌊</span>
          <span>STORM</span>
        </div>
        <div className="flex items-center gap-2">
          <NavLink
            to="/report"
            className={({ isActive }) => `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-50'}`}
          >
            Report
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) => `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-50'}`}
          >
            Map
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
