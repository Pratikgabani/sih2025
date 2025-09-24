import React from "react";

const HotspotModal = ({ hotspot, onClose, onExport, onFocus }) => {
  if (!hotspot) return null;

  const w = hotspot.weatherData || {};

  return (
    <div id="hotspotModal" className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <i className="fas fa-map-marker-alt text-blue-600 mr-2" />
              Hotspot Details
            </h3>
            <button id="closeModal" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <i className="fas fa-times text-xl" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-600">Latitude</label>
                <p className="text-lg font-mono text-gray-800">{hotspot.latitude.toFixed(6)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Longitude</label>
                <p className="text-lg font-mono text-gray-800">{hotspot.longitude.toFixed(6)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Type</label>
                <p className="text-lg capitalize">{hotspot.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-sm text-gray-700">{new Date(hotspot.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Comprehensive Weather Data</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="data-card text-center"><div>Wind</div><div className="big">{w.windSpeed} m/s</div><div>{w.windDirection}°</div></div>
                <div className="data-card text-center"><div>Air Temp</div><div className="big">{w.temperature}°C</div></div>
                <div className="data-card text-center"><div>Sea Temp</div><div className="big">{w.seaTemperature}°C</div></div>
                <div className="data-card text-center"><div>Wave Height</div><div className="big">{w.waveHeight} m</div></div>
                <div className="data-card text-center"><div>Pressure</div><div className="big">{w.pressure} hPa</div></div>
                <div className="data-card text-center"><div>Humidity</div><div className="big">{w.humidity}%</div></div>
                <div className="data-card text-center"><div>Visibility</div><div className="big">{w.visibility} km</div></div>
                <div className="data-card text-center"><div>Current</div><div className="big">{w.currentSpeed} m/s</div></div>
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-4 border-t">
              <button onClick={() => onExport(hotspot.id)} className="btn btn-green">Export CSV</button>
              <button onClick={() => onFocus(hotspot.id)} className="btn btn-blue">Highlight Marker</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotModal;
