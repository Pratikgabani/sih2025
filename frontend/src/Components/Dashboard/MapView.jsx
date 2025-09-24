// // src/components/MapView.jsx
// import React, { useEffect, useRef } from "react";
// // import mapboxgl from "mapbox-gl";
// import useStore from "../../store/UseStore";

// // Ensure Tailwind has container full height
// // Mapbox token from env: VITE_MAPBOX_TOKEN
// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// export default function MapView() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const { reportsGeoJSON, filters } = useStore();

//   // Helper to add/update heatmap and circles like Mapbox examples
//   const upsertLayers = (map) => {
//     if (!map.getSource("reports")) {
//       map.addSource("reports", {
//         type: "geojson",
//         data: reportsGeoJSON,
//         cluster: true,
//         clusterRadius: 40,
//       });
//     } else {
//       const src = map.getSource("reports");
//       if (src && src.setData) src.setData(reportsGeoJSON);
//     }

//     // Heatmap layer (density of reports, optionally weighted by severity/keyword score)
//     if (!map.getLayer("reports-heat")) {
//       map.addLayer(
//         {
//           id: "reports-heat",
//           type: "heatmap",
//           source: "reports",
//           maxzoom: 15,
//           paint: {
//             "heatmap-weight": [
//               "interpolate",
//               ["linear"],
//               ["get", "weight"],
//               0,
//               0,
//               1,
//               1,
//             ],
//             "heatmap-intensity": [
//               "interpolate",
//               ["linear"],
//               ["zoom"],
//               0,
//               0.8,
//               15,
//               2.0,
//             ],
//             "heatmap-color": [
//               "interpolate",
//               ["linear"],
//               ["heatmap-density"],
//               0,
//               "rgba(0,0,255,0)",
//               0.2,
//               "rgba(65,105,225,0.6)",
//               0.4,
//               "rgba(0,255,255,0.7)",
//               0.6,
//               "rgba(0,255,127,0.8)",
//               0.8,
//               "rgba(255,165,0,0.9)",
//               1,
//               "rgba(255,0,0,1)",
//             ],
//             "heatmap-radius": [
//               "interpolate",
//               ["linear"],
//               ["zoom"],
//               0,
//               2,
//               9,
//               20,
//               15,
//               40,
//             ],
//             "heatmap-opacity": [
//               "interpolate",
//               ["linear"],
//               ["zoom"],
//               7,
//               0.8,
//               15,
//               0.2,
//             ],
//           },
//         },
//         "waterway-label"
//       );
//     }

//     // Individual points (visible at higher zooms)
//     if (!map.getLayer("reports-point")) {
//       map.addLayer(
//         {
//           id: "reports-point",
//           type: "circle",
//           source: "reports",
//           minzoom: 7,
//           paint: {
//             "circle-radius": 5,
//             "circle-color": [
//               "match",
//               ["get", "eventType"],
//               "Tsunami",
//               "#ef4444",
//               "High Waves",
//               "#f59e0b",
//               "Flooding",
//               "#3b82f6",
//               "Coastal Damage",
//               "#10b981",
//               /* other */ "#64748b",
//             ],
//             "circle-stroke-color": "#ffffff",
//             "circle-stroke-width": 1,
//             "circle-opacity": 0.9,
//           },
//         },
//         "waterway-label"
//       );
//     }

//     // Cluster circles
//     if (!map.getLayer("clusters")) {
//       map.addLayer({
//         id: "clusters",
//         type: "circle",
//         source: "reports",
//         filter: ["has", "point_count"],
//         paint: {
//           "circle-color": [
//             "step",
//             ["get", "point_count"],
//             "#93c5fd",
//             20,
//             "#60a5fa",
//             50,
//             "#3b82f6",
//           ],
//           "circle-radius": [
//             "step",
//             ["get", "point_count"],
//             15,
//             20,
//             20,
//             50,
//             30,
//           ],
//         },
//       });
//     }
//     if (!map.getLayer("cluster-count")) {
//       map.addLayer({
//         id: "cluster-count",
//         type: "symbol",
//         source: "reports",
//         filter: ["has", "point_count"],
//         layout: {
//           "text-field": ["get", "point_count_abbreviated"],
//           "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
//           "text-size": 12,
//         },
//         paint: {
//           "text-color": "#111827",
//         },
//       });
//     }

//     // Popup on click
//     map.on("click", "reports-point", (e) => {
//       const f = e.features?.[0];
//       if (!f) return;
//       const p = f.properties || {};
//       const coords = f.geometry.coordinates.slice();
//       const html = `
//         <div class="text-sm">
//           <div class="font-semibold">${p.eventType || "Report"}</div>
//           <div class="text-gray-600">${p.description || ""}</div>
//           <div class="text-xs mt-1">Source: ${p.source || "Citizen"}</div>
//           <div class="text-xs">Time: ${p.ts || ""}</div>
//         </div>`;
//       new mapboxgl.Popup({ closeOnClick: true }).setLngLat(coords).setHTML(html).addTo(map);
//     });
//   };

//   useEffect(() => {
//     if (mapRef.current) return;
//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/light-v11",
//       center: [72.8, 19.0], // West coast India focus
//       zoom: 5,
//     });

//     mapRef.current = map;

//     map.on("load", () => {
//       upsertLayers(map);
//     });

//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//   }, []);

//   useEffect(() => {
//     const map = mapRef.current;
//     if (map && map.isStyleLoaded()) {
//       upsertLayers(map);
//     }
//   }, [reportsGeoJSON, filters]);

//   return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
// }
