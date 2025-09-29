import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Users, MapPin, CheckCircle, TrendingUp, MessageSquare, Calendar, Clock, Layers } from "lucide-react";
import MapArea from "../Map/MapArea";
import "../Map/windy-interactive.css";

export default function GovOfficialDashboard() {
  const navigate = useNavigate();
  
  // Map state management
  const [hotspots, setHotspots] = useState([
    {
      id: 1,
      latitude: 19.0760,
      longitude: 72.8777,
      severity: 'critical',
      type: 'Tsunami Warning',
      description: 'High risk tsunami zone - immediate evacuation required',
      timestamp: new Date(),
      source: 'manual'
    },
    {
      id: 2,
      latitude: 11.0168,
      longitude: 76.9558,
      severity: 'high',
      type: 'Coastal Flooding',
      description: 'Severe coastal flooding expected due to high tides',
      timestamp: new Date(),
      source: 'manual'
    },
    {
      id: 3,
      latitude: 13.0827,
      longitude: 80.2707,
      severity: 'medium',
      type: 'High Waves',
      description: 'Wave heights exceeding 3 meters reported',
      timestamp: new Date(),
      source: 'manual'
    }
  ]);

  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [currentLayer, setCurrentLayer] = useState('wind');
  const [mapLoading, setMapLoading] = useState(false);

  // Map bounds for India's coastal areas
  const mapBounds = {
    north: 30.0,
    south: 6.0,
    west: 68.0,
    east: 98.0
  };

  // Function to create new hotspot
  const createHotspot = async (lat, lng, source = 'manual') => {
    setMapLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newHotspot = {
        id: Date.now(),
        latitude: lat,
        longitude: lng,
        severity: 'medium',
        type: 'New Hazard',
        description: 'Government official added hazard point',
        timestamp: new Date(),
        source: source
      };
      
      setHotspots(prev => [...prev, newHotspot]);
      setMapLoading(false);
    }, 1000);
  };

  // Available layers for the map
  const availableLayers = [
    { id: 'wind', name: 'Wind', icon: '💨' },
    { id: 'waves', name: 'Waves', icon: '🌊' },
    { id: 'temp', name: 'Temperature', icon: '🌡️' },
    { id: 'rain', name: 'Precipitation', icon: '🌧️' },
    { id: 'pressure', name: 'Pressure', icon: '📊' }
  ];
  
  // Mock data for demonstration
  const stats = {
    reports24h: 47,
    hotspotAreas: hotspots.length,
    activeAlerts: hotspots.filter(h => h.severity === 'critical' || h.severity === 'high').length,
    verifiedReports: 23
  };

  const recentReports = [
    { id: 1, type: "High Waves", location: "Mumbai Coast", time: "2 mins ago", status: "verified", severity: "high" },
    { id: 2, type: "Coastal Flooding", location: "Kerala Backwaters", time: "15 mins ago", status: "pending", severity: "medium" },
    { id: 3, type: "Tsunami Warning", location: "Tamil Nadu", time: "1 hour ago", status: "verified", severity: "critical" },
  ];

  const socialMediaTrends = [
    { keyword: "#TsunamiAlert", mentions: 1247, sentiment: "negative", trend: "up" },
    { keyword: "#CoastalFlooding", mentions: 892, sentiment: "neutral", trend: "up" },
    { keyword: "#HighWaves", mentions: 634, sentiment: "negative", trend: "down" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-gray-800">Government Official Dashboard</div>
          <div className="text-sm text-gray-600">Real-time ocean hazard monitoring and emergency response coordination</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reports (24h)</p>
              <p className="text-3xl font-bold text-blue-600">{stats.reports24h}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hotspot Areas</p>
              <p className="text-3xl font-bold text-orange-600">{stats.hotspotAreas}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-600">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>2 critical zones</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-red-600">{stats.activeAlerts}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>1 critical</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Reports</p>
              <p className="text-3xl font-bold text-green-600">{stats.verifiedReports}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>87% accuracy rate</span>
          </div>
        </div>
      </div>

      {/* Interactive Live Hazard Map */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Live Hazard Management Map</h2>
              <p className="text-sm text-gray-600">Click on the map to add hazard hotspots • {hotspots.length} active hotspots</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Layer Selection */}
              <select
                value={currentLayer}
                onChange={(e) => setCurrentLayer(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {availableLayers.map(layer => (
                  <option key={layer.id} value={layer.id}>
                    {layer.icon} {layer.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center text-sm text-gray-600">
                <Layers className="w-4 h-4 mr-1" />
                <span>Layers</span>
              </div>
            </div>
          </div>
          
          {/* Map Statistics */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {hotspots.filter(h => h.severity === 'critical').length}
              </div>
              <div className="text-xs text-red-600">Critical</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {hotspots.filter(h => h.severity === 'high').length}
              </div>
              <div className="text-xs text-orange-600">High</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {hotspots.filter(h => h.severity === 'medium').length}
              </div>
              <div className="text-xs text-yellow-600">Medium</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {hotspots.filter(h => h.severity === 'low').length}
              </div>
              <div className="text-xs text-green-600">Low</div>
            </div>
          </div>
        </div>
        
        {/* Integrated Map Component */}
        <div className="h-[500px] relative">
          <MapArea
            bounds={mapBounds}
            hotspots={hotspots}
            createHotspot={createHotspot}
            selectedHotspotId={selectedHotspotId}
            currentLayer={currentLayer}
            loading={mapLoading}
          />
        </div>
        
        {/* Map Controls and Legend */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Click to add hotspot</span> • 
                <span className="ml-1">Hover for coordinates</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical</span>
                <div className="w-3 h-3 bg-orange-500 rounded-full ml-3"></div>
                <span>High</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full ml-3"></div>
                <span>Medium</span>
                <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Media & Reports */}<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Social Media Indicators */}
  <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
    <div className="p-6 flex-1 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Social Media Indicators</h2>
      <div className="space-y-4 flex-1">
        {socialMediaTrends.map((trend, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-full ${
                  trend.sentiment === 'negative'
                    ? 'bg-red-100'
                    : trend.sentiment === 'positive'
                    ? 'bg-green-100'
                    : 'bg-yellow-100'
                }`}
              >
                <MessageSquare
                  className={`w-4 h-4 ${
                    trend.sentiment === 'negative'
                      ? 'text-red-600'
                      : trend.sentiment === 'positive'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">{trend.keyword}</p>
                <p className="text-sm text-gray-600">{trend.mentions} mentions</p>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`flex items-center ${
                  trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <TrendingUp
                  className={`w-4 h-4 mr-1 ${
                    trend.trend === 'down' ? 'transform rotate-180' : ''
                  }`}
                />
                <span className="text-sm font-medium">
                  {trend.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  trend.sentiment === 'negative'
                    ? 'bg-red-100 text-red-600'
                    : trend.sentiment === 'positive'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {trend.sentiment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Crowdsourced Reports */}
  <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
    <div className="p-6 flex-1 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Crowdsourced Reports</h2>
      <div className="space-y-4 flex-1">
        {recentReports.map((report) => (
          <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.severity === 'critical'
                        ? 'bg-red-100 text-red-600'
                        : report.severity === 'high'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {report.type}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.status === 'verified'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="font-medium text-gray-800">{report.location}</p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {report.time}
                </p>
              </div>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/govofficial/reports')}
        className="w-full mt-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        View All Reports
      </button>
    </div>
  </div>
</div>

    </div>
  );
}