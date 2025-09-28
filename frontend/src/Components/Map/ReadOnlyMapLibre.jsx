import React, { useEffect, useRef } from 'react';

// Lightweight read-only MapLibre map embedded via srcDoc.
// Hotspots are loaded from localStorage key 'gov_hotspots' (GeoJSON FeatureCollection)
// or from window.GOV_HOTSPOTS if present. No drawing/adding from the client side.
export default function ReadOnlyMapLibre({ height = '100%', initialCenter = [77.2090, 28.6139], initialZoom = 4.5 }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Prepare hotspots data from localStorage/window
    let hotspots = null;
    try {
      const raw = localStorage.getItem('gov_hotspots');
      if (raw) {
        const gj = JSON.parse(raw);
        if (gj && gj.type === 'FeatureCollection') hotspots = gj;
      }
    } catch {}
    if (!hotspots && typeof window !== 'undefined' && window.GOV_HOTSPOTS) {
      hotspots = window.GOV_HOTSPOTS;
    }

    // Post hotspots to iframe after it loads
    const handleLoad = () => {
      if (hotspots) {
        iframe.contentWindow?.postMessage({ type: 'hotspots', data: hotspots }, '*');
      }
    };
    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, []);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css" rel="stylesheet" />
<style>
  html, body, #map { height: 100%; margin: 0; }
  #map { width: 100%; }
  .legend { position: absolute; top: 10px; left: 10px; z-index: 2; background: rgba(255,255,255,.95); border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,.08); padding: 10px 12px; font: 13px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; display: grid; gap: 6px; }
  .row { display: flex; align-items: center; gap: 8px; color: #334155; }
  .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .flood { background: #1d4ed8; }
  .tsunami { background: #0ea5e9; }
  .cyclone { background: #ef4444; }
  .stormsurge { background: #9333ea; }
</style>
</head>
<body>
<div id="map"></div>
<div class="legend">
  <div class="row"><span class="dot flood"></span> Flood</div>
  <div class="row"><span class="dot tsunami"></span> Tsunami</div>
  <div class="row"><span class="dot cyclone"></span> Cyclone</div>
  <div class="row"><span class="dot stormsurge"></span> Storm Surge</div>
</div>
<script src="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js"></script>
<script>
  const map = new maplibregl.Map({
    container: 'map',
    center: [${initialCenter[0]}, ${initialCenter[1]}],
    zoom: ${initialZoom},
    style: {
      version: 8,
      sources: {
        'osm-tiles': { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OpenStreetMap contributors' }
      },
      layers: [ { id: 'osm-tiles', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 } ]
    }
  });
  map.addControl(new maplibregl.NavigationControl(), 'top-right');

  map.on('load', () => {
    map.addSource('seamarks', { type: 'raster', tiles: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'], tileSize: 256, attribution: 'Map data: © OpenSeaMap contributors' });
    map.addLayer({ id: 'seamarks-layer', type: 'raster', source: 'seamarks' });

    map.addSource('hotspots', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addLayer({ id: 'hotspots-circle', type: 'circle', source: 'hotspots', paint: {
      'circle-color': ['match', ['get','type'], 'flood','#1d4ed8','tsunami','#0ea5e9','cyclone','#ef4444','stormsurge','#9333ea','#111827'],
      'circle-radius': ['match', ['get','severity'], 'low',6,'medium',9,'high',12,8],
      'circle-opacity': 0.8,
      'circle-stroke-color': '#fff', 'circle-stroke-width': 1
    }});

    window.addEventListener('message', (e) => {
      const { type, data } = e.data || {};
      if (type === 'hotspots' && data && data.type === 'FeatureCollection') {
        const src = map.getSource('hotspots');
        src && src.setData(data);
      }
    });
  });

  // Disable adding hotspots by clicks; only popup on existing features
  map.on('click', 'hotspots-circle', (e) => {
    const f = e.features && e.features[0];
    if (!f) return;
    const { type, severity, note } = f.properties;
    const coords = f.geometry.coordinates.slice();
    new maplibregl.Popup().setLngLat(coords).setHTML('<strong>'+String(type||'').toUpperCase()+"</strong> "+(severity||'')+ '<br/>' + (note||'')) .addTo(map);
  });
  map.on('mouseenter', 'hotspots-circle', () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mouseleave', 'hotspots-circle', () => { map.getCanvas().style.cursor = ''; });
</script>
</body>
</html>`;

  return (
    <iframe ref={iframeRef} title="ReadOnlyMapLibre" style={{ width: '100%', height, border: '0', borderRadius: '12px' }} srcDoc={html} />
  );
}
