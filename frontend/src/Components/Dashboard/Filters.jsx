
// src/components/Filters.jsx
import React from "react";
import useStore from "../../store/UseStore";

export default function Filters() {
  const {
    filters,
    setFilter,
    refreshData,
    dateRanges,
    eventTypes,
    sources,
  } = useStore();

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">🔍</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Smart Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Event Type</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            value={filters.eventType}
            onChange={(e) => setFilter("eventType", e.target.value)}
          >
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Data Source</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            value={filters.source}
            onChange={(e) => setFilter("source", e.target.value)}
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Time Range</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            value={filters.dateRange}
            onChange={(e) => setFilter("dateRange", e.target.value)}
          >
            {dateRanges.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 lg:col-span-1 xl:col-span-1">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder-gray-400 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="District, taluka, or pincode"
            value={filters.location}
            onChange={(e) => setFilter("location", e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={refreshData}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            Apply Filters
          </button>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 leading-relaxed">
          <span className="font-medium">💡 Smart Filtering:</span> Filters automatically sync with map visualization and social media analysis to highlight correlated hotspots and trends.
        </p>
      </div>
    </div>
  );
}
