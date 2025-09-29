import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Shield, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Key,
  Bell,
  Globe,
  Clock,
  Award,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';

const GovOfficialProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    id: 'GOV001',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@gov.in',
    phone: '+91 98765 43210',
    designation: 'Deputy Commissioner',
    department: 'Disaster Management Authority',
    jurisdiction: 'Mumbai Coastal Region',
    location: 'Mumbai, Maharashtra',
    joiningDate: '2019-03-15',
    employeeId: 'DMA/MH/2019/001',
    clearanceLevel: 'Level 3 - Emergency Response',
    photo: null
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: true,
    emergencyAlerts: true,
    reportUpdates: false,
    weeklyDigest: true,
    language: 'english',
    timezone: 'Asia/Kolkata'
  });

  const [statistics, setStatistics] = useState({
    alertsIssued: 247,
    reportsProcessed: 1823,
    emergenciesHandled: 89,
    teamMembersManaged: 45,
    yearsOfService: 6,
    successRate: 94
  });

  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    setTempProfile(profile);
  }, [profile, editMode]);

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
    // Here you would typically make an API call to save the profile
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfile(prev => ({ ...prev, photo: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'statistics', name: 'Statistics', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {profile.photo ? (
                    <img 
                      src={profile.photo} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                {editMode && (
                  <label className="absolute -bottom-2 -right-2 bg-white text-blue-600 rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                <p className="text-white-100 text-base mb-1">{profile.designation}</p>
                <p className="text-white-200 text-sm">{profile.department}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-white-100 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    {profile.clearanceLevel}
                  </div>
                  <div className="flex items-center text-white-100 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {profile.jurisdiction}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center text-sm"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center text-sm"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors flex items-center font-medium text-sm"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {profile.name}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {profile.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={tempProfile.phone}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {profile.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {profile.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <div className="flex items-center text-gray-900">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.designation}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <div className="flex items-center text-gray-900">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.department}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <div className="flex items-center text-gray-900">
                      <Key className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.employeeId}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date</label>
                    <div className="flex items-center text-gray-900">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(profile.joiningDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
                    <div className="flex items-center text-gray-900">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {profile.jurisdiction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Alerts Issued</p>
                      <p className="text-3xl font-bold text-blue-700">{statistics.alertsIssued}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Reports Processed</p>
                      <p className="text-3xl font-bold text-green-700">{statistics.reportsProcessed}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Emergencies Handled</p>
                      <p className="text-3xl font-bold text-red-700">{statistics.emergenciesHandled}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Team Members</p>
                      <p className="text-3xl font-bold text-purple-700">{statistics.teamMembersManaged}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Years of Service</p>
                      <p className="text-3xl font-bold text-yellow-700">{statistics.yearsOfService}</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-600">Success Rate</p>
                      <p className="text-3xl font-bold text-indigo-700">{statistics.successRate}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              
              <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => {
                  if (key === 'language' || key === 'timezone') return null;
                  
                  const labels = {
                    emailNotifications: 'Email Notifications',
                    smsAlerts: 'SMS Alerts',
                    emergencyAlerts: 'Emergency Alerts',
                    reportUpdates: 'Report Updates',
                    weeklyDigest: 'Weekly Digest'
                  };

                  return (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{labels[key]}</h4>
                        <p className="text-sm text-gray-500">
                          {key === 'emergencyAlerts' && 'Critical alerts for immediate action'}
                          {key === 'emailNotifications' && 'General system notifications via email'}
                          {key === 'smsAlerts' && 'SMS notifications for urgent matters'}
                          {key === 'reportUpdates' && 'Updates on report status changes'}
                          {key === 'weeklyDigest' && 'Weekly summary of activities'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="tamil">Tamil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Mumbai">Asia/Mumbai</option>
                    <option value="Asia/Chennai">Asia/Chennai</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovOfficialProfile;