import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MessageSquare,
  TrendingUp,
  Eye,
  MoreVertical
} from "lucide-react";

export default function CentralHub({ onIncidentSelect, selectedIncident }) {
  const [mapLayers, setMapLayers] = useState({
    hotspots: true,
    verification: true,
    officialData: true,
    socialSentiment: false
  });
  
  const [filterSettings, setFilterSettings] = useState({
    urgency: 'all',
    status: 'all',
    timeRange: '24h'
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Sample incident data
  const incidents = [
    {
      id: 1,
      type: 'Tsunami',
      location: 'Chennai Coast',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      urgency: 'critical',
      status: 'pending',
      reports: 156,
      verified: 45,
      sentiment: 'negative',
      timestamp: '2025-09-29T10:30:00Z',
      description: 'Multiple reports of unusual wave activity'
    },
    {
      id: 2,
      type: 'High Waves',
      location: 'Mumbai Coast',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      urgency: 'high',
      status: 'verified',
      reports: 89,
      verified: 67,
      sentiment: 'concerned',
      timestamp: '2025-09-29T08:15:00Z',
      description: 'Storm surge causing coastal flooding'
    },
    {
      id: 3,
      type: 'Coastal Flooding',
      location: 'Kochi Port',
      coordinates: { lat: 9.9312, lng: 76.2673 },
      urgency: 'medium',
      status: 'monitoring',
      reports: 34,
      verified: 12,
      sentiment: 'neutral',
      timestamp: '2025-09-29T09:45:00Z',
      description: 'Local flooding reports near port area'
    }
  ];

  const getUrgencyColor = (urgency) => {
    const colors = {
      critical: 'bg-red-600',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[urgency] || colors.medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      verified: CheckCircle,
      pending: Clock,
      monitoring: Eye
    };
    return icons[status] || Clock;
  };

  const getStatusColor = (status) => {
    const colors = {
      verified: 'text-green-600',
      pending: 'text-yellow-600',
      monitoring: 'text-blue-600'
    };
    return colors[status] || colors.pending;
  };

  const toggleLayer = (layer) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filterSettings.urgency !== 'all' && incident.urgency !== filterSettings.urgency) return false;
    if (filterSettings.status !== 'all' && incident.status !== filterSettings.status) return false;
    if (searchTerm && !incident.location.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !incident.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Map Controls Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Central Hub - Interactive Map</h2>
          <div className="flex items-center space-x-2">
            {/* Layer Controls */}
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Layers:</span>
              {Object.entries(mapLayers).map(([layer, enabled]) => (
                <button
                  key={layer}
                  onClick={() => toggleLayer(layer)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    enabled 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {layer.charAt(0).toUpperCase() + layer.slice(1).replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterSettings.urgency}
            onChange={(e) => setFilterSettings(prev => ({ ...prev, urgency: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Urgency</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterSettings.status}
            onChange={(e) => setFilterSettings(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="monitoring">Monitoring</option>
          </select>
        </div>
      </div>

      {/* Map Visualization Area */}
      <div className="flex-1 relative bg-gray-100">
        {/* Placeholder for actual map */}
        <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-600 font-medium">Interactive Map View</p>
            <p className="text-sm text-blue-500">Integration with mapping service required</p>
          </div>
        </div>

        {/* Incident Markers Overlay */}
        <div className="absolute top-8 left-8 space-y-2 max-h-[calc(100%-4rem)] overflow-y-auto">
          {filteredIncidents.map((incident) => {
            const StatusIcon = getStatusIcon(incident.status);
            return (
              <div
                key={incident.id}
                onClick={() => onIncidentSelect(incident)}
                className={`bg-white rounded-lg shadow-lg border-l-4 p-3 cursor-pointer transition-all hover:shadow-xl max-w-xs ${
                  selectedIncident?.id === incident.id ? 'ring-2 ring-blue-500' : ''
                } border-l-${incident.urgency === 'critical' ? 'red' : incident.urgency === 'high' ? 'orange' : incident.urgency === 'medium' ? 'yellow' : 'green'}-500`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`w-3 h-3 rounded-full ${getUrgencyColor(incident.urgency)}`}></span>
                      <span className="text-sm font-medium text-gray-900">{incident.type}</span>
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(incident.status)}`} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{incident.location}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {incident.reports}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {incident.verified}
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {incident.sentiment}
                      </span>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <span>Critical Urgency</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span>High Urgency</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>Medium Urgency</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-yellow-600" />
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}