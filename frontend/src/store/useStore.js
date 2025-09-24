// src/store/useStore.js
import { create } from "zustand";

// Demo seed reports and social indicators
const seedReports = [
  {
    eventType: "High Waves",
    description: "Foam and spray over promenade.",
    lat: 19.06,
    lng: 72.83,
    weight: 0.7,
    source: "Citizen",
    ts: new Date(Date.now() - 3600e3).toISOString(),
  },
  {
    eventType: "Flooding",
    description: "Street waterlogging near fishing jetty.",
    lat: 15.29,
    lng: 73.91,
    weight: 0.6,
    source: "Official",
    ts: new Date(Date.now() - 2 * 3600e3).toISOString(),
  },
  {
    eventType: "Coastal Damage",
    description: "Erosion reported; embankment cracks.",
    lat: 9.97,
    lng: 76.28,
    weight: 0.9,
    source: "Analyst",
    ts: new Date(Date.now() - 0.5 * 3600e3).toISOString(),
  },
];

const seedSocial = [
  { keyword: "#HighTide", mentions: 128, sentiment: "mixed", engagement: 420, source: "X/Twitter" },
  { keyword: "sea level rise", mentions: 64, sentiment: "concern", engagement: 310, source: "YouTube" },
  { keyword: "storm surge", mentions: 80, sentiment: "urgent", engagement: 560, source: "Facebook" },
];

const toGeoJSON = (reports) => ({
  type: "FeatureCollection",
  features: reports.map((r) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [r.lng, r.lat] },
    properties: {
      eventType: r.eventType,
      description: r.description,
      weight: r.weight ?? 0.5, // used by heatmap-weight
      source: r.source,
      ts: r.ts,
    },
  })),
});

const dateRanges = [
  { label: "Last 1h", value: "1h" },
  { label: "Last 6h", value: "6h" },
  { label: "Last 24h", value: "24h" },
  { label: "Last 7d", value: "7d" },
];

const eventTypes = [
  "All Events",
  "High Waves",
  "Flooding",
  "Coastal Damage",
  "Tsunami",
  "Unusual Tides",
  "Swell Surge",
];

const sources = ["All Sources", "Citizen", "Official", "Analyst", "Social"];

const filterReports = (reports, filters) => {
  return reports.filter((r) => {
    const typeOk = filters.eventType === "All Events" || r.eventType === filters.eventType;
    const sourceOk = filters.source === "All Sources" || r.source === filters.source;
    // Date and location filters can be implemented by ts and reverse-geocode results.
    return typeOk && sourceOk;
  });
};

const useStore = create((set, get) => ({
  role: "analyst",
  setRole: (role) => set({ role }),

  kpis: { reports24h: 142, verified: 18, hotspots: 7, social1h: 256 },

  filters: {
    eventType: "All Events",
    source: "All Sources",
    dateRange: "24h",
    location: "",
  },
  setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),

  dateRanges,
  eventTypes,
  sources,

  reports: seedReports,
  reportsGeoJSON: toGeoJSON(seedReports),

  socialIndicators: seedSocial,

  refreshData: () => {
    const { filters } = get();
    const base = seedReports;
    const filtered = filterReports(base, filters);
    set({ reports: filtered, reportsGeoJSON: toGeoJSON(filtered) });
  },

  // Demonstrates offline-aware submission; in production, POST to /api/reports.
  submitReportOfflineAware: async (report) => {
    // Attempt POST; on failure, fall back to local state (service worker should queue real POST).
    try {
      // await fetch("/api/reports", { method: "POST", body: JSON.stringify(report) });
      set((s) => {
        const reports = [report, ...s.reports];
        return { reports, reportsGeoJSON: toGeoJSON(reports) };
      });
    } catch (e) {
      // When wiring Workbox, BackgroundSyncPlugin will queue failed POSTs in IndexedDB for replay. [web:26]
      set((s) => {
        const reports = [report, ...s.reports];
        return { reports, reportsGeoJSON: toGeoJSON(reports) };
      });
    }
  },
}));

export default useStore;
