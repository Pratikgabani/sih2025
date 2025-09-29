import React, { useState } from "react";
import { BarChart, LineChart, PieChart, DonutChart } from "./Charts";
import { 
  TrendingUp, 
  MapPin, 
  AlertTriangle, 
  Activity,
  BarChart3,
  Clock,
  Target,
  Users,
  Calendar
} from "lucide-react";

export default function IncidentAnalytics() {
  const [timeRange, setTimeRange] = useState('24h');
  const [viewType, setViewType] = useState('trends');

  // Incident type distribution
  const incidentTypes = [
    { label: 'Tsunami Alerts', value: 45, color: '#DC2626' },
    { label: 'High Waves', value: 134, color: '#EA580C' },
    { label: 'Coastal Flooding', value: 89, color: '#D97706' },
    { label: 'Storm Surge', value: 67, color: '#0284C7' },
    { label: 'Seismic Activity', value: 23, color: '#7C3AED' }
  ];

  // Hourly incident trends
  const hourlyTrends = [
    { label: '00:00', value: 12 },
    { label: '03:00', value: 8 },
    { label: '06:00', value: 23 },
    { label: '09:00', value: 67 },
    { label: '12:00', value: 156 },
    { label: '15:00', value: 134 },
    { label: '18:00', value: 89 },
    { label: '21:00', value: 45 }
  ];

  // Severity distribution
  const severityLevels = [
    { label: 'Critical', value: 23, color: '#7F1D1D' },
    { label: 'High', value: 67, color: '#DC2626' },
    { label: 'Medium', value: 156, color: '#F59E0B' },
    { label: 'Low', value: 89, color: '#10B981' },
    { label: 'Info', value: 34, color: '#3B82F6' }
  ];

  // Response time analysis
  const responseMetrics = [
    { label: 'Detection', value: 2.3 },
    { label: 'Verification', value: 4.7 },
    { label: 'Classification', value: 1.8 },
    { label: 'Alert Dispatch', value: 3.2 },
    { label: 'Team Deployment', value: 12.5 }
  ];

  const totalIncidents = incidentTypes.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive incident trends and geographical analysis</p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
          >
            <option value="trends">Trend Analysis</option>
            <option value="geographic">Geographic View</option>
            <option value="severity">Severity Analysis</option>
            <option value="performance">Performance Metrics</option>
          </select>
        </div>
        </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{totalIncidents}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+12%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">23</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
            <span className="text-red-600">+5</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Affected Regions</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-gray-600">Coastal states</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">4.7m</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600">-1.2m faster</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+3%</span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Incident Type Distribution */}
        <PieChart
          data={incidentTypes}
          title="Incident Type Distribution"
          colors={incidentTypes.map(item => item.color)}
          size="w-64 h-64"
        />

        {/* Severity Breakdown */}
        <DonutChart
          data={severityLevels}
          title="Incident Severity Levels"
          centerText={`${totalIncidents} Total`}
          colors={severityLevels.map(item => item.color)}
        />
      </div>

      {/* Trend and Response Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Hourly Trends */}
        <LineChart
          data={hourlyTrends}
          title="Incident Volume - Last 24 Hours"
          xLabel="Time of Day"
          yLabel="Number of Incidents"
          color="#DC2626"
        />

        {/* Response Time Metrics */}
        <BarChart
          data={responseMetrics}
          title="Average Response Time (Minutes)"
          xLabel="Response Time (Minutes)"
          yLabel="Process Stage"
          color="#0284C7"
        />
      </div>

      {/* Detailed Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hot Zones */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 text-red-600 mr-2" />
            Current Hot Zones
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-900">Chennai Coast</span>
                <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">Critical</span>
              </div>
              <p className="text-xs text-red-700 mt-1">156 incidents in last 6 hours</p>
              <p className="text-xs text-red-600 mt-1">Tsunami + High Waves</p>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-900">Mumbai Port</span>
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">High</span>
              </div>
              <p className="text-xs text-orange-700 mt-1">89 incidents reported</p>
              <p className="text-xs text-orange-600 mt-1">Storm Surge + Flooding</p>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-900">Kochi Waters</span>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Medium</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">45 incidents ongoing</p>
              <p className="text-xs text-yellow-600 mt-1">Coastal Flooding</p>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Detection Speed</p>
              <p className="text-xs text-green-700 mt-1">87% of incidents detected within 2 minutes</p>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Verification Accuracy</p>
              <p className="text-xs text-blue-700 mt-1">92% accuracy rate in initial classification</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">False Positive Rate</p>
              <p className="text-xs text-purple-700 mt-1">Only 8% false alarms this period</p>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
            Predictive Analysis
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Next 6 Hours Forecast</p>
              <p className="text-xs text-blue-700 mt-1">Expected 45-67 new incidents</p>
              <p className="text-xs text-blue-600 mt-1">Primary: Chennai & Mumbai regions</p>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-900">Weather Correlation</p>
              <p className="text-xs text-orange-700 mt-1">Storm system moving north along coast</p>
              <p className="text-xs text-orange-600 mt-1">Peak impact: 6-8 PM today</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Resource Planning</p>
              <p className="text-xs text-green-700 mt-1">Deploy 3 additional teams to Chennai</p>
              <p className="text-xs text-green-600 mt-1">Alert Mumbai standby units</p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Historical Pattern</p>
              <p className="text-xs text-gray-700 mt-1">Similar pattern to Cyclone Vardah 2016</p>
              <p className="text-xs text-gray-600 mt-1">Expected duration: 12-18 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}