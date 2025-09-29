
import React, { useState } from "react";
import { Users, MapPin, Clock, Phone, Mail, Plus, Edit, Trash2, AlertTriangle, X } from "lucide-react";

export default function TeamManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    hazardType: '',
    location: '',
    severity: '',
    teamSize: '',
    specialization: '',
    equipment: '',
    urgency: '',
    description: ''
  });

  const [teams, setTeams] = useState([
    {
      id: 1,
      hazardType: "Tsunami",
      location: "Chennai Coast",
      teamSize: 15,
      specialization: "Water Rescue",
      status: "Deployed",
      deployedAt: "2 hours ago",
      contact: "+91-9876543210"
    },
    {
      id: 2,
      hazardType: "Coastal Flooding",
      location: "Kerala Backwaters",
      teamSize: 8,
      specialization: "Evacuation",
      status: "Ready",
      deployedAt: "Standby",
      contact: "+91-9876543211"
    }
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      id: teams.length + 1,
      ...formData,
      status: "Requested",
      deployedAt: "Just requested",
      contact: "+91-9876543212"
    };
    setTeams([...teams, newTeam]);
    setFormData({
      hazardType: '',
      location: '',
      severity: '',
      teamSize: '',
      specialization: '',
      equipment: '',
      urgency: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleEdit = (team) => {
    setEditingTeam(team.id);
    setFormData({
      hazardType: team.hazardType,
      location: team.location,
      severity: team.severity || '',
      teamSize: team.teamSize.toString(),
      specialization: team.specialization,
      equipment: team.equipment || '',
      urgency: team.urgency || '',
      description: team.description || ''
    });
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTeams = teams.map(team => 
      team.id === editingTeam 
        ? { ...team, ...formData, teamSize: parseInt(formData.teamSize) }
        : team
    );
    setTeams(updatedTeams);
    setFormData({
      hazardType: '',
      location: '',
      severity: '',
      teamSize: '',
      specialization: '',
      equipment: '',
      urgency: '',
      description: ''
    });
    setEditingTeam(null);
    setShowForm(false);
  };

  const handleDelete = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
    setShowDeleteConfirm(null);
  };

  const handleCancel = () => {
    setFormData({
      hazardType: '',
      location: '',
      severity: '',
      teamSize: '',
      specialization: '',
      equipment: '',
      urgency: '',
      description: ''
    });
    setEditingTeam(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-gray-800">Team Management</div>
          <div className="text-sm text-gray-600">Coordinate rescue teams and emergency response units</div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Request Team
        </button>
      </div>

      {/* Team Request Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-lg flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 ring-1 ring-black/5">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingTeam ? 'Edit Emergency Response Team' : 'Request Emergency Response Team'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              
              <form onSubmit={editingTeam ? handleUpdate : handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hazard Type *
              </label>
              <select
                name="hazardType"
                value={formData.hazardType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select hazard type</option>
                <option value="Tsunami">Tsunami</option>
                <option value="High Waves">High Waves</option>
                <option value="Coastal Flooding">Coastal Flooding</option>
                <option value="Storm Surge">Storm Surge</option>
                <option value="Coastal Erosion">Coastal Erosion</option>
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
                placeholder="Enter specific location"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity Level *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Size Required *
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                placeholder="Number of personnel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization Required *
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select specialization</option>
                <option value="Water Rescue">Water Rescue</option>
                <option value="Medical Response">Medical Response</option>
                <option value="Evacuation">Evacuation</option>
                <option value="Search & Rescue">Search & Rescue</option>
                <option value="Engineering Support">Engineering Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Needed
              </label>
              <input
                type="text"
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                placeholder="Boats, medical supplies, etc."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level *
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select urgency</option>
                <option value="Immediate">Immediate (0-30 min)</option>
                <option value="High">High (30 min - 2 hours)</option>
                <option value="Medium">Medium (2-6 hours)</option>
                <option value="Low">Low (6+ hours)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Situation Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe the current situation and specific requirements..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {editingTeam ? 'Update Team' : 'Submit Request'}
                  </button>
                </div>
          </form>
            </div>
          </div>
        </div>
      )}

      {/* Active Teams */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Active Teams & Requests</h2>
          <div className="grid grid-cols-1 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      team.status === 'Deployed' ? 'bg-green-100 text-green-600' :
                      team.status === 'Ready' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {team.status}
                    </span>
                    <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-600 rounded-full">
                      {team.hazardType}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{team.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{team.teamSize} personnel</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{team.deployedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 text-gray-600">
                    <span className="text-sm font-medium mr-2">Specialization:</span>
                    <span className="text-sm">{team.specialization}</span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{team.contact}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleEdit(team)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(team.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Team"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Coast Guard</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">1554</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">emergency@coastguard.gov.in</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Disaster Management</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">1077</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">ndma@nic.in</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Medical Emergency</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">108</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">emergency@108.gov.in</span>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-lg flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl max-w-md w-full shadow-2xl border border-white/20 ring-1 ring-black/5">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-50 rounded-full p-2 mr-4">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Team</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Are you sure you want to delete this team? This action cannot be undone and the team will be permanently removed.
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
                  Delete Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}