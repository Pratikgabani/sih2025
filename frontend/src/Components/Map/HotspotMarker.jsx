import React, { useEffect, useRef } from "react";

const HotspotMarker = ({ hotspot, x, y, highlighted }) => {
  const elRef = useRef();

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.left = `${x - 12}px`;
    el.style.top = `${y - 12}px`;
    if (highlighted) {
      el.style.transform = "scale(1.5)";
      setTimeout(() => {
        if (el) el.style.transform = "scale(1)";
      }, 1500);
    }
  }, [x, y, highlighted]);

  return (
    <div ref={elRef} className="hotspot-marker-overlay" title={`${hotspot.latitude.toFixed(4)}, ${hotspot.longitude.toFixed(4)}`}>
      <div className={`marker-icon ${hotspot.type === "manual" ? "marker-manual" : "marker-geotagged"}`}>
        {hotspot.type === "manual" ? "📍" : "📷"}
      </div>
    </div>
  );
};

export default HotspotMarker;
