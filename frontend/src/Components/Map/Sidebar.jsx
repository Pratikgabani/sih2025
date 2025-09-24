import React, { useRef, useState } from "react";

const LayerButton = ({ layer, label, active, onClick }) => (
  <button className={`layer-btn ${active ? "active" : ""}`} data-layer={layer} onClick={() => onClick(layer)}>
    <span>{label}</span>
  </button>
);

const Sidebar = ({
  onLayerSwitch,
  currentLayer,
  onFileUpload,
  hotspots,
  onHotspotClick,
  onSaveReport,
  stats,
  lastUpdate,
  onExportHotspots,
  onExportReports,
  onClear,
}) => {
  const fileRef = useRef();
  const [reportText, setReportText] = useState("");

  const handleFileChange = (e) => {
    const files = e.target.files;
    onFileUpload(files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onFileUpload(e.dataTransfer.files);
    e.target.classList.remove("dragover");
  };

  return (
    <aside id="sidebar" className="side-panel">
      <div className="sidebar-inner p-4">
        <div className="panel">
          <h3>Windy Weather Layers</h3>
          <div className="layer-grid">
            <LayerButton layer="wind" label="Wind" active={currentLayer === "wind"} onClick={onLayerSwitch} />
            <LayerButton layer="pressure" label="Pressure" active={currentLayer === "pressure"} onClick={onLayerSwitch} />
            <LayerButton layer="temp" label="Temperature" active={currentLayer === "temp"} onClick={onLayerSwitch} />
            <LayerButton layer="rain" label="Rain" active={currentLayer === "rain"} onClick={onLayerSwitch} />
            <LayerButton layer="waves" label="Waves" active={currentLayer === "waves"} onClick={onLayerSwitch} />
            <LayerButton layer="currents" label="Currents" active={currentLayer === "currents"} onClick={onLayerSwitch} />
            <LayerButton layer="tide" label="Tide" active={currentLayer === "tide"} onClick={onLayerSwitch} />
            <LayerButton layer="sst" label="Sea Temp" active={currentLayer === "sst"} onClick={onLayerSwitch} />
          </div>
        </div>

        <div className="panel click-instruction">
          <p>Click anywhere on Windy map to create hotspots</p>
        </div>

        <div className="panel stats-panel">
          <div className="text-base font-semibold mb-2">Live Statistics</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-sm text-gray-600">Active Hotspots</span>
              <div className="stat-value">{stats.hotspotCount}</div>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Weather Records</span>
              <div className="stat-value">{stats.weatherRecords}</div>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Uploaded Files</span>
              <div className="stat-value">{stats.fileCount}</div>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Reports</span>
              <div className="stat-value">{stats.reportCount}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Last Update: {lastUpdate}</div>
        </div>

        <div className="panel">
          <h4>Media Upload</h4>
          <div
            id="uploadZone"
            className="upload-zone"
            onClick={() => fileRef.current && fileRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragEnter={(e) => e.preventDefault()}
          >
            <p>Drag & drop files here or click to browse</p>
            <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
          </div>
        </div>

        <div className="panel">
          <h4>Hotspots</h4>
          <div className="hotspot-list max-h-48 overflow-y-auto">
            {hotspots.length === 0 && <p className="empty">Click on Windy map to create hotspots</p>}
            {hotspots.map((h) => (
              <div key={h.id} className="hotspot-item" onClick={() => onHotspotClick(h)}>
                <div>
                  <div className="coords">{h.latitude.toFixed(4)}, {h.longitude.toFixed(4)}</div>
                  <div className="meta">{new Date(h.timestamp).toLocaleString()}</div>
                  <div className="mini-stats">
                    <span>🌬️ {h.weatherData.windSpeed}m/s</span>
                    <span>🌊 {h.weatherData.waveHeight}m</span>
                    <span>🌡️ {h.weatherData.temperature}°C</span>
                  </div>
                </div>
                <div className="tag">{h.type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h4>Incident Report</h4>
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            rows={3}
            placeholder="Describe weather conditions..."
            maxLength={500}
          />
          <div className="panel-actions">
            <small>{reportText.length}/500</small>
            <div>
              <button className="btn btn-orange" onClick={() => { onSaveReport(reportText); setReportText(""); }}>
                Save Report
              </button>
            </div>
          </div>
        </div>

        <div className="panel actions-row">
          <button onClick={onExportHotspots} className="btn btn-green">Export Hotspots</button>
          <button onClick={onExportReports} className="btn btn-blue">Export Reports</button>
          <button onClick={onClear} className="btn btn-red">Clear</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
