// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { name: "Login", path: "/login" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Map", path: "/map" },
  { name: "Reports", path: "/report" },
  // { name: "Social", path: "/social" },
  // { name: "Settings", path: "/settings" },
];

export default function Sidebar({ isOpen = false, onClose }) {
  return (
    <aside className={`
      w-64 bg-white border-r border-gray-200 h-full flex flex-col shadow-lg z-50
      transform transition-transform duration-300 ease-in-out
      md:translate-x-0 md:static md:z-auto
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed md:relative top-0 md:top-auto
    `}>
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">STORM</h1>
          <p className="text-blue-100 text-xs mt-1">Ocean Monitoring System</p>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden p-1 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {nav.map((n, index) => (
          <NavLink
            key={n.name}
            to={n.path}
            onClick={() => onClose && onClose()}
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group ${
              isActive 
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:translate-x-1'
            }`}
          >
            <span>{n.name}</span>
          </NavLink>
        ))}
      </nav>
      {/* <div className="mt-auto p-4 bg-gray-50 border-t border-gray-200 rounded-t-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600">System Status</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          PWA enabled for offline reporting with background sync capabilities.
        </p>
      </div> */}
    </aside>
  );
}
