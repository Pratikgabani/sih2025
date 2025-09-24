import React, { useEffect, useRef, useState } from "react";
import HotspotMarker from "./HotspotMarker";
import { screenToLat, screenToLng, latToScreen, lngToScreen } from "./utils";

const DEFAULT_IFRAME_SRC =
  "https://embed.windy.com/embed.html?type=map&location=coordinates&metricWind=default&metricTemp=default&metricRain=default&metricPressure=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=20.593&lon=78.962";

const MapArea = ({ bounds, hotspots, createHotspot, selectedHotspotId, currentLayer, loading }) => {
  const clickOverlayRef = useRef();
  const hotspotOverlayRef = useRef();
  const [mousePos, setMousePos] = useState({ lat: "-", lng: "-" });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const el = clickOverlayRef.current;
    const updateSize = () => {
      const r = el.getBoundingClientRect();
      setContainerSize({ width: r.width, height: r.height });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
  }, [containerSize, hotspots]);

  const onClickOverlay = async (e) => {
    const rect = clickOverlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lat = screenToLat(y, rect.height, bounds);
    const lng = screenToLng(x, rect.width, bounds);
    await createHotspot(lat, lng, "manual");
  };

  const onMouseMove = (e) => {
    const rect = clickOverlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lat = screenToLat(y, rect.height, bounds);
    const lng = screenToLng(x, rect.width, bounds);
    setMousePos({ lat: lat.toFixed(4), lng: lng.toFixed(4) });
  };

  return (
    <div className="map-container relative">
      <iframe id="windyMap" title="Windy Map" src={DEFAULT_IFRAME_SRC.replace("&overlay=wind", `&overlay=${currentLayer}`)} frameBorder="0" className="windy-iframe" />
      <div
        id="clickOverlay"
        ref={clickOverlayRef}
        className="click-overlay"
        onClick={onClickOverlay}
        onMouseMove={onMouseMove}
      />
      <div id="hotspotOverlay" ref={hotspotOverlayRef} className="hotspot-overlay">
        {hotspots.map((h) => {
          const rectWidth = containerSize.width || 800;
          const rectHeight = containerSize.height || 600;
          const x = lngToScreen(h.longitude, rectWidth, bounds);
          const y = latToScreen(h.latitude, rectHeight, bounds);
          return (
            <HotspotMarker
              key={h.id}
              hotspot={h}
              x={x}
              y={y}
              highlighted={selectedHotspotId === h.id}
            />
          );
        })}
      </div>

      <div className="absolute bottom-4 left-4 coordinate-display z-20">
        <div className="text-xs">
          <div>Lat: <span id="mouseLat">{mousePos.lat}</span></div>
          <div>Lng: <span id="mouseLng">{mousePos.lng}</span></div>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <div className="text-sm">
          <div className="font-medium text-gray-800 flex items-center">
            <i className="fas fa-wind text-blue-600 mr-2" />
            Current Layer
          </div>
          <div id="currentLayer" className="text-blue-600 font-semibold">
            {currentLayer}
          </div>
        </div>
      </div>

      {loading && (
        <div id="loadingOverlay" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <i className="fas fa-spinner loading-spinner text-3xl text-blue-600 mb-3"></i>
            <p className="text-gray-700">Creating hotspot with weather data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapArea;
