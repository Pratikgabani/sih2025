import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Users, MapPin, CheckCircle, TrendingUp, MessageSquare, Calendar, Clock } from "lucide-react";

export default function GovOfficialDashboard() {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const stats = {
    reports24h: 47,
    hotspotAreas: 5,
    activeAlerts: 3,
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

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Live Hazard Map</h2>
        <div className="h-96 bg-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600">Interactive Map Component</p>
            <p className="text-sm text-gray-500">Showing crowdsourced reports and hotspots</p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Critical Reports</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Medium Reports</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Low Reports</span>
              </div>
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