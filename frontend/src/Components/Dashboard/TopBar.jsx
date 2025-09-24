// src/components/TopBar.jsx
import React from "react";
import useStore from "../../store/UseStore";
// import ThemeBtn from "./ThemeBtn";

export default function TopBar() {
  return (
    <header className="w-full bg-white shadow-md border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
        <h1 className="text-sm md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent truncate">
          <span className="hidden sm:inline">STORM - Ocean Hazard Intelligence</span>
          <span className="sm:hidden">STORM Dashboard</span>
        </h1>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-700">Live</span>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {/* <ThemeBtn /> */}
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs md:text-sm font-medium px-2 md:px-4 py-1 md:py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-1 md:gap-2">
          <span>➕</span>
          <span className="hidden sm:inline">New Report</span>
          <span className="sm:hidden">Report</span>
        </button>
      </div>
    </header>
  );
}
