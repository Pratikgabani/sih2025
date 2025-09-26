import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import MapArea from "./MapArea";
import HotspotModal from "./HotspotModal";
import Notifications from "./Notifications";
import { simulateWeatherData, downloadCSV, convertDMSToDD } from "./utils";
import "./windy-interactive.css";

const DEFAULT_MAP_BOUNDS = {
  north: 37,
  south: 6,
  east: 97,
  west: 68,
};

const WindyInteractive = () => {
  const [hotspots, setHotspots] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reports, setReports] = useState([]);
  const [currentLayer, setCurrentLayer] = useState("wind");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const weatherCacheRef = useRef(new Map());
  const notificationIdRef = useRef(0);

  const addNotification = (message, type = "info") => {
    const id = `note_${Date.now()}_${notificationIdRef.current++}`;
    setNotifications((n) => [...n, { id, message, type }]);
    setTimeout(() => {
      setNotifications((n) => n.filter((x) => x.id !== id));
    }, 4000);
  };

  const createHotspot = async (lat, lng, type = "manual") => {
    setLoading(true);
    try {
      const cacheKey = `${lat.toFixed(2)}_${lng.toFixed(2)}`;
      let weatherData;
      if (weatherCacheRef.current.has(cacheKey)) {
        weatherData = weatherCacheRef.current.get(cacheKey);
      } else {
        weatherData = simulateWeatherData(lat, lng);
        weatherCacheRef.current.set(cacheKey, weatherData);
      }

      const hotspot = {
        id: `hotspot_${Date.now()}`,
        latitude: lat,
        longitude: lng,
        timestamp: new Date().toISOString(),
        type,
        weatherData,
        reports: [],
        files: [],
      };

      setHotspots((h) => [hotspot, ...h]);
      addNotification(`🎯 Hotspot created at ${lat.toFixed(4)}, ${lng.toFixed(4)}` , "success");
      return hotspot;
    } catch (e) {
      console.error(e);
      addNotification("Failed to create hotspot", "error");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    let processed = 0;
    for (let i = 0; i < fileArray.length; i++) {
      const f = fileArray[i];
      try {
        const geo = await extractGeotagFromFile(f);
        const fileObj = {
          id: `file_${Date.now()}_${i}`,
          name: f.name,
          type: f.type,
          size: f.size,
          uploadTimestamp: new Date().toISOString(),
          geoData: geo,
          hasGeotag: geo.lat !== null && geo.lng !== null,
        };
        setUploadedFiles((s) => [fileObj, ...s]);
        if (fileObj.hasGeotag) {
          const hotspot = await createHotspot(fileObj.geoData.lat, fileObj.geoData.lng, "geotagged");
          hotspot.files.push(fileObj);
          setHotspots((prev) => prev.map((h) => (h.id === hotspot.id ? hotspot : h)));
        }
        processed++;
      } catch (e) {
        console.error("file err", e);
      }
    }
    addNotification(`📤 Processed ${processed} file(s)` , "success");
  };

  const extractGeotagFromFile = (file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve({ lat: null, lng: null, altitude: null, timestamp: null });
        return;
      }
      if (window.EXIF) {
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const img = new Image();
            img.onload = function () {
              window.EXIF.getData(img, function () {
                const lat = window.EXIF.getTag(this, "GPSLatitude");
                const latRef = window.EXIF.getTag(this, "GPSLatitudeRef");
                const lng = window.EXIF.getTag(this, "GPSLongitude");
                const lngRef = window.EXIF.getTag(this, "GPSLongitudeRef");
                const altitude = window.EXIF.getTag(this, "GPSAltitude");
                const timestamp = window.EXIF.getTag(this, "DateTime");
                if (lat && lng && latRef && lngRef) {
                  const latDecimal = convertDMSToDD(lat, latRef);
                  const lngDecimal = convertDMSToDD(lng, lngRef);
                  resolve({ lat: latDecimal, lng: lngDecimal, altitude: altitude || null, timestamp: timestamp || null });
                } else {
                  resolve({ lat: null, lng: null, altitude: null, timestamp: null });
                }
              });
            };
            img.src = URL.createObjectURL(file);
          } catch (e) {
            resolve({ lat: null, lng: null, altitude: null, timestamp: null });
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        resolve({ lat: null, lng: null, altitude: null, timestamp: null });
      }
    });
  };

  const exportHotspotsCSV = () => {
    if (hotspots.length === 0) {
      addNotification("No hotspots to export", "info");
      return;
    }
    const headers = [
      "ID",
      "Latitude",
      "Longitude",
      "Timestamp",
      "Type",
      "Windy_Layer",
      "Wind_Speed_ms",
      "Wind_Direction_deg",
      "Air_Temperature_C",
      "Sea_Temperature_C",
      "Humidity_%",
      "Pressure_hPa",
      "Wave_Height_m",
      "Tide_Speed_ms",
      "Current_Speed_ms",
      "Visibility_km",
      "Cloud_Cover_%",
      "Precipitation_mm",
      "Files_Count",
      "Reports_Count",
    ];
    const rows = hotspots.map((h) => [
      h.id,
      h.latitude.toFixed(6),
      h.longitude.toFixed(6),
      h.timestamp,
      h.type,
      currentLayer,
      h.weatherData.windSpeed,
      h.weatherData.windDirection,
      h.weatherData.temperature,
      h.weatherData.seaTemperature,
      h.weatherData.humidity,
      h.weatherData.pressure,
      h.weatherData.waveHeight,
      h.weatherData.tideSpeed,
      h.weatherData.currentSpeed,
      h.weatherData.visibility,
      h.weatherData.cloudCover,
      h.weatherData.precipitation,
      h.files.length,
      h.reports.length,
    ]);
    downloadCSV("windy_interactive_hotspots.csv", headers, rows);
    addNotification("📁 Downloaded hotspots CSV", "success");
  };

  const exportReportsCSV = () => {
    if (reports.length === 0) {
      addNotification("No reports to export", "info");
      return;
    }
    const headers = ["ID", "Timestamp", "Author", "Windy_Layer", "Content"];
    const rows = reports.map((r) => [r.id, r.timestamp, r.author, r.currentLayer || "unknown", `"${r.content.replace(/"/g, '""')}"`]);
    downloadCSV("windy_reports.csv", headers, rows);
    addNotification("📁 Downloaded reports CSV", "success");
  };

  const saveReport = (text) => {
    if (!text || !text.trim()) {
      addNotification("Please enter a report before saving", "error");
      return;
    }
    const r = {
      id: `report_${Date.now()}`,
      content: text.trim(),
      timestamp: new Date().toISOString(),
      author: "User",
      currentLayer,
    };
    setReports((p) => [r, ...p]);
    addNotification("📝 Report saved successfully", "success");
  };

  const clearAllData = () => {
    if (hotspots.length === 0 && reports.length === 0 && uploadedFiles.length === 0) {
      addNotification("No data to clear", "info");
      return;
    }
    if (window.confirm("🗑️ Are you sure you want to clear all data? This cannot be undone.")) {
      setHotspots([]);
      setReports([]);
      setUploadedFiles([]);
      weatherCacheRef.current.clear();
      addNotification("🧹 All data cleared successfully", "success");
    }
  };

  const focusOnHotspot = (hotspotId) => {
    const h = hotspots.find((x) => x.id === hotspotId);
    if (!h) return;
    setSelectedHotspot(h);
    addNotification(`🎯 Highlighted hotspot at ${h.latitude.toFixed(4)}, ${h.longitude.toFixed(4)}` , "info");
  };

  const closeModal = () => setSelectedHotspot(null);

  const switchLayer = (layer) => {
    setCurrentLayer(layer);
    addNotification(`🔄 Switched to ${layer}` , "info");
  };

  const stats = {
    hotspotCount: hotspots.length,
    weatherRecords: hotspots.length,
    fileCount: uploadedFiles.length,
    reportCount: reports.length,
  };
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    window.windySystem = {
      createHotspot,
      exportHotspotsCSV,
      exportReportsCSV,
      clearAllData,
      handleFiles,
      focusOnHotspot,
    };
  }, [hotspots, uploadedFiles, reports, currentLayer]);

  return (
    <div className="windy-interactive-root h-full">
      {/* Header with controls - simplified for layout integration */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Ocean Monitor - Interactive Map</h2>
        <div className="flex gap-2">
          <button onClick={exportHotspotsCSV} className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">Export CSV</button>
          <button onClick={exportReportsCSV} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Reports</button>
          <button onClick={clearAllData} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Clear</button>
        </div>
      </div>

      <div className="main flex flex-1">
        <Sidebar
          onLayerSwitch={switchLayer}
          currentLayer={currentLayer}
          onFileUpload={handleFiles}
          hotspots={hotspots}
          onHotspotClick={(h) => { setSelectedHotspot(h); }}
          onSaveReport={saveReport}
          stats={stats}
          lastUpdate={lastUpdate}
          onExportHotspots={exportHotspotsCSV}
          onExportReports={exportReportsCSV}
          onClear={clearAllData}
        />
        <main className="main-content flex-1">
          <MapArea
            bounds={DEFAULT_MAP_BOUNDS}
            hotspots={hotspots}
            createHotspot={createHotspot}
            selectedHotspotId={selectedHotspot?.id}
            currentLayer={currentLayer}
            loading={loading}
          />
        </main>
      </div>

      <HotspotModal hotspot={selectedHotspot} onClose={closeModal} onExport={(id) => {
        const h = hotspots.find(x => x.id === id);
        if (!h) return;
        const headers = [
          'ID','Latitude','Longitude','Timestamp','Type','Windy_Layer',
          'Wind_Speed_ms','Wind_Direction_deg','Air_Temperature_C','Sea_Temperature_C',
          'Humidity_%','Pressure_hPa','Wave_Height_m','Tide_Speed_ms','Current_Speed_ms',
          'Visibility_km','Cloud_Cover_%','Precipitation_mm'
        ];
        const row = [[
          h.id, h.latitude.toFixed(6), h.longitude.toFixed(6), h.timestamp,
          h.type, currentLayer,
          h.weatherData.windSpeed, h.weatherData.windDirection, h.weatherData.temperature,
          h.weatherData.seaTemperature, h.weatherData.humidity, h.weatherData.pressure,
          h.weatherData.waveHeight, h.weatherData.tideSpeed, h.weatherData.currentSpeed,
          h.weatherData.visibility, h.weatherData.cloudCover, h.weatherData.precipitation
        ]];
        downloadCSV(`windy_hotspot_${h.id}.csv` , headers, row);
        addNotification("📁 Hotspot CSV downloaded", "success");
      }} onFocus={(id) => focusOnHotspot(id)} />

      <Notifications notifications={notifications} />
    </div>
  );
};

export default WindyInteractive;
