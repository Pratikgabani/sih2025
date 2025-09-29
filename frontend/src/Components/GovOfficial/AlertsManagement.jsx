import React, { useState, useEffect } from "react";
import { AlertTriangle, Plus, Edit, Trash2, Clock, MapPin, Bell, Volume2, Smartphone, Timer, Target, X } from "lucide-react";

export default function AlertsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    severity: '',
    location: '',
    radius: '',
    message: '',
    expiryTime: ''
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      alertType: "Tsunami Warning",
      severity: "Critical",
      title: "Tsunami Alert - West Coast",
      message: "Tsunami waves expected to reach west coast within 2 hours. Immediate evacuation required for coastal areas.",
      location: "Maharashtra & Gujarat Coast",
      radius: "50",
      status: "Active",
      createdAt: "2025-09-29 10:30:00",
      expiresAt: "2025-09-30 18:30:00",
      channels: ["SMS", "Email", "App Push", "Radio"],
      sentTo: 25000,
      acknowledged: 18500
    },
    {
      id: 2,
      alertType: "High Wave Warning",
      severity: "High",
      title: "High Wave Alert - South Coast",
      message: "Unusually high waves (3-4m) expected along south coast. Avoid coastal areas and fishing activities.",
      location: "Tamil Nadu & Kerala Coast",
      radius: "30",
      status: "Active",
      createdAt: "2025-09-29 08:15:00",
      expiresAt: "2025-09-29 23:59:00",
      channels: ["SMS", "App Push"],
      sentTo: 12000,
      acknowledged: 9800
    },
    {
      id: 3,
      alertType: "Storm Surge Advisory",
      severity: "Medium",
      title: "Storm Surge Advisory - East Coast",
      message: "Moderate storm surge expected due to weather conditions. Monitor local conditions closely.",
      location: "Andhra Pradesh Coast",
      radius: "25",
      status: "Expired",
      createdAt: "2025-09-28 20:00:00",
      expiresAt: "2025-09-29 08:00:00",
      channels: ["Email", "App Push"],
      sentTo: 8000,
      acknowledged: 6400
    },
    {
      id: 4,
      alertType: "Coastal Flooding Alert",
      severity: "High",
      title: "Coastal Flooding Alert - Avoid Low-lying Areas",
      message: "Rising sea levels combined with high tide causing flooding in coastal low-lying areas. Residents advised to move to higher ground immediately.",
      location: "West Bengal Sundarbans",
      radius: "40",
      status: "Active",
      createdAt: "2025-09-29 12:45:00",
      expiresAt: "2025-09-30 06:00:00",
      channels: ["SMS", "Radio", "App Push"],
      sentTo: 15000,
      acknowledged: 11200
    },
    {
      id: 5,
      alertType: "Rip Current Warning",
      severity: "Medium",
      title: "Rip Current Warning - Beach Access Restricted",
      message: "Strong rip currents detected along popular beach areas. Swimming and water activities prohibited until further notice.",
      location: "Karnataka Mangalore Coast",
      radius: "15",
      status: "Active",
      createdAt: "2025-09-29 14:20:00",
      expiresAt: "2025-09-29 20:30:00",
      channels: ["App Push", "Social Media"],
      sentTo: 6500,
      acknowledged: 4800
    },
    {
      id: 6,
      alertType: "Marine Emergency",
      severity: "Critical",
      title: "Marine Emergency - All Vessels Return to Port",
      message: "Severe weather conditions with cyclonic activity approaching. All fishing vessels and boats must return to nearest port immediately.",
      location: "Odisha Paradip Coast",
      radius: "80",
      status: "Expired",
      createdAt: "2025-09-27 16:00:00",
      expiresAt: "2025-09-28 12:00:00",
      channels: ["Radio", "SMS", "Coast Guard"],
      sentTo: 22000,
      acknowledged: 20500
    }
  ]);

  // Auto-expiry logic - check and update expired alerts
  useEffect(() => {
    const checkExpiredAlerts = () => {
      const now = new Date();
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => {
          if (alert.status === 'Active' && new Date(alert.expiresAt) <= now) {
            return { ...alert, status: 'Expired' };
          }
          return alert;
        })
      );
    };

    // Check immediately and then every minute
    checkExpiredAlerts();
    const interval = setInterval(checkExpiredAlerts, 60000);

    return () => clearInterval(interval);
  }, []);

  // Filter alerts based on status, severity, and search term
  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = filterStatus === 'all' || alert.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSeverity = filterSeverity === 'all' || alert.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAlert) {
      // Update existing alert
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === editingAlert.id 
            ? {
                ...alert,
                ...formData,
                expiresAt: formData.expiryTime.replace('T', ' ')
              }
            : alert
        )
      );
    } else {
      // Create new alert
      const newAlert = {
        id: alerts.length + 1,
        ...formData,
        status: "Active",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        expiresAt: formData.expiryTime.replace('T', ' ')
      };
      setAlerts([newAlert, ...alerts]);
    }
    setFormData({
      title: '',
      severity: '',
      location: '',
      radius: '',
      message: '',
      expiryTime: ''
    });
    setShowForm(false);
    setEditingAlert(null);
  };

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setFormData({
      title: alert.title,
      severity: alert.severity,
      location: alert.location,
      radius: alert.radius,
      message: alert.message,
      expiryTime: alert.expiresAt.replace(' ', 'T')
    });
    setShowForm(true);
  };

  const handleDelete = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    setShowDeleteConfirm(null);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingAlert(null);
    setFormData({
      title: '',
      severity: '',
      location: '',
      radius: '',
      message: '',
      expiryTime: ''
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getSeverityBadgeColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-600 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'expired': return 'bg-gray-100 text-gray-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 text-yellow-800 px-1 rounded">{part}</span> : 
        part
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-gray-800">Alert Management</div>
          <div className="text-sm text-gray-600">Create and manage emergency alerts for ocean hazards</div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Create Alert
        </button>
      </div>

      {/* Alert Creation Modal */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAlert ? 'Edit Alert' : 'Create New Alert'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alert Title *
                    </label>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select alert title</option>
                      <option value="Tsunami Warning - Immediate Evacuation Required">Tsunami Warning - Immediate Evacuation Required</option>
                      <option value="High Wave Alert - Coastal Areas at Risk">High Wave Alert - Coastal Areas at Risk</option>
                      <option value="Storm Surge Advisory - Monitor Conditions">Storm Surge Advisory - Monitor Conditions</option>
                      <option value="Coastal Flooding Alert - Avoid Low-lying Areas">Coastal Flooding Alert - Avoid Low-lying Areas</option>
                      <option value="Abnormal Tide Warning - Exercise Caution">Abnormal Tide Warning - Exercise Caution</option>
                      <option value="Severe Weather Alert - Ocean Activities Suspended">Severe Weather Alert - Ocean Activities Suspended</option>
                      <option value="Marine Emergency - All Vessels Return to Port">Marine Emergency - All Vessels Return to Port</option>
                      <option value="Rip Current Warning - Beach Access Restricted">Rip Current Warning - Beach Access Restricted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Severity Level *
                    </label>
                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select severity</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Affected area/region"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alert Radius (km) *
                    </label>
                    <input
                      type="number"
                      name="radius"
                      value={formData.radius}
                      onChange={handleInputChange}
                      placeholder="Alert coverage radius"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alert Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Detailed alert message with specific instructions..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-sm"
                  >
                    {editingAlert ? 'Update Alert' : 'Send Alert'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Management */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">
            All Alerts ({filteredAlerts.length})
          </h2>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alerts..."
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            />
          </div>
        </div>
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {highlightText(alert.title, searchTerm)}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {highlightText(alert.message, searchTerm)}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{highlightText(alert.location, searchTerm)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={16} className="text-gray-400 flex-shrink-0" />
                      <span>{alert.radius} km radius</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Created {new Date(alert.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Expires {new Date(alert.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                  {alert.status === 'Active' && (
                    <button 
                      onClick={() => handleEdit(alert)}
                      className="p-2.5 text-orange-600 bg-orange-50 hover:text-orange-700 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                      title="Edit Alert"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => setShowDeleteConfirm(alert.id)}
                    className="p-2.5 text-red-600 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Delete Alert"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              {searchTerm || filterStatus !== 'all' || filterSeverity !== 'all' 
                ? 'Try adjusting your filters or search terms to find the alerts you\'re looking for.'
                : 'No alerts have been created yet. Create your first alert to get started.'
              }
            </p>
            {(!searchTerm && filterStatus === 'all' && filterSeverity === 'all') && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                <Plus size={16} className="mr-2" />
                Create First Alert
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-gray-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-50 rounded-full p-2 mr-4">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Alert</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Are you sure you want to delete this alert? This action cannot be undone and the alert will be permanently removed.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Delete Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}