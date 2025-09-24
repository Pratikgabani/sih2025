// src/components/Sidebar.jsx
import React from "react";

const nav = [
  { name: "Dashboard", icon: "📊" },
  { name: "Map", icon: "🗺️" },
  { name: "Reports", icon: "📝" },
  { name: "Social", icon: "💬" },
  { name: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 hidden md:flex flex-col shadow-lg transition-colors duration-300">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <h1 className="text-xl font-bold text-white tracking-wide">STORM</h1>
        <p className="text-blue-100 dark:text-blue-200 text-xs mt-1">Ocean Monitoring System</p>
      </div>
      <nav className="p-4 space-y-2 flex-1">
        {nav.map((n, index) => (
          <a
            key={n.name}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group ${
              index === 0 
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1'
            }`}
          >
            <span className={`text-lg ${index === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`}>
              {n.icon}
            </span>
            <span>{n.name}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-t-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">System Status</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          PWA enabled for offline reporting with background sync capabilities.
        </p>
      </div>
    </aside>
  );
}
