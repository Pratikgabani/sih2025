// src/components/ReportsTable.jsx
import React from "react";
import useStore from "../../store/UseStore";

// Helper function to convert coordinates to location names
const getLocationName = (lat, lng) => {
  // Sample mapping of coordinates to location names for demonstration
  // In a real app, this would use reverse geocoding API or a location database
  const locations = [
    { lat: 19.098, lng: 72.826, name: "Juhu Beach, Mumbai" },
    { lat: 19.076, lng: 72.877, name: "Bandra West, Mumbai" },
    { lat: 19.017, lng: 72.857, name: "Worli, Mumbai" },
    { lat: 18.922, lng: 72.834, name: "Colaba, Mumbai" },
    { lat: 19.104, lng: 72.831, name: "Versova Beach, Mumbai" },
    { lat: 19.164, lng: 72.849, name: "Gorai Beach, Mumbai" },
    { lat: 19.057, lng: 72.836, name: "Marine Drive, Mumbai" },
    { lat: 18.915, lng: 72.823, name: "Gateway of India, Mumbai" },
  ];

  // Find the closest location (simple distance calculation)
  let closestLocation = null;
  let minDistance = Infinity;

  locations.forEach(location => {
    const distance = Math.sqrt(
      Math.pow(lat - location.lat, 2) + Math.pow(lng - location.lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  });

  // If very close to a known location, return it; otherwise return a generic name
  if (minDistance < 0.01) { // Within ~1km
    return closestLocation.name;
  } else {
    // Generate a generic location name based on coordinates
    const area = lat > 19.1 ? "North Mumbai" : lat > 19.0 ? "Central Mumbai" : "South Mumbai";
    const zone = lng > 72.85 ? "East" : "West";
    return `${area} ${zone}`;
  }
};

export default function ReportsTable() {
  const { reports, submitReportOfflineAware } = useStore();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-xl text-gray-800">Crowdsourced Reports</h3>
        <button
          onClick={() =>
            submitReportOfflineAware({
              eventType: "High Waves",
              description: "Waves overtopping seawall near Juhu.",
              lat: 19.098,
              lng: 72.826,
              weight: 0.8,
              source: "Citizen",
              ts: new Date().toISOString(),
            })
          }
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <span>🚀</span>
          Quick Submit (Demo)
        </button>
      </div>
      <div className="overflow-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-gray-800 uppercase tracking-wider text-xs">
                🕐 Time
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-800 uppercase tracking-wider text-xs">
                📊 Type
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-800 uppercase tracking-wider text-xs">
                📍 Location
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-800 uppercase tracking-wider text-xs">
                👥 Source
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-800 uppercase tracking-wider text-xs">
                🛡️ Reliability
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((r, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {new Date(r.ts).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {r.eventType}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {getLocationName(r.lat, r.lng)}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {r.lat.toFixed(3)}, {r.lng.toFixed(3)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    r.source === 'Citizen' 
                      ? 'bg-green-100 text-green-800'
                      : r.source === 'Official'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {r.source}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      (r.weight ?? 0.5) >= 0.8 ? 'bg-green-500' :
                      (r.weight ?? 0.5) >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-gray-700 font-semibold">
                      {r.weight ?? 0.5}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 leading-relaxed">
          <span className="font-medium">🔄 Offline Sync:</span> Reports are queued using Workbox Background Sync when offline and automatically submitted when connection is restored.
        </p>
      </div>
    </div>
  );
}
