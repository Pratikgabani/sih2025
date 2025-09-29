import React, { useState } from "react";
import { User, MapPin, Camera, Clock, CheckCircle, XCircle, AlertTriangle, Filter, Search, Eye, MessageSquare } from "lucide-react";

export default function ReportManagement() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      user: "Rajesh Kumar",
      userType: "Citizen",
      phone: "+91-9876543210",
      email: "rajesh.kumar@email.com",
      location: "Mumbai Marine Drive",
      coordinates: "19.0176, 72.8562",
      hazardType: "High Waves",
      severity: "High",
      description: "Unusually high waves hitting the seawall, water splashing onto the road. Many people gathered to watch.",
      timestamp: "2024-03-15 16:45:00",
      verificationStatus: "verified",
      verifiedBy: "Dr. Marine Singh",
      hasMedia: true,
      mediaCount: 3,
      reportAccuracy: "High",
      publicVisibility: true
    },
    {
      id: 2,
      user: "Priya Sharma",
      userType: "Citizen",
      phone: "+91-8765432109",
      email: "priya.sharma@email.com",
      location: "Goa Baga Beach",
      coordinates: "15.5557, 73.7518",
      hazardType: "Abnormal Tide",
      severity: "Medium",
      description: "Water level seems much higher than usual for this time of day. Local vendors also mentioned unusual tidal behavior.",
      timestamp: "2024-03-15 14:20:00",
      verificationStatus: "pending",
      verifiedBy: null,
      hasMedia: true,
      mediaCount: 2,
      reportAccuracy: null,
      publicVisibility: false
    },
    {
      id: 3,
      user: "Captain Ahmed Khan",
      userType: "Citizen",
      phone: "+91-7654321098",
      email: "ahmed.khan@fishermen.org",
      location: "Kerala Kochi Coast",
      coordinates: "9.9312, 76.2673",
      hazardType: "Storm Surge",
      severity: "Critical",
      description: "Strong surge pushing boats inland. Wind speed increasing rapidly. Immediate evacuation recommended for coastal areas.",
      timestamp: "2024-03-15 12:10:00",
      verificationStatus: "verified",
      verifiedBy: "Coastal Authority Team",
      hasMedia: true,
      mediaCount: 5,
      reportAccuracy: "Very High",
      publicVisibility: true
    },
    {
      id: 4,
      user: "Anonymous Reporter",
      userType: "Citizen",
      phone: "Hidden",
      email: "anonymous@secure.com",
      location: "West Bengal Digha Beach",
      coordinates: "21.6273, 87.5089",
      hazardType: "Coastal Erosion",
      severity: "Low",
      description: "Noticed sand erosion pattern different from last month. Seems to be progressing faster.",
      timestamp: "2024-03-15 10:30:00",
      verificationStatus: "rejected",
      verifiedBy: "Environmental Team",
      hasMedia: false,
      mediaCount: 0,
      reportAccuracy: "Low",
      publicVisibility: false
    },
    {
      id: 5,
      user: "Dr. Sunita Rao",
      userType: "Govt Official",
      phone: "+91-6543210987",
      email: "sunita.rao@marine.research.in",
      location: "Andhra Pradesh Visakhapatnam",
      coordinates: "17.6868, 83.2185",
      hazardType: "Temperature Anomaly",
      severity: "Medium",
      description: "Sea surface temperature readings 3°C above normal for this season. Potential impact on marine ecosystem observed.",
      timestamp: "2024-03-15 08:15:00",
      verificationStatus: "pending",
      verifiedBy: null,
      hasMedia: true,
      mediaCount: 1,
      reportAccuracy: null,
      publicVisibility: false
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesFilter = selectedFilter === "all" || report.verificationStatus === selectedFilter;
    const matchesSearch = report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.hazardType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-600 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleVerification = (reportId, status) => {
    // In a real app, this would make an API call
    console.log(`Report ${reportId} ${status}`);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-gray-800">Report Management</div>
          <div className="text-sm text-gray-600">Monitor and verify citizen-submitted hazard reports</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Total Reports</div>
          <div className="text-2xl font-bold text-red-600">{reports.length}</div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Reports</p>
              <p className="text-2xl font-bold text-green-600">
                {reports.filter(r => r.verificationStatus === 'verified').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {reports.filter(r => r.verificationStatus === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Reports</p>
              <p className="text-2xl font-bold text-red-600">
                {reports.filter(r => r.severity === 'Critical').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-blue-600">
                {reports.length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Smart Filters */}
      <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Smart Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Report Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search Reports</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by reporter, location, or hazard type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {/* Optional: Add refresh/apply functionality */}}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-red-700 leading-relaxed">
            <span className="font-medium">💡 Smart Filtering:</span> Filters automatically sync with report statistics and help you quickly identify critical reports that need immediate attention.
          </p>
        </div> */}
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Hazard Reports</h2>
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="border-l-4 border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(report.verificationStatus)}`}>
                      {report.verificationStatus}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                    <span className="text-sm text-gray-600">{report.hazardType}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <User className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{report.user}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">{report.userType}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{report.location}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{new Date(report.timestamp).toLocaleString()}</span>
                      </div>
                      {report.hasMedia && (
                        <div className="flex items-center text-gray-600">
                          <Camera className="w-4 h-4 mr-2" />
                          <span className="text-sm">{report.mediaCount} media files</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{report.description}</p>
                  
                  {report.verificationStatus === 'verified' && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Verified by:</strong> {report.verifiedBy}
                      </p>
                    </div>
                  )}
                  
                  {report.verificationStatus === 'rejected' && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Rejected by:</strong> {report.verifiedBy}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {report.verificationStatus === 'pending' && (
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Reporter Information</h3>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {selectedReport.user}</p>
                      <p><strong>Type:</strong> {selectedReport.userType}</p>
                      <p><strong>Phone:</strong> {selectedReport.phone}</p>
                      <p><strong>Email:</strong> {selectedReport.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Report Details</h3>
                    <div className="space-y-2">
                      <p><strong>Hazard Type:</strong> {selectedReport.hazardType}</p>
                      <p><strong>Severity:</strong> {selectedReport.severity}</p>
                      <p><strong>Time:</strong> {new Date(selectedReport.timestamp).toLocaleString()}</p>
                      <p><strong>Location:</strong> {selectedReport.location}</p>
                      <p><strong>Coordinates:</strong> {selectedReport.coordinates}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedReport.description}</p>
                  </div>
                  
                  {selectedReport.hasMedia && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Media Files ({selectedReport.mediaCount})</h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">Media files would be displayed here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedReport.verificationStatus === 'pending' && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Verification Actions</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleVerification(selectedReport.id, 'verified')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Verify Report
                    </button>
                    <button
                      onClick={() => handleVerification(selectedReport.id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}